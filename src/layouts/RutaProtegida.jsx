import { Outlet, Navigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Layout from "../components/layout/layout";

import useAuth from "../hooks/useAuth";

const RutaProtegida = ({ allowedRoles }) => {
  const { auth, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <BeatLoader color="#36d7b7" />;
  console.log(auth);
  return (
    <>
      {auth?.userType?.find((item) => allowedRoles?.includes(item)) ? (
        <div>
          <Layout />
        </div>
      ) : auth?._id ? (
        <Navigate to="/sin-autorizacion" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
