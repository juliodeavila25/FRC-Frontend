import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import clienteAxios from "../config/clienteAxios";
import TableCurriculum from "../components/table/TableCurriculum";
import ModalCurriculum from "../components/ModalCurriculum";
import {  useLocation, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";



export default function ListarRequisitos(props) {

  const {data, editModal} = props

 
  const [headers, setHeaders] = useState([
    {
      Header: "Nombre Requisito",
      accessor: "nombreRequisito"
    },
    { Header: "Fecha Vigencia", accessor: "fechaVigencia"},
    { Header: "Documento", 
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
       Header: "Observaciones",
      accessor: "observaciones",
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2 items-center " >
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={(e) => editModal(e, originalRow)}
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

 
 

  if (!data) return <BeatLoader color="#36d7b7" />;

 
  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
            <>
               <div className="">
                <TableCurriculum data={data} columns={headers} />
               </div>
            </>
            ): null}
         
    </>
  );
}
