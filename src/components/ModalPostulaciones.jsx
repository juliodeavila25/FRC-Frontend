import { useState, useEffect, useRef } from "react";
import useEstadoPostulaciones from "../hooks/useEstadoPostulaciones";
import usePostulaciones from "../hooks/usePostulaciones";
import Alert from "./Alert";
import moment from 'moment'
import TableWithoutSearch from "./table/TableWithoutSearch";
import { FcDataProtection } from "react-icons/fc";


export default function ModalPublic({ setShowModal, data }) {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  const [estadoPostulacion, setEstadoPostulacion] = useState("elegir")


  /* Error en el campo de estado de postulación*/
  const inputRefEstadoPostulacion = useRef(null);
  const [errorEstadoPostulacion, setErrorEstadoPostulacion] = useState(false)

  const [fechaRevisionPostulacion, setFechaRevisionPostulacion] = useState(moment(date).format('YYYY-MM-DD'))
  const [fechaSistemaPostulacion, setFechaSistemaPostulacion] = useState(moment(date).format('YYYY-MM-DD'))
  const [observacionesPostulacion, setObservacionesPostulacion] = useState("")
  const [documentacionPostulacion, setDocumentacionPostulacion] = useState("");
  const [errorDocumentacionPostulacion, setErrorDocumentacionPostulacion] = useState(false);

  const { nuevoEstadoPostulacionModal, alertaPostulacion, obtenerEstadoPostulacionesPorUsuario, estadosPostulaciones } = useEstadoPostulaciones();
  const { obtenerPostulacionesUsuario, postulacionesUsuario } = usePostulaciones();

  useEffect(() => {
    obtenerPostulacionesUsuario(data.creador)
  }, [])

  useEffect(() => {
    if (Array.isArray(postulacionesUsuario) && postulacionesUsuario.length > 0) {
      console.log("Hola")
      const id_oferta = localStorage.getItem("id_oferta");
      const idPostulacionUsuario = postulacionesUsuario.filter(item => item.idOferta === id_oferta)
      obtenerEstadoPostulacionesPorUsuario(idPostulacionUsuario[0]._id)
    }

  }, [postulacionesUsuario])


  const [headers, setHeaders] = useState([
    {
      Header: "Estado",
      accessor: "estadoPostulacion",
    },
    {
      Header: "Fecha Revisión",
      accessor: "fechaRevisionPostulacion",
    },
    {
      Header: "Fecha Sistema",
      accessor: "fechaSistemaPostulacion",
    },
    {
      Header: "Observaciones",
      accessor: "observacionesPostulacion",
    },
    {
      Header: "Documentación",

      accessor: (originalRow, rowIndex) => (
        <div>
          {originalRow.documentacionPostulacion !== "" ? (
            <a
              className="text-blue-500 hover:text-blue-900 cursor-pointer underline"
              href={`${import.meta.env.VITE_BACKEND_URL}/${originalRow.documentacionPostulacion
                }`}
              target="_blank"
            >
              Ver documento
            </a>
          ) : <p>No existe documento cargado</p>}


        </div>
      ),
    },

  ]);




  const submitData = async (e) => {
    e.preventDefault();
    const id_oferta = localStorage.getItem("id_oferta");


    if (estadoPostulacion === "elegir") {
      inputRefEstadoPostulacion.current.focus()
      setErrorEstadoPostulacion(true)
      return;
    } else {
      setErrorEstadoPostulacion(false)
    }


    const formData = new FormData();

    const idPostulacionUsuario = postulacionesUsuario.filter(item => item.idOferta === id_oferta)

    formData.append("idPostulacion", idPostulacionUsuario[0]._id);
    formData.append("estadoPostulacion", estadoPostulacion);
    formData.append("fechaRevisionPostulacion", fechaRevisionPostulacion);
    formData.append("fechaSistemaPostulacion", fechaSistemaPostulacion);
    formData.append("observacionesPostulacion", observacionesPostulacion);
    formData.append("documentacionPostulacion", documentacionPostulacion);

    await nuevoEstadoPostulacionModal(formData);

    setTimeout(() => {
      setShowModal(false)
    }, 2000);
  };



  const { msg } = alertaPostulacion;

  const handleDocumentacionPostulacion = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorDocumentacionPostulacion(true);
      setDocumentacionPostulacion(" ");
    } else {
      setErrorDocumentacionPostulacion(false);
      setDocumentacionPostulacion(data);
    }
  };


  return (
    <>
      <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 sm:w-4/5 my-6 mx-auto max-w-7xl">
          {/*content*/}
          <form
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onSubmit={submitData}
            encType="multipart/form-data"
          >
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
              <div className="mt-2 font-bold" > Proceso de selección</div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 p-8">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="estadoPostulacion"
                  name="estadoPostulacion"
                  className={errorEstadoPostulacion === false ?
                    "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :
                    "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  ref={inputRefEstadoPostulacion}
                  onChange={(e) => setEstadoPostulacion(e.target.value)}
                  value={estadoPostulacion}
                  required={true}


                >
                  <option value="elegir" disabled className="text-gray-400" >
                    --Selecciona un estado--
                  </option>
                  {data && data.estadoAplicacionOferta === "Postulado" &&
                    <>
                      <option value="Preseleccionado" >
                        Preseleccionado
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "Preseleccionado" &&
                    <>
                      <option value="Postulado" >
                        Postulado
                      </option>
                      <option value="Entrevista realizada" >
                        Entrevista realizada
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "Entrevista realizada" &&
                    <>
                      <option value="Preseleccionado" >
                        Preseleccionado
                      </option>
                      <option value="Exámenes Ocupacionales" >
                        Exámenes Ocupacionales
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "Exámenes Ocupacionales" &&
                    <>
                      <option value="Entrevista realizada" >
                        Entrevista realizada
                      </option>
                      <option value="Afiliaciones" >
                        Afiliaciones
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "Afiliaciones" &&
                    <>
                      <option value="Exámenes Ocupacionales" >
                        Exámenes Ocupacionales
                      </option>
                      <option value="Contratado" >
                        Contratado
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "Contratado" &&
                    <>
                      <option value="Afiliaciones" >
                        Afiliaciones
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
                    </>
                  }
                  {data && data.estadoAplicacionOferta === "No continúa" &&
                    <>
                      <option value="Postulado" >
                        Postulado
                      </option>
                      <option value="Preseleccionado" >
                        Preseleccionado
                      </option>
                      <option value="Entrevista realizada" >
                        Entrevista realizada
                      </option>
                      <option value="Exámenes Ocupacionales" >
                        Exámenes Ocupacionales
                      </option>
                      <option value="Afiliaciones" >
                        Afiliaciones
                      </option>
                      <option value="Contratado" >
                        Contratado
                      </option>

                    </>
                  }
                </select>
                {errorEstadoPostulacion === true && <span className="text-red-500 text-xs">Seleccione la información requerida</span>}
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha revisión del proceso
                </label>
                <input
                  type="date"
                  id="fechaRevisionPostulacion"
                  name="fechaRevisionPostulacion"
                  value={fechaRevisionPostulacion}
                  onChange={(e) => setFechaRevisionPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

                />

              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha sistema
                </label>
                <input
                  type="date"
                  id="fechaSistemaPostulacion"
                  name="fechaSistemaPostulacion"
                  value={fechaSistemaPostulacion}
                  onChange={(e) => setFechaSistemaPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  disabled={true}
                />

              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  id="observacionesPostulacion"
                  name="observacionesPostulacion"
                  placeholder="Observaciones"
                  value={observacionesPostulacion}
                  onChange={(e) => setObservacionesPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

                />

              </div>

              <div>
                <label
                  htmlFor="documentacionPostulacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documentación
                </label>
                <div className="mt-1">
                  <input
                    className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    name="documentacionPostulacion"
                    id="documentacionPostulacion"
                    onChange={(e) => handleDocumentacionPostulacion(e.target.files[0])}
                    accept=".pdf"

                  />
                </div>
                {errorDocumentacionPostulacion === true && (
                  <span className="text-red-500 text-xs">
                    El tamaño máximo es 500kb
                  </span>
                )}

              </div>
            </div>
            {Array.isArray(estadosPostulaciones) && estadosPostulaciones.length > 0 ? (
              <>
                <div className="block text-lg  italic font-medium text-blue-700 ml-8 flex space-x-2 items-center">
                  <FcDataProtection className="text-lg" />
                  <p >Historico del proceso:</p>
                </div>
                <TableWithoutSearch
                  data={estadosPostulaciones}
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
                      No existe historico de proceso de selección.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {msg && <Alert alerta={alertaPostulacion} />}
            {/*footer*/}
            <div className="flex space-x-4 items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <input
                type="submit"
                className="cursor-pointer bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                value="Guardar"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}