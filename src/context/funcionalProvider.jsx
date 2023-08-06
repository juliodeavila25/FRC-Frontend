import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const FuncionalContext = createContext();

const FuncionalProvider = ({ children }) => {
  const [funcional, setFuncional] = useState([]);
  const [funcionales, setFuncionales] = useState([]);
  const [funcionalesForm, setFuncionalesForm] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoDataFuncionales, setCargando] = useState(false);
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
    const obtenerFuncionales = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/funcional", config);

        setFuncionales(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerFuncionales();
    setCargando(false);
  }, [auth]);


  const submitFuncional = async (funcional) => {
    if (funcional.id) {
      await editarFuncional(funcional);
    } else {
      await nuevoFuncional(funcional);
    }
  };

  const editarFuncional = async (funcional) => {
    console.log(funcional)
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
        `/funcional/${funcional.id}`,
        funcional,
        config
      );

      const funcionalActualizados = funcionales.map((funcionalState) =>
      funcionalState._id === data._id ? data : funcionalState
      );
      setFuncionales(funcionalActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Unidad funcional actualizado correctamente",
        error: false,
      });
 
      setTimeout(() => {
        setAlerta({});
        navigate("/unidades-funcionales/listar-unidades-funcionales");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoFuncional = async (funcional) => {
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
        "/funcional",
        funcional,
        config
      );

      setFuncionales([...funcionales, data]);

      setAlerta({
        msg: "Unidad funcional creada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/unidades-funcionales/listar-unidades-funcionales");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUnidadFuncional = async (id) => {
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
      const { data } = await clienteAxios.get(`/funcional/${id}`, config);
      console.log(data);
      setFuncional(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };


  const obtenerFuncionalesForm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/funcional", config);

      setFuncionalesForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FuncionalContext.Provider
      value={{
        alerta,
        funcional,
        funcionales,
        funcionalesForm,
        cargandoDataFuncionales,
        submitFuncional,
        mostrarAlerta,
        obtenerUnidadFuncional,
        obtenerFuncionalesForm

      }}
    >
      {children}
    </FuncionalContext.Provider>
  );
};

export {FuncionalProvider};

export default FuncionalContext;
