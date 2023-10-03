import usePregunta from "../../hooks/usePregunta";
import { useState, useEffect } from "react";
import Table from "../table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import useCargos from "../../hooks/useCargos";

const ListarPreguntas = () => {
  const { preguntas } =
    usePregunta();
  const navigate = useNavigate();

  const { obtenerCargosForm, cargosForm, cargandoDataForm } = useCargos();

  console.log(preguntas)




  const [headers, setHeaders] = useState([
    {
      Header: "Categoría",
      accessor: "categoria",
    },
    {
      Header: "Prgunta",
      accessor: "textoPreguntas",
    },
    {
      Header: "Respuesta",
      accessor: "respuestaPreguntas",
    },
    {
      Header: "Cargo",
      accessor: "cargo",
      Cell: (row) => (
        <div className="">
          {row.value === "todos" ?
            <p>Todos los cargos</p> :
            <p>{Array.isArray(cargosForm) && cargosForm.length > 0 && cargosForm?.filter(item => item._id === row.value)[0]?.nombre}</p>
          }


        </div>
      )
    },

    {
      Header: "Fuente",
      accessor: "fuente",
    },

    {
      Header: "Fecha de creación",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div>
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(`/preguntas/editar-pregunta/${originalRow._id}`)
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
        </div>
      ),
    },
  ]);




  if (cargandoDataForm) return <BeatLoader color="#36d7b7" />;


  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Listado maestro de preguntas para cargos
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to="/preguntas/crear-pregunta"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Nueva Pregunta
              </Link>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(preguntas) && preguntas.length > 0 ? (
        <Table data={preguntas} columns={headers} />
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
                No existen preguntas registradas
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListarPreguntas;