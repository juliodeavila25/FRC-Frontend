import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOfertas from "../../hooks/useOfertas";
import useCargos from "../../hooks/useCargos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import moment from "moment";

import ListadoRequisitos from "./ListadoRequisitos"
import {
  FcInspection
} from "react-icons/fc";
import usePregunta from "../../hooks/usePregunta";
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

const FormularioNuevaOferta = () => {
  const current = new Date();
  const [open, setOpen] = useState(0);
  const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;

  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  //   const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("elegir");
  const [convocatoria, setConvocatoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState(
    moment(date).format("YYYY-MM-DD")
  );
  const [fechaFin, setFechaFin] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [salario, setSalario] = useState("");
  //const [link, setLink] = useState("");
  const [auxilio, setAuxilio] = useState("");
  const [bonificaciones, setBonificaciones] = useState("");
  const [perfil, setPerfil] = useState("");
  const [funciones, setFunciones] = useState("");
  const [estadoConvocatoria, setEstadoConvocatoria] = useState("Activa");
  const [unidadFuncional, setUnidadFuncional] = useState("");
  const [requisitosCargos, setRequisitosCargos] = useState([]);


  const params = useParams();
  const [preguntasFiltradas, setPregutasFiltradas] = useState([])

  const { obtenerCargosForm, cargosForm } = useCargos();


  const {
    submitOferta,
    mostrarAlerta,
    alerta,
    obtenerOferta,
    oferta,
    cargandoData,
  } = useOfertas();



  const { preguntas } =
    usePregunta();

  const { auth, cargando } = useAuth();

  useEffect(() => {

    if (params.id) {
      setId(oferta._id);
      setNombre(oferta.nombre !== "" ? oferta.nombre : "elegir");
      setConvocatoria(oferta.convocatoria);
      setCiudad(oferta.ciudad);
      setSalario(oferta.salario);
      //setLink(oferta.link);
      setAuxilio(oferta.auxilio);
      setBonificaciones(oferta.bonificaciones);
      setPerfil(oferta.perfil);
      setFunciones(oferta.funciones);
      setFechaInicio(oferta.fechaInicio?.split("T")[0]);
      setFechaFin(oferta.fechaFin?.split("T")[0]);
      setEstadoConvocatoria(oferta.estadoConvocatoria);
      setUnidadFuncional(oferta.unidadFuncional);
      let dataFilter = preguntas.filter(item => item.cargo === oferta.nombre || item.cargo === "todos")

      setPregutasFiltradas(dataFilter)
    } else {
      const newCodigo = parseInt(localStorage.getItem("codigo_oferta"));
      //let cutNewCodigo =
      let newCodigoString = (newCodigo + 1).toString();
      let addZeros = newCodigoString.padStart(5, "0");
      let current_year = new Date().getFullYear();
      let concatAddZeros = addZeros.concat("-", current_year);
      setConvocatoria(concatAddZeros);
    }
  }, [oferta]);

  useEffect(() => {
    let cargos = cargosForm.filter((item) => item.nombre === oferta.nombre);

    setRequisitosCargos(cargos);
  }, [cargosForm])

  useEffect(() => {
    obtenerCargosForm();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        convocatoria,
        ciudad,
        salario,
        //link,
        auxilio,
        bonificaciones,
        perfil,
        funciones,
        unidadFuncional,
      ].includes("")
    ) {
      console.log(
        nombre,
        convocatoria,
        ciudad,
        salario,
        //link,
        auxilio,
        bonificaciones,
        perfil,
        funciones,
        unidadFuncional
      );
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Pasar los datos hacia el provider
    await submitOferta({
      id,
      nombre,
      convocatoria,
      ciudad,
      salario,
      //link,
      auxilio,
      bonificaciones,
      perfil,
      funciones,
      fechaInicio,
      fechaFin,
      estadoConvocatoria,
      unidadFuncional,
      preguntasFiltradas
    });
  };

  const handleinputchange = (e) => {
    e.preventDefault();
    setNombre(e.target.value);

    let dataFilter = preguntas.filter(item => item.cargo === e.target.value || item.cargo === "todos")
    setPregutasFiltradas(dataFilter)

  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  const handleinputchangeDocumentosRequeridos = (e, index) => {
    console.log(index)
    const { name, value, checked } = e.target;
    const list = [...preguntasFiltradas];
    console.log(preguntasFiltradas)
    for (let i = 0; i < preguntasFiltradas.length; i++) {
      if (preguntasFiltradas[i]._id === index) {

        list[i][name] = checked;
      }
    }

    setPregutasFiltradas(list);

  };




  const { msg } = alerta;



  if (cargandoData && cargosForm.length === 0) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Convocatoria
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="convocatoria"
                className="block text-sm font-medium text-gray-700"
              >
                Nro. Convocatoria <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="convocatoria"
                  name="convocatoria"
                  placeholder="Digita tu correo electrónico"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={convocatoria}
                  onChange={(e) => setConvocatoria(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cargo"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Convocatoria <span className="text-red-700">*</span>
              </label>

              <div className="mt-1">
                <select
                  id="nombre"
                  name="nombre"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleinputchange(e)}
                  value={nombre}
                  //ref={inputRefCargo}
                  required={true}
                >
                  <option value="elegir" disabled>
                    -- Selecciona un nombre de convocatoria--
                  </option>
                  {cargosForm.map((item, i) => {

                    return (
                      <option key={i} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaInicio"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Inicio <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fechaInicio"
                  name="fechaInicio"
                  type="date"
                  autoComplete="fechaInicio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha fin <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  placeholder="Digite la ciudad"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="salario"
                className="block text-sm font-medium text-gray-700"
              >
                Salario <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="salario"
                  name="salario"
                  type="text"
                  placeholder="Digite el salario"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="auxilio"
                className="block text-sm font-medium text-gray-700"
              >
                Auxilio <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="auxilio"
                  name="auxilio"
                  type="text"
                  placeholder="Digite el auxilio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={auxilio}
                  onChange={(e) => setAuxilio(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bonificaciones"
                className="block text-sm font-medium text-gray-700"
              >
                Bonificaciones <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="bonificaciones"
                  name="bonificaciones"
                  type="text"
                  placeholder="Digite las bonificaciones"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={bonificaciones}
                  onChange={(e) => setBonificaciones(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="perfil"
                className="block text-sm font-medium text-gray-700"
              >
                Perfil <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="perfil"
                  name="perfil"
                  type="text"
                  placeholder="Digite el perfil"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                  disabled={active}
                  rows="6"
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="funciones"
                className="block text-sm font-medium text-gray-700"
              >
                Funciones <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="funciones"
                  name="funciones"
                  type="funciones"
                  placeholder="Digite las funciones"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={funciones}
                  onChange={(e) => setFunciones(e.target.value)}
                  rows="6"
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="estadoConvocatoria"
                className="block text-sm font-medium text-gray-700"
              >
                Estado convocatoria <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="estadoConvocatoria"
                  name="estadoConvocatoria"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setEstadoConvocatoria(e.target.value)}
                  value={estadoConvocatoria}
                >
                  <option value="elegir" disabled className="text-gray-400">
                    --Selecciona un estado--
                  </option>
                  <option value="Activa">Activa</option>
                  <option value="Pausada">Pausada</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="unidadFuncional"
                className="block text-sm font-medium text-gray-700"
              >
                Unidad Funcional
              </label>
              <div className="mt-1">
                <input
                  id="unidadFuncional"
                  name="unidadFuncional"
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={unidadFuncional}
                  onChange={(e) => setUnidadFuncional(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-left text-lg text-gray-700 mt-8 font-medium border-b-4 border-corporative-blue inline-flex">
            Listado de requisitos
          </div>
          <div className="grid grid-cols-3 gap-6 mb-10">

            {Array.isArray(cargosForm) && cargosForm.length > 0 ? <ListadoRequisitos listadoCargos={cargosForm} selectedCargo={nombre} /> : null}
          </div>

          <div className="text-left text-lg text-gray-700 mt-8 font-medium border-b-4 border-corporative-blue inline-flex">
            Seleccionar preguntas:
          </div>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(1)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Experiencia Laboral (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Experiencia Laboral"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Experiencia Laboral"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Experiencia Laboral"
                    ).map((item, i) => {

                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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

          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(2)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Habilidades Técnicas (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Habilidades Técnicas"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Habilidades Técnicas"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Habilidades Técnicas"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de habilidades técnicas para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(3)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Competencias Blandas (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Competencias Blandas"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Competencias Blandas"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Competencias Blandas"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
                                    e,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div>
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
                                  handleinputchangeDocumentosRequeridos(
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de competencias blandas para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(4)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Encaje Cultural (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Encaje Cultural"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Encaje Cultural"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Encaje Cultural"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                              />
                            </div>
                          </div>
                          <div>
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
                              />
                            </div>
                          </div>

                          <div>
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de encaje cultural para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(5)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Logros y resultados previos (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Logros y resultados previos"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Logros y resultados previos"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Logros y resultados previos"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                              />
                            </div>
                          </div>
                          <div>
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
                              />
                            </div>
                          </div>

                          <div>
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de logros y resultados previos para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(3)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Capacidad de aprendizaje y adaptación (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Capacidad de aprendizaje y adaptación"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Capacidad de aprendizaje y adaptación"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Capacidad de aprendizaje y adaptación"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                              />
                            </div>
                          </div>
                          <div>
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
                              />
                            </div>
                          </div>

                          <div>
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de capacidad de aprendizaje y adaptación para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(7)}
            >
              <div className="flex space-x-3 items-center">
                <FcInspection className="text-lg" />
                <p>
                  Motivación y pasión (
                  <span>
                    {Array.isArray(preguntasFiltradas) && preguntasFiltradas.length > 0
                      ? preguntasFiltradas.filter(
                        (pregunta) =>
                          pregunta.categoria ===
                          "Motivación y pasión"
                      ).length
                      : 0}
                  </span>
                  )
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {Array.isArray(preguntasFiltradas) &&
                preguntasFiltradas.length > 0 &&
                preguntasFiltradas.filter(
                  (pregunta) =>
                    pregunta.categoria ===
                    "Motivación y pasión"
                ).length > 0 ? (
                <>
                  {preguntasFiltradas &&
                    Array.isArray(preguntasFiltradas) &&
                    preguntasFiltradas.filter(
                      (pregunta) =>
                        pregunta.categoria ===
                        "Motivación y pasión"
                    ).map((item, i) => {
                      console.log(item);
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-5 pb-3 border-b border-gray-200">
                          <div>
                            <label
                              htmlFor="textoPreguntas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Texto de la pregunta <span className="text-red-700">*</span>
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
                              />
                            </div>
                          </div>
                          <div>
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
                              />
                            </div>
                          </div>

                          <div>
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
                          <div className="flex space-x-4 items-center mt-0 md:mt-3">
                            <label htmlFor="selectQuestion" className="font-medium">Agregar pregunta a la oferta</label>
                            <input
                              type="checkbox"
                              id="selectQuestion"
                              name="selectQuestion"
                              value={item.selectedQuestion}
                              className="h-4 w-4 mt-1"
                              onChange={(e) =>
                                handleinputchangeDocumentosRequeridos(
                                  e,
                                  item._id
                                )
                              }

                            />

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
                        No existen preguntas de motivación y pasión para este cargo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AccordionBody>
          </Accordion>




          {msg && <Alert alerta={alerta} />}
          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto pt-10 ">
            <Link
              to="/recursos-humanos/listar-convocatorias"
              className="flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              value="Guardar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevaOferta;
