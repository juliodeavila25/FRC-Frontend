import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CurriculumContext = createContext();

const CurriculumProvider = ({ children }) => {
  const [curriculum, setCurriculum] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargandoData, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitCurriculum = async (curriculum) => {
    if (curriculum.estado == true) {
      await editarCurriculum(curriculum);
    } else {
      await nuevoCurriculum(curriculum);
    }
  };

  const editarCurriculum = async (curriculum) => {
    console.log(curriculum);
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
        `/curriculum/${curriculum.id}`,
        curriculum,
        config
      );

      //Mostrar alerta
      setAlerta({
        msg: "Curriculum actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoCurriculum = async (curriculum) => {
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
        "/curriculum",
        curriculum,
        config
      );

      setAlerta({
        msg: "Curriculum creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCurriculum = async (id) => {
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
      const { data } = await clienteAxios.get(`/curriculum/${id}`, config);
      console.log(data);
      setCurriculum(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <CurriculumContext.Provider
      value={{
        alerta,
        curriculum,
        cargandoData,
        submitCurriculum,
        mostrarAlerta,
        obtenerCurriculum,
        editarCurriculum,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export { CurriculumProvider };

export default CurriculumContext;
