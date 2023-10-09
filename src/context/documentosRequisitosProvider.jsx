import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DocumentosRequisitosContext = createContext();

const DocumentosRequisitosProvider = ({ children }) => {
  const [documentosRequisitos, setDocumentosRequisitos] = useState([]);
  const [documentosRequisitosUsuario, setDocumentosRequisitosUsuario] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [alertaDocumentosRequisitos, setAlerta] = useState({});
  const [cargandoDataDocumentos, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  console.log(auth)


  const obtenerRequisitosPorUsuario = async (id) => {
    setCargando(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/documentos-requisitos/${id}`, config);

      setDocumentosRequisitosUsuario(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };




  // const submitRequisitoBo = async (requisito) => {
  //   if (requisito.id) {
  //     await editarRequisitoBo(requisito);
  //   } else {
  //     await nuevoRequisitoBo(requisito);
  //   }
  // };

  const editarDocumentosRequisitos = async (requisito) => {
    const id = requisito.get("id");
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
        `/documentos-requisitos/${id}`,
        requisito,
        config
      );

      const requisitosActualizados = documentosRequisitos.map((requisitoState) =>
        requisitoState._id === data._id ? data : requisitoState
      );
      setDocumentosRequisitos(requisitosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Requisito actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/requisitos-cargos/listar-requisitos-cargos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevosDocumentosRequisitos = async (documentosRequisitos) => {
    setCargando(true);
    for (const value of documentosRequisitos.values()) {
      console.log(value);
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/documentos-requisitos", documentosRequisitos, config);

      setDocumentosRequisitos([...documentosRequisitos, data]);

      setAlerta({
        msg: "Requisitos creados correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const obtenerRequisitoCargo = async (id) => {
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
      const { data } = await clienteAxios.get(`/documentos-requisitos/documento/${id}`, config);
      console.log(data);
      setDocumentos(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <DocumentosRequisitosContext.Provider
      value={{
        alertaDocumentosRequisitos,
        documentosRequisitos,
        documentosRequisitosUsuario,
        documentos,
        cargandoDataDocumentos,
        nuevosDocumentosRequisitos,
        mostrarAlerta,
        obtenerRequisitoCargo,
        editarDocumentosRequisitos,
        obtenerRequisitosPorUsuario

      }}
    >
      {children}
    </DocumentosRequisitosContext.Provider>
  );
};

export { DocumentosRequisitosProvider };

export default DocumentosRequisitosContext;
