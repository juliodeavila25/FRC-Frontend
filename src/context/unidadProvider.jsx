import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UnidadContext = createContext();

const UnidadProvider = ({ children }) => {
  const [unidad, setUnidad] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [unidadesForm, setUnidadesForm] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoDataUnidades, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  useEffect(() => {
    setCargando(true);
    const obtenerUnidades = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/unidad", config);

        setUnidades(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUnidades();
    setUnidades(false);
  }, [auth]);


  const submitUnidad = async (unidad) => {
    if (unidad.id) {
      await editarUnidad(unidad);
    } else {
      await nuevaUnidad(unidad);
    }
  };

  const editarUnidad = async (unidad) => {
    console.log(unidad)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/unidad/${unidad.id}`,
        unidad,
        config
      );

      const unidadActualizados = unidades.map((unidadState) =>
      unidadState._id === data._id ? data : unidadState
      );
      setUnidades(unidadActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Unidad actualizada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/unidades-negocio/listar-unidades-negocio");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaUnidad = async (unidad) => {
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
        "/unidad",
        unidad,
        config
      );

      setUnidades([...unidades, data]);

      setAlerta({
        msg: "Unidad creada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/unidades-negocio/listar-unidades-negocio");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUnidad = async (id) => {
    setCargando(true);
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(`/unidad/${id}`, config);
      console.log(data);
      setUnidad(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };


  const obtenerUnidadesForm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/unidad", config);

      setUnidadesForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UnidadContext.Provider
      value={{
        alerta,
        unidad,
        unidades,
        unidadesForm,
        cargandoDataUnidades,
        submitUnidad,
        mostrarAlerta,
        obtenerUnidad,
        obtenerUnidadesForm

      }}
    >
      {children}
    </UnidadContext.Provider>
  );
};

export {UnidadProvider};

export default UnidadContext;
