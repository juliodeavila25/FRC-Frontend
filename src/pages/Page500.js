import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// material
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="500 Internal Server Error | Minimal-UI">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Registro exitoso
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Usted acaba de realizar un registro exitoso.</Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Ir a inicio
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
