import { useState, useEffect, useContext } from 'react';
// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  BookingTotal,
  BookingCheckIn,
  BookingDetails,
  BookingCheckOut,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats
} from '../../components/_dashboard/general-booking';
import requestContext from 'src/contexts/Request/requestContext';
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  //Get All Solicitudes
  const RequestContext = useContext(requestContext);
  const { obtenerRequest, requests } = RequestContext;
  const total = requests.length;
  const total_rechazadas = Object.values(requests).filter((element) => element.estado === 'rechazado').length;
  const total_asignadas = Object.values(requests).filter((element) => element.estado === 'asignado').length;
  useEffect(() => {
    obtenerRequest();
  }, []);
  return (
    <Page title="General: Inicio | Administrador">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingTotal total={total} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCheckIn total_asignadas={total_asignadas} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCheckOut total_rechazadas={total_rechazadas} />
          </Grid>
          {/* 
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid>
           
          <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid>
 */}
          {requests.length > 0 && (
            <Grid item xs={12}>
              <BookingNewestBooking requests={requests} />
            </Grid>
          )}

          {requests.length > 0 && (
            <Grid item xs={12}>
              <BookingDetails requests={requests} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
