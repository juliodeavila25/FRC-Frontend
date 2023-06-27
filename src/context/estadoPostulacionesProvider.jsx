import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EstadoPostulacionesContext = createContext();

const EstadoPostulacionesProvider = ({ children }) => {
  const [estadoPostulaciones, setEstadoPostulaciones] = useState([]);
  const [estadosPostulaciones, setEstadosPostulaciones] = useState([]);
  const [alertaPostulacion, setAlertaPostulacion] = useState({});
  const [cargandoDataCargos, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();


  const obtenerEstadoPostulacionesPorUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/estadoPostulaciones/listar-estado-postulaciones/${id}`, config);
      console.log(data)
      setEstadosPostulaciones(data);
    } catch (error) {
      console.log(error);
    }
  };






  const nuevoEstadoPostulacion = async (info) => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/estadoPostulaciones",
        info,
        config
      );
      setEstadoPostulaciones([...estadoPostulaciones, data]);

      setAlertaPostulacion({
        msg: "Postulación actualizada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlertaPostulacion({});
        navigate(-1);

      }, 3000);


    } catch (error) {
      console.log(error);
    }
  };


  const nuevoEstadoPostulacionModal = async (info) => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/estadoPostulaciones",
        info,
        config
      );
      setEstadoPostulaciones([...estadoPostulaciones, data]);

      setAlertaPostulacion({
        msg: "Postulación actualizada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlertaPostulacion({});
        window.location.reload(false)

      }, 3000);


    } catch (error) {
      console.log(error);
    }
  };





  return (
    <EstadoPostulacionesContext.Provider
      value={{
        nuevoEstadoPostulacionModal,
        nuevoEstadoPostulacion,
        setAlertaPostulacion,
        obtenerEstadoPostulacionesPorUsuario,
        alertaPostulacion,
        estadosPostulaciones
      }}
    >
      {children}
    </EstadoPostulacionesContext.Provider>
  );
};

export { EstadoPostulacionesProvider };

export default EstadoPostulacionesContext;
