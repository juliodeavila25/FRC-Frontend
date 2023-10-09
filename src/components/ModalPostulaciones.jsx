import { useState, useEffect, useRef } from "react";
import useEstadoPostulaciones from "../hooks/useEstadoPostulaciones";
import usePostulaciones from "../hooks/usePostulaciones";
import Alert from "./Alert";
import moment from "moment";
import TableWithoutSearch from "./table/TableWithoutSearch";
import { FcDataProtection, FcInspection } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useCargos from "../hooks/useCargos";
import { useParams, Link } from "react-router-dom";
import FormularioEntrevista from "./FormularioEntrevista";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}


export default function ModalPublic({ setShowModal, data }) {
  const [idOfertaNew, setIdOfertaNew] = useState(localStorage.getItem("id_oferta"))

  const [postulacionActual, setPostulacionActual] = useState([]);
  const [totalCalificacion, setTotalCalificacion] = useState(0)
  const [totalCalificacionDurante, setTotalCalificacionDurante] = useState(0)
  const [totalPuntos, setTotalPuntos] = useState(0)
  const [totalPuntosDurante, setTotalPuntosDurante] = useState(0)
  const [respuesta, setRespuesta] = useState([])
  const params = useParams();
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;

  const [estadoPostulacion, setEstadoPostulacion] = useState("elegir");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [open, setOpen] = useState(1);

  /* Error en el campo de estado de postulación*/
  const inputRefEstadoPostulacion = useRef(null);
  const [errorEstadoPostulacion, setErrorEstadoPostulacion] = useState(false);

  const [fechaRevisionPostulacion, setFechaRevisionPostulacion] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [fechaSistemaPostulacion, setFechaSistemaPostulacion] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [fechaEntrevista, setFechaEntrevista] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [horaEntrevista, setHoraEntrevista] = useState(
    moment(date).format("")
  );
  const [observacionesPostulacion, setObservacionesPostulacion] = useState("");
  const [documentacionPostulacion, setDocumentacionPostulacion] = useState("");
  const [errorDocumentacionPostulacion, setErrorDocumentacionPostulacion] =
    useState(false);

  const [cargoFiltrado, setCargoFiltrado] = useState("")


  const [idPostulacion, setIdPostulacion] = useState("")

  const inputRefCalificacion = useRef([]);

  const [errorCalificacion, setErrorCalificacion] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const {
    nuevoEstadoPostulacionModal,
    alertaPostulacion,
    obtenerEstadoPostulacionesPorUsuario,
    estadosPostulaciones,
    nuevaCalificacion
  } = useEstadoPostulaciones();
  const { obtenerPostulacionesUsuario, postulacionesUsuario } =
    usePostulaciones();
  const { obtenerUsuarios, usuarios } = useAuth();


  const { obtenerCargosForm, cargosForm } = useCargos();


  useEffect(() => {
    let cargos = cargosForm.filter((item) => item.nombre === params.cargo);
    console.log(cargos);
    setCargoFiltrado(cargos);
  }, [cargosForm])

  useEffect(() => {
    obtenerCargosForm();
  }, []);


  useEffect(() => {
    const filtrado = postulacionesUsuario.filter(
      (item) => item.idOferta === idOfertaNew
    )

    setIdPostulacion(filtrado[0]?._id)

    setRespuesta(filtrado[0]?.respuesta)

    console.log(filtrado)


    const filtradoAntes = filtrado[0]?.respuesta?.filter((item) => item.fuente === "Antes de entrevista")

    console.log(filtradoAntes)

    for (let i = 0; i < filtradoAntes?.length; i++) {
      if (filtradoAntes[i].calificacion === "3" || filtradoAntes[i].calificacion === "2" || filtradoAntes[i].calificacion === "1") {
        setTotalCalificacion(filtradoAntes?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.calificacion), 0))
      }
      else {
        filtradoAntes[i].calificacion = 0;
      }
    }


    const filtradoDurante = filtrado[0]?.respuesta?.filter((item) => item.fuente === "Durante entrevista")



    for (let i = 0; i < filtradoDurante?.length; i++) {
      if (filtradoDurante[i].calificacion === "3" || filtradoDurante[i].calificacion === "2" || filtradoDurante[i].calificacion === "1") {
        setTotalCalificacionDurante(filtradoDurante?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.calificacion), 0))
      }
      else {
        filtradoDurante[i].calificacion = 0;
      }
    }


    console.log("totalCalificacion", totalCalificacion)
    console.log("totalCalificacionDurante", totalCalificacionDurante)



    setPostulacionActual(filtrado)


  }, [postulacionesUsuario])


  useEffect(() => {
    let cantidadPreguntas = postulacionActual[0]?.respuesta?.filter(
      (pregunta) =>
        pregunta.selectQuestion === true && pregunta.fuente === "Antes de entrevista").length

    setTotalPuntos(cantidadPreguntas * 3)
  }, [postulacionActual])


  useEffect(() => {
    let cantidadPreguntas = postulacionActual[0]?.respuesta?.filter(
      (pregunta) =>
        pregunta.selectQuestion === true && pregunta.fuente === "Durante entrevista").length


    setTotalPuntosDurante(cantidadPreguntas * 3)
  }, [postulacionActual])



  useEffect(() => {
    obtenerPostulacionesUsuario(data.creador);
  }, []);

  useEffect(() => {
    if (
      Array.isArray(postulacionesUsuario) &&
      postulacionesUsuario.length > 0
    ) {
      const id_oferta = localStorage.getItem("id_oferta");
      const idPostulacionUsuario = postulacionesUsuario.filter(
        (item) => item.idOferta === id_oferta
      );
      obtenerEstadoPostulacionesPorUsuario(idPostulacionUsuario[0]._id);
    }
  }, [postulacionesUsuario]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  console.log("Data", data);

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
              href={`${import.meta.env.VITE_BACKEND_URL}/${originalRow.documentacionPostulacion
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

    const filtrado = postulacionActual[0].respuesta.filter(
      (item) => item.selectQuestion === true && item.fuente === "Antes de entrevista"
    )


    for (let i = 0; i < filtrado.length; i++) {

      if (Number(inputRefCalificacion.current[filtrado[i]._id].value) === 0) {


        inputRefCalificacion.current[filtrado[i]._id].focus();
        setFocusedInput(filtrado[i]._id);
        setErrorCalificacion(true);
        return;
      } else {
        setFocusedInput(null);
        setErrorCalificacion(false);
      }

    }

    const formData = new FormData();

    const idPostulacionUsuario = postulacionesUsuario.filter(
      (item) => item.idOferta === id_oferta
    );

    formData.append("idPostulacion", idPostulacion);
    formData.append("estadoPostulacion", estadoPostulacion);
    formData.append("fechaRevisionPostulacion", fechaRevisionPostulacion);
    formData.append("fechaSistemaPostulacion", fechaSistemaPostulacion);
    formData.append("observacionesPostulacion", observacionesPostulacion);
    formData.append("documentacionPostulacion", documentacionPostulacion);
    formData.append("estadoPostulacionAnterior", data.estadoAplicacionOferta);
    formData.append("nombre", data.nombre);
    formData.append("correo", data.correo);
    formData.append("idOferta", data.idOferta);

    formData.append("fechaEntrevista", fechaEntrevista);
    formData.append("horaEntrevista", horaEntrevista);

    await nuevaCalificacion({
      idPostulacion,
      respuesta
    })

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


  const handleinputchangeCalificacion = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...postulacionActual[0]?.respuesta];
    for (let i = 0; i < postulacionActual[0]?.respuesta.length; i++) {
      if (postulacionActual[0]?.respuesta[i]._id === index) {
        list[i][name] = value;
      }
    }

    setRespuesta(list)
    const filtrado = postulacionActual[0].respuesta.filter(
      (item) => item.selectQuestion === true && item.fuente === "Antes de entrevista"
    )

    setTotalCalificacion(filtrado.reduce((accumulator, currentValue) => accumulator + Number(currentValue.calificacion), 0))

  };

  const handleinputchangeCalificacionDurante = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...postulacionActual[0]?.respuesta];
    for (let i = 0; i < postulacionActual[0]?.respuesta.length; i++) {
      if (postulacionActual[0]?.respuesta[i]._id === index) {
        list[i][name] = value;
      }
    }

    setRespuesta(list)
    const filtrado = postulacionActual[0].respuesta.filter(
      (item) => item.selectQuestion === true && item.fuente === "Durante entrevista"
    )



    setTotalCalificacionDurante(filtrado.reduce((accumulator, currentValue) => accumulator + Number(currentValue.calificacion), 0))

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
              <div className="mt-2 font-bold"> Proceso de selección</div>
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
                  className={
                    errorEstadoPostulacion === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  ref={inputRefEstadoPostulacion}
                  onChange={(e) => setEstadoPostulacion(e.target.value)}
                  value={estadoPostulacion}
                  required={true}
                >
                  <option value="elegir" disabled className="text-gray-400">
                    --Selecciona un estado--
                  </option>
                  {data && data.estadoAplicacionOferta === "Postulado" && (
                    <>
                      <option value="Preseleccionado">Preseleccionado</option>
                      <option value="No continúa">No continúa</option>
                    </>
                  )}
                  {data &&
                    data.estadoAplicacionOferta === "Preseleccionado" && (
                      <>
                        <option value="Postulado">Postulado</option>
                        <option value="En entrevista">
                          En entrevista
                        </option>
                        <option value="No continúa">No continúa</option>
                      </>
                    )}
                  {data &&
                    data.estadoAplicacionOferta === "En entrevista" && (
                      <>
                        <option value="Preseleccionado">Preseleccionado</option>
                        <option value="En entrevista">
                          En entrevista
                        </option>
                        <option value="Exámenes Ocupacionales">
                          Exámenes Ocupacionales
                        </option>
                        <option value="No continúa">No continúa</option>
                      </>
                    )}
                  {data &&
                    data.estadoAplicacionOferta ===
                    "Exámenes Ocupacionales" && (
                      <>
                        <option value="En entrevista">
                          En entrevista
                        </option>
                        <option value="Afiliaciones">Afiliaciones</option>
                        <option value="No continúa">No continúa</option>
                      </>
                    )}
                  {data && data.estadoAplicacionOferta === "Contratado" && (
                    <>
                      <option value="Exámenes Ocupacionales">
                        Exámenes Ocupacionales
                      </option>
                      <option value="Afiliaciones">Afiliaciones</option>
                      <option value="No continúa">No continúa</option>
                    </>
                  )}
                  {data && data.estadoAplicacionOferta === "Afiliaciones" && (
                    <>
                      <option value="Contratado">Contratado</option>
                      <option value="No continúa">No continúa</option>
                    </>
                  )}
                  {data && data.estadoAplicacionOferta === "No continúa" && (
                    <>
                      <option value="Postulado">Postulado</option>
                      <option value="Preseleccionado">Preseleccionado</option>
                      <option value="En entrevista">
                        En entrevista
                      </option>
                      <option value="Exámenes Ocupacionales">
                        Exámenes Ocupacionales
                      </option>
                      <option value="Afiliaciones">Afiliaciones</option>
                      <option value="Contratado">Contratado</option>
                    </>
                  )}
                </select>
                {errorEstadoPostulacion === true && (
                  <span className="text-red-500 text-xs">
                    Seleccione la información requerida
                  </span>
                )}
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
              <div className="hidden">
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

            <div className="w-11/12 mx-auto pt-5 pb-10 ">


              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(1)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcInspection className="text-lg" />
                    <p>
                      Listado de preguntas (Antes de entrevista)
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>

                  {Array.isArray(postulacionActual[0]?.respuesta) &&
                    postulacionActual[0]?.respuesta?.length > 0 && postulacionActual[0]?.respuesta?.filter(
                      (pregunta) =>
                        pregunta.selectQuestion === true && pregunta.fuente === "Antes de entrevista").length > 0
                    ? (
                      <>
                        {Array.isArray(postulacionActual[0]?.respuesta) &&
                          postulacionActual[0]?.respuesta?.length > 0 && postulacionActual[0]?.respuesta?.filter(
                            (pregunta) =>
                              pregunta.selectQuestion === true && pregunta.fuente === "Antes de entrevista").map((item, i) => {
                                { console.log(item) }
                                return (
                                  <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200 ">
                                    <div className="col-span-2">
                                      <p className="font-medium italic underline">Pregunta Nro. {i + 1}</p>
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="textoPreguntas"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Pregunta <span className="text-red-700">*</span>
                                      </label>
                                      <div>
                                        <textarea
                                          id="textoPreguntas"
                                          name="textoPreguntas"
                                          type="text"
                                          placeholder=""
                                          rows="3"
                                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                          value={item.textoPreguntas}
                                          disabled={true}
                                          required={true}
                                          onChange={(e) =>
                                            handleinputchangeCalificacion(
                                              e,
                                              i
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div >
                                      <label
                                        htmlFor="respuestaPreguntas"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Respuesta sugerida <span className="text-red-700">*</span>
                                      </label>
                                      <div>
                                        <textarea
                                          id="respuestaPreguntas"
                                          name="respuestaPreguntas"
                                          type="text"
                                          placeholder=""
                                          rows="3"
                                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                          value={item.respuestaPreguntas}
                                          disabled={true}
                                          required={true}
                                          onChange={(e) =>
                                            handleinputchangeCalificacion(
                                              e,
                                              i
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="hidden">
                                      <label
                                        htmlFor="fuente"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Fuente <span className="text-red-700">*</span>
                                      </label>
                                      <div className="mt-1">
                                        <select
                                          id="fuente"
                                          name="fuente"
                                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                          disabled={true}
                                          value={item.fuente}
                                          onChange={(e) =>
                                            handleinputchangeCalificacion(
                                              e,
                                              i
                                            )
                                          }
                                        >
                                          <option
                                            value="elegir"
                                            disabled
                                            className="text-gray-400"
                                          >
                                            --Selecciona un tipo de documento--
                                          </option>
                                          <option value="Durante entrevista">Durante entrevista</option>
                                          <option value="Antes de entrevista">Antes de entrevista</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="respuestaPreguntaPostulante"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Respuesta del postulante <span className="text-red-700">*</span>
                                      </label>
                                      <div>
                                        <textarea
                                          id="respuestaPreguntaPostulante"
                                          name="respuestaPreguntaPostulante"
                                          type="text"
                                          placeholder=""
                                          rows="3"
                                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                          value={item.respuestaPreguntaPostulante}
                                          disabled={true}
                                          required={true}
                                          onChange={(e) =>
                                            handleinputchangeCalificacion(
                                              e,
                                              item._id
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="">
                                      <label
                                        htmlFor="calificacion"
                                        className="block text-sm font-medium text-blue-700 "
                                      >
                                        Calificación <span className="text-red-700">*</span>
                                      </label>
                                      <div className="mt-1">

                                        <select
                                          id={item._id}
                                          name="calificacion"
                                          ref={(el) => (inputRefCalificacion.current[item._id] = el)}
                                          className={focusedInput !== item._id
                                            ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"}
                                          required={true}
                                          value={item.calificacion}
                                          disabled={data && data.estadoAplicacionOferta !== "Postulado"}


                                          //ref={inputRefCalificacion}
                                          onChange={(e) =>
                                            handleinputchangeCalificacion(
                                              e,
                                              item._id
                                            )
                                          }
                                        >
                                          <option
                                            value={0}
                                            disabled
                                            className="text-gray-400"
                                          >
                                            --Selecciona una calificación--
                                          </option>
                                          <option value={3}>Buena</option>
                                          <option value={2}>Regular</option>
                                          <option value={1}>Mala</option>
                                        </select>
                                        {focusedInput === item._id && (
                                          <span className="text-red-500 text-xs">
                                            Seleccione la información requerida
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                )
                              })}

                        <div className="">
                          <p className="text-blue-700 text-lg font-bold flex ">Calificación Total:<span className="pl-2 ">{Math.round((totalCalificacion / totalPuntos) * 100)}%</span></p>

                        </div>

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
                              No existen preguntas antes de la entrevista.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </AccordionBody>
              </Accordion>
            </div>

            {data && data.estadoAplicacionOferta === "En entrevista" ?
              (
                <div className="w-11/12 mx-auto pt-5 pb-10 ">
                  <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader
                      className="text-base font-semibold text-gray-900"
                      onClick={() => handleOpen(1)}
                    >
                      <div className="flex space-x-3 items-center">
                        <FcInspection className="text-lg" />
                        <p>
                          Listado de preguntas (Durante la  entrevista)
                        </p>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>

                      {Array.isArray(postulacionActual[0]?.respuesta) &&
                        postulacionActual[0]?.respuesta?.length > 0 && postulacionActual[0]?.respuesta?.filter(
                          (pregunta) =>
                            pregunta.selectQuestion === true && pregunta.fuente === "Durante entrevista").length > 0
                        ? (
                          <>
                            {Array.isArray(postulacionActual[0]?.respuesta) &&
                              postulacionActual[0]?.respuesta?.length > 0 && postulacionActual[0]?.respuesta?.filter(
                                (pregunta) =>
                                  pregunta.selectQuestion === true && pregunta.fuente === "Durante entrevista").map((item, i) => {
                                    { console.log(item) }
                                    return (
                                      <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200 ">
                                        <div className="col-span-2">
                                          <p className="font-medium italic underline">Pregunta Nro. {i + 1}</p>
                                        </div>
                                        <div>
                                          <label
                                            htmlFor="textoPreguntas"
                                            className="block text-sm font-medium text-gray-700"
                                          >
                                            Pregunta <span className="text-red-700">*</span>
                                          </label>
                                          <div>
                                            <textarea
                                              id="textoPreguntas"
                                              name="textoPreguntas"
                                              type="text"
                                              placeholder=""
                                              rows="3"
                                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                              value={item.textoPreguntas}
                                              disabled={true}
                                              required={true}
                                              onChange={(e) =>
                                                handleinputchangeCalificacionDurante(
                                                  e,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div >
                                          <label
                                            htmlFor="respuestaPreguntas"
                                            className="block text-sm font-medium text-gray-700"
                                          >
                                            Respuesta sugerida <span className="text-red-700">*</span>
                                          </label>
                                          <div>
                                            <textarea
                                              id="respuestaPreguntas"
                                              name="respuestaPreguntas"
                                              type="text"
                                              placeholder=""
                                              rows="3"
                                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                              value={item.respuestaPreguntas}
                                              disabled={true}
                                              required={true}
                                              onChange={(e) =>
                                                handleinputchangeCalificacionDurante(
                                                  e,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="hidden">
                                          <label
                                            htmlFor="fuente"
                                            className="block text-sm font-medium text-gray-700"
                                          >
                                            Fuente <span className="text-red-700">*</span>
                                          </label>
                                          <div className="mt-1">
                                            <select
                                              id="fuente"
                                              name="fuente"
                                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                              disabled={true}
                                              value={item.fuente}
                                              onChange={(e) =>
                                                handleinputchangeCalificacionDurante(
                                                  e,
                                                  i
                                                )
                                              }
                                            >
                                              <option
                                                value="elegir"
                                                disabled
                                                className="text-gray-400"
                                              >
                                                --Selecciona un tipo de documento--
                                              </option>
                                              <option value="Durante entrevista">Durante entrevista</option>
                                              <option value="Antes de entrevista">Antes de entrevista</option>
                                            </select>
                                          </div>
                                        </div>

                                        <div>
                                          <label
                                            htmlFor="respuestaPreguntaPostulante"
                                            className="block text-sm font-medium text-gray-700"
                                          >
                                            Respuesta del postulante <span className="text-red-700">*</span>
                                          </label>
                                          <div>
                                            <textarea
                                              id="respuestaPreguntaPostulante"
                                              name="respuestaPreguntaPostulante"
                                              type="text"
                                              placeholder=""
                                              rows="3"
                                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                              value={item.respuestaPreguntaPostulante}
                                              //disabled={true}
                                              required={true}
                                              onChange={(e) =>
                                                handleinputchangeCalificacionDurante(
                                                  e,
                                                  item._id
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="">
                                          <label
                                            htmlFor="calificacion"
                                            className="block text-sm font-medium text-blue-700 "
                                          >
                                            Calificación <span className="text-red-700">*</span>
                                          </label>
                                          <div className="mt-1">

                                            <select
                                              id={item._id}
                                              name="calificacion"
                                              ref={(el) => (inputRefCalificacion.current[item._id] = el)}
                                              className={focusedInput !== item._id
                                                ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"}
                                              required={true}
                                              value={item.calificacion}
                                              //disabled={data && data.estadoAplicacionOferta !== "Postulado"}


                                              //ref={inputRefCalificacion}
                                              onChange={(e) =>
                                                handleinputchangeCalificacionDurante(
                                                  e,
                                                  item._id
                                                )
                                              }
                                            >
                                              <option
                                                value={0}
                                                disabled
                                                className="text-gray-400"
                                              >
                                                --Selecciona una calificación--
                                              </option>
                                              <option value={3}>Buena</option>
                                              <option value={2}>Regular</option>
                                              <option value={1}>Mala</option>
                                            </select>
                                            {focusedInput === item._id && (
                                              <span className="text-red-500 text-xs">
                                                Seleccione la información requerida
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                      </div>
                                    )
                                  })}

                            <div className="">
                              <p className="text-blue-700 text-lg font-bold flex ">Calificación Total:<span className="pl-2 ">{Math.round((totalCalificacionDurante / totalPuntosDurante) * 100)}%</span></p>

                            </div>

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
                                  No existen preguntas antes de la entrevista.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                    </AccordionBody>
                  </Accordion>
                </div>
              ) : null}



            {console.log(data &&
              data.estadoAplicacionOferta === "Primera entrevista" && Array.isArray(cargoFiltrado) && cargoFiltrado.length > 0)}
            {data &&
              data.estadoAplicacionOferta === "Primera entrevista" && Array.isArray(cargoFiltrado) && cargoFiltrado.length > 0 &&
              <FormularioEntrevista preguntas={cargoFiltrado} />}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 p-8">
              <div className="border-b border-gray-200 pb-2 -mt-8">
                <h6 className="text-sm font-medium leading-6 text-gray-900 italic">
                  Entrevista 
                </h6>
              </div>
              <div></div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha entrevista
                </label>
                <input
                  type="date"
                  id="fechaEntrevista"
                  name="fechaEntrevista"
                  value={fechaEntrevista}
                  onChange={(e) => setFechaEntrevista(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Hora entrevista
                </label>
                <input
                  type="time"
                  id="horaEntrevista"
                  name="horaEntrevista"
                  value={horaEntrevista}
                  onChange={(e) => setHoraEntrevista(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="tipoEntrevista"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="tipoEntrevista"
                    name="tipoEntrevista"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipoDocumento(selectedDocumentType);
                  }}
                    //value={concepto}
                    //ref={inputRefTipoDocumento}
                  >
                    <option value="elegir" disabled className="text-gray-400">
                      --Selecciona un tipo--
                    </option>
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                </div>
              </div>
              <div>
              <label
                htmlFor="lugar"
                className="block text-sm font-medium text-gray-700"
              >
                Lugar <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="lugar"
                  name="lugar"
                  type="text"
                  autoComplete="lugar"
                  placeholder="Digita tu lugar"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  //value={nombre}
                  //onChange={(e) => setNombre(e.target.value)}
                  //ref={inputRef}
                />
              </div>
            </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  id="observacionesEntrevista"
                  name="observacionesEntrevista"
                  placeholder="Observaciones Entrevista"
                  //value={observacionesPostulacion}
                  //onChange={(e) => setObservacionesPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 p-8">
              <div className="border-b border-gray-200 pb-2 -mt-8">
                <h6 className="text-sm font-medium leading-6 text-gray-900 italic">
                  Examenes Medicos
                </h6>
              </div>
              <div></div>
              <div>
                <label
                  htmlFor="concepto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Concepto <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="concepto"
                    name="concepto"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipoDocumento(selectedDocumentType);
                  }}
                    //value={concepto}
                    //ref={inputRefTipoDocumento}
                  >
                    <option value="elegir" disabled className="text-gray-400">
                      --Selecciona un concepto--
                    </option>
                    <option value="Apto">Apto</option>
                    <option value="Apto con Recomendaciones">
                      Apto con Recomendaciones
                    </option>
                    <option value="No Apto">No Apto</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  id="observacionesConcepto"
                  name="observacionesConcepto"
                  placeholder="Observaciones Concepto"
                  //value={observacionesPostulacion}
                  //onChange={(e) => setObservacionesPostulacion(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div> */}

            {Array.isArray(estadosPostulaciones) &&
              estadosPostulaciones.length > 0 ? (
              <>
                <div className="block text-lg  italic font-medium text-blue-700 ml-8 flex space-x-2 items-center">
                  <FcDataProtection className="text-lg" />
                  <p>Historico del proceso:</p>
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
