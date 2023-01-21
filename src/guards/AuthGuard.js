import { useState, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';
import AuthContext from '../contexts/autenticacion/authContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado, usuario } = authContext;
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  if (autenticado !== null) {
    //console.log(autenticado);
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
  } else {
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    //console.log(pathname);
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
