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
      console.log(data);
      setCollaborator(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  return (
    <CollaboratorsContext.Provider
      value={{
        alerta,
        collaborators,
        collaborator,
        cargandoDatos,
        obtenerCurriculums,
        obtenerCurriculumRH,
        mostrarAlerta
      }}
    >
      {children}
    </CollaboratorsContext.Provider>
  );
};

export { CollaboratorsProvider };

export default CollaboratorsContext;
