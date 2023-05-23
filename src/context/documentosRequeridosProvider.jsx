import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DocumentosRequueridosContext = createContext();

const DocumentosRequeridosProvider = ({ children }) => {
  const [documentosRequeridos, setDocumentosRequeridos] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargandoRequerido, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  
 
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitDocumentosRequeridos = async (documento, estado) => {
    if (estado == true) {
      await editarDocumentoRequerido(documento);
    } else {
      await nuevoDocumentoRequerido(documento);
    }
  };

  const editarDocumentoRequerido = async (documento) => {
   
    const id = documento.get("id");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/requisitos/${id}`,
        documento,
        config
      );

      const documentosActualizados = documentosRequeridos.map((ofertaState) =>
        ofertaState._id === data._id ? data : ofertaState
      );
      setDocumentosRequeridos(documentosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Documento actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);


     
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoDocumentoRequerido = async (documento) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/requisitos",
        documento,
        config
      );

       setDocumentosRequeridos([...documentosRequeridos, data]);

      setAlerta({
        msg: "Documento creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);

     
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDocumentosRequeridos= async (id) => {
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
      const { data } = await clienteAxios.get(`/requisitos/${id}`, config);
      // console.log(data);
      setDocumentosRequeridos(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <DocumentosRequueridosContext.Provider
      value={{
        alerta,
        cargandoRequerido,
        documentosRequeridos,
        submitDocumentosRequeridos,
        mostrarAlerta,
        obtenerDocumentosRequeridos
      }}
    >
      {children}
    </DocumentosRequueridosContext.Provider>
  );
};

export { DocumentosRequeridosProvider };

export default DocumentosRequueridosContext;
