// material
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3} sx={{ pb: 10 }}>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h4">¿No has encontrado la ayuda correcta?</Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Nombre" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Email" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Asunto" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Ingrese su mensaje aquí." multiline rows={4} />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Button size="large" variant="contained">
          Enviar Ahora
        </Button>
      </MotionInView>
    </Stack>
  );
}
