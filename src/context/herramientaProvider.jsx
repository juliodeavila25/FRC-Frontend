import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HerramientaContext = createContext();

const HerramientaProvider = ({ children }) => {
  const [herramienta, setHerramienta] = useState([]);
  const [herramientas, setHerramientas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoDataHerramienta, setCargando] = useState(false);
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
    const obtenerHerramientas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/herramienta", config);
        console.log(data)

        setHerramientas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHerramientas();
    setCargando(false);
  }, [auth]);

  const submitHerramienta = async (herramienta) => {
    if (herramienta.id) {
      await editarHerramienta(herramienta);
    } else {
      await nuevaHerramienta(herramienta);
    }
  };

  const editarHerramienta = async (herramienta) => {
    console.log(herramienta);
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
        `/herramienta/${herramienta.id}`,
        herramienta,
        config
      );

      const herramientasActualizados = herramientas.map((herramientaState) =>
        herramientaState._id === data._id ? data : herramientaState
      );
      setHerramientas(herramientasActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Herramienta actualizada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/herramientas/listar-herramientas");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaHerramienta = async (herramienta) => {
    console.log(herramienta)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/herramienta", herramienta, config);

      setHerramientas([...herramientas, data]);

      setAlerta({
        msg: "Herramienta creada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/herramientas/listar-herramientas");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHerramienta = async (id) => {
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
      const { data } = await clienteAxios.get(`/herramienta/${id}`, config);
      console.log(data);
      setHerramienta(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <HerramientaContext.Provider
      value={{
        alerta,
        herramienta,
        herramientas,
        cargandoDataHerramienta,
        submitHerramienta,
        mostrarAlerta,
        obtenerHerramienta,
      }}
    >
      {children}
    </HerramientaContext.Provider>
  );
};

export { HerramientaProvider };

export default HerramientaContext;
