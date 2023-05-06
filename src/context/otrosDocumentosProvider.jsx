import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OtrosDocumentosContext = createContext();

const OtrosDocumentosProvider = ({ children }) => {
  const [otroDocumento, setOtroDocumento] = useState([]);
  const [otrosDocumentos, setOtrosDocumentos] = useState([]);
  const[cargandoDocumento, setCargando] = useState(false)
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  // useEffect(() => {
  //   setCargando(true);
  //   const obtenerCargos = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const { data } = await clienteAxios("/cargos", config);
       
  //       setCargos(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   obtenerCargos();
  //   setCargando(false);
  // }, [auth]);

   const obtenerOtrosDocumentos = async (id) => {
   
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/otros-documentos/ ${id}`, config);
        console.log(data)
        setOtrosDocumentos(data);
      } catch (error) {
        console.log(error);
      }
    };


  const submitOtrosDocumentos = async (documento, id) => {
    if (id) {
      await editarOtroDocumento(documento);
    } else {
       await nuevoOtroDocumento(documento);
    }
  };

  const editarOtroDocumento= async (documento) => {
    const id = documento.get("id");
    const id_trabajador = documento.get("id_trabajador")
    
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
        `/otros-documentos/${id}`,
        documento,
        config
      );

      const documentosActualizados = otrosDocumentos.map((otroDocumentoState) =>
        otroDocumentoState._id === data._id ? data : otroDocumentoState
      );
      setOtroDocumento(documentosActualizados);

      //Mostrar alerta
      setAlerta({
        msg: "Documento actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate(`/colaboradores/otros-documentos/${id_trabajador}`);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoOtroDocumento = async (documento) => {
    const id_trabajador = documento.get("id_trabajador")
    // console.log(documento);
    // for (const value of documento.values()) {
    //   console.log(value);
    // }
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
        "/otros-documentos",
        documento,
        config
      );

      setAlerta({
        msg: "Documento creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate(`/colaboradores/otros-documentos/${id_trabajador}`);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerOtroDocumento = async (id) => {
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
      const { data } = await clienteAxios.get(`/otros-documentos/obtener-otro-documento/${id}`, config);
      console.log(data);
      setOtroDocumento(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  const eliminarOtroDocumento = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(`/otros-documentos/${id}`, config);

      //Sincronizar el state
      const documentosActualizados = otrosDocumentos.filter(
        (otroDocumentoState) => otroDocumentoState._id !== id
      );

      console.log(documentosActualizados)

      setOtrosDocumentos(documentosActualizados);
     
    } catch (error) {
      console.log(error);
    }
  };


   
  return (
    <OtrosDocumentosContext.Provider
      value={{
        alerta,
        otroDocumento,
        otrosDocumentos,
        cargandoDocumento,
        submitOtrosDocumentos,
        mostrarAlerta,
        obtenerOtrosDocumentos,
        obtenerOtroDocumento,
        eliminarOtroDocumento
      }}
    >
      {children}
    </OtrosDocumentosContext.Provider>
  );
};

export { OtrosDocumentosProvider };

export default OtrosDocumentosContext;
