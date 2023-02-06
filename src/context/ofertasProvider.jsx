import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OfertasContext = createContext();

const OfertasProvider = ({ children }) => {
  const [ofertas, setOfertas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerOfertas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/ofertas", config);
        setOfertas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerOfertas();
  }, [auth]);

  return (
    <OfertasContext.Provider
      value={{
        ofertas,
      }}
    >
      {children}
    </OfertasContext.Provider>
  );
};

export { OfertasProvider };

export default OfertasContext;
