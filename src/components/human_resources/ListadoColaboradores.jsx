import useCollaborators from "../../hooks/useCollaborators";
import useOtrosDocumentos from "../../hooks/useOtrosDocumentos";
import { useState } from "react";
import Table from "../table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const ListadoColaboradores = () => {
  const { obtenerCurriculums, collaborators } = useCollaborators();
  const {obtenerOtrosDocumentos} = useOtrosDocumentos()
  const navigate = useNavigate();


  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    obtenerCurriculums()
  }, [])
  
   
    const redireccionar = (id) =>{
      localStorage.setItem("id_trabajador", id);
      obtenerOtrosDocumentos(id)
      navigate(
                  `/colaboradores/otros-documentos/${id}`
                )

  }


  const [headers, setHeaders] = useState([
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    { Header: "Documento", accessor: "numeroDocumento" },
    { Header: "Cargo", accessor: "cargo" },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(
                `/colaboradores/editar-colaborador/${originalRow._id}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() => redireccionar(originalRow._id) }
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                />
            </svg>
          </button>
        </div>
      ),
    },
  ]);


  return (
      <>
        <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5 ">
          <div className="mt-8 flex flex-col">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Listado de Colaboradores</h1>
              </div>
            </div>
          </div>
        </div>
  
        <div className="w-11/12 mx-auto mt-10">
  
          
              {Array.isArray(collaborators) && collaborators.length > 0 && collaborators.filter(collaborator => collaborator.creador?.userType[0] === "colaborador").length > 0 ? (
                <>
                  <Table
                    data={collaborators.filter(collaborator => collaborator.creador?.userType[0] === "colaborador")}
                    columns={headers}
                  />
                </>
              ) : (
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex ">
                      <p className="text-sm text-blue-700">
                        No existen colaboradores registrados
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
      </>
    );
    
};

export default ListadoColaboradores;
