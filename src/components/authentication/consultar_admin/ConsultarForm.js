import * as Yup from 'yup';
import { useState, useEffect, useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { styled } from '@mui/material/styles';
import { Stack, TextField, Radio, FormControlLabel, RadioGroup, Alert, Typography, Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import RequestContext from '../../../contexts/Request/requestContext';
import espacioContext from 'src/contexts/Espacio/espacioContext';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDropzone } from 'react-dropzone';
// ----------------------------------------------------------------------

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const estados = [
  {
    value: 'asignado',
    label: 'Asignado'
  },
  {
    value: 'sugerencia',
    label: 'Sugerencia'
  },
  {
    value: 'rechazado',
    label: 'Rechazado'
  }
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function ConsultarForm(isEdit) {
  //Get Espacios
  const EspacioContext = useContext(espacioContext);
  const { obtenerEspacioPublico, espacios } = EspacioContext;

  //console.log(espacios);
  const [espacio, setEspacio] = useState('');
  const [estado, setEstado] = useState('');
  //Data
  const isEditar = isEdit.isEdit;
  const currentRequestOne = isEdit.currentRequest;
  //Solicitud
  const requestsContext = useContext(RequestContext);
  const { updateRequest } = requestsContext;
  const navigate = useNavigate();
  //console.log(isEditar);
  //console.log(currentRequestOne);
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [document, setDocument] = useState();
  // console.log(currentRequestOne?.tipo_origen);
  // const [entidad, setEntidad] = useState(currentRequestOne?.tipo_origen);
  /*const [fechaSolicitud, setFechaSolicitud] = useState(new Date());
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  
 */
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone();
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleChangeFecha = (newValue) => {
    setFechaSolicitud(newValue);
  };
  const handleRadioChange = (event) => {
    setEntidad(event.target.value);
  };
  const handleChangeInicio = (newValue) => {
    setFechaInicio(newValue);
  };
  const handleChangeFinal = (newValue) => {
    setFechaFinal(newValue);
  };

  const RegisterSchema = Yup.object().shape({
    /*  id: Yup.string().required('N° identificación es obligatoria'),
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Nombres es obligatorio'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Apellidos es obligatorio'),
    email: Yup.string().email('Email must be a valid email address').required('Correo Electronico es obligatorio'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    entidad: Yup.string().required('Entidad es obligatoria'),
    unidadAcademecia: Yup.string().required('Unidad academica es obligatoria'),
    cargo: Yup.string().required('Cargo es obligatorio'),
    entidadExterna: Yup.string().required('Organización es oblivatoria')*/
  });

  console.log(currentRequestOne);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.id
          : 0,
      fecha_solicitud:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.createdAt
          : '',

      n_radicado:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.n_radicado
          : '',
      descripcion:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.descripcion
          : '',
      espacio:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.espacioSolicitado.nombre + ' ' + currentRequestOne?.espacioSolicitado.caracteristicas
          : '',
      fecha_inicio:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.fecha_inicio
          : '',
      fecha_fin:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.fecha_fin
          : '',
      documento:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.documento
          : '',
      nombres:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.nombres
          : '',
      apellidos:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.apellidos
          : '',
      email:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.email
          : '',
      celular:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.celular
          : '',
      cargo:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.persona.cargo
          : '',
      unidad_academica:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.unidad_academica.nombre
          : '',
      observaciones:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.observaciones
          : '',
      tipo_solicitud:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.tipo_solicitud
          : '',
      asistentes:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.asistentes
          : '',
      estado_id:
        isEditar === true &&
        currentRequestOne !== undefined &&
        Object.keys(currentRequestOne).length > 0 &&
        currentRequestOne.espacioAsignado !== null
          ? currentRequestOne?.estado
          : undefined,
      espacio_asignado:
        isEditar === true && currentRequestOne !== undefined && Object.keys(currentRequestOne).length > 0
          ? currentRequestOne?.espacioAsignado?.nombre + ' ' + currentRequestOne?.espacioAsignado?.caracteristicas
          : ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('id', values.id);
      formData.append('destinoId', espacio);
      formData.append('estado', estado);
      formData.append('document', acceptedFiles[0]);
      formData.append('observaciones', values.observaciones);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      try {
        console.log(estado);
        updateRequest(formData);
        //await register(values.email, values.password, values.firstName, values.lastName);
        enqueueSnackbar('Actualización exitosa', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        /* if (isMountedRef.current) {
          setSubmitting(false);
        }
        resetForm();
        setSubmitting(false); */
        navigate(PATH_DASHBOARD.solicitud.list);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  useEffect(() => {
    obtenerEspacioPublico();
  }, []);

  const files = acceptedFiles.map((file) => (
    <>
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    </>
  ));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={1}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              sx={{ width: 400 }}
              disabled
              variant="filled"
              label="N° Solicitud"
              {...getFieldProps('n_radicado')}
            />
          </Stack>
          <br />
          <LabelStyle>Información General</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MobileDatePicker
              label="Fecha Solicitud"
              sx={{ width: 400 }}
              {...getFieldProps('fecha_solicitud')}
              disabled
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              disabled
              sx={{ width: 220 }}
              label="Tipo solicitud"
              {...getFieldProps('tipo_solicitud')}
              variant="filled"
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              multiline
              disabled
              minRows={3}
              maxRows={5}
              label="Descripción de la solicitud"
              placeholder="Solicite su auditorio, salón desde aquí"
              {...getFieldProps('descripcion')}
              variant="filled"
            />
          </Stack>
          <LabelStyle>Area Solicitada</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth disabled label="Espacio" {...getFieldProps('espacio')} variant="filled" />
          </Stack>
          <br />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <DateTimePicker
              disabled
              label="Fecha Inicio"
              {...getFieldProps('fecha_inicio')}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              disabled
              label="Fecha Final"
              {...getFieldProps('fecha_fin')}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField label="Asistentes" {...getFieldProps('asistentes')} variant="filled" disabled />
          </Stack>
          <LabelStyle>Solicitante</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth disabled label="N° Identificación" {...getFieldProps('documento')} variant="filled" />
            <TextField fullWidth disabled label="Nombres" {...getFieldProps('nombres')} variant="filled" />
            <TextField fullWidth disabled label="Apellidos" {...getFieldProps('apellidos')} variant="filled" />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <TextField fullWidth disabled label="Celular" {...getFieldProps('celular')} variant="filled" />
            <TextField fullWidth disabled label="Correo Electronico" {...getFieldProps('email')} variant="filled" />
          </Stack>
          <LabelStyle>Entidad</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              disabled
              label="Unidad Académica ó Administrativa"
              {...getFieldProps('unidad_academica')}
              variant="filled"
            />
            <TextField fullWidth disabled label="Cargo" {...getFieldProps('cargo')} variant="filled" />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              disabled
              label="Entidad, empresa u organización a la que se encuentra vinculado"
              variant="filled"
            />
          </Stack>
          <LabelStyle>Area Asignada</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              select
              disabled={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? true
                  : false
              }
              variant={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? 'filled'
                  : 'outlined'
              }
              fullWidth
              label="Estado"
              placeholder="Estado"
              {...getFieldProps('estado_id')}
              SelectProps={{ native: true }}
              error={Boolean(touched.estado_id && errors.estado_id)}
              helperText={touched.estado_id && errors.estado_id}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="" />
              {estados &&
                estados.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </TextField>
            {estado === 'asignado' ? (
              <div className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps('document')} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                  <h4>Archivos</h4>
                  <ul>{files}</ul>
                </aside>
              </div>
            ) : null}

            {/* <TextField
              id="outlined-select-currency"
              select
              disabled={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? true
                  : false
              }
              variant={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? 'filled'
                  : 'outlined'
              }
              label="Estado"
              sx={{ width: 220 }}
              onChange={(event, newValue) => {
                setEstado(newValue.props.value);
                console.log(newValue.props);
              }}
              {...getFieldProps('estado')}
            >
              {estados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {isEditar === true &&
            currentRequestOne !== undefined &&
            Object.keys(currentRequestOne).length > 0 &&
            currentRequestOne.espacioAsignado !== null ? (
              <TextField fullWidth disabled label="Espacio" {...getFieldProps('espacio_asignado')} variant="filled" />
            ) : (
              <>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: '100%' }}
                  options={espacios}
                  autoHighlight
                  getOptionLabel={(option) => option.nombre}
                  onChange={(event, newValue) => {
                    //setValue(newValue);
                    setEspacio(newValue?.id);
                    //console.log(newValue);
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.nombre} ({option.sede.nombre}) + {option.caracteristicas}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleccione un espacio"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password' // disable autocomplete and autofill
                      }}
                      {...getFieldProps(1)}
                    />
                  )}
                />
              </>
            )}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              multiline
              disabled={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? true
                  : false
              }
              variant={
                isEditar === true &&
                currentRequestOne !== undefined &&
                Object.keys(currentRequestOne).length > 0 &&
                currentRequestOne.espacioAsignado !== null
                  ? 'filled'
                  : 'outlined'
              }
              minRows={3}
              maxRows={5}
              label="Observaciones"
              {...getFieldProps('observaciones')}
              placeholder="Escriba cualquier observacion para el solicitante"
              error={Boolean(touched.observaciones && errors.observaciones)}
              helperText={touched.observaciones && errors.observaciones}
            />
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
