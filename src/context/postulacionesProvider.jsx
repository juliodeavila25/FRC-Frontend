import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PostulacionesContext = createContext();

const PostulacionesProvider = ({ children }) => {
  const [postulacion, setPostulacion] = useState([]);
  const [postulaciones, setPostulaciones] = useState([])
  const [postulacionesUsuario, setPostulacionesUSuario] = useState([])
  const [postulacionesFiltradas, setPostulacionesFiltradas] = useState([])
  const [cargandoDataCargos, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setCargando(true);
    const obtenerPostulacionesPorUsuario = async () => {
      let id = localStorage.getItem("id_trabajador_conectado")
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/postulaciones/ ${id}`, config);

        setPostulaciones(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPostulacionesPorUsuario();
    setCargando(false);
  }, [postulacion, auth]);


  useEffect(() => {

    const obtenerPostulacionesPorUsuarioFiltradas = async () => {
      let id = localStorage.getItem("id_trabajador_conectado")
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/postulaciones/filtradas/${id}`, config);
        console.log(data)
        setPostulacionesFiltradas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPostulacionesPorUsuarioFiltradas();

  }, [postulacion, auth]);



  const nuevaPostulacion = async (info) => {



    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/postulaciones",
        info,
        config
      );
      setPostulacion([...postulacion, data]);


    } catch (error) {
      console.log(error);
    }
  };



  const obtenerPostulacionesUsuario = async (id) => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/postulaciones/filtradas/${id}`, config);
      console.log(data)
      setPostulacionesUSuario(data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <PostulacionesContext.Provider
      value={{
        postulaciones,
        postulacion,
        cargandoDataCargos,
        postulacionesFiltradas,
        postulacionesUsuario,
        nuevaPostulacion,
        obtenerPostulacionesUsuario


      }}
    >
      {children}
    </PostulacionesContext.Provider>
  );
};

export { PostulacionesProvider };

export default PostulacionesContext;
