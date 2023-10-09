import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreguntaContext = createContext();

const PreguntaProvider = ({ children }) => {
  const [pregunta, setPregunta] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoDataPregunta, setCargando] = useState(false);
  const [modal, setModal] = useState({})
  const [loading, setLoading] = useState(false);
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
    const obtenerPreguntas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/pregunta", config);
        console.log(data)

        setPreguntas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPreguntas();
    setCargando(false);
  }, [auth]);

  const submitPregunta = async (pregunta) => {
    if (pregunta.id) {
      await editarPregunta(pregunta);
    } else {
      await nuevaPregunta(pregunta);
    }
  };

  const editarPregunta = async (pregunta) => {
    setLoading(true)
    console.log(pregunta);
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
        `/pregunta/${pregunta.id}`,
        pregunta,
        config
      );

      const preguntasActualizadas = preguntas.map((preguntaState) =>
        preguntaState._id === data._id ? data : preguntaState
      );
      setPreguntas(preguntasActualizadas);

      // //Mostrar alerta
      // setAlerta({
      //   msg: "Pregunta actualizada correctamente",
      //   error: false,
      // });

      // setTimeout(() => {
      //   setAlerta({});
      //   navigate("/preguntas/listar-preguntas");
      // }, 3000);
      setModal({
        message: "Pregunta actualizada exitosamente",
        error: false,
        link: '/preguntas/listar-preguntas'
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const nuevaPregunta = async (pregunta) => {
    console.log(pregunta)
    setLoading(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/pregunta", pregunta, config);

      setPreguntas([...preguntas, data]);

      setModal({
        message: "Pregunta guardada exitosamente",
        error: false,
        link: '/preguntas/listar-preguntas'
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const obtenerPregunta = async (id) => {
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
      const { data } = await clienteAxios.get(`/pregunta/${id}`, config);
      console.log(data);
      setPregunta(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <PreguntaContext.Provider
      value={{
        alerta,
        pregunta,
        preguntas,
        cargandoDataPregunta,
        loading,
        modal,
        submitPregunta,
        mostrarAlerta,
        obtenerPregunta,
      }}
    >
      {children}
    </PreguntaContext.Provider>
  );
};

export { PreguntaProvider };

export default PreguntaContext;
