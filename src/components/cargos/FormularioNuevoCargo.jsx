import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useCargos from "../../hooks/useCargos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const FormularioNuevoCargo = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [salario, setSalario] = useState("");
  const [link, setLink] = useState("");
  const [auxilio, setAuxilio] = useState("");
  const [bonificaciones, setBonificaciones] = useState("");
  const [perfil, setPerfil] = useState("");
  const [funciones, setFunciones] = useState("");
  const [electrico, setElectrico] = useState(false);
  const [locativo, setLocativo] = useState(false);
  const [mecanico, setMecanico] = useState(false);
  const [biologico, setBiologico] = useState(false);
  const [psicosocial, setPsicosocial] = useState(false);
  const [carga_fisica, setCargaFisica] = useState(false);
  const [quimicos, setQuimicos] = useState(false);
  const [fisico, setFisico] = useState(false);
  const [movilidad, setMovilidad] = useState(false);
  const [publico, setPublico] = useState(false);
  const [tareas_alto_riesgo, setTareasAltoRiesgo] = useState(false);
  const [tecnologico, setTecnologico] = useState(false);
  const [descripcionCargos, setDescripcionCargos] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [inputCargos, setInputCargos] = useState([
    {
      nombre_requisito: "Bachiller",
      vigencia: false,
      emisor: false,
      fecha_exp: false,
      ref: false,
      estado_requisito: "Activo",
      descripcionRequisitos: "",
    },
  ]);

  const [inputPreguntas, setInputPreguntas] = useState([
    {
      textoPreguntas: "",
    },
  ]);

  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  const inputRefEstado = useRef(null);
  const [errorEstado, setErrorEstado] = useState(false);

  const params = useParams();
  const { submitCargo, mostrarAlerta, alerta, cargo, cargandoDataCargos } =
    useCargos();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(cargo._id);
      setNombre(cargo.nombre);
      setSalario(cargo.salario);
      setLink(cargo.link);
      setAuxilio(cargo.auxilio);
      setBonificaciones(cargo.bonificaciones);
      setPerfil(cargo.perfil);
      setFunciones(cargo.funciones);
      setInputCargos(cargo.inputCargos);
      setElectrico(cargo.electrico);
      setLocativo(cargo.locativo);
      setMecanico(cargo.mecanico);
      setBiologico(cargo.biologico);
      setPsicosocial(cargo.psicosocial);
      setCargaFisica(cargo.carga_fisica);
      setQuimicos(cargo.quimicos);
      setFisico(cargo.fisico);
      setMovilidad(cargo.movilidad);
      setPublico(cargo.publico);
      setTareasAltoRiesgo(cargo.tareas_alto_riesgo);
      setTecnologico(cargo.tecnologico);
      setDescripcionCargos(cargo.descripcionCargos);
      setEstado(cargo.estado);
      setInputPreguntas(cargo.inputPreguntas);
    }
  }, [cargo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    await submitCargo({
      id,
      nombre,
      salario,
      link,
      auxilio,
      bonificaciones,
      perfil,
      funciones,
      electrico,
      locativo,
      mecanico,
      biologico,
      psicosocial,
      carga_fisica,
      quimicos,
      fisico,
      movilidad,
      publico,
      tareas_alto_riesgo,
      tecnologico,
      descripcionCargos,
      estado,
      inputCargos,
      inputPreguntas,
    });
  };

  const handleaddclick = () => {
    setInputCargos([
      ...inputCargos,
      {
        nombre_requisito: "Bachiller",
        vigencia: false,
        emisor: false,
        fecha_exp: false,
        ref: false,
        estado_requisito: "Activo",
        descripcionRequisitos: "",
      },
    ]);
  };

  const handleinputchange = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...inputCargos];
    if (e.target.type === "checkbox") {
      list[index][name] = checked;
    } else {
      list[index][name] = value;
    }
    setInputCargos(list);
  };

  const handleremove = (index) => {
    const list = [...inputCargos];
    list.splice(index, 1);
    setInputCargos(list);
  };

  const handleaddclickPreguntas = () => {
    setInputPreguntas([
      ...inputPreguntas,
      {
        textoPreguntas: "",
      },
    ]);
  };

  const handleinputchangePreguntas = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...inputPreguntas];
    if (e.target.type === "checkbox") {
      list[index][name] = checked;
    } else {
      list[index][name] = value;
    }
    setInputPreguntas(list);
  };

  const handleremovePreguntas = (index) => {
    const list = [...inputPreguntas];
    list.splice(index, 1);
    setInputPreguntas(list);
  };

  const handleChangeElectrico = (event) => {
    setElectrico(event.target.checked);
  };

  const handleChangeLocativo = (event) => {
    setLocativo(event.target.checked);
  };

  const handleChangeMecanico = (event) => {
    setMecanico(event.target.checked);
  };

  const handleChangeBiologico = (event) => {
    setBiologico(event.target.checked);
  };
  const handleChangePsicosocial = (event) => {
    setPsicosocial(event.target.checked);
  };
  const handleChangeCargaFisica = (event) => {
    setCargaFisica(event.target.checked);
  };
  const handleChangeQuimicos = (event) => {
    setQuimicos(event.target.checked);
  };
  const handleChangeFisico = (event) => {
    setFisico(event.target.checked);
  };
  const handleChangeMovilidad = (event) => {
    setMovilidad(event.target.checked);
  };
  const handleChangePublico = (event) => {
    setPublico(event.target.checked);
  };
  const handleChangeTareasAltoRiesgo = (event) => {
    setTareasAltoRiesgo(event.target.checked);
  };
  const handleChangeTecnologico = (event) => {
    setTecnologico(event.target.checked);
  };

  const { msg } = alerta;

  if (cargandoDataCargos) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Cargos
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="border-b border-gray-200 pb-2">
              <h6 className="text-sm font-medium text-gray-900">Datos Cargo</h6>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre cargo <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Digita el nombre del cargo"
                    className={
                      errorNombre === false
                        ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none  sm:text-sm"
                    }
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    ref={inputRef}
                  />
                  {errorNombre === true && (
                    <span className="text-red-500 text-xs">
                      Digite la información requerida
                    </span>
                  )}
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
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="link"
                    name="link"
                    type="text"
                    placeholder="Digite el link"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="descripcionCargos"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción de la necesidad del cargo
              </label>
              <div className="">
                <textarea
                  id="descripcionCargos"
                  name="descripcionCargos"
                  type="text"
                  placeholder=""
                  rows="3"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={descripcionCargos}
                  onChange={(e) => setDescripcionCargos(e.target.value)}
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-2">
              <h6 className="text-sm font-medium text-gray-900">
                Perfil de Riesgo
              </h6>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="electrico"
                  name="electrico"
                  value="electrico"
                  checked={electrico}
                  onChange={handleChangeElectrico}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-electrico"
                  data-tooltip-content="Alta y baja tensión, estática."
                  data-tooltip-place="top"
                >
                  <label htmlFor="electrico">Eléctrico</label>
                  <Tooltip id="my-tooltip-electrico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="locativo"
                  name="locativo"
                  value="locativo"
                  checked={locativo}
                  onChange={handleChangeLocativo}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-locativo"
                  data-tooltip-content="Almacenamiento,Superficies de trabajo (irregularidades, deslizantes, con diferencia del nivel) Condiciones de orden y aseo, caídas de objeto)."
                  data-tooltip-place="top"
                >
                  <label htmlFor="locativo">Locativo</label>
                  <Tooltip id="my-tooltip-locativo" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="mecanico"
                  name="mecanico"
                  value="mecanico"
                  checked={mecanico}
                  onChange={handleChangeMecanico}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-mecanico"
                  data-tooltip-content="Partes en movimiento,
                  Atrapamiento,
                  Material Proyectado
                  Golpeado por o contra.
                  Contacto con sustancias calientes.
                  Golpeado por liberacion de energia hidarulica,presion almacenada."
                  data-tooltip-place="top"
                >
                  <label htmlFor="mecanico">Mecánico</label>
                  <Tooltip id="my-tooltip-mecanico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="biologico"
                  name="biologico"
                  value="biologico"
                  checked={biologico}
                  onChange={handleChangeBiologico}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-biologico"
                  data-tooltip-content="Virus,
                  Bacterias,
                  Hongos."
                  data-tooltip-place="top"
                >
                  <label htmlFor="biologico">Biológico</label>
                  <Tooltip id="my-tooltip-biologico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="psicosocial"
                  name="psicosocial"
                  value="psicosocial"
                  checked={psicosocial}
                  onChange={handleChangePsicosocial}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-psicosocial"
                  data-tooltip-content="Características de la organización del trabajo,
                  Condiciones de la tarea,
                  Jornada de trabajo,
                  Gestión organizacional."
                  data-tooltip-place="top"
                >
                  <label htmlFor="psicosocial">Psicosocial</label>
                  <Tooltip id="my-tooltip-psicosocial" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="carga_fisica"
                  name="carga_fisica"
                  value="carga_fisica"
                  checked={carga_fisica}
                  onChange={handleChangeCargaFisica}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-carga_fisica"
                  data-tooltip-content="Carga dinámica por esfuerzos,
                  Carga dinámica por movimientos repetitivos,
                  Carga dinámica por sobreesfuerzos de la voz,
                  Carga estática de pie,
                  Carga estática sentado,
                  Otras posturas (hiperextensión, cuclillas, posiciones incómodas, etc."
                  data-tooltip-place="top"
                >
                  <label htmlFor="carga_fisica">Carga Fisica</label>
                  <Tooltip id="my-tooltip-carga_fisica" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="quimicos"
                  name="quimicos"
                  value="quimicos"
                  checked={quimicos}
                  onChange={handleChangeQuimicos}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-quimicos"
                  data-tooltip-content="Gases y vapores,
                  Líquidos (nieblas y rocíos),
                  Sólidos (polvos orgánicos, polvos inorgánicos, fibras, humos metálicos y nometálicos)."
                  data-tooltip-place="top"
                >
                  <label htmlFor="quimicos">Químicos</label>
                  <Tooltip id="my-tooltip-quimicos" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="fisico"
                  name="fisico"
                  value="fisico"
                  checked={fisico}
                  onChange={handleChangeFisico}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-fisico"
                  data-tooltip-content="Ruido,
                  Iluminación,
                  Vibración,
                  Temperaturas,
                  Presión atmosférica,
                  Radiaciones ionizantes,
                  Radiaciones no ionizantes."
                  data-tooltip-place="top"
                >
                  <label htmlFor="fisico">Físico</label>
                  <Tooltip id="my-tooltip-fisico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="movilidad"
                  name="movilidad"
                  value="movilidad"
                  checked={movilidad}
                  onChange={handleChangeMovilidad}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-movilidad"
                  data-tooltip-content="Movilización peatonal,
                  Transporte de mercancías,
                  Transporte de personas."
                  data-tooltip-place="top"
                >
                  <label htmlFor="movilidad">Movilidad</label>
                  <Tooltip id="my-tooltip-movilidad" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="publico"
                  name="publico"
                  value="publico"
                  checked={publico}
                  onChange={handleChangePublico}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-publico"
                  data-tooltip-content="Robos, atracos, asaltos, atentados, desorden público, etc."
                  data-tooltip-place="top"
                >
                  <label htmlFor="publico">Publico</label>
                  <Tooltip id="my-tooltip-publico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="tareas_alto_riesgo"
                  name="tareas_alto_riesgo"
                  value="tareas_alto_riesgo"
                  checked={tareas_alto_riesgo}
                  onChange={handleChangeTareasAltoRiesgo}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-tareas_alto_riesgo"
                  data-tooltip-content="Trabajo en alturas por encima de 1.50 metros,
                  Trabajo con energías peligrosas."
                  data-tooltip-place="top"
                >
                  <label htmlFor="tareas_alto_riesgo">
                    Tareas de Alto Riesgo
                  </label>
                  <Tooltip id="my-tooltip-tareas_alto_riesgo" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="tecnologico"
                  name="tecnologico"
                  value="tecnologico"
                  checked={tecnologico}
                  onChange={handleChangeTecnologico}
                  //disabled={true}
                />
                <div
                  className="flex space-x-1"
                  data-tooltip-id="my-tooltip-tecnologico"
                  data-tooltip-content="Explosión, fuga,
                    derrame, incendio."
                  data-tooltip-place="top"
                >
                  <label htmlFor="tecnologico">Tecnológico</label>
                  <Tooltip id="my-tooltip-tecnologico" />
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-200 pb-2">
                <h6 className="text-sm font-medium text-gray-900">
                  Requisitos
                </h6>
              </div>
              {inputCargos &&
                Array.isArray(inputCargos) &&
                inputCargos.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 pt-5 "
                    >
                      <div className="">
                        <div className="border-b border-gray-900 pb-2">
                          <h6 className="text-sm font-medium text-gray-900">
                            Requisito {i+1}
                          </h6>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 pt-4">
                          Nombre requisito
                        </label>
                        <select
                          id="nombre_requisito"
                          name="nombre_requisito"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => handleinputchange(e, i)}
                          value={item.nombre_requisito}
                          required={true}
                          disabled={
                            (Array.isArray(cargo.inputCargos) &&
                              i >= cargo.inputCargos?.length) ||
                            (params.id === undefined && inputCargos.length >= 1)
                              ? false
                              : true
                          }
                        >
                          <option
                            value="elegir"
                            disabled
                            className="text-gray-400"
                          >
                            --Selecciona un tipo de documento--
                          </option>
                          <option value="Bachiller">Bachiller</option>
                          <option value="Titulo: Aux o Tec En Auxiliar De Enfermeria">
                            Titulo: Aux o Tec En Auxiliar De Enfermeria
                          </option>
                          <option value="Titulo: Medicina Gral">
                            Titulo: Medicina Gral
                          </option>
                          <option value="Titulo: Profesional De Enfermeria">
                            Titulo: Profesional De Enfermeria
                          </option>
                          <option value="Titulo: Instrumentador Quirurgico">
                            Titulo: Instrumentador Quirurgico
                          </option>
                          <option value="Titulo: Tecnologo En Imagenes Diagnostica">
                            Titulo: Tecnologo En Imagenes Diagnostica
                          </option>
                          <option value="Titulo: Bacteriologo">
                            Titulo: Bacteriologo
                          </option>
                          <option value="Titulo: Regencia De Farmacia">
                            Titulo: Regencia De Farmacia
                          </option>
                          <option value="Titulo: Fisioterapeuta">
                            Titulo: Fisioterapeuta
                          </option>
                          <option value="Titulo: Quimico Farmaceutico">
                            Titulo: Quimico Farmaceutico
                          </option>
                          <option value="Tarjeta Profesional">
                            Tarjeta Profesional
                          </option>
                          <option value="Rethus">Rethus</option>
                          <option value="Certificado Rcp ( Bls- Acls) Basico">
                            Certificado Rcp ( Bls- Acls) Basico
                          </option>
                          <option value="Certificado De Curso De Violencia Sexual">
                            Certificado De Curso De Violencia Sexual
                          </option>
                          <option value="Certificado De Curso Gestion Del Duelo">
                            Certificado De Curso Gestion Del Duelo
                          </option>
                          <option value="Certificado De Curso Agente Quimicos">
                            Certificado De Curso Agente Quimicos
                          </option>
                          <option value="Certificado De Curso Aiepi Clinico">
                            Certificado De Curso Aiepi Clinico
                          </option>
                          <option value="Certificado De Curso De Aimi">
                            Certificado De Curso De Aimi
                          </option>
                          <option value="Certificado De Toma De Muestra">
                            Certificado De Toma De Muestra
                          </option>
                          <option value="Certificado De Equivalencia De Medicamentos">
                            Certificado De Equivalencia De Medicamentos
                          </option>
                          <option value="Certificado Rcp ( Bls- Acls) ">
                            Certificado Rcp ( Bls- Acls)
                          </option>
                          <option value="Diplomado En Uci: Opcional">
                            Diplomado En Uci: Opcional
                          </option>
                          <option value="Certificado Rcp ( Bls- Acls) Avanzado">
                            Certificado Rcp ( Bls- Acls) Avanzado
                          </option>
                          <option value="Certificado De Equivalencia De Medicamento">
                            Certificado De Equivalencia De Medicamento
                          </option>
                          <option value="Actualizacion Y Manejo Del Fisoterapeutica En Cuidados Criticos">
                            Actualizacion Y Manejo Del Fisoterapeutica En
                            Cuidados Criticos
                          </option>
                          <option value="Carnet De Radio Protección">
                            Carnet De Radio Protección
                          </option>
                        </select>
                      </div>
                      <div className="flex space-x-4 items-center pl-4"></div>
                      <div className="flex space-x-4 items-center pl-4">
                        <input
                          type="checkbox"
                          id="vigencia"
                          name="vigencia"
                          value={item.vigencia}
                          checked={item.vigencia}
                          onChange={(e) => handleinputchange(e, i)}
                        />
                        <label htmlFor="vigencia">
                          ¿Tiene fecha de vigencia?
                        </label>
                      </div>
                      <div className="flex space-x-4 items-center pl-4">
                        <input
                          type="checkbox"
                          id="emisor"
                          name="emisor"
                          value={item.emisor}
                          checked={item.emisor}
                          onChange={(e) => handleinputchange(e, i)}
                        />
                        <label htmlFor="emisor">
                          ¿Emisor o expedido por?
                        </label>
                      </div>
                      <div className="flex space-x-4 items-center pl-4">
                        <input
                          type="checkbox"
                          id="fecha_exp"
                          name="fecha_exp"
                          value={item.fecha_exp}
                          checked={item.fecha_exp}
                          onChange={(e) => handleinputchange(e, i)}
                        />
                        <label htmlFor="fecha_exp">
                          Fecha de expedición
                        </label>
                      </div>
                      <div className="flex space-x-4 items-center pl-4">
                        <input
                          type="checkbox"
                          id="ref"
                          name="ref"
                          value={item.ref}
                          checked={item.ref}
                          onChange={(e) => handleinputchange(e, i)}
                        />
                        <label htmlFor="ref">
                          Numero de documento o referencia
                        </label>
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          Estado requisito
                        </label>
                        <select
                          id="estado_requisito"
                          name="estado_requisito"
                          placeholder="Digita tu correo electrónico"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => handleinputchange(e, i)}
                          value={item.estado_requisito}
                          required={true}
                        >
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="descripcionRequisitos"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Descripción del requisito
                        </label>
                        <div>
                          <textarea
                            id="descripcionRequisitos"
                            name="descripcionRequisitos"
                            type="text"
                            placeholder=""
                            rows="3"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            value={item.descripcionRequisitos}
                            onChange={(e) => handleinputchange(e, i)}
                            // onChange={(e) => setDescripcionIngresos(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-6 ">
                        {(Array.isArray(cargo.inputCargos) &&
                          i >= cargo.inputCargos?.length) ||
                        (params.id === undefined &&
                          inputCargos.length !== 1) ? (
                          <button
                            className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleremove(i)}
                          >
                            Remover
                          </button>
                        ) : null}

                        {inputCargos.length - 1 === i && (
                          <button
                            className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                            onClick={handleaddclick}
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <div className="border-b border-gray-200 pb-2">
                <h6 className="text-sm font-medium text-gray-900">Preguntas</h6>
              </div>
              {inputPreguntas &&
                Array.isArray(inputPreguntas) &&
                inputPreguntas.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 "
                    >
                      <div>
                        <label
                          htmlFor="textoPreguntas"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Texto de la pregunta
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
                            onChange={(e) => handleinputchangePreguntas(e, i)}
                            disabled={
                              (Array.isArray(cargo.inputPreguntas) &&
                                i >= cargo.inputPreguntas?.length) ||
                              (params.id === undefined &&
                                inputPreguntas.length >= 1)
                                ? false
                                : true
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-6 ">
                        {(Array.isArray(cargo.inputPreguntas) &&
                          i >= cargo.inputPreguntas?.length) ||
                        (params.id === undefined &&
                          inputPreguntas.length !== 1) ? (
                          <button
                            className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleremovePreguntas(i)}
                          >
                            Remover
                          </button>
                        ) : null}

                        {inputPreguntas.length - 1 === i && (
                          <button
                            className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                            onClick={handleaddclickPreguntas}
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="estado"
                  name="estado"
                  placeholder="Digita tu estado"
                  className={
                    errorEstado === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  onChange={(e) => {
                    const selectedError = e.target.value;

                    setEstado(selectedError);
                  }}
                  value={estado}
                  disabled={true}
                  ref={inputRefEstado}
                >
                  <option value="elegir" disabled className="text-gray-400">
                    --Selecciona un tipo de documento--
                  </option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
                {errorEstado === true && (
                  <span className="text-red-500 text-xs">
                    Seleccione la información requerida
                  </span>
                )}
              </div>
            </div>
          </div>

          {msg && <Alert alerta={alerta} />}

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
            <Link
              to="/cargos/listar-cargos"
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

export default FormularioNuevoCargo;
