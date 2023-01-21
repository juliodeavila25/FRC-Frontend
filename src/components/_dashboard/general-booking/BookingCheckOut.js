// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { CheckOutIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------

const TOTAL = 124000;

export default function BookingCheckOut(total_rechazadas) {
  const total_final = total_rechazadas.total_rechazadas;
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(total_final)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Rechazadas
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <CheckOutIllustration />
      </Box>
    </RootStyle>
  );
}
