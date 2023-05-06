import useCargos from "../../hooks/useCargos";
import useOtrosDocumentos from "../../hooks/useOtrosDocumentos";
import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link, useParams } from "react-router-dom";
import swal from 'sweetalert'


const OtrosDocumentos = () => {
  const { cargos, obtenerCargos, cargo, cargandoDataCargos } =
    useCargos();
  const{otrosDocumentos, obtenerOtrosDocumentos, eliminarOtroDocumento} = useOtrosDocumentos();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const id = localStorage.getItem("id_trabajador");
    obtenerOtrosDocumentos(id)
  }, [])
  

  
 
  const id_trabajador = localStorage.getItem("id_trabajador");
  const [headers, setHeaders] = useState([
    {
      Header: "Nombre Documento",
      accessor: "nombreDocumento",
    },
    {
      Header: "Fecha de creación",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Documento",
      accessor: (originalRow, rowIndex) => (
        <div>
          <a
            className="text-blue-500 hover:text-blue-900 cursor-pointer underline"
             href={`${import.meta.env.VITE_BACKEND_URL}/${
                     originalRow.documento
                    }`}
            target="_blank"
          >
           Ver documento
          </a>
        </div>
      ),
     
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-4">
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(`/colaboradores/otros-documentos/${originalRow.id_trabajador}/editar-documento/${originalRow._id}`)
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
            className="text-red-400 hover:text-red-500"
            onClick={() => confirmDelete(originalRow._id)}
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
                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </button>
        </div>
      ),
    },
  ]);


  const confirmDelete = (id) => {
    swal({
        title: "Eliminar",
        text: "¿Estas seguro(a) que deseas eliminar este documento?",
        icon: "warning",
        buttons:["No", "Si"]
        }).then(respuesta =>{
            if(respuesta){
               eliminarOtroDocumento(id)
               swal({
                text: "El documento se ha borrado con éxito",
                icon:"success"
              })
            }
        }
        
          );
    
    
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Listado otros documentos
              </h1>
              <p className="text-sm text-gray-500 italic mt-2">Espacio reservado para subir documentos asociados a la actividad del trabajador. (Ej: Contratos, OtroSí, Llamados de atención, Descargos)</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={`/colaboradores/otros-documentos/${id_trabajador}/crear-documento`}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Documento nuevo
              </Link>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(otrosDocumentos) && otrosDocumentos.length > 0 ? (
        <Table data={otrosDocumentos} columns={headers} />
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
                No existen documentos cargados
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtrosDocumentos;
