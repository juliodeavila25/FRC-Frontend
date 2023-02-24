import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DocumentosContext = createContext();

const DocumentosProvider = ({ children }) => {
  const [oferta, setOferta] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [documento, setDocumento] = useState([]);
  const [documentos, setDocumentos] = useState([]);
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
    const obtenerDocumentos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/documentos", config);
        setDocumentos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDocumentos();
  }, [auth]);

  const submitDocumento = async (documento) => {
    if (documento.id) {
      await editarDocumento(documento);
    } else {
      await nuevoDocumento(documento);
    }
  };

  const editarDocumento = async (documento) => {
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
        `/documentos/${documento.id}`,
        documento,
        config
      );

      const documentosActualizados = documentos.map((documentoState) =>
        documentoState._id === data._id ? data : documentoState
      );
      setDocumentos(documentosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Documento actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/documentos/listar-documentos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoDocumento = async (documento) => {
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
        "/documentos",
        documento,
        config
      );

      setDocumentos([...documentos, data]);

      setAlerta({
        msg: "Documento creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/documentos/listar-documentos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDocumento = async (id) => {
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
      const { data } = await clienteAxios.get(`/documentos/${id}`, config);
      console.log(data);
      setDocumento(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <DocumentosContext.Provider
      value={{
        alerta,
        documento,
        documentos,
        cargandoData,
        submitDocumento,
        mostrarAlerta,
        editarDocumento,
        obtenerDocumento,
      }}
    >
      {children}
    </DocumentosContext.Provider>
  );
};

export { DocumentosProvider };

export default DocumentosContext;
