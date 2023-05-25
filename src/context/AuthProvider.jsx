import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        console.log(data);
        setAuth(data);
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario()
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_trabajador_conectado");
    navigate("/");
  };

   const obtenerUsuarioAutenticado= async () => {

    try {
      const id = localStorage.getItem("id_trabajador_conectado");
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(`usuarios/usuario-autenticado/${id}`, config);
       console.log(data);
      setUsuarioAutenticado(data);
    } catch (error) {
      console.log(error);
    }

   
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        cerrarSesion,
        obtenerUsuarioAutenticado,
        usuarioAutenticado
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
