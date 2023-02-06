import { Outlet, Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Layout from "../components/layout/layout";

import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <BeatLoader color="#36d7b7" />;
  // console.log(auth._id);
  return (
    <>
      {auth._id ? (
        <div>
          <Layout />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
