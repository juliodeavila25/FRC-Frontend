import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CargosContext = createContext();

const CargosProvider = ({ children }) => {
  const [cargo, setCargo] = useState([]);
  const [cargos, setCargos] = useState([]);
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

  useEffect(() => {
    const obtenerCargos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/cargos", config);
        setCargos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCargos();
  }, [auth]);

  const submitCargo = async (cargo) => {
    if (cargo.id) {
      await editarCargo(cargo);
    } else {
      await nuevoCargo(cargo);
    }
  };

  const editarCargo= async (cargo) => {
    console.log(cargo)
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
        `/cargos/${cargo.id}`,
        cargo,
        config
      );

      const cargosActualizados = cargos.map((cargoState) =>
        cargoState._id === data._id ? data : cargoState
      );
      setCargos(cargosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Cargo actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/cargos/listar-cargos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoCargo = async (cargo) => {
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
        "/cargos",
        cargo,
        config
      );

      setCargos([...cargos, data]);

      setAlerta({
        msg: "Cargo creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/cargos/listar-cargos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCargo = async (id) => {
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
      const { data } = await clienteAxios.get(`/cargos/${id}`, config);
      console.log(data);
      setCargo(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <CargosContext.Provider
      value={{
        alerta,
        cargo,
        cargos,
        cargandoData,
        submitCargo,
        mostrarAlerta,
        obtenerCargo
       
      }}
    >
      {children}
    </CargosContext.Provider>
  );
};

export { CargosProvider };

export default CargosContext;
