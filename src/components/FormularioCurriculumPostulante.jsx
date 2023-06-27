import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";
import useCollaborators from "../hooks/useCollaborators";
import useCargos from '../hooks/useCargos'
import useOfertas from "../hooks/useOfertas"
import usePostulaciones from "../hooks/usePostulaciones";
import useEstadoPostulaciones from "../hooks/useEstadoPostulaciones";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import ciuu from '../json/ciuu.json'
import Select from 'react-select'
import departamentos from '../json/departamentos_municipios.json'
import moment from 'moment'

const FormularioCurriculumPostulante = () => {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  const navigate = useNavigate();
  const [curriculums, setCurriculums] = useState([])
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula de ciudadania");
  const [numeroDocumento, setNumeroDocumento] = useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState('1990-01-01');
  const [lugarNacimiento, setLugarNacimiento] = useState("");
  const [telefono, setTelefono] = useState(0);
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("Soltero(a)");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [numeroHijos, setNumeroHijos] = useState(0);
  const [tipoSangre, setTipoSangre] = useState("");
  //Formación Profesional
  const [nivel, setNivel] = useState("Profesional");
  const [titulo, setTitulo] = useState("");
  const [anioTitulo, setAnioTitulo] = useState(0);
  const [institucionTitulo, setInstitucionTitulo] = useState("");
  //Experiencia Profesional
  const [empresaExp, setEmpresaExp] = useState("");
  const [fechaInicioExp, setFechaInicioExp] = useState('1990-01-01');
  const [fechaFinExp, setFechaFinExp] = useState('1990-01-01');
  const [soporteExp, setSoporteExp] = useState("");
  const [errorSoporteExp, setErrorSoporteExp] = useState(false);
  //Referencias
  const [nombreRefA, setNombreRefA] = useState("");
  const [telefonoRefA, setTelefonoRefA] = useState("");
  const [correoRefA, setCorreoRefA] = useState("");
  const [nombreRefB, setNombreRefB] = useState("");
  const [telefonoRefB, setTelefonoRefB] = useState("");
  const [correoRefB, setCorreoRefB] = useState("");
  //Seguridad Social
  const [eps, setEPS] = useState("Sura");
  const [soporteEps, setSoporteEps] = useState("");
  const [errorSoporteEps, setErrorSoporteEps] = useState(false);
  const [pension, setPension] = useState("Protección");
  const [soportePension, setSoportePension] = useState("");
  const [errorSoportePension, setErrorSoportePension] = useState(false);
  //Informacion financiera
  const [inputFinanciera, setinputFinanciera] = useState([
    { ciu: " ", actividad_economica: " " },
  ]);
  //Cuentas Extranjero
  const [inputExtranjera, setinputExtranjera] = useState([
    { nombre: " ", email: " ", telefono: " " },
  ]);

  const [rut, setRut] = useState("");
  const [errorSoporteRut, setErrorSoporteRut] = useState(false);
  const [numeroRut, setNumeroRut] = useState("");
  const [fechaCorte, setFechaCorte] = useState('2022-12-31');
  const [ingresosAnuales, setIngresosAnuales] = useState(0);
  const [egresosAnuales, setEgresosAnuales] = useState(0);
  const [otrosIngresos, setOtrosIngresos] = useState(0);
  const [patrimonio, setPatrimonio] = useState(0);
  const [activos, setActivos] = useState(0);
  const [pasivos, setPasivos] = useState(0);
  const [descripcionIngresos, setDescripcionIngresos] = useState("");

  const [poseeCuenta, setPoseeCuenta] = useState("Si");
  const [inputCuentas, setInputCuentas] = useState([
    { nro_cuenta: " ", banco: " ", ciudad: " ", pais: "", moneda: " " },
  ]);

  const [codigoCIIU, setCodigoCIIU] = useState([{
    value: ""
  }])


  const [operacionesExtranjera, setOperacionesExtranjera] = useState("Si");

  const [exportaciones, setExportaciones] = useState(false);
  const [transferencias, setTransferencias] = useState(false);
  const [pagoServicios, setPagoServicios] = useState(false);
  const [importaciones, setImportaciones] = useState(false);
  const [prestamos, setPrestamos] = useState(false);
  const [otras, setOtras] = useState(false);

  //Referencias Bancarias
  const [tipoCuenta, setTipoCuenta] = useState("Ahorro");
  const [entidadBancaria, setEntidadBancaria] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  //Contractual
  const [tipoContrato, setTipoContrato] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState('1990-01-01');
  const [fechaFin, setFechaFin] = useState('1990-01-01');
  const [empresa, setEmpresa] = useState("");
  const [nomina, setNomina] = useState("");
  const [codigoIngreso, setCodigoIngreso] = useState(0);
  const [sueldo, setSueldo] = useState(0);
  const [soporteContrato, setSoporteContrato] = useState("");
  const [errorSoporteContrato, setErrorSoporteContrato] = useState(false);
  const [cargo, setCargo] = useState("elegir");

  const [cargosFiltrado, setCargosFiltrado] = useState([])
  const [inputReq, setInputReq] = useState([
    { nombre_requisito: " ", vigencia: " ", fecha_vigencia: "1990-01-01", observaciones: " ", estado_requisito: "" },
  ]);

  const [documentoRequerido, setDocumentoRequerido] = useState([])
  const [unidadFuncional, setUnidadFuncional] = useState("");
  const [unidadNegocio, setUnidadNegocio] = useState("Uci Magangué")


  const [estadoPostulacion, setEstadoPostulacion] = useState("elegir")

  /* Error en el campo de estado de postulación*/
  const inputRefEstadoPostulacion = useRef(null);
  const [errorEstadoPostulacion, setErrorEstadoPostulacion] = useState(false)

  const [fechaRevisionPostulacion, setFechaRevisionPostulacion] = useState(moment(date).format('YYYY-MM-DD'))
  const [fechaSistemaPostulacion, setFechaSistemaPostulacion] = useState(moment(date).format('YYYY-MM-DD'))
  const [observacionesPostulacion, setObservacionesPostulacion] = useState("")
  const [documentacionPostulacion, setDocumentacionPostulacion] = useState("");
  const [errorDocumentacionPostulacion, setErrorDocumentacionPostulacion] = useState(false);


  const params = useParams();


  const {
    obtenerCurriculumRH,
    collaborator,
    cargandoDatos,
    cargandoData,
    editarCurriculumRH,
    mostrarAlerta,
    alerta,
  } = useCollaborators();

  const { obtenerCargosForm, cargosForm } = useCargos();
  const { obtenerPostulacionesUsuario, postulacionesUsuario } = usePostulaciones();

  const { nuevoEstadoPostulacion, alertaPostulacion } = useEstadoPostulaciones();



  const { auth, cargando } = useAuth();
  //console.log(auth.documento);
  //console.log(auth._id);
  useEffect(() => {
    obtenerCurriculumRH(params.id)
    obtenerCargosForm()
  }, []);

  const {
    obtenerPostulantesPorOferta, postulantes, postulaciones,
  } = useOfertas();

  useEffect(() => {
    const id_oferta = localStorage.getItem("id_oferta");

    if (id_oferta) {
      obtenerPostulantesPorOferta(id_oferta)
    }

  }, [])



  useEffect(() => {
    if (Array.isArray(postulantes) && postulantes.length > 0) {
      let newArrays = []
      postulantes.map((el, index) => {
        const postulante = postulantes.filter(item => item.creador === el.creador)
        newArrays.push(Object.assign({}, ...postulante));

      })

      let newArraysUnique = [...new Map(newArrays.map(item => [item._id, item])).values()]
      let hv = newArraysUnique.filter(item => item._id === params.id)
      console.log(hv)
      setCurriculums(hv)
    } else {
      setCurriculums([])
    }
  }, [postulantes])

  useEffect(() => {
    if (Array.isArray(curriculums) && curriculums.length > 0) {
      obtenerPostulacionesUsuario(curriculums[0].creador)
    }

  }, [curriculums])




  useEffect(() => {
    if (Object.keys(collaborator).length !== 0 && Array.isArray(curriculums) && curriculums.length > 0) {
      console.log(collaborator);
      setId(params.id);
      setEstado(curriculums[0].estado);
      setNombre(curriculums[0].nombre);
      setTipoDocumento(curriculums[0].tipoDocumento);
      setNumeroDocumento(curriculums[0].numeroDocumento);
      setFechaNacimiento(curriculums[0].fechaNacimiento?.split("T")[0]);
      setLugarNacimiento(curriculums[0].lugarNacimiento);
      setTelefono(curriculums[0].telefono);
      setCorreo(curriculums[0].correo);
      setDireccion(curriculums[0].direccion);
      setEstadoCivil(curriculums[0].estadoCivil);
      setPais(curriculums[0].pais);
      setDepartamento(curriculums[0].departamento);
      setCiudad(curriculums[0].ciudad);
      setNumeroHijos(curriculums[0].numeroHijos);
      setTipoSangre(curriculums[0].tipoSangre);
      //Formación Profesional
      setNivel(curriculums[0].nivel);
      setTitulo(curriculums[0].titulo);
      setAnioTitulo(curriculums[0].anioTitulo);
      setInstitucionTitulo(curriculums[0].institucionTitulo);
      //Experiencia Profesional
      setEmpresaExp(curriculums[0].empresaExp);
      setFechaInicioExp(curriculums[0].fechaInicioExp?.split("T")[0]);
      setFechaFinExp(curriculums[0].fechaFinExp?.split("T")[0]);
      //Referencias
      setNombreRefA(curriculums[0].nombreRefA);
      setTelefonoRefA(curriculums[0].telefonoRefA);
      setCorreoRefA(curriculums[0].correoRefA);
      setNombreRefB(curriculums[0].nombreRefB);
      setTelefonoRefB(curriculums[0].telefonoRefB);
      setCorreoRefB(curriculums[0].correoRefB);
      //Seguridad Social
      setEPS(curriculums[0].eps);
      setPension(curriculums[0].pension);
      //Informacion financiera
      setinputFinanciera(curriculums[0].inputFinanciera);
      //Cuentas Extranjero
      setinputExtranjera(curriculums[0].inputExtranjera);
      setCodigoCIIU(curriculums[0].codigoCIIU)
      setRut(curriculums[0].rut);
      setNumeroRut(curriculums[0].numeroRut);
      setFechaCorte(curriculums[0].fechaCorte?.split("T")[0]);
      setIngresosAnuales(curriculums[0].ingresosAnuales);
      setEgresosAnuales(curriculums[0].egresosAnuales);
      setOtrosIngresos(curriculums[0].otrosIngresos);
      setPatrimonio(curriculums[0].patrimonio);
      setActivos(curriculums[0].activos);
      setPasivos(curriculums[0].pasivos);
      setDescripcionIngresos(curriculums[0].descripcionIngresos);
      setPoseeCuenta(curriculums[0].poseeCuenta);
      setInputCuentas(curriculums[0].inputCuentas);
      setOperacionesExtranjera(curriculums[0].operacionesExtranjera);
      setExportaciones(curriculums[0].exportaciones);
      setTransferencias(curriculums[0].transferencias);
      setPagoServicios(curriculums[0].pagoServicios);
      setImportaciones(curriculums[0].importaciones);
      setPrestamos(curriculums[0].prestamos);
      setOtras(curriculums[0].otras);

      //Referencias Bancarias
      setTipoCuenta(curriculums[0].tipoCuenta);
      setEntidadBancaria(curriculums[0].entidadBancaria);
      setNumeroCuenta(curriculums[0].numeroCuenta);
      //Contractual
      setTipoContrato(curriculums[0].tipoContrato);
      setFechaIngreso(curriculums[0].fechaIngreso?.split("T")[0]);
      setFechaFin(curriculums[0].fechaFin?.split("T")[0]);
      setEmpresa(curriculums[0].empresa);
      setNomina(curriculums[0].nomina);
      setCodigoIngreso(curriculums[0].codigoIngreso);
      setSueldo(curriculums[0].sueldo);
      setCargo(curriculums[0].cargo !== "" ? curriculums[0].cargo : "elegir");
      setUnidadFuncional(curriculums[0].unidadFuncional);
      setUnidadNegocio(curriculums[0].unidadNegocio)
      //setEstadoAplicacionOferta(curriculums[0].estadoAplicacionOferta)

    }
  }, [curriculums]);



  const submitData = async (e) => {
    e.preventDefault();
    localStorage.setItem("tipo", "formRH");
    const id_oferta = localStorage.getItem("id_oferta");

    if (errorSoporteExp === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Experiencia Laboral es de 500kb",
        error: true,
      });
      return;
    }

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




    await nuevoEstadoPostulacion(formData);
  };
  //Informacion Financiera
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputFinanciera];
    list[index][name] = value;
    setinputFinanciera(list);
  };

  const handleremove = (index) => {
    const list = [...inputFinanciera];
    list.splice(index, 1);
    setinputFinanciera(list);
  };

  const handleaddclick = () => {
    setinputFinanciera([
      ...inputFinanciera,
      { ciu: " ", actividad_economica: " " },
    ]);
  };
  //Cuentas Extranjero
  const handleinputchangeExt = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputExtranjera];
    list[index][name] = value;
    setinputExtranjera(list);
  };

  const handleremoveExt = (index) => {
    const list = [...inputExtranjera];
    list.splice(index, 1);
    setinputExtranjera(list);
  };

  const handleaddclickExt = () => {
    setinputExtranjera([
      ...inputExtranjera,
      { nombre: "", email: "", telefono: "" },
    ]);
  };
  const handleinputchangeCuenta = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputCuentas];
    list[index][name] = value;
    setInputCuentas(list);
  };

  const handleremoveCuenta = (index) => {
    const list = [...inputCuentas];
    list.splice(index, 1);
    setInputCuentas(list);
  };

  const handleaddclickCuenta = () => {
    setInputCuentas([
      ...inputCuentas,
      { nro_cuenta: "", banco: "", ciudad: "", pais: "", moneda: "" },
    ]);
  };


  //Proceso de selección
  const handleinputchangeSeleccion = (e, index) => {
    const { name, value } = e.target;
    const list = [...estadoAplicacionOferta];
    list[index][name] = value;
    setEstadoAplicacionOferta(list);
  };

  const handleremoveSelectionProcess = (index) => {
    const list = [...estadoAplicacionOferta];
    list.splice(index, 1);
    setEstadoAplicacionOferta(list);
  };

  const handleaddclickSelectionProcess = () => {
    setEstadoAplicacionOferta([
      ...estadoAplicacionOferta,
      { estado: "", fecha: "", comentarios: "" },
    ]);
  };

  const handleChangeExportaciones = (event) => {
    setExportaciones(event.target.checked);
  };

  const handleChangeTransferencias = (event) => {
    setTransferencias(event.target.checked);
  };

  const handleChangePagoServicios = (event) => {
    setPagoServicios(event.target.checked);
  };

  const handleChangeImportaciones = (event) => {
    setImportaciones(event.target.checked);
  };

  const handleChangePrestamos = (event) => {
    setPrestamos(event.target.checked);
  };

  const handleChangeOtrasOperaciones = (event) => {
    setOtras(event.target.checked);
  };

  const handleSoporteExp = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorSoporteExp(true);
      setSoporteExp(" ");
    } else {
      setErrorSoporteExp(false);
      setSoporteExp(data);
    }
  };

  const handleSoporteEps = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorSoporteEps(true);
      setSoporteEps(" ");
    } else {
      setErrorSoporteEps(false);
      setSoporteEps(data);
    }
  };

  const handleSoportePension = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorSoportePension(true);
      setSoportePension(" ");
    } else {
      setErrorSoportePension(false);
      setSoportePension(data);
    }
  };

  const handleSoporteRut = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorSoporteRut(true);
      setRut(" ");
    } else {
      setErrorSoporteRut(false);
      setRut(data);
    }
  };

  const handleSoporteContrato = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorSoporteContrato(true);
      setSoporteContrato(" ");
    } else {
      setErrorSoporteContrato(false);
      setSoporteContrato(data);
    }
  };


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


  const { msg } = alertaPostulacion;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form
          className="space-y-6 "
          // onSubmit={handleSubmit((data, e) => {
          //   submitData(data, e);
          // })}
          onSubmit={submitData}
          encType="multipart/form-data"
        >
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Datos personales
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="nombre"
                  placeholder="Digita tu nombre completo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  disabled={true}
                // {...register("nombre", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setNombre(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.nombre?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="tipoDocumento"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Documento <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="tipoDocumento"
                  name="tipoDocumento"
                  placeholder="Digita tu correo electrónico"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipoDocumento(selectedDocumentType);
                  }}
                  value={tipoDocumento}
                  disabled={true}
                >
                  <option value="Cedula de ciudadania">
                    Cedula de ciudadania
                  </option>
                  <option value="Cedula de extranjeria">
                    Cedula de extranjeria
                  </option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="numeroDocumento"
                className="block text-sm font-medium text-gray-700"
              >
                Documento de Identidad <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="numeroDocumento"
                  name="numeroDocumento"
                  type="number"
                  placeholder="Digita tu numero de documento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  required
                  disabled={true}
                // {...register("numeroDocumento", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setNumeroDocumento(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.numeroDocumento?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Nacimiento <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  placeholder="Seleccione su fecha de nacimiento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                  disabled={true}
                // {...register("fechaNacimiento", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setFechaNacimiento(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.fechaNacimiento?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="lugarNacimiento"
                className="block text-sm font-medium text-gray-700"
              >
                Lugar de Nacimiento <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="lugarNacimiento"
                  name="lugarNacimiento"
                  type="text"
                  placeholder="Digite su lugar de nacimiento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={lugarNacimiento}
                  onChange={(e) => setLugarNacimiento(e.target.value)}
                  required
                  disabled={true}
                // {...register("lugarNacimiento", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setLugarNacimiento(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.lugarNacimiento?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Celular/Telefono <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="telefono"
                  name="telefono"
                  type="number"
                  placeholder="Digite su número de telefono"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  disabled={true}
                // {...register("telefono", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setTelefono(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.telefono?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electronico <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="correo"
                  name="correo"
                  type="text"
                  placeholder="Digite su correo electrónico"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  disabled={true}
                // {...register("correo", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setCorreo(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.correo?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  placeholder="Digite su dirección"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  disabled={true}
                // {...register("direccion", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setDireccion(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.direccion?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="estadoCivil"
                className="block text-sm font-medium text-gray-700"
              >
                Estado Civil <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="estadoCivil"
                  name="estadoCivil"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipoDocumento(selectedDocumentType);
                  }}
                  value={tipoDocumento}
                  disabled={true}
                >
                  <option value="Soltero(a)">Soltero(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Viudo(a)">Viudo(a)</option>
                  <option value="Unión libre">Unión libre</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="block text-sm font-medium text-gray-700"
              >
                Pais <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="pais"
                  name="pais"
                  type="text"
                  placeholder="Digite el país"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  required
                  disabled={true}
                // {...register("pais", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setPais(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.pais?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="departamento"
                className="block text-sm font-medium text-gray-700"
              >
                Departamento <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="departamento"
                  name="departamento"
                  type="text"
                  placeholder="Digite el departamento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                  disabled={true}
                // {...register("departamento", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setDepartamento(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.departamento?.message}
              </span> */}
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
                  required
                  disabled={true}
                // {...register("ciudad", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setCiudad(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.ciudad?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="numeroHijos"
                className="block text-sm font-medium text-gray-700"
              >
                Numero de hijos
              </label>
              <div className="mt-1">
                <input
                  id="numeroHijos"
                  name="numeroHijos"
                  type="number"
                  placeholder="Digite el numero de hijos"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroHijos}
                  onChange={(e) => setNumeroHijos(e.target.value)}
                  required
                  disabled={true}
                // {...register("numeroHijos", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setNumeroHijos(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.numeroHijos?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="tipoSangre"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Sangre <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="tipoSangre"
                  name="tipoSangre"
                  type="text"
                  placeholder="Digite su tipo de sangre"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={tipoSangre}
                  onChange={(e) => setTipoSangre(e.target.value)}
                  required
                  disabled={true}
                // {...register("tipoSangre", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setTipoSangre(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.tipoSangre?.message}
              </span> */}
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Formación Profesional
          </div>
          <span className="italic"> (Ultimo nivel de escolaridad)</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="nivel"
                className="block text-sm font-medium text-gray-700"
              >
                Nivel <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="nivel"
                  name="nivel"
                  placeholder="Digita su ultimo nivel profesional"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedNivel = e.target.value;
                    //console.log(selectedDocumentType);
                    setNivel(selectedNivel);
                  }}
                  value={nivel}
                  disabled={true}
                >
                  <option value="Ninguno">Ninguno</option>
                  <option value="Técnico Profesional">
                    Técnico Profesional
                  </option>
                  <option value="Tecnológico">Tecnológico</option>
                  <option value="Profesional">Profesional</option>
                  <option value="Especializaciones">Especializaciones</option>
                  <option value="Maestrías">Maestrías</option>
                  <option value="Doctorados">Doctorados</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-gray-700"
              >
                Titulo <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  autoComplete="titulo"
                  placeholder="Digita su ultimo titulo profesional"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  disabled={true}
                // {...register("titulo", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setTitulo(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.titulo?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="anioTitulo"
                className="block text-sm font-medium text-gray-700"
              >
                Año obtención titulo <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="anioTitulo"
                  name="anioTitulo"
                  type="number"
                  placeholder="Digite año del titulo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={anioTitulo}
                  onChange={(e) => setAnioTitulo(e.target.value)}
                  required
                  disabled={true}
                // {...register("anioTitulo", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setAnioTitulo(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.anioTitulo?.message}
              </span> */}
            </div>

            <div>
              <label
                htmlFor="institucionTitulo"
                className="block text-sm font-medium text-gray-700"
              >
                Institución <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="institucionTitulo"
                  name="institucionTitulo"
                  type="text"
                  placeholder="Digite institución"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={institucionTitulo}
                  onChange={(e) => setInstitucionTitulo(e.target.value)}
                  required
                  disabled={true}
                // {...register("institucionTitulo", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setInstitucionTitulo(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.institucionTitulo?.message}
              </span> */}
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Experiencia Laboral
          </div>
          <span className="italic"> (Ultima empresa donde laboró)</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="empresaExp"
                className="block text-sm font-medium text-gray-700"
              >
                Empresa <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="empresaExp"
                  name="empresaExp"
                  type="text"
                  autoComplete="empresaExp"
                  placeholder="Digita la ultima empresa donde laboró"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={empresaExp}
                  onChange={(e) => setEmpresaExp(e.target.value)}
                  required
                  disabled={true}
                // {...register("empresaExp", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setEmpresaExp(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.empresaExp?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="fechaInicioExp"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Inicio <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fechaInicioExp"
                  name="fechaInicioExp"
                  type="date"
                  placeholder="Seleccione su fecha de inicio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaInicioExp}
                  onChange={(e) => setFechaInicioExp(e.target.value)}
                  required
                  disabled={true}
                // {...register("fechaInicioExp", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setFechaInicioExp(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.fechaInicioExp?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="fechaFinExp"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Fin
              </label>
              <div className="mt-1">
                <input
                  id="fechaFinExp"
                  name="fechaFinExp"
                  type="date"
                  placeholder="Seleccione su fecha de fin"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaFinExp}
                  onChange={(e) => setFechaFinExp(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="soporteExp"
                className="block text-sm font-medium text-gray-700"
              >
                Soporte
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
                  name="soporteExp"
                  id="soporteExp"
                  onChange={(e) => handleSoporteExp(e.target.files[0])}
                  accept=".pdf"
                  disabled={true}
                />
              </div>
              {errorSoporteExp === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {collaborator[0]?.soporteExp && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${collaborator[0].soporteExp
                      }`}
                    download={collaborator[0].soporteExp}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte Experiencia
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900 italic">
              Contacto laboral
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="nombreRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="nombreRefA"
                  name="nombreRefA"
                  type="text"
                  autoComplete="nombreRefA"
                  placeholder="Digita nombre de la referencia 1"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={nombreRefA}
                  onChange={(e) => setNombreRefA(e.target.value)}
                  required
                  disabled={true}
                // {...register("nombreRefA", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setNombreRefA(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.nombreRefA?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="telefonoRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Celular/Telefono <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="telefonoRefA"
                  name="telefonoRefA"
                  type="text"
                  autoComplete="telefonoRefA"
                  placeholder="Digita telefono de la referencia 1"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={telefonoRefA}
                  onChange={(e) => setTelefonoRefA(e.target.value)}
                  required
                  disabled={true}
                // {...register("telefonoRefA", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setTelefonoRefA(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.telefonoRefA?.message}
              </span> */}
            </div>
            <div>
              <label
                htmlFor="correoRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Correo <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="correoRefA"
                  name="correoRefA"
                  type="text"
                  autoComplete="correoRefA"
                  placeholder="Digita correo de la referencia 1"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={correoRefA}
                  onChange={(e) => setCorreoRefA(e.target.value)}
                  required
                  disabled={true}
                // {...register("correoRefA", {
                //   required: "Este campo es requerido",
                //   onChange: (e) => setCorreoRefA(e.target.value),
                // })}
                />
              </div>
              {/* <span className="text-xs text-red-500">
                {errors.correoRefA?.message}
              </span> */}
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Contactos
          </div>

          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              Contacto 1 (Personal)
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="nombreRefB"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="nombreRefB"
                  name="nombreRefB"
                  type="text"
                  autoComplete="nombreRefA"
                  placeholder="Digita nombre de la referencia 2"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={nombreRefB}
                  onChange={(e) => setNombreRefB(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="telefonoRefB"
                className="block text-sm font-medium text-gray-700"
              >
                Celular/Telefono
              </label>
              <div className="mt-1">
                <input
                  id="telefonoRefB"
                  name="telefonoRefB"
                  type="text"
                  autoComplete="telefonoRefB"
                  placeholder="Digita telefono de la referencia 2"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={telefonoRefB}
                  onChange={(e) => setTelefonoRefB(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="correoRefB"
                className="block text-sm font-medium text-gray-700"
              >
                Correo
              </label>
              <div className="mt-1">
                <input
                  id="correoRefB"
                  name="correoRefB"
                  type="text"
                  autoComplete="correoRefB"
                  placeholder="Digita correo de la referencia 2"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={correoRefB}
                  onChange={(e) => setCorreoRefB(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Seguridad Social
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="eps"
                className="block text-sm font-medium text-gray-700"
              >
                EPS
              </label>
              <div className="mt-1">
                <select
                  id="eps"
                  name="eps"
                  placeholder="Seleccione su EPS"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedEPS = e.target.value;
                    setEPS(selectedEPS);

                  }}
                  value={eps}
                  required
                  disabled={true}
                >
                  <option value="Asociacion Mutual Ser Eps">Asociacion Mutual Ser Eps</option>
                  <option value="Cajacopi Eps">Cajacopi Eps</option>
                  <option value="Comparta">Comparta</option>
                  <option value="Compensar">Compensar</option>
                  <option value="E.P.S. Sanitas">E.P.S. Sanitas</option>
                  <option value="E.P.S. Sura">E.P.S. Sura</option>
                  <option value="Eps Coosalud Ess">Eps Coosalud Ess</option>
                  <option value="Eps S Ambuc">Eps S Ambuc</option>
                  <option value="Famisanar">Famisanar</option>
                  <option value="Nueva Eps">Nueva Eps</option>
                  <option value="Salud Total">Salud Total</option>
                  <option value="Salud Vida Eps">Salud Vida Eps</option>
                  <option value="Sura Eps">Sura Eps</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="soporteEps"
                className="block text-sm font-medium text-gray-700"
              >
                Soporte
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
                  id="soporteEps"
                  name="soporteEps"
                  onChange={(e) => handleSoporteEps(e.target.files[0])}
                  accept=".pdf"
                  disabled={true}
                />
              </div>
              {errorSoporteEps === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {collaborator[0]?.soporteEps && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${collaborator[0].soporteEps
                      }`}
                    download={collaborator[0].soporteEps}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte EPS
                  </a>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="pension"
                className="block text-sm font-medium text-gray-700"
              >
                Fondo de Pensión
              </label>
              <div className="mt-1">
                <select
                  id="pension"
                  name="pension"
                  placeholder="Seleccione su Fondo de Pensión"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedPension = e.target.value;
                    setPension(selectedPension);
                  }}
                  value={pension}
                  disabled={true}
                >
                  <option value="Proteccion">Proteccion</option>
                  <option value="Porvenir">Porvenir</option>
                  <option value="Colpensiones">Colpensiones</option>
                  <option value="Colfondos">Colfondos</option>

                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="soportePension"
                className="block text-sm font-medium text-gray-700"
              >
                Soporte
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
                  id="soportePension"
                  name="soportePension"
                  onChange={(e) => handleSoportePension(e.target.files[0])}
                  accept=".pdf"
                  disabled={true}
                />
              </div>
              {errorSoportePension === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {collaborator[0]?.soportePension && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${collaborator[0].soportePension
                      }`}
                    download={collaborator[0].soportePension}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte Pensión
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Información Financiera
          </div>
          <div>
            {codigoCIIU &&
              Array.isArray(codigoCIIU) &&
              codigoCIIU.map((item, i) => {

                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 pt-5"
                  >
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        CIU
                      </label>
                      <Select
                        options={ciuu}
                        placeholder="Digite su CIUU"
                        value={item}
                        onChange={(e) => handleinputchange(e, i)}
                        isDisabled={true} />


                    </div>
                  </div>
                );
              })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
            {/** Aqui */}
            <div>
              <label
                htmlFor="rut"
                className="block text-sm font-medium text-gray-700"
              >
                Rut
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
                  name="rut"
                  id="rut"
                  onChange={(e) => handleSoporteRut(e.target.files[0])}
                  accept=".pdf"
                  disabled={true}
                />
              </div>
              {errorSoporteRut === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {collaborator[0]?.rut && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${collaborator[0].rut
                      }`}
                    download={collaborator[0].rut}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte Rut
                  </a>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="numeroRut"
                className="block text-sm font-medium text-gray-700"
              >
                Número RUT
              </label>
              <div className="mt-1">
                <input
                  id="numeroRut"
                  name="numeroRut"
                  type="text"
                  placeholder="Digita el número del RUT"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroRut}
                  onChange={(e) => setNumeroRut(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fechaCorte"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Corte
              </label>
              <div className="mt-1">
                <input
                  id="fechaCorte"
                  name="fechaCorte"
                  type="date"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaCorte}
                  onChange={(e) => setFechaCorte(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ingresosAnuales"
                className="block text-sm font-medium text-gray-700"
              >
                Ingresos Anuales
              </label>
              <div className="mt-1">
                <input
                  id="ingresosAnuales"
                  name="ingresosAnuales"
                  type="number"
                  placeholder="Digite sus ingresos anuales"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={ingresosAnuales}
                  onChange={(e) => setIngresosAnuales(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="egresosAnuales"
                className="block text-sm font-medium text-gray-700"
              >
                Egresos Anuales
              </label>
              <div className="mt-1">
                <input
                  id="egresosAnuales"
                  name="egresosAnuales"
                  type="number"
                  placeholder="Digite sus egresos anuales"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={egresosAnuales}
                  onChange={(e) => setEgresosAnuales(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="otrosIngresos"
                className="block text-sm font-medium text-gray-700"
              >
                Otros Ingresos
              </label>
              <div className="mt-1">
                <input
                  id="otrosIngresos"
                  name="otrosIngresos"
                  type="number"
                  placeholder="Digite otros ingresos"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={otrosIngresos}
                  onChange={(e) => setOtrosIngresos(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="patrimonio"
                className="block text-sm font-medium text-gray-700"
              >
                Patrimonio
              </label>
              <div className="mt-1">
                <input
                  id="patrimonio"
                  name="patrimonio"
                  type="number"
                  placeholder="Digite su patrimonio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={patrimonio}
                  onChange={(e) => setPatrimonio(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="activos"
                className="block text-sm font-medium text-gray-700"
              >
                Total Activos
              </label>
              <div className="mt-1">
                <input
                  id="activos"
                  name="activos"
                  type="number"
                  placeholder="Digite total activos"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={activos}
                  onChange={(e) => setActivos(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pasivos"
                className="block text-sm font-medium text-gray-700"
              >
                Total Pasivos
              </label>
              <div className="mt-1">
                <input
                  id="pasivos"
                  name="pasivos"
                  type="number"
                  placeholder="Digite total pasivos"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={pasivos}
                  onChange={(e) => setPasivos(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="descripcionIngresos"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción de otros ingresos
              </label>
              <div className="mt-1">
                <input
                  id="descripcionIngresos"
                  name="descripcionIngresos"
                  type="text"
                  placeholder=""
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={descripcionIngresos}
                  onChange={(e) => setDescripcionIngresos(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            {/** Aqui */}
          </div>
          <div className="pt-5">
            <div>
              <p className="font-medium">
                ¿Posee Cuentas Corrientes en Moneda Extranjera?
              </p>
              <div className="flex space-x-24 pt-3 pl-4">
                <div className="flex space-x-4 items-center">
                  <div className="mt-1">
                    <input
                      id="poseeCuentaSi"
                      name="poseeCuenta"
                      type="radio"
                      placeholder=""
                      className=""
                      checked={poseeCuenta && poseeCuenta === "Si"}
                      value="Si"
                      onChange={(e) => setPoseeCuenta(e.target.value)}
                      disabled={true}
                    />
                  </div>
                  <label
                    htmlFor="poseeCuenta"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Si
                  </label>
                </div>

                <div className="flex space-x-4 items-center">
                  <div className="mt-1">
                    <input
                      id="poseeCuentaNo"
                      name="poseeCuenta"
                      type="radio"
                      placeholder=""
                      className=""
                      checked={poseeCuenta && poseeCuenta === "No"}
                      value="No"
                      onChange={(e) => setPoseeCuenta(e.target.value)}
                      disabled={true}
                    />
                  </div>
                  <label
                    htmlFor="poseeCuenta"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            {poseeCuenta &&
              poseeCuenta === "Si" &&
              Array.isArray(inputCuentas) &&
              inputCuentas.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5"
                  >
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Número de cuenta
                      </label>
                      <input
                        type="text"
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
                        placeholder="Ingresar CIU"
                        id="nro_cuenta"
                        name="nro_cuenta"
                        value={item.nro_cuenta}
                        onChange={(e) => handleinputchangeCuenta(e, i)}
                        disabled={true}
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Banco
                      </label>
                      <input
                        type="text"
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
                        placeholder="Ingresar Actividad Economica"
                        id="banco"
                        name="banco"
                        value={item.banco}
                        onChange={(e) => handleinputchangeCuenta(e, i)}
                        disabled={true}
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Ciudad
                      </label>
                      <input
                        type="text"
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
                        placeholder="Ingresar Actividad Economica"
                        id="ciudad"
                        name="ciudad"
                        value={item.ciudad}
                        onChange={(e) => handleinputchangeCuenta(e, i)}
                        disabled={true}
                      />
                    </div>

                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Pais
                      </label>
                      <input
                        type="text"
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
                        placeholder="Ingresar Actividad Economica"
                        id="pais"
                        name="pais"
                        value={item.pais}
                        onChange={(e) => handleinputchangeCuenta(e, i)}
                        disabled={true}
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Moneda
                      </label>
                      <input
                        type="text"
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
                        placeholder="Ingresar Actividad Economica"
                        id="moneda"
                        name="moneda"
                        value={item.moneda}
                        onChange={(e) => handleinputchangeCuenta(e, i)}
                        disabled={true}
                      />
                    </div>

                  </div>
                );
              })}
          </div>
          <div className="pt-5">
            <div>
              <p className="font-medium">
                ¿En su Actividad Económica Realiza Operaciones en Moneda
                Extranjera?
              </p>
              <div className="flex space-x-24 pt-3 pl-4">
                <div className="flex space-x-4 items-center">
                  <div className="mt-1">
                    <input
                      id="operacionesExtranjeraSi"
                      name="operacionesExtranjera"
                      type="radio"
                      placeholder=""
                      className=""
                      checked={
                        operacionesExtranjera && operacionesExtranjera === "Si"
                      }
                      value="Si"
                      onChange={(e) => setOperacionesExtranjera(e.target.value)}
                      disabled={true}
                    />
                  </div>
                  <label
                    htmlFor="operacionesExtranjera"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Si
                  </label>
                </div>

                <div className="flex space-x-4 items-center">
                  <div className="mt-1">
                    <input
                      id="operacionesExtranjeraNo"
                      name="operacionesExtranjera"
                      type="radio"
                      placeholder=""
                      className=""
                      checked={
                        operacionesExtranjera && operacionesExtranjera === "No"
                      }
                      value="No"
                      onChange={(e) => setOperacionesExtranjera(e.target.value)}
                      disabled={true}
                    />
                  </div>
                  <label
                    htmlFor="operacionesExtranjera"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium pt-5">
                ¿En su Actividad Económica Realiza Operaciones en Moneda
                Extranjera?
              </p>
              <div className="flex space-x-4 items-center pl-4">
                <input
                  type="checkbox"
                  id="exportaciones"
                  name="exportaciones"
                  value={exportaciones}
                  checked={exportaciones}
                  //checked={exportaciones === "exportaciones"}
                  //onChange={(e) => setExportaciones(e.target.value)}
                  onChange={handleChangeExportaciones}
                  disabled={true}
                />
                <label htmlFor="exportaciones">Exportaciones</label>
              </div>

              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="transferencias"
                  name="transferencias"
                  value="transferencias"
                  checked={transferencias}
                  onChange={handleChangeTransferencias}
                  disabled={true}
                />
                <label htmlFor="transferencias">Transferencias</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="pagoServicios"
                  name="pagoServicios"
                  value="pagoServicios"
                  checked={pagoServicios}
                  onChange={handleChangePagoServicios}
                  disabled={true}
                />
                <label htmlFor="pagoServicios">Pago de Servicios</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="importaciones"
                  name="importaciones"
                  value="importaciones"
                  checked={importaciones}
                  onChange={handleChangeImportaciones}
                  disabled={true}
                />
                <label htmlFor="importaciones">Importaciones</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="prestamos"
                  name="prestamos"
                  value="prestamos"
                  checked={prestamos}
                  onChange={handleChangePrestamos}
                  disabled={true}
                />
                <label htmlFor="prestamos">Prestamos en Moneda</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="otras"
                  name="otras"
                  value="otras"
                  checked={otras}
                  onChange={handleChangeOtrasOperaciones}
                  disabled={true}
                />
                <label htmlFor="otras">Otras</label>
              </div>
            </div>

            <div>
              {otras === true &&
                inputExtranjera &&
                Array.isArray(inputExtranjera) &&
                inputExtranjera.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="border-b border-gray-200 pb-2 pt-5">
                        <h6 className="text-sm font-medium leading-6 text-gray-900">
                          Cuentas Extranjeras
                        </h6>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Nombre
                          </label>
                          <input
                            type="text"
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
                            placeholder="Ingresar Nombre"
                            id="nombre"
                            name="nombre"
                            value={item.nombre}
                            onChange={(e) => handleinputchangeExt(e, i)}
                            disabled={true}
                          />
                        </div>
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="text"
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
                            placeholder="Ingresar Email"
                            id="email"
                            name="email"
                            value={item.email}
                            onChange={(e) => handleinputchangeExt(e, i)}
                            disabled={true}
                          />
                        </div>
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Telefono
                          </label>
                          <input
                            type="text"
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
                            placeholder="Ingresar Telefono"
                            id="telefono"
                            name="telefono"
                            value={item.telefono}
                            onChange={(e) => handleinputchangeExt(e, i)}
                            disabled={true}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-6 ">
                          {inputExtranjera.length !== 1 && (
                            <button
                              className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => handleremoveExt(i)}
                            >
                              Remover
                            </button>
                          )}
                          {inputExtranjera.length - 1 === i && (
                            <button
                              className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                              onClick={handleaddclickExt}
                            >
                              Agregar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Referencias Bancarias
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="tipoCuenta"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Cuenta
              </label>
              <div className="mt-1">
                <select
                  id="tipoCuenta"
                  name="tipoCuenta"
                  placeholder="Seleccione tipo de cuenta"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedTipoCuenta = e.target.value;
                    //console.log(selectedDocumentType);
                    setTipoCuenta(selectedTipoCuenta);
                  }}
                  value={tipoCuenta}
                  disabled={true}
                >
                  <option value="Ahorro">Ahorro</option>
                  <option value="Corriente">Corriente</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="entidadBancaria"
                className="block text-sm font-medium text-gray-700"
              >
                Entidad Bancaria
              </label>
              <div className="mt-1">
                <input
                  id="entidadBancaria"
                  name="entidadBancaria"
                  type="text"
                  autoComplete="entidadBancaria"
                  placeholder="Digita su ultimo entidad bancaria"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={entidadBancaria}
                  onChange={(e) => setEntidadBancaria(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="numeroCuenta"
                className="block text-sm font-medium text-gray-700"
              >
                Numero de Cuenta
              </label>
              <div className="mt-1">
                <input
                  id="numeroCuenta"
                  name="numeroCuenta"
                  type="text"
                  placeholder="Digite su numero de Cuenta"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroCuenta}
                  onChange={(e) => setNumeroCuenta(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Datos Contrato
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="codigoIngreso"
                className="block text-sm font-medium text-gray-700"
              >
                Codigo Ingreso
              </label>
              <div className="mt-1">
                <input
                  id="codigoIngreso"
                  name="codigoIngreso"
                  type="number"
                  autoComplete="codigoIngreso"
                  placeholder="Digita codigo de ingreso"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={codigoIngreso}
                  onChange={(e) => setCodigoIngreso(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tipoContrato"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo Contrato
              </label>
              <div className="mt-1">
                <input
                  id="tipoContrato"
                  name="tipoContrato"
                  type="text"
                  autoComplete="tipoContrato"
                  placeholder="Digitar tipo de Contrato"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={tipoContrato}
                  onChange={(e) => setTipoContrato(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fechaIngreso"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Ingreso
              </label>
              <div className="mt-1">
                <input
                  id="fechaIngreso"
                  name="fechaIngreso"
                  type="date"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Fin
              </label>
              <div className="mt-1">
                <input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"
                  placeholder="Digite fecha fin"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="empresa"
                className="block text-sm font-medium text-gray-700"
              >
                Empresa
              </label>
              <div className="mt-1">
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="empresa"
                  placeholder="Digita nombre empresa"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="nomina"
                className="block text-sm font-medium text-gray-700"
              >
                Nomina
              </label>
              <div className="mt-1">
                <input
                  id="nomina"
                  name="nomina"
                  type="text"
                  autoComplete="nomina"
                  placeholder="Digitar la nomina"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={nomina}
                  onChange={(e) => setNomina(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="sueldo"
                className="block text-sm font-medium text-gray-700"
              >
                Sueldo
              </label>
              <div className="mt-1">
                <input
                  id="sueldo"
                  name="sueldo"
                  type="number"
                  autoComplete="sueldo"
                  placeholder="Digitar salario"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cargo"
                className="block text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <div className="mt-1">
                <select
                  id="cargo"
                  name="cargo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setCargo(e.target.value)}
                  value={cargo}
                  disabled={true}
                >
                  <option value="elegir" disabled >
                    -- Selecciona un cargo--
                  </option>
                  {cargosForm.map((item, i) => {
                    return (
                      <option key={i} value={item.nombre}>
                        {item.nombre}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="unidadFuncional"
                className="block text-sm font-medium text-gray-700"
              >
                Unidad funcional
              </label>
              <div className="mt-1">
                <input
                  id="unidadFuncional"
                  name="unidadFuncional"
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={unidadFuncional}
                  onChange={(e) => setUnidadFuncional(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="unidadNegocio"
                className="block text-sm font-medium text-gray-700"
              >
                Unidad de negocio
              </label>
              <div className="mt-1">
                <select
                  id="unidadNegocio"
                  name="unidadNegocio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setUnidadNegocio(selectedDocumentType);
                  }}
                  value={unidadNegocio}
                  disabled={true}

                >
                  <option value="Uci Magangué">
                    Uci Magangue
                  </option>
                  <option value="Hospital Magangué">
                    Hospital Magangué
                  </option>
                  <option value="Hospital Mompox">Hospital Mompox</option>
                  <option value="Salud mental Mompox">Salud mental Mompox</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="soporteContrato"
                className="block text-sm font-medium text-gray-700"
              >
                Contrato
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
                  id="soporteContrato"
                  name="soporteContrato"
                  onChange={(e) => handleSoporteContrato(e.target.files[0])}
                  accept=".pdf"
                  disabled={true}
                />
              </div>
              {errorSoporteContrato === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {collaborator[0]?.soporteContrato && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${collaborator[0].soporteContrato
                      }`}
                    download={collaborator[0].soporteContrato}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte Contrato
                  </a>
                )}
              </div>
            </div>
          </div>
          {Array.isArray(curriculums) && curriculums.length > 0 && curriculums[0].estadoAplicacionOferta !== "Postulado" ? null : (
            <>
              <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
                Proceso de selección
              </div>
              <div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 "
                >
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
                      <option value="Preseleccionado" >
                        Preseleccionado
                      </option>
                      <option value="No continúa" >
                        No continúa
                      </option>
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
              </div>
            </>
          )}



          {msg && <Alert alerta={alertaPostulacion} />}
          {Array.isArray(curriculums) && curriculums.length > 0 && curriculums[0].estadoAplicacionOferta !== "Postulado" ? (

            <a
              onClick={() => navigate(-1)}
              className="cursor-pointer flex w-60 mx-auto justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Regresar
            </a>
          ) : (
            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
              <a
                onClick={() => navigate(-1)}
                className="cursor-pointer flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancelar
              </a>
              <input
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                value="Guardar"
              />
            </div>
          )}

        </form>
      </div >
    </div >
  );
};

export default FormularioCurriculumPostulante;
