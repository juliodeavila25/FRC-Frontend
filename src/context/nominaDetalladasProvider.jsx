import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const NominaDetalladasContext = createContext();

const NominaDetalladasProvider = ({ children }) => {
  const [nominaDetallada, setNominaDetallada] = useState([]);  
  const [nomina, setNomina] = useState([]);
  const [nominas, setNominas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoData, setCargando] = useState(false);
  const [cargandoDataDetalla, setCargandoDetallada] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();



  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  useEffect(() => {
  const obtenerNominas = async () => {
    setCargando(true);
    try {
      const identificacion = auth.documento;
      
      const token = localStorage.getItem("token");
      if (!token || !identificacion) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(identificacion)
      const { data } = await clienteAxios.get("/nominas/obtener_moninas", config);
      //console.log(data)
      setNominas(data);
      
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };
  obtenerNominas();
  }, [auth]);



  const obtenerNominaDetallada = async (identificacion, periodo) => {
    
    setCargando(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/nominaDetalladas/obtener/${identificacion}/${periodo}`, config);
      //console.log(data);
      setNominaDetallada(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <NominaDetalladasContext.Provider
      value={{
        alerta,
        nominas,
        nomina,
        nominaDetallada,
        cargandoData,
        cargandoDataDetalla,
        obtenerNominaDetallada,
      }}
    >
      {children}
    </NominaDetalladasContext.Provider>
  );
};

export { NominaDetalladasProvider };

export default NominaDetalladasContext;
