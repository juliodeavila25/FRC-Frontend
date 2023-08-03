import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CollaboratorsContext = createContext();

const CollaboratorsProvider = ({ children }) => {
  const [collaborators, setCollaborators] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargandoDatos, setCargando] = useState(false);
  const [loading, setLoading] = useState(false)
  const[modal, setModal]=useState({})
  const navigate = useNavigate();
  const { auth } = useAuth();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  useEffect(() => {
  
  
  }, []);

  const obtenerCurriculums = async () => {
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
      const { data } = await clienteAxios.get("/colaboradores", config);
      console.log(data)
      setCollaborators(data);
      
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const obtenerCurriculumRH = async (id) => {
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
      const { data } = await clienteAxios.get(`/colaboradores/editar-colaborador/${id}`, config);
      //console.log(data);
      setCollaborator(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

   const editarCurriculumRH = async (curriculum) => {
    setLoading(true)
    const id = curriculum.get("id");
    console.log("ID:", id)
    // for (const value of curriculum.values()) {
    //   console.log(value);
    // }
    // console.log(curriculum);
    /*for (const value of curriculum.values()) {
      console.log(value);
    }*/
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
        `/colaboradores/editar-colaborador/${id}`,
        curriculum,
        config
      );

      //Mostrar modal
     
      setModal({
        message: "Hoja de vida actualizada exitosamente",
        error: false,
      });

     
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  return (
    <CollaboratorsContext.Provider
      value={{
        alerta,
        collaborators,
        collaborator,
        cargandoDatos,
        loading,
        modal,
        obtenerCurriculums,
        obtenerCurriculumRH,
        editarCurriculumRH,
        mostrarAlerta
      }}
    >
      {children}
    </CollaboratorsContext.Provider>
  );
};

export { CollaboratorsProvider };

export default CollaboratorsContext;
