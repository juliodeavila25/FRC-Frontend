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
//import sedeContext from '../../../contexts/Sede/sedeContext';
import caracteristicaContext from '../../../contexts/Caracteristica/caracteristicaContext';
// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool
  //currentUser: PropTypes.array
};

export default function UserNewForm({ isEdit, currentUser }) {
  //console.log(isEdit);
  //sconsole.log(currentUser);
  //Get Sedes
  //const SedeContext = useContext(sedeContext);
  //const { obtenerSede, sedes } = SedeContext;

  const sedes = [
    { id: '1', nombre: 'Generales' },
    { id: '2', nombre: 'Especificas' }
  ]
  //Caracteristicas
  const CaracteristicaContext = useContext(caracteristicaContext);
  const { addCaracteristica, updateCaracteristica, caracteristicas } = CaracteristicaContext;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState('');

  const NewUserSchema = Yup.object().shape({
    nombre: Yup.string().required('Recomendación/Restricciones es obligatorio'),
    tipo: Yup.string().required('Tipo es obligatorio'),
    //sedeId: Yup.string().required('Sede es obligatorio'),
    //avatarurl: Yup.mixed().required('Imagen es obligatoria')
  });
  //console.log(currentUser);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.id : 0,
      nombre: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.nombre : '',
      tipo: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.tipo : '',
      estado: isEdit === true && Object.keys(currentUser).length > 0 ? currentUser?.estado?.toString() : '',
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
      //console.log(values);
      try {
        // console.log(isEdit);
        //console.log(values);

        // console.log(id);
        // await addCaracteristica(values);

        !isEdit ? addCaracteristica(values) : updateCaracteristica(values);

        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Registro exitoso' : 'Actualización exitosa', { variant: 'success' });
        navigate(PATH_DASHBOARD.caracteristica.list);
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
   // obtenerSede();
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={1}>        
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Recomendación/Restricciones *"
                    {...getFieldProps('nombre')}
                    error={Boolean(touched.nombre && errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>                  
                  <TextField
                    select
                    fullWidth
                    label="Tipo"
                    placeholder="Tipo"
                    {...getFieldProps('tipo')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.tipo && errors.tipo)}
                    helperText={touched.tipo && errors.tipo}
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
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Caracteristica' : 'Guardar Cambios'}
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
