import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';

// material
import { styled } from '@mui/material/styles';
import {
  Stack,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Alert,
  Typography,
  Autocomplete,
  MenuItem,
  List
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import RequestContext from '../../../contexts/Request/requestContext';
import espacioContext from 'src/contexts/Espacio/espacioContext';
import caracteristicaContext from 'src/contexts/Caracteristica/caracteristicaContext';
//
import { MIconButton } from '../../@material-extend';
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------
const options = ['Option 1', 'Option 2'];
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

const estados = [
  {
    value: 'prestamo',
    label: 'Préstamo'
  },
  {
    value: 'alquiler',
    label: 'Alquiler'
  }
];
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const SimpleList = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>{item.nombre}</li>
    ))}
  </ul>
);

export default function RegisterForm() {
  const navigate = useNavigate();
  //Get Caracteristicas
  const CaracteristicaContext = useContext(caracteristicaContext);
  const { obtenerCaracteristicaPublico, caracteristicas } = CaracteristicaContext;
  //Get Sedes
  const EspacioContext = useContext(espacioContext);
  const { obtenerEspacioPublico, espacios } = EspacioContext;
  // console.log(espacios)
  //Solicitud
  const requestsContext = useContext(RequestContext);
  const { addRequest, enviarEmailSolicitud } = requestsContext;
  //Lista Espacio
  const [espacio, setEspacio] = useState('');
  const [origen, setOrigen] = useState(1);

  //console.log(espacio.id);
  // const [inputEspacio, setInputEspacio] = useState('');
  // State para el presupuesto
  const [solicitud, agregarSolicitud] = useState({
    descripcion: '',
    documento: '',
    nombres: '',
    apellidos: '',
    email: '',
    celular: '',
    entidad: '',
    unidadAcademica: '',
    cargo: '',
    entidadExterna: '',
    campus: '',
    asistentes: ''
  });
  useEffect(() => {
    obtenerEspacioPublico();
    obtenerCaracteristicaPublico();
  }, []);
  // Extraer valores del state de presupuesto
  const { descripcion, documento, nombres, apellidos, email, celular, entidadExterna, unidadAcademica, cargo } =
    solicitud;
  const [entidad, setEntidad] = useState('udec');
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  // const [unidadAcademica, setUnidadAcademica] = useState('');
  // const [cargo, setCargo] = useState('');
  // Lee los contenidos de los inputs
  const onChangeRequest = (e) => {
    agregarSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value
    });
    //console.log(solicitud);
  };
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [fechaSolicitud, setFechaSolicitud] = useState(new Date());
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [campus, setCampus] = useState('');
  // const [espacio, setEspacio] = useState('');
  // const [areaSolicitud, setAreaSolicitud] = useState('');
  /*
  const handleChangeFecha = (newValue) => {
    setFechaSolicitud(newValue);
  };*/
  const handleRadioChange = (event) => {
    /* if(event.target.value === 'otro'){
      // setEntidadExterna("");
      setUnidadAcademica("No Aplica");
      setCargo("No Aplica");
    }else{
      // setEntidadExterna("No Aplica");
      setUnidadAcademica("");
      setCargo("");
    } */
    //console.log(event.target.value);
    setEntidad(event.target.value);
  };

  const handleRadioChangeTipo = (event) => {
    setTipoSolicitud(event.target.value);
  };
  /*
  const handleChangeInicio = (newValue) => {
    console.log(newValue);
    setFechaInicio(newValue);
  };
  const handleChangeFinal = (newValue) => {
    console.log(newValue);
    setFechaFinal(newValue);
  };*/
  const RegisterSchema = Yup.object().shape({
    //  id: Yup.string().required('N° identificación es obligatoria')  ,
    // nombres: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Nombres es obligatorio'),
    // apellidos: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Apellidos es obligatorio'),
    // email: Yup.string().email('Email must be a valid email address').required('Correo Electronico es obligatorio'),
    // celular: Yup.string().required('Phone number is required'),
    // entidad: Yup.string().required('Entidad es obligatoria'),
    // unidadAcademica: Yup.string().required('Unidad academica es obligatoria'),
    // cargo: Yup.string().required('Cargo es obligatorio'),
    // entidadExterna: Yup.string().required('Organización es oblivatoria'),
    descripcion: Yup.string().required('Descripcioón es obligatoria')
  });

  const formik = useFormik({
    initialValues: {
      descripcion: '',
      documento: '',
      nombres: '',
      apellidos: '',
      email: '',
      celular: '',
      cargo: '',
      entidadExterna: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      values['espacioId'] = espacio;
      values['origenId'] = origen;
      values['fechaInicio'] = fechaInicio;
      values['fechaFinal'] = fechaFinal;
      values['tipo_origen'] = entidad;
      values['tipo_solicitud'] = tipoSolicitud;
      console.log(values);
      try {
        addRequest(values);
        /* await register(values.email, values.nombres, values.apellidos);*/
        enqueueSnackbar('Solicitud Registrada', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        setTimeout(() => {
          navigate(PATH_PAGE.page500);
        }, 2000);
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={1}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <LabelStyle>Información General</LabelStyle>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* <MobileDatePicker
              label="Fecha Solicitud"
              value={fechaSolicitud}
              onChange={handleChangeFecha}
              renderInput={(params) => <TextField {...params} />}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha Solicitud"
                value={fechaSolicitud}
                onChange={(newValue) => {
                  console.log(newValue);
                  //setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo solicitud"
              autoHighlight
              sx={{ width: 260 }}
              onChange={(event, newValue) => {
                setTipoSolicitud(newValue.props.value);
                //console.log(newValue.props.value);
              }}
            >
              {estados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Descripción de la solicitud"
              {...getFieldProps('descripcion')}
              placeholder="Solicite su auditorio, salón desde aquí"
              error={Boolean(touched.descripcion && errors.descripcion)}
              helperText={touched.description && errors.descripcion}
            />
          </Stack>
          <LabelStyle>Area Solicitada</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* <TextField
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
                    {
                    sedes &&
                    sedes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))

                    }
                  </TextField>
                  */}
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
                />
              )}
            />
          </Stack>
          <br />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Fecha Inicio"
                value={fechaInicio}
                onChange={(newValue) => {
                  // console.log(newValue);
                  setFechaInicio(newValue);
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Fecha Final"
                value={fechaFinal}
                onChange={(newValue) => {
                  // console.log(newValue);
                  // console.log(newValue.getDate());
                  setFechaFinal(newValue);
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Asistentes"
              {...getFieldProps('asistentes')}
              error={Boolean(touched.asistentes && errors.asistentes)}
              helperText={touched.asistentes && errors.asistentes}
            />
          </Stack>
          <LabelStyle>Solicitante</LabelStyle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="N° Identificación"
              {...getFieldProps('documento')}
              error={Boolean(touched.documento && errors.documento)}
              helperText={touched.documento && errors.documento}
            />
            <TextField
              fullWidth
              label="Nombres"
              {...getFieldProps('nombres')}
              error={Boolean(touched.nombres && errors.nombres)}
              helperText={touched.nombres && errors.nombres}
            />

            <TextField
              fullWidth
              label="Apellidos"
              {...getFieldProps('apellidos')}
              error={Boolean(touched.apellidos && errors.apellidos)}
              helperText={touched.apellidos && errors.apellidos}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <TextField
              fullWidth
              label="Celular"
              {...getFieldProps('celular')}
              error={Boolean(touched.celular && errors.celular)}
              helperText={touched.celular && errors.celular}
            />
            <TextField
              fullWidth
              label="Correo Electronico"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
          <LabelStyle>Entidad</LabelStyle>
          <RadioGroup row defaultValue="udec" onChange={handleRadioChange}>
            <FormControlLabel value="udec" control={<Radio />} label="Universidad de Cartagena" />
            <FormControlLabel value="otro" control={<Radio />} label="Otro" />
          </RadioGroup>

          {entidad === 'udec' ? (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Autocomplete
                id="combo-box-demo"
                sx={{ width: 800 }}
                options={unidades_academicas}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  //setValue(newValue);
                  //setEspacio(newValue.id);
                  setOrigen(newValue.id);
                  //console.log(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Unidad Académica ó Administrativa" />}
              />

              <TextField
                fullWidth
                label="Cargo"
                {...getFieldProps('cargo')}
                error={Boolean(touched.cargo && errors.cargo)}
                helperText={touched.cargo && errors.cargo}
              />
            </Stack>
          ) : (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Entidad, empresa u organización a la que se encuentra vinculado"
                {...getFieldProps('entidadExterna')}
                error={Boolean(touched.entidadExterna && errors.entidadExterna)}
                helperText={touched.entidadExterna && errors.entidadExterna}
              />
            </Stack>
          )}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Enviar
          </LoadingButton>
        </Stack>
      </Form>
      <Typography variant="h6" gutterBottom component="div" sx={{ pt: 4, pb: 2 }}>
        Recomendaciones/Restricciones Generales
      </Typography>
      <SimpleList list={caracteristicas} />
    </FormikProvider>
  );
}
