import { useState, useEffect, useRef } from "react";
import useEstadoPostulaciones from "../hooks/useEstadoPostulaciones";
import usePostulaciones from "../hooks/usePostulaciones";
import Alert from "./Alert";
import moment from "moment";
import TableWithoutSearch from "./table/TableWithoutSearch";
import { FcDataProtection } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

export default function ModalPublic({ setShowModal }) {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [estadoPostulacion, setEstadoPostulacion] = useState("elegir");

  /* Error en el campo de estado de postulación*/
  const inputRefEstadoPostulacion = useRef(null);
  const [errorEstadoPostulacion, setErrorEstadoPostulacion] = useState(false);

  const [fechaRevisionPostulacion, setFechaRevisionPostulacion] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [fechaSistemaPostulacion, setFechaSistemaPostulacion] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [observacionesPostulacion, setObservacionesPostulacion] = useState("");
  const [documentacionPostulacion, setDocumentacionPostulacion] = useState("");
  const [errorDocumentacionPostulacion, setErrorDocumentacionPostulacion] =
    useState(false);

  const {
    nuevoEstadoPostulacionModal,
    alertaPostulacion,
    obtenerEstadoPostulacionesPorUsuario,
    estadosPostulaciones,
  } = useEstadoPostulaciones();
  const { obtenerPostulacionesUsuario, postulacionesUsuario } =
    usePostulaciones();
  const { obtenerUsuarios, usuarios } = useAuth();

  // useEffect(() => {
  //   obtenerPostulacionesUsuario(data.creador);
  // }, []);

  // useEffect(() => {
  //   if (
  //     Array.isArray(postulacionesUsuario) &&
  //     postulacionesUsuario.length > 0
  //   ) {
  //     const id_oferta = localStorage.getItem("id_oferta");
  //     const idPostulacionUsuario = postulacionesUsuario.filter(
  //       (item) => item.idOferta === id_oferta
  //     );
  //     obtenerEstadoPostulacionesPorUsuario(idPostulacionUsuario[0]._id);
  //   }
  // }, [postulacionesUsuario]);

  // useEffect(() => {
  //   obtenerUsuarios();
  // }, []);

  

  console.log(usuarios);
  const [headers, setHeaders] = useState([
    {
      Header: "Estado origen - Estado destino",
      accessor: (originalRow, rowIndex) => (
        <div className="">
          <p className="capitalize">
            {originalRow.estadoPostulacionAnterior} -{" "}
            {originalRow.estadoPostulacion}
          </p>
        </div>
      ),
    },
    {
      Header: "Fechas",
      accessor: (originalRow, rowIndex) => (
        <div className="">
          <p className="capitalize">
            F. Post: {originalRow.fechaRevisionPostulacion}
          </p>
          <p className="capitalize">
            F. Rev: {originalRow.fechaSistemaPostulacion}
          </p>
        </div>
      ),
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
              href={`${import.meta.env.VITE_BACKEND_URL}/${
                originalRow.documentacionPostulacion
              }`}
              target="_blank"
            >
              Ver documento
            </a>
          ) : (
            <p>No existe documento cargado</p>
          )}
        </div>
      ),
    },
    {
      Header: "Creador",
      accessor: (originalRow, rowIndex) => (
        <div className="">
          <p className="capitalize">{originalRow.creador.nombre}</p>
        </div>
      ),
    },
  ]);

  console.log("estadosPostulaciones", estadosPostulaciones);

  const submitData = async (e) => {
    e.preventDefault();
    const id_oferta = localStorage.getItem("id_oferta");

    if (estadoPostulacion === "elegir") {
      inputRefEstadoPostulacion.current.focus();
      setErrorEstadoPostulacion(true);
      return;
    } else {
      setErrorEstadoPostulacion(false);
    }

    const formData = new FormData();

    const idPostulacionUsuario = postulacionesUsuario.filter(
      (item) => item.idOferta === id_oferta
    );

    formData.append("idPostulacion", idPostulacionUsuario[0]._id);
    formData.append("estadoPostulacion", estadoPostulacion);
    formData.append("fechaRevisionPostulacion", fechaRevisionPostulacion);
    formData.append("fechaSistemaPostulacion", fechaSistemaPostulacion);
    formData.append("observacionesPostulacion", observacionesPostulacion);
    formData.append("documentacionPostulacion", documentacionPostulacion);
    formData.append("estadoPostulacionAnterior", data.estadoAplicacionOferta);
    formData.append("nombre", data.nombre);
    formData.append("correo", data.correo);
    formData.append("idOferta", data.idOferta);

    await nuevoEstadoPostulacionModal(formData);

    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const { msg } = alertaPostulacion;

  const handleDocumentacionPostulacion = (data) => {
    const maxfilesize = 1024 * 1024;
    console.log(maxfilesize);

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
            <div className="px-5 py-3 border-b border-solid border-slate-200 rounded-t">
              <div className="mt-2 font-bold"> Listo de requisitos para aplicar a la vacante</div>
              <div className="mt-2 font-light italic text-sm">Nota: Para poder aplicar a este cargo es indispensable, cargar los siguientes documentos</div>
              
            </div>
            {/*body*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-8">
              
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre requisito
                </label>
                <input
                  type="text"
                  id="fechaRevisionPostulacion"
                  name="fechaRevisionPostulacion"
                  value="Diploma Bachiller"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  disabled={true}
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de vigencia
                </label>
                <input
                  type="date"
                  id="fechaSistemaPostulacion"
                  name="fechaSistemaPostulacion"
                  value={fechaSistemaPostulacion}
                  onChange={(e) => setFechaSistemaPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Emisor o expedido por 
                </label>
                <input
                  type="text"
                  id="observacionesPostulacion"
                  name="observacionesPostulacion"
                  placeholder="Observaciones"
                  value={observacionesPostulacion}
                  onChange={(e) => setObservacionesPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de expedición
                </label>
                <input
                  type="date"
                  id="fechaSistemaPostulacion"
                  name="fechaSistemaPostulacion"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                 Número de documento o referencia
                </label>
                <input
                  type="text"
                  id="observacionesPostulacion"
                  name="observacionesPostulacion"
                  placeholder="Observaciones"
                  
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
                <div className="">
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
                    onChange={(e) =>
                      handleDocumentacionPostulacion(e.target.files[0])
                    }
                    accept=".pdf"
                  />
                </div>
                {errorDocumentacionPostulacion === true && (
                  <span className="text-red-500 text-xs">
                    El tamaño máximo es 1 Mb
                  </span>
                )}
              </div>
            </div>
            
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
