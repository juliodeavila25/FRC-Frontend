import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequisitoContext = createContext();

const RequisitoProvider = ({ children }) => {
  const [requisitoBo, setRequisitoBo] = useState([]);
  const [requisitosBo, setRequisitosBo] = useState([]);
  const [requisitosBoForm, setRequisitosBoForm] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoDataRequisitosBo, setCargando] = useState(false);
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
    const obtenerRequisitosBo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/requisito-bo", config);

        setRequisitosBo(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRequisitosBo();
    setCargando(false);
  }, [auth]);

  const submitRequisitoBo = async (requisito) => {
    if (requisito.id) {
      await editarRequisitoBo(requisito);
    } else {
      await nuevoRequisitoBo(requisito);
    }
  };

  const editarRequisitoBo = async (requisito) => {
    console.log(requisito);
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
        `/requisito-bo/${requisito.id}`,
        requisito,
        config
      );

      const requisitosActualizados = requisitosBo.map((requisitoState) =>
        requisitoState._id === data._id ? data : requisitoState
      );
      setRequisitosBo(requisitosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Requisito actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/requisitos/listar-requisitos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoRequisitoBo = async (requisito) => {
    console.log(requisito)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/requisito-bo", requisito, config);

      setRequisitosBo([...requisitosBo, data]);

      setAlerta({
        msg: "Requisito creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/requisitos/listar-requisitos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerRequisitoBo = async (id) => {
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
      const { data } = await clienteAxios.get(`/requisito-bo/${id}`, config);
      console.log(data);
      setRequisitoBo(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <RequisitoContext.Provider
      value={{
        alerta,
        requisitoBo,
        requisitosBo,
        cargandoDataRequisitosBo,
        submitRequisitoBo,
        mostrarAlerta,
        obtenerRequisitoBo,
      }}
    >
      {children}
    </RequisitoContext.Provider>
  );
};

export { RequisitoProvider };

export default RequisitoContext;
