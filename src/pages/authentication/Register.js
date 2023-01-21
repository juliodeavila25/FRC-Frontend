import { useCallback, useEffect, useContext } from 'react';
import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
// material accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { RegisterForm } from '../../components/authentication/register';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';
//import sedeContext from '../../../src/contexts/Sede/sedeContext';
//import espacioContext from 'src/contexts/Espacio/espacioContext';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 780,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();
  /* //Get Sedes
  // const SedeContext = useContext(sedeContext);
  // const { obtenerSedePublicas, sedes } = SedeContext;
  // console.log(sedes);
  useEffect(() => {
    obtenerSedePublicas();
  }, []);*/
  
  return (
    <RootStyle title="Solicitud | Aulas, Salones y Auditorios">
      <AuthLayout>
        Usted tiene una solicitud en curso? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.consultar}>
          Consultar
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Solicite su auditorio, salón desde aquí:
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Gestión de Bienes y Servicios.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Solicitud De Aulas, Salones Y Auditorios.</Typography>
            </Box>
            <Tooltip title={capitalCase(method)}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip>
          </Box>

          {method === 'firebase' && <AuthFirebaseSocials />}

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Al enviar, yo estoy de acuerdo con los&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terminos de servicios
            </Link>
            &nbsp;y&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Politicas de Privacidad
            </Link>
            &nbsp;de la Universidad de Cartagena.
          </Typography> 
          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
          
        </ContentStyle>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="secondary" aria-label="add"  target="_blank" component={RouterLink} to={PATH_AUTH.faqs} sx={{ position: 'fixed', bottom: 0, right: 0 }} >
          <HelpOutlineIcon />
        </Fab>
         </Box>
      </Container>
      
    </RootStyle>
  );
}
