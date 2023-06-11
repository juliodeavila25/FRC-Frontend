import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OfertasContext = createContext();

const OfertasProvider = ({ children }) => {
  const [oferta, setOferta] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [postulantes, setPostulantes] = useState([])
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
    setCargando(true);
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
    setCargando(false);
  }, [auth]);



  const obtenerPostulantesPorOferta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`ofertas/postulantes-ofertas/${id}`, config);
      console.log(data)
      setPostulantes(data);
    } catch (error) {
      console.log(error);
    }
  };





  const submitOferta = async (oferta) => {
    if (oferta.id) {
      await editarOferta(oferta);
    } else {
      await nuevaOferta(oferta);
    }
  };

  const editarOferta = async (oferta) => {
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
        `/ofertas/${oferta.id}`,
        oferta,
        config
      );

      console.log(ofertas);
      console.log(data);

      const ofertasActualizados = ofertas.map((ofertaState) =>
        ofertaState._id === data._id ? data : ofertaState
      );
      setOfertas(ofertasActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Oferta actualizada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/recursos-humanos/listar-convocatorias");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaOferta = async (oferta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/ofertas", oferta, config);

      setOfertas([...ofertas, data]);

      setAlerta({
        msg: "Oferta creada correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/recursos-humanos/listar-convocatorias");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerOferta = async (id) => {
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
      const { data } = await clienteAxios.get(`/ofertas/${id}`, config);
      console.log(data);
      setOferta(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <OfertasContext.Provider
      value={{
        alerta,
        ofertas,
        oferta,
        cargandoData,
        postulantes,
        submitOferta,
        mostrarAlerta,
        obtenerOferta,
        editarOferta,
        obtenerPostulantesPorOferta
      }}
    >
      {children}
    </OfertasContext.Provider>
  );
};

export { OfertasProvider };

export default OfertasContext;
