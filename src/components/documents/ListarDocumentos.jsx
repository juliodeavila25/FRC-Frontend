import useDocumentos from "../../hooks/useDocumentos";
import { useState } from "react";
import Table from "../table/Table";
import { BeatLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ListarDocumentosTotal = () => {
  const { documentos, obtenerDocumentos, documento } = useDocumentos();
  const navigate = useNavigate();

  const [headers, setHeaders] = useState([
    {
      Header: "Código",
      accessor: "codigo",
    },
    { Header: "Proceso", accessor: "proceso" },
    { Header: "Titulo", accessor: "titulo" },
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
              navigate(`/documentos/editar-documento/${originalRow._id}`)
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

  if (!documentos) return <BeatLoader color="#36d7b7" />;
  console.log(documentos);

  return (
    <Table
      data={documentos}
      columns={headers}
      title="Listado maestro de documentos"
      titleButton="Nuevo Documento"
      href={"/documentos/crear-documento"}
    />
  );
};

export default ListarDocumentosTotal;
