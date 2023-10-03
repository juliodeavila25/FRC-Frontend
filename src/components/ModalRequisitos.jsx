import { useState, useEffect, useRef } from "react";
import useDocumentosRequisitos from "../hooks/useDocumentosRequisitos";
import Alert from "./Alert";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import usePostulaciones from "../hooks/usePostulaciones";
import useRequisito from "../hooks/useRequisito";

import {
  FcBusinessContact,
  FcInspection,
  FcAssistant,
  FcCancel,
  FcOk,
  FcBriefcase,
  FcManager,
  FcFile,
} from "react-icons/fc";

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

export default function ModalPublic({
  setShowModal,
  listadoCargos,
  selectedCargo,
  idOferta,
  oferta,
  documentosRequisitosPorUsuario,
}) {
  const [requisitosCargos, setRequisitosCargos] = useState([]);

  const [idUsuario, setIdUsuario] = useState("");
  const [estadoAplicacionOferta, setEstadoAplicacionOferta] =
    useState("Postulado");

  const [documentosRequeridos, setDocumentosRequeridos] = useState([]);

  const [errorDocumentos, setErrorDocumentos] = useState(false);

  const [archivos, setArchivos] = useState([]);

  const [open, setOpen] = useState(1);

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;

  const { obtenerUsuarios, usuarios, usuarioAutenticado, auth } = useAuth();

  const {
    nuevosDocumentosRequisitos,
    alertaDocumentosRequisitos,
    mostrarAlerta,
  } = useDocumentosRequisitos();

  const { nuevaPostulacion, postulaciones } = usePostulaciones();

  const { msg, error } = alertaDocumentosRequisitos;
  const { requisitosBo } = useRequisito();

  const {
    documentosRequisitosUsuario,
    obtenerRequisitosPorUsuario,
    cargandoDataDocumentos,
  } = useDocumentosRequisitos();

  const [respuesta, setRespuesta] = useState([])

  useEffect(() => {
    if (error === false) {
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }, [alertaDocumentosRequisitos]);

  console.log(auth);

  useEffect(() => {
    let cargo = listadoCargos.filter((item) => item.nombre === selectedCargo);

    console.log(cargo)

    let requisitosCargosUpdated = [];
    for (let i = 0; i < cargo[0]?.requisitos.length; i++) {
      let data = requisitosBo.filter(
        (item) => item._id === cargo[0]?.requisitos[i]._id
      );
      console.log(data);
      requisitosCargosUpdated.push(data[0]);
    }
    console.log(requisitosCargosUpdated);
    setRequisitosCargos(requisitosCargosUpdated);

    setIdUsuario(auth._id);

    if (documentosRequeridos.length === 0) {
      const updatedBdays = documentosRequeridos;
      for (let i = 0; i < cargo[0]?.requisitos.length; i++) {
        let findData = documentosRequisitosPorUsuario.filter(
          (item) => item.idRequisito === cargo[0]?.requisitos[i]._id
        );

        if (findData.length > 0) {
          updatedBdays.push({
            idRequisito: cargo[0]?.requisitos[i]._id,
            nombreRequisito: cargo[0]?.requisitos[i].nombre,
            fechaVigencia: findData[0]?.fechaVigencia,
            emisor: findData[0]?.emisor,
            fechaExpedicion: findData[0]?.fechaExpedicion,
            numeroDocumento: findData[0]?.numeroDocumento,
            documento: findData[0]?.documento,
            estado: true,
          });
        } else {
          updatedBdays.push({
            idRequisito: cargo[0]?.requisitos[i]._id,
            nombreRequisito: cargo[0]?.requisitos[i].nombre,
            fechaVigencia: "",
            emisor: "",
            fechaExpedicion: "",
            numeroDocumento: "",
            documento: "",
            estado: false,
          });
        }
      }
      console.log(updatedBdays);
      // let filterupdatedBdays = updatedBdays.filter((item)=> item.estado === false)
      // console.log(filterupdatedBdays)
      setDocumentosRequeridos(updatedBdays);
    }
  }, [selectedCargo, documentosRequisitosPorUsuario]);

  console.log(oferta)
  console.log(documentosRequisitosUsuario);

  const submitData = async (e) => {
    e.preventDefault();
    const id_oferta = localStorage.getItem("id_oferta");

    const formData = new FormData();

    for (const obj of documentosRequeridos) {
      // Append non-file properties as JSON strings
      console.log(obj)
      formData.append("documentosRequeridos", JSON.stringify(obj));
      // Append file property

      if (typeof obj.documento !== "string") {
        formData.append("documentos", obj.documento, obj.documento.name);
      }
    }

    formData.append("idOferta", idOferta);
    formData.append("creador", usuarioAutenticado._id);


    await nuevosDocumentosRequisitos(formData);

    await nuevaPostulacion({
      idUsuario,
      idOferta,
      estadoAplicacionOferta,
    });
  };

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

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleinputchangeDocumentosRequeridos = (e, index) => {
    const maxfilesize = 1024 * 1024;

    const { name, value, files } = e.target;
    console.log(files);
    const list = [...documentosRequeridos];
    if (files?.length > 0) {
      if (files[0].size > maxfilesize) {
        e.target.value = "";
        setErrorDocumentos(true);
      } else {
        list[index][name] = files[0];
        setErrorDocumentos(false);
      }
    } else {
      list[index][name] = value;
    }
    setDocumentosRequeridos(list);
    console.log(documentosRequeridos);
  };


  const handleinputchangeRespuesta = (e, index) => {
    console.log(index)
    const { name, value, checked } = e.target;
    const list = [...oferta.preguntasFiltradas];
    console.log(oferta.preguntasFiltradas)
    for (let i = 0; i < oferta.preguntasFiltradas.length; i++) {
      if (oferta.preguntasFiltradas[i]._id === index) {

        list[i][name] = value;
      }
    }

    console.log(list)
    setRespuesta(list);

  };


  console.log(requisitosCargos)
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
              <div className="mt-2 font-bold">
                {" "}
                Listado de requisitos para aplicar a la vacante
              </div>
              <div className="mt-2 font-light italic text-sm">
                <span className="font-medium">Nota:</span> Para poder aplicar a
                este cargo es indispensable, contestar las siguientes preguntas y cargar los documentos solicitados.
              </div>
            </div>
            {/*body*/}
            <div className="w-11/12 mx-auto pt-5 ">


              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(1)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcInspection className="text-lg" />
                    <p>
                      Listado de preguntas
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(oferta.preguntasFiltradas) &&
                    oferta.preguntasFiltradas.length > 0
                    ? (
                      <>

                        {oferta.preguntasFiltradas &&
                          Array.isArray(oferta.preguntasFiltradas) &&
                          oferta.preguntasFiltradas.filter(
                            (pregunta) =>
                              pregunta.selectQuestion === true && pregunta.fuente === "Antes de entrevista").map((item, i) => {
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
                                            handleinputchangeRespuesta(
                                              e,
                                              i
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="hidden">
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
                                            handleinputchangeRespuesta(
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
                                            handleinputchangeRespuesta(
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
                                        Respuesta <span className="text-red-700">*</span>
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

                                          required={true}
                                          onChange={(e) =>
                                            handleinputchangeRespuesta(
                                              e,
                                              item._id
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                  </div>
                                );
                              })}
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
                              No existen preguntas de experiencia laboral  para este cargo.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </AccordionBody>
              </Accordion>
            </div>
            {Array.isArray(requisitosCargos) &&
              requisitosCargos.length > 0 ? (
              requisitosCargos.map((item, i) => {
                {
                  console.log(item);
                }
                return (
                  <div key={i} className="w-11/12 mx-auto pt-5 ">
                    <Accordion
                      open={open === i + 1}
                      icon={<Icon id={item._id} open={open} />}
                    >
                      <AccordionHeader
                        className="text-base font-semibold text-gray-900"
                        onClick={() => handleOpen(i + 1)}
                      >
                        <div className="flex space-x-3 items-center">
                          <FcBusinessContact className="text-lg" />
                          <p>{item.nombre}</p>
                          {Array.isArray(documentosRequeridos) &&
                            [documentosRequeridos[i]].map((doc, index) => {
                              {
                                console.log(doc);
                              }
                              return (
                                <div>
                                  {doc.estado === true ? (
                                    <FcOk className="text-lg" />
                                  ) : (
                                    <p className="text-xs italic text-red-500">Pendiente por cargar información</p>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        {console.log(documentosRequeridos)}
                        {Array.isArray(documentosRequeridos) &&
                          [documentosRequeridos[i]].map((doc, index) => {
                            {
                              console.log(doc);
                            }
                            return (
                              <div
                                key={i}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-8"
                              >
                                <div className="">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Nombre requisito
                                  </label>
                                  <input
                                    type="text"
                                    id="fechaRevisionPostulacion"
                                    name="fechaRevisionPostulacion"
                                    value={item.nombre}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    disabled={true}
                                    onChange={(e) =>
                                      handleinputchangeDocumentosRequeridos(
                                        e,
                                        i
                                      )
                                    }
                                  />
                                </div>
                                {console.log(item.vigencia)}
                                {item.vigencia === true ? (
                                  <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Fecha de vigencia
                                    </label>
                                    <input
                                      type="date"
                                      id="fechaVigencia"
                                      name="fechaVigencia"
                                      value={doc.fechaVigencia}
                                      onChange={(e) =>
                                        handleinputchangeDocumentosRequeridos(
                                          e,
                                          i
                                        )
                                      }
                                      // onChange={(e) =>
                                      //   setFechaSistemaPostulacion(e.target.value)
                                      // }
                                      disabled={doc.estado}
                                      required={true}
                                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                ) : null}
                                {item.emisor === true ? (
                                  <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Emisor o expedido por
                                    </label>
                                    <input
                                      type="text"
                                      id="emisor"
                                      name="emisor"
                                      placeholder="Digite el emisor"
                                      value={doc.emisor}
                                      onChange={(e) =>
                                        handleinputchangeDocumentosRequeridos(
                                          e,
                                          i
                                        )
                                      }
                                      disabled={doc.estado}
                                      // onChange={(e) =>
                                      //   setObservacionesPostulacion(
                                      //     e.target.value
                                      //   )
                                      // }
                                      required={true}
                                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                ) : null}
                                {item.fechaExp === true ? (
                                  <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Fecha de expedición
                                    </label>
                                    <input
                                      type="date"
                                      id="fechaExpedicion"
                                      name="fechaExpedicion"
                                      value={doc.fechaExpedicion}
                                      required={true}
                                      disabled={doc.estado}
                                      onChange={(e) =>
                                        handleinputchangeDocumentosRequeridos(
                                          e,
                                          i
                                        )
                                      }
                                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                ) : null}
                                {item.reference === true ? (
                                  <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Número de documento o referencia
                                    </label>
                                    <input
                                      type="text"
                                      id="numeroDocumento"
                                      name="numeroDocumento"
                                      placeholder="Digite el numero del documento"
                                      value={doc.numeroDocumento}
                                      required={true}
                                      disabled={doc.estado}
                                      onChange={(e) =>
                                        handleinputchangeDocumentosRequeridos(
                                          e,
                                          i
                                        )
                                      }
                                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                ) : null}

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Subir documento
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
                                      name="documento"
                                      id="documento"
                                      required={
                                        item.documento !== "" ? false : true

                                      }
                                      disabled={doc.estado}
                                      onChange={(e) =>
                                        handleinputchangeDocumentosRequeridos(
                                          e,
                                          i
                                        )
                                      }
                                      // onChange={(e) =>
                                      //   handleDocumentacionPostulacion(
                                      //     e.target.files[0]
                                      //   )
                                      // }
                                      accept=".pdf"
                                    />

                                    <span className="text-blue-900 text-xs font-bold italic">
                                      Nota: El tamaño máximo es 1mb
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </AccordionBody>
                    </Accordion>
                  </div>
                );
              })
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
                      No existen requisitos para este cargo
                    </p>
                  </div>
                </div>
              </div>
            )}

            {msg && <Alert alerta={alertaDocumentosRequisitos} />}
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
