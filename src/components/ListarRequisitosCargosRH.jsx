import useDocumentosRequisitos from "../hooks/useDocumentosRequisitos";
import { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate, Link, } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ModalRequisitosCargos from './ModalRequisitosCargos'

const ListarRequisitosCargosRH = ({ id }) => {
  const { documentosRequisitosUsuario, obtenerRequisitosPorUsuario, cargandoDataDocumentos } =
    useDocumentosRequisitos();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [visible, setVisible] = useState(false);
  const [infoRequisitos, setInfoRequisitos] = useState("")

  useEffect(() => {
    obtenerRequisitosPorUsuario(id)
  }, [id])

  //console.log(documentosRequisitosUsuario)

  const [headers, setHeaders] = useState([
    {
      Header: "Nombre requisito",
      accessor: "nombreRequisito",
    },
    {
      Header: "Documento",
      accessor: (originalRow, rowIndex) => (
        <div>
          <a
            className="text-blue-500 hover:text-blue-900 cursor-pointer underline"
            href={`${import.meta.env.VITE_BACKEND_URL}/${originalRow.documento
              }`}
            target="_blank"
          >
            Ver documento
          </a>
        </div>
      ),
    },

    {
      Header: "Fecha de creación",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Vencimiento(dias)",
      accessor: "fechaVigencia",
      Cell: ({ value }) => {
        //console.log(value)
        var fechaActual = new Date();
        var otraFecha = new Date(value);
        var diferenciaEnMilisegundos = otraFecha - fechaActual;
        var diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        if (isNaN(diferenciaEnDias)) {
          return (<span>N/A</span>)
        } else {
          if (Math.round(diferenciaEnDias) <= 90) {
            return (<div className="text-red-500 lowercase">{Math.round(diferenciaEnDias)} días</div>)
          } else {
            return (<div className="lowercase">{Math.round(diferenciaEnDias)}  días</div>)
          }

        }

      },
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div>
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={(e) => infoModal(e, originalRow)}
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

  const setShowModal = (e) => {
    setVisible(false);


  };


  const infoModal = (e, data) => {
    e.preventDefault();
    setInfoRequisitos(data)
    setVisible(true);
  };



  if (cargandoDataDocumentos) return <BeatLoader color="#36d7b7" />;


  return (
    <>
      {visible === true && (
        <ModalRequisitosCargos
          setShowModal={setShowModal}
          infoRequisitos={infoRequisitos}

        />
      )}
      <div className="mt-5 mb-5">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 border-b-4 border-corporative-blue inline-flex">
                Listado de requisitos para cargos
              </h1>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(documentosRequisitosUsuario) && documentosRequisitosUsuario.length > 0 ? (
        <Table data={documentosRequisitosUsuario} columns={headers} />
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
                No existen requisitos registrados
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListarRequisitosCargosRH;
