import useDocumentos from "../../hooks/useDocumentos";
import { useState, useEffect } from "react";
import Table from "../table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link, useParams } from "react-router-dom";


const ListarVersiones = () => {
   const params = useParams();
  const { obtenerDocumento, cargandoData, documento } = useDocumentos();

  console.log(params.id);
  useEffect(() => {
    obtenerDocumento(params.id);
  }, []);

 
  const navigate = useNavigate();
  const [headers, setHeaders] = useState([
    {
      Header: "Version",
      accessor: "version",
    },
    { Header: "Url", accessor: "url" },
    { Header: "Observaciones", accessor: "observaciones" },
    {
      Header: "Estado",
      accessor: "estado",
     
    },
  ]);

   if (cargandoData) return <BeatLoader color="#36d7b7" />;

   console.log(documento)
 

  return (
     <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Listado de versiones
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={`/documentos/editar-documento/${documento._id}`}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Regresar
              </Link>
            </div>
          </div>
        </div>
      </div>
      {Object.keys(documento).length !== 0 && documento ? (
        <Table data={documento.inputVersiones} columns={headers} />
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
  )
}

export default ListarVersiones