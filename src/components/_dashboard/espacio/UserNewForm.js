import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  TextareaAutosize
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import sedeContext from '../../../contexts/Sede/sedeContext';
import espacioContext from '../../../contexts/Espacio/espacioContext';
// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool
  //currentUser: PropTypes.array
};

export default function UserNewForm({ isEdit, currentUser }) {
  //console.log(isEdit);
  //sconsole.log(currentUser);
  //Get Sedes
  const SedeContext = useContext(sedeContext);
  const { obtenerSede, sedes } = SedeContext;
  //Espacios
  const EspacioContext = useContext(espacioContext);
  const { addEspacio, updateEspacio, espacios } = EspacioContext;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState('');

  const NewUserSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es obligatorio'),
    caracteristicas: Yup.string().required('Caracteristicas es obligatorio'),
    sedeId: Yup.string().required('Sede es obligatorio'),
    avatarurl: Yup.mixed().required('Imagen es obligatoria')
  });
  //console.log(currentUser);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.id : 0,
      nombre: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.nombre : '',
      caracteristicas:
        isEdit === true && currentUser && Object.keys(currentUser).length > 0
          ? currentUser?.caracteristicas?.toString()
          : '',
      sedeId: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.sedeId?.toString() : '',
      estado: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.estado?.toString() : '',
      avatarurl:
        isEdit === true && Object.keys(currentUser).length > 0
          ? `http://localhost:8080/${currentUser?.avatarurl?.toString()}`
          : null
    },
    /* initialValues: {
      id:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.id?.toString() : 0,
      nombre:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.nombre?.toString() : '',
      caracteristicas:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.caracteristicas?.toString() : '',
      sedeId:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.sedeId?.toString() : '',
      estado:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.estado?.toString() : '',
      avatarurl:  isEdit === true && currentUser && currentUser !== undefined ? currentUser?.avatarurl?.toString() : null
    },*/
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const formData = new FormData();
      formData.append('avatarurl', image);
      formData.append('nombre', values.nombre);
      formData.append('caracteristicas', values.caracteristicas);
      formData.append('id', values.id);
      formData.append('sedeId', values.sedeId);
      formData.append('estado', values.estado);

      console.log('formData', formData);

      try {
        // console.log(isEdit);
        //console.log(values);

        // console.log(id);
        // await addEspacio(values);
        console.log('formData', formData);

        !isEdit ? addEspacio(formData) : updateEspacio(formData);

        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Registro exitoso' : 'Actualización exitosa', { variant: 'success' });
        navigate(PATH_DASHBOARD.espacio.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      setImage(file);
      if (file) {
        setFieldValue('avatarurl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    obtenerSede();
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.estado !== 'activo' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.estado}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  name="avatarurl"
                  accept="image/*"
                  file={values.avatarurl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarurl && errors.avatarurl)}
                  {...getFieldProps('avatarurl')}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatarurl && errors.avatarurl}
                </FormHelperText>
              </Box>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('estado', event.target.checked ? 'inactivo' : 'activo')}
                      checked={values.estado !== 'activo'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Inactivo
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Aplicar para deshabilitar cuenta
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              {/* 
              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />*/}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...getFieldProps('nombre')}
                    error={Boolean(touched.nombre && errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Sede"
                    placeholder="Sede"
                    {...getFieldProps('sedeId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.sedeId && errors.sedeId)}
                    helperText={touched.sedeId && errors.sedeId}
                  >
                    <option value="" />
                    {sedes &&
                      sedes.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nombre}
                        </option>
                      ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Caracteristicas *"
                    {...getFieldProps('caracteristicas')}
                    error={Boolean(touched.caracteristicas && errors.caracteristicas)}
                    helperText={touched.caracteristicas && errors.caracteristicas}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Espacio' : 'Guardar Cambios'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
