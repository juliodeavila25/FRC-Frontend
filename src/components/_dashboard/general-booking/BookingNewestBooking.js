import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
import { Icon } from '@iconify/react';
import iScheduleSchoolDateTime from '@iconify/icons-healthicons/i-schedule-school-date-time';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import peopleFill from '@iconify/icons-eva/people-fill';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography, Paper, CardHeader } from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import { CarouselControlsArrowsBasic1 } from '../../carousel';
import requestContext from 'src/contexts/Request/requestContext';

// ----------------------------------------------------------------------

// const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   name: mockData.name.fullName(index),
//   avatar: mockData.image.avatar(index),
//   bookdAt: mockData.time(index),
//   roomNumber: 'A-21',
//   roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single',
//   person: '3-5',
//   cover: `/static/mock-images/rooms/room-${index + 1}.jpg`
// }));

// ----------------------------------------------------------------------

// BookingItem.propTypes = {
//   item: PropTypes.shape({
//     avatar: PropTypes.string,
//     bookdAt: PropTypes.instanceOf(Date),
//     cover: PropTypes.string,
//     name: PropTypes.string,
//     person: PropTypes.string,
//     roomNumber: PropTypes.string,
//     roomType: PropTypes.string
//   })
// };

function BookingItem({ item }) {
  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt="" src={`http://localhost:8080/${item.avatarurl?.toString()}`} />
          <div>
            <Typography variant="subtitle2">{item.solicitante}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {item.nombre}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={iScheduleSchoolDateTime} width={16} height={16} />
            <Typography variant="caption">{item.fecha_inicio_formated}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={iScheduleSchoolDateTime} width={16} height={16} />
            <Typography variant="caption">{item.fecha_fin_formated}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={(item.estado === 'sugerencia' && 'error') || (item.estado === 'asignado' && 'info') || 'warning'}
          sx={{ position: 'absolute', bottom: 16, right: 16, textTransform: 'capitalize' }}
        >
          {item.estado}
        </Label>
        <Box
          component="img"
          src={`http://localhost:8080/${item.avatarurl?.toString()}`}
          sx={{ borderRadius: 1.5, width: 1 }}
        />
      </Box>
    </Paper>
  );
}

export default function BookingCustomerReviews(requests) {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const solicitudes = requests.requests;
  console.log(requests);
  // const RequestContext = useContext(requestContext);
  // const { obtenerRequest, requests } = RequestContext;

  // useEffect(() => {
  //   obtenerRequest();
  // }, []);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow:
      solicitudes.length === 0
        ? 0
        : solicitudes.length === 1
        ? 1
        : solicitudes.length === 2
        ? 2
        : solicitudes.length === 3
        ? 3
        : 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Ultimas Solicitudes"
        subheader="Espacios"
        action={
          <CarouselControlsArrowsBasic1
            arrowLine
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              position: 'static',
              '& button': { color: 'text.primary' }
            }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      {solicitudes.length > 0 && (
        <Slider ref={carouselRef} {...settings}>
          {solicitudes.length > 0 && solicitudes.map((item) => <BookingItem key={item.id} item={item} />)}
        </Slider>
      )}

      {/* {solicitudes.length > 0 && solicitudes.map((item) => <BookingItem key={item.id} item={item} />)} */}
    </Box>
  );
}
