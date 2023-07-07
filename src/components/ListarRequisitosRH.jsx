import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import clienteAxios from "../config/clienteAxios";
import TableCurriculum from "./table/TableCurriculum";
import ModalCurriculum from "./ModalCurriculum";
import { useLocation, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";



export default function ListarRequisitosRH(props) {

  const { data, editModal } = props


  const [headers, setHeaders] = useState([
    {
      Header: "Nombre Requisito",
      accessor: "nombreRequisito"
    },
    { Header: "Fecha Vigencia", accessor: "fechaVigencia" },
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
      Header: "Observaciones",
      accessor: "observaciones",
    }
  ]);




  if (!data) return <BeatLoader color="#36d7b7" />;


  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        <>
          <div className="">
            <TableCurriculum data={data} columns={headers} />
          </div>
        </>
      ) : null}

    </>
  );
}
