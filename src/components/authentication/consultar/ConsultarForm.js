import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { styled } from '@mui/material/styles';
import { Stack, TextField, Radio, FormControlLabel, RadioGroup, Alert, Typography, Autocomplete } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

import RequestContext from '../../../contexts/Request/requestContext';

// ----------------------------------------------------------------------

const CAMPUS_OPTION = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 }
];

const unidades_academicas = [
  { label: 'Facultad de Ciencias Económicas', id: 2 },
  { label: 'Facultad de Ingeniería', id: 3 },
  { label: 'Facultad de Ciencias Exactas y Naturales', id: 4 },
  { label: 'Facultad de Odontología', id: 5 },
  { label: 'Facultad de Enfermería', id: 6 },
  { label: 'Facultad de Ciencias Farmacéuticas', id: 7 },
  { label: 'Facultad de Medicina', id: 8 },
  { label: 'Facultad de Ciencias Sociales y Educación', id: 9 },
  { label: 'Facultad de Ciencias Humanas', id: 10 },
  { label: 'Facultad de Derecho y Ciencias Políticas', id: 11 },
  { label: 'Dependencia Administrativa', id: 12 }
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function ConsultarForm() {
  //Solicitud
  const requestsContext = useContext(RequestContext);
  const { obtenerRequestByRadicado, request, mensaje } = requestsContext;
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [fechaSolicitud, setFechaSolicitud] = useState(new Date());
  //const [fechaInicio, setFechaInicio] = useState(new Date());
  // const [fechaFinal, setFechaFinal] = useState(new Date());
  const [entidad, setEntidad] = useState('udec');
  const [data, setData] = useState('');
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
    // id: Yup.string().required('N° identificación es obligatoria'),
    // firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Nombres es obligatorio'),
    // lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Apellidos es obligatorio'),
    // email: Yup.string().email('Email must be a valid email address').required('Correo Electronico es obligatorio'),
    // password: Yup.string().required('Password is required'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // entidad: Yup.string().required('Entidad es obligatoria'),
    // unidadAcademecia: Yup.string().required('Unidad academica es obligatoria'),
    // cargo: Yup.string().required('Cargo es obligatorio'),
    // entidadExterna: Yup.string().required('Organización es oblivatoria')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      numeroSolicitud: data !== '' ? data?.n_radicado : '',
      fechaSolicitud: data !== '' ? data?.createdAt : '',
      descripcion: data !== '' ? data?.descripcion : '',
      espacio: data !== '' ? data?.espacioSolicitado.nombre + ' ' + data?.espacioSolicitado.caracteristicas : '',
      fechaInicio: data !== '' ? data?.fecha_inicio : '',
      fechaFin: data !== '' ? data?.fecha_fin : '',
      identificacion: data !== '' ? data?.persona?.documento : '',
      nombres: data !== '' ? data?.persona?.nombres : '',
      apellidos: data !== '' ? data?.persona?.apellidos : '',
      celular: data !== '' ? data?.persona?.celular : '',
      correo: data !== '' ? data?.persona?.email : '',
      entidad: data !== '' ? data?.tipo_origen : '',
      unidad: data !== '' ? data?.unidad_academica.nombre : '',
      cargo: data !== '' ? data?.persona?.cargo : '',
      entidad_vinculada: '',
      estado: data !== '' ? data?.estado : '',
      espacio_respuesta:
        data !== '' && data?.espacioAsignado !== null
          ? data?.espacioAsignado?.nombre + ' ' + data?.espacioAsignado?.caracteristicas
          : '',
      observaciones_respuesta: data !== '' ? data?.observaciones : '',
      tipo_solicitud: data !== '' ? data?.tipo_solicitud : '',
      asistentes: data !== '' ? data?.asistentes : ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await obtenerRequestByRadicado(values.numeroSolicitud);
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
    if (request !== undefined) {
      setData(request);
      console.log(request);
    }
  }, [request]);

  useEffect(() => {
    if (mensaje !== null) {
      setData('');
      console.log(request);
    }
  }, [mensaje]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={1}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="N° Solicitud"
              {...getFieldProps('numeroSolicitud')}
              error={Boolean(touched.numeroSolicitud && errors.numeroSolicitud)}
              helperText={touched.numeroSolicitud && errors.numeroSolicitud}
            />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Consultar
            </LoadingButton>
          </Stack>
          {data !== '' ? (
            <>
              <br />
              <LabelStyle>Información General</LabelStyle>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <MobileDatePicker
                  label="Fecha Solicitud"
                  sx={{ width: 400 }}
                  {...getFieldProps('fechaSolicitud')}
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
                  error={Boolean(touched.descripcion && errors.descripcion)}
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
                  {...getFieldProps('fechaInicio')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  disabled
                  label="Fecha Final"
                  {...getFieldProps('fechaFin')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField label="Asistentes" {...getFieldProps('asistentes')} variant="filled" disabled />
              </Stack>
              <LabelStyle>Solicitante</LabelStyle>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  disabled
                  fullWidth
                  label="N° Identificación"
                  variant="filled"
                  {...getFieldProps('identificacion')}
                />
                <TextField disabled fullWidth label="Nombres" variant="filled" {...getFieldProps('nombres')} />
                <TextField disabled fullWidth label="Apellidos" variant="filled" {...getFieldProps('apellidos')} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField disabled fullWidth label="Celular" variant="filled" {...getFieldProps('celular')} />
                <TextField
                  disabled
                  fullWidth
                  label="Correo Electronico"
                  variant="filled"
                  {...getFieldProps('correo')}
                />
              </Stack>
              <LabelStyle>Entidad</LabelStyle>
              <RadioGroup row defaultValue={entidad} onChange={handleRadioChange}>
                <FormControlLabel disabled value="udec" control={<Radio />} label="Universidad de Cartagena" />
                <FormControlLabel disabled value="otro" control={<Radio />} label="Otro" />
              </RadioGroup>
              {entidad === 'udec' ? (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Unidad Académica ó Administrativa"
                    variant="filled"
                    {...getFieldProps('unidad')}
                  />

                  <TextField fullWidth disabled label="Cargo" variant="filled" {...getFieldProps('cargo')} />
                </Stack>
              ) : (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Entidad, empresa u organización a la que se encuentra vinculado"
                    variant="filled"
                    {...getFieldProps('entidad_vinculada')}
                  />
                </Stack>
              )}

              <LabelStyle>Area Asignada</LabelStyle>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  id="outlined-select-currency"
                  label="Estado"
                  disabled
                  variant="filled"
                  {...getFieldProps('estado')}
                ></TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  id="outlined-select-currency"
                  label="Espacio"
                  disabled
                  variant="filled"
                  {...getFieldProps('espacio_respuesta')}
                  fullWidth
                ></TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  disabled
                  multiline
                  minRows={3}
                  maxRows={5}
                  label="Observaciones"
                  {...getFieldProps('observaciones_respuesta')}
                />
              </Stack>
            </>
          ) : mensaje !== null ? (
            <Alert severity="warning">
              No existe solicitud asociada a ese codigo, por favor verifique la información digitada.
            </Alert>
          ) : null}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
