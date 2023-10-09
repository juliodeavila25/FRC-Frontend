import useOfertas from "../../hooks/useOfertas";
import { useState } from "react";
import Table from "../table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import useCargos from "../../hooks/useCargos";
import { useEffect } from "react";

const ListarOfertas = () => {
  const { ofertas, obtenerOferta, oferta } = useOfertas();
  const [activas, setActivas] = useState([])
  const [pausadas, setPausadas] = useState([])
  const [inactivas, setInactivas] = useState([])

  const { obtenerCargosForm, cargosForm, cargandoDataForm } = useCargos();

  console.log(ofertas)

  localStorage.setItem("codigo_oferta", ofertas[0]?.convocatoria);

  const navigate = useNavigate();

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = (originalRow) => {
    localStorage.setItem("id_oferta", originalRow._id)
    navigate(
      `/recursos-humanos/convocatoria/${originalRow._id}/postulantes/${originalRow.nombre}`
    )
  }




  const [headers, setHeaders] = useState([
    {
      Header: "Nro. Convocatoria",
      accessor: "convocatoria",
    },
    {
      Header: "Cargo",
      accessor: "nombre",
      Cell: (row) => (
        <div className="">
          {console.log(Array.isArray(cargosForm) && cargosForm.length > 0 && cargosForm?.filter(item => item._id === row.value)[0]?.nombre)}
          <p>{Array.isArray(cargosForm) && cargosForm.length > 0 && cargosForm?.filter(item => item._id === row.value)[0]?.nombre}</p>
        </div>
      )
    },


    { Header: "Ciudad", accessor: "ciudad" },
    {
      Header: "Fecha de inicio",
      accessor: "fechaInicio",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Fecha de finalización",
      accessor: "fechaFin",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(
                `/recursos-humanos/editar-convocatoria/${originalRow._id}`
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
            onClick={() =>
              handleClick(originalRow)
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>

          </button>
        </div>
      ),
    },
  ]);



  if (cargandoDataForm) return <BeatLoader color="#36d7b7" />;


  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5 ">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Listado de ofertas</h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to="/recursos-humanos/crear-convocatoria"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Nueva oferta de empleo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-10">
        <div className="flex justify-between bg-gray-100 rounded-t-lg">
          <button
            className={toggleState === 1 ? 'border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'}
            onClick={() => toggleTab(1)}
          >
            Activas
          </button>
          <button
            className={toggleState === 2 ? 'border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'}
            onClick={() => toggleTab(2)}
          >
            Pausadas
          </button>
          <button
            className={toggleState === 3 ? 'border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'}
            onClick={() => toggleTab(3)}
          >
            Inactivas
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"}
          >
            {Array.isArray(ofertas) && ofertas.length > 0 && ofertas.filter(oferta => oferta.estadoConvocatoria === "Activa").length > 0 ? (
              <>
                <Table
                  data={ofertas.filter(oferta => oferta.estadoConvocatoria === "Activa")}
                  columns={headers}
                  title="Ofertas"
                  titleButton="Nueva oferta de empleo"
                  href={"/recursos-humanos/crear-convocatoria"}
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
                      No existen ofertas activas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            {Array.isArray(ofertas) && ofertas.length > 0 && ofertas.filter(oferta => oferta.estadoConvocatoria === "Pausada").length > 0 ? (
              <>
                <Table
                  data={ofertas.filter(oferta => oferta.estadoConvocatoria === "Pausada")}
                  columns={headers}
                  title="Ofertas"
                  titleButton="Nueva oferta de empleo"
                  href={"/recursos-humanos/crear-convocatoria"}
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
                      No existen ofertas pausadas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
            {Array.isArray(ofertas) && ofertas.length > 0 && ofertas.filter(oferta => oferta.estadoConvocatoria === "Inactiva").length > 0 ? (
              <>
                <Table
                  data={ofertas.filter(oferta => oferta.estadoConvocatoria === "Inactiva")}
                  columns={headers}
                  title="Ofertas"
                  titleButton="Nueva oferta de empleo"
                  href={"/recursos-humanos/crear-convocatoria"}
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
                      No existen ofertas inactivas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListarOfertas;
