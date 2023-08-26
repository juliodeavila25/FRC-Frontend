import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";
import useCargos from "../hooks/useCargos";
import useCollaborators from "../hooks/useCollaborators";
import useDocumentosRequeridos from "../hooks/useDocumentosRequeridos";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ciuu from "../json/ciuu.json";
import Select from "react-select";
import departamentos from "../json/departamentos_municipios.json";
import ListarRequisitos from "./ListarRequisitos";
import ModalCurriculum from "../components/ModalCurriculum";
import ModalValidation from "../components/ModalValidation";

const FormularioCurriculum = () => {
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("elegir");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("1990-01-01");
  const [lugarNacimiento, setLugarNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("elegir");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("elegir");
  const [ciudad, setCiudad] = useState("elegir");
  const [municipios, setMunicipios] = useState([]);
  const [numeroHijos, setNumeroHijos] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  //Formación Profesional
  const [nivel, setNivel] = useState("elegir");
  const [titulo, setTitulo] = useState("");
  const [anioTitulo, setAnioTitulo] = useState("");
  const [institucionTitulo, setInstitucionTitulo] = useState("");
  //Experiencia Profesional
  const [empresaExp, setEmpresaExp] = useState("");
  const [fechaInicioExp, setFechaInicioExp] = useState("1990-01-01");
  const [fechaFinExp, setFechaFinExp] = useState("1990-01-01");
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
    { nombre: "", email: "", telefono: "" },
  ]);

  const [rut, setRut] = useState("");
  const [errorSoporteRut, setErrorSoporteRut] = useState(false);
  const [numeroRut, setNumeroRut] = useState("");
  const [fechaCorte, setFechaCorte] = useState("2022-12-31");
  const [ingresosAnuales, setIngresosAnuales] = useState(0);
  const [egresosAnuales, setEgresosAnuales] = useState(0);
  const [otrosIngresos, setOtrosIngresos] = useState(0);
  const [patrimonio, setPatrimonio] = useState(0);
  const [activos, setActivos] = useState(0);
  const [pasivos, setPasivos] = useState(0);
  const [descripcionIngresos, setDescripcionIngresos] = useState("");

  const [poseeCuenta, setPoseeCuenta] = useState("Si");
  const [inputCuentas, setInputCuentas] = useState([
    { nro_cuenta: "", banco: "", ciudad: "", pais: "", moneda: "" },
  ]);

  const [codigoCIIU, setCodigoCIIU] = useState([
    {
      value: "",
    },
  ]);

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
  const [fechaIngreso, setFechaIngreso] = useState("1990-01-01");
  const [fechaFin, setFechaFin] = useState("1990-01-01");
  const [empresa, setEmpresa] = useState("");
  const [nomina, setNomina] = useState("");
  const [codigoIngreso, setCodigoIngreso] = useState(0);
  const [sueldo, setSueldo] = useState(0);
  const [soporteContrato, setSoporteContrato] = useState("");
  const [errorSoporteContrato, setErrorSoporteContrato] = useState(false);
  const [cargo, setCargo] = useState("");
  const [unidadFuncional, setUnidadFuncional] = useState("");
  const [unidadNegocio, setUnidadNegocio] = useState("Uci Magangué");
  const [visible, setVisible] = useState(false);
  const [cargosFiltrados, setCargosFiltrados] = useState("");
  const [editarDocumento, setEditarDocumento] = useState({});

  /* Error en el campo nombre*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  /* Error en el campo tipo de documento*/
  const inputRefTipoDocumento = useRef(null);
  const [errorTipoDocumento, setErrorTipoDocumento] = useState(false);

  /* Error en el campo numero de documento*/
  const inputRefNumDocumento = useRef(null);
  const [errorNumDocumento, setErrorNumDocumento] = useState(false);

  /* Error en el campo lugar de nacimiento*/
  const inputRefLugarNacimiento = useRef(null);
  const [errorLugarNacimiento, setErrorLugarNacimiento] = useState(false);

  /* Error en el campo celular*/
  const inputRefCelular = useRef(null);
  const [errorCelular, setErrorCelular] = useState(false);

  /* Error en el campo correo electronico*/
  const inputRefCorreo = useRef(null);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorCorreoInput, setErrorCorreoInput] = useState(false);

  /* Error en el campo direccion*/
  const inputRefDireccion = useRef(null);
  const [errorDireccion, setErrorDireccion] = useState(false);

  /* Error en el campo estado civil*/
  const inputRefEstadoCivil = useRef(null);
  const [errorEstadoCivil, setErrorEstadoCivil] = useState(false);

  /* Error en el campo estado civil*/
  const inputRefPais = useRef(null);
  const [errorPais, setErrorPais] = useState(false);

  /* Error en el campo departamento*/
  const inputRefDepartamento = useRef(null);
  const [errorDepartamento, setErrorDepartamento] = useState(false);

  /* Error en el campo ciudad*/
  const inputRefCiudad = useRef(null);
  const [errorCiudad, setErrorCiudad] = useState(false);

  /* Error en el campo Numero hijos*/
  const inputRefNumHijos = useRef(null);
  const [errorNumHijos, setErrorNumHijos] = useState(false);

  /* Error en el campo tipo de sangre*/
  const inputRefTipoSangre = useRef(null);
  const [errorTipoSangre, setErrorTipoSangre] = useState(false);

  /* Error en el campo nivel de estudio*/
  const inputRefNivel = useRef(null);
  const [errorNivel, setErrorNivel] = useState(false);

  /* Error en el campo titulo*/
  const inputRefTitulo = useRef(null);
  const [errorTitulo, setErrorTitulo] = useState(false);

  /* Error en el campo titulo*/
  const inputAnioTitulo = useRef(null);
  const [errorAnioTitulo, setErrorAnioTitulo] = useState(false);
  const [errorAnioRango, setErrorAnioRango] = useState(false);

  /* Error en el campo institucion*/
  const inputInstitucion = useRef(null);
  const [errorInstitucion, setErrorInstitucion] = useState(false);

  /* Error en el campo nombre empresa*/
  const inputNombreEmpresa = useRef(null);
  const [errorNombreEmpresa, setErrorNombreEmpresa] = useState(false);

  /* Error en el campo fecha inicio empresa*/
  const inputEmpresaFechaInicio = useRef(null);
  const [errorEmpresaFechaInicio, setErrorEmpresaFechaInicio] = useState(false);

  /* Error en el campo referencia A nombre*/
  const inputReferenciaA = useRef(null);
  const [errorReferenciaA, setErrorReferenciaA] = useState(false);

  /* Error en el campo referencia A telefono*/
  const inputReferenciaATelefono = useRef(null);
  const [errorReferenciaATelefono, setErrorReferenciaATelefono] =
    useState(false);

  /* Error en el campo referencia A correo*/
  const inputReferenciaACorreo = useRef(null);
  const [errorReferenciaACorreo, setErrorReferenciaACorreo] = useState(false);
  const [errorCorreoRefInput, setErrorCorreoRefInput] = useState(false);

  /* Error en actividad economica*/
  const inputRefActividadEconomica = useRef(null);
  const [errorActividadEconomica, setErrorActividadEconomica] = useState(false);

  const params = useParams();

  const {
    submitCurriculum,
    mostrarAlerta,
    alerta,
    obtenerCurriculum,
    curriculum,
    cargandoData,
    loading,
    modal,
  } = useCurriculum();

  const { obtenerCargosForm, cargosForm } = useCargos();
  const { obtenerDocumentosRequeridos, documentosRequeridos } =
    useDocumentosRequeridos();

  const { auth, obtenerUsuarioAutenticado, usuarioAutenticado } = useAuth();

  useEffect(() => {
    obtenerCurriculum(auth._id);
    obtenerCargosForm();
  }, []);

  useEffect(() => {
    obtenerDocumentosRequeridos(auth._id);
  }, []);

  useEffect(() => {
    if (Array.isArray(curriculum) && curriculum.length > 0) {
      setId(auth._id);
      setEstado(curriculum[0].estado);
      setNombre(curriculum[0].nombre);
      setTipoDocumento(curriculum[0].tipoDocumento);
      setNumeroDocumento(curriculum[0].numeroDocumento);
      setFechaNacimiento(curriculum[0].fechaNacimiento?.split("T")[0]);
      setLugarNacimiento(curriculum[0].lugarNacimiento);
      setTelefono(curriculum[0].telefono);
      setCorreo(curriculum[0].correo);
      setDireccion(curriculum[0].direccion);
      setEstadoCivil(curriculum[0].estadoCivil);
      setPais(curriculum[0].pais);
      setDepartamento(curriculum[0].departamento);
      setCiudad(curriculum[0].ciudad);
      setNumeroHijos(curriculum[0].numeroHijos);
      setTipoSangre(curriculum[0].tipoSangre);
      //Formación Profesional
      setNivel(curriculum[0].nivel);
      setTitulo(curriculum[0].titulo);
      setAnioTitulo(curriculum[0].anioTitulo);
      setInstitucionTitulo(curriculum[0].institucionTitulo);
      //Experiencia Profesional
      setEmpresaExp(curriculum[0].empresaExp);
      setFechaInicioExp(curriculum[0].fechaInicioExp?.split("T")[0]);
      setFechaFinExp(curriculum[0].fechaFinExp?.split("T")[0]);
      //Referencias
      setNombreRefA(curriculum[0].nombreRefA);
      setTelefonoRefA(curriculum[0].telefonoRefA);
      setCorreoRefA(curriculum[0].correoRefA);
      setNombreRefB(curriculum[0].nombreRefB);
      setTelefonoRefB(curriculum[0].telefonoRefB);
      setCorreoRefB(curriculum[0].correoRefB);
      //Seguridad Social
      setEPS(curriculum[0].eps);
      setPension(curriculum[0].pension);
      //Informacion financiera
      setinputFinanciera(curriculum[0].inputFinanciera);
      //Cuentas Extranjero
      setinputExtranjera(curriculum[0].inputExtranjera);
      setCodigoCIIU(curriculum[0].codigoCIIU);
      setRut(curriculum[0].rut);
      setNumeroRut(curriculum[0].numeroRut);
      setFechaCorte(curriculum[0].fechaCorte?.split("T")[0]);
      setIngresosAnuales(curriculum[0].ingresosAnuales);
      setEgresosAnuales(curriculum[0].egresosAnuales);
      setOtrosIngresos(curriculum[0].otrosIngresos);
      setPatrimonio(curriculum[0].patrimonio);
      setActivos(curriculum[0].activos);
      setPasivos(curriculum[0].pasivos);
      setDescripcionIngresos(curriculum[0].descripcionIngresos);
      setPoseeCuenta(curriculum[0].poseeCuenta);
      setInputCuentas(curriculum[0].inputCuentas);
      setOperacionesExtranjera(curriculum[0].operacionesExtranjera);
      setExportaciones(curriculum[0].exportaciones);
      setTransferencias(curriculum[0].transferencias);
      setPagoServicios(curriculum[0].pagoServicios);
      setImportaciones(curriculum[0].importaciones);
      setPrestamos(curriculum[0].prestamos);
      setOtras(curriculum[0].otras);

      //Referencias Bancarias
      setTipoCuenta(curriculum[0].tipoCuenta);
      setEntidadBancaria(curriculum[0].entidadBancaria);
      setNumeroCuenta(curriculum[0].numeroCuenta);
      //Contractual
      setTipoContrato(curriculum[0].tipoContrato);
      setFechaIngreso(curriculum[0].fechaIngreso?.split("T")[0]);
      setFechaFin(curriculum[0].fechaFin?.split("T")[0]);
      setEmpresa(curriculum[0].empresa);
      setNomina(curriculum[0].nomina);
      setCodigoIngreso(curriculum[0].codigoIngreso);
      setSueldo(curriculum[0].sueldo);
      setCargo(curriculum[0].cargo);
      setUnidadFuncional(curriculum[0].unidadFuncional);
      setUnidadNegocio(curriculum[0].unidadNegocio);

      let municipiosFilter = departamentos.filter(function (departamento) {
        return departamento.departamento == curriculum[0].departamento;
      });

      setMunicipios(municipiosFilter[0].ciudades);
    }
  }, [curriculum]);

  useEffect(() => {
    if (Array.isArray(curriculum) && curriculum.length > 0) {
      let obj = cargosForm.find((item) => item.nombre === curriculum[0].cargo);
      setCargosFiltrados(obj);
    }
  }, [cargosForm, curriculum]);

  useEffect(() => {
    obtenerUsuarioAutenticado();
  }, [auth]);

  const submitData = async (e) => {
    e.preventDefault();
    localStorage.setItem("tipo", "formCo");

    if (
      Object.keys(usuarioAutenticado).length !== 0 &&
      usuarioAutenticado.estado !== "inicial"
    ) {
      if (
        operacionesExtranjera === "Si" &&
        [
          exportaciones,
          transferencias,
          pagoServicios,
          importaciones,
          prestamos,
          otras,
        ].includes(true)
      ) {
        setErrorActividadEconomica(false);
      } else if (
        operacionesExtranjera === "Si" &&
        ![
          exportaciones,
          transferencias,
          pagoServicios,
          importaciones,
          prestamos,
          otras,
        ].includes(true)
      ) {
        inputRefActividadEconomica.current.focus();
        setErrorActividadEconomica(true);
        console.log();
        return;
      } else {
        setErrorActividadEconomica(false);
      }
    }

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    if (tipoDocumento === "elegir") {
      inputRefTipoDocumento.current.focus();
      setErrorTipoDocumento(true);
      return;
    } else {
      setErrorTipoDocumento(false);
    }

    if (numeroDocumento === "") {
      inputRefNumDocumento.current.focus();
      setErrorNumDocumento(true);
      return;
    } else {
      setErrorNumDocumento(false);
    }

    if (lugarNacimiento === "") {
      inputRefLugarNacimiento.current.focus();
      setErrorLugarNacimiento(true);
      return;
    } else {
      setErrorLugarNacimiento(false);
    }

    if (telefono === "") {
      inputRefCelular.current.focus();
      setErrorCelular(true);
      return;
    } else {
      setErrorCelular(false);
    }

    let isValidEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (correo === "") {
      inputRefCorreo.current.focus();
      setErrorCorreo(true);
      return;
    } else if (!isValidEmail.test(correo)) {
      inputRefCorreo.current.focus();
      setErrorCorreoInput(true);
      setErrorCorreo(false);
      return;
    } else {
      setErrorCorreo(false);
      setErrorCorreoInput(false);
    }

    if (direccion === "") {
      inputRefDireccion.current.focus();
      setErrorDireccion(true);
      return;
    } else {
      setErrorDireccion(false);
    }

    if (estadoCivil === "elegir") {
      inputRefEstadoCivil.current.focus();
      setErrorEstadoCivil(true);
      return;
    } else {
      setErrorEstadoCivil(false);
    }

    if (pais === "") {
      inputRefPais.current.focus();
      setErrorPais(true);
      return;
    } else {
      setErrorPais(false);
    }

    if (departamento === "elegir") {
      inputRefDepartamento.current.focus();
      setErrorDepartamento(true);
      return;
    } else {
      setErrorDepartamento(false);
    }

    if (ciudad === "elegir") {
      inputRefCiudad.current.focus();
      setErrorCiudad(true);
      return;
    } else {
      setErrorCiudad(false);
    }

    if (numeroHijos === "") {
      inputRefNumHijos.current.focus();
      setErrorNumHijos(true);
      return;
    } else {
      setErrorNumHijos(false);
    }

    if (tipoSangre === "") {
      inputRefTipoSangre.current.focus();
      setErrorTipoSangre(true);
      return;
    } else {
      setErrorTipoSangre(false);
    }

    if (nivel === "elegir") {
      inputRefNivel.current.focus();
      setErrorNivel(true);
      return;
    } else {
      setErrorNivel(false);
    }

    if (titulo === "") {
      inputRefTitulo.current.focus();
      setErrorTitulo(true);
      return;
    } else {
      setErrorTitulo(false);
    }

    if (anioTitulo === "") {
      inputAnioTitulo.current.focus();
      setErrorAnioTitulo(true);
      return;
    } else if (Number(anioTitulo) <= 1900 || Number(anioTitulo) >= 2099) {
      inputAnioTitulo.current.focus();
      setErrorAnioRango(true);
      setErrorAnioTitulo(false);
      return;
    } else {
      setErrorAnioRango(false);
      setErrorAnioTitulo(false);
    }

    if (institucionTitulo === "") {
      inputInstitucion.current.focus();
      setErrorInstitucion(true);
      return;
    } else {
      setErrorInstitucion(false);
    }

    if (empresaExp === "") {
      inputNombreEmpresa.current.focus();
      setErrorNombreEmpresa(true);
      return;
    } else {
      setErrorNombreEmpresa(false);
    }

    if (fechaInicioExp === "") {
      inputEmpresaFechaInicio.current.focus();
      setErrorEmpresaFechaInicio(true);
      return;
    } else {
      setErrorEmpresaFechaInicio(false);
    }

    if (nombreRefA === "") {
      inputReferenciaA.current.focus();
      setErrorReferenciaA(true);
      return;
    } else {
      setErrorReferenciaA(false);
    }

    if (correoRefA === "") {
      inputReferenciaACorreo.current.focus();
      setErrorReferenciaACorreo(true);
      return;
    } else if (!isValidEmail.test(correoRefA)) {
      inputReferenciaACorreo.current.focus();
      setErrorCorreoRefInput(true);
      setErrorReferenciaACorreo(false);
      return;
    } else {
      setErrorCorreoRefInput(false);
      setErrorCorreoInput(false);
    }

    if (estado !== true) {
    }

    if (
      estado === true &&
      Object.keys(usuarioAutenticado).length !== 0 &&
      usuarioAutenticado &&
      usuarioAutenticado?.userType[0] === "colaborador" &&
      documentosRequeridos.length === 0
    ) {
      mostrarAlerta({
        msg: "Favor diligenciar la sección de documentos requeridos",
        error: true,
      });
      return;
    }

    // if (errorSoporteExp === true) {
    //   mostrarAlerta({
    //     msg: "Tamaño máximo del soporte de Experiencia Laboral es de 500kb",
    //     error: true,
    //   });
    //   return;
    // }

    const formData = new FormData();

    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("tipoDocumento", tipoDocumento);
    formData.append("numeroDocumento", numeroDocumento);
    formData.append("fechaNacimiento", fechaNacimiento);
    formData.append("lugarNacimiento", lugarNacimiento);
    formData.append("telefono", telefono);
    formData.append("correo", correo);
    formData.append("direccion", direccion);
    formData.append("estadoCivil", estadoCivil);
    formData.append("pais", pais);
    formData.append("departamento", departamento);
    formData.append("ciudad", ciudad);
    formData.append("numeroHijos", numeroHijos);
    formData.append("tipoSangre", tipoSangre);
    formData.append("nivel", nivel);
    formData.append("titulo", titulo);
    formData.append("anioTitulo", anioTitulo);
    formData.append("institucionTitulo", institucionTitulo);
    formData.append("empresaExp", empresaExp);
    formData.append("fechaInicioExp", fechaInicioExp);
    formData.append("fechaFinExp", fechaFinExp);
    formData.append("soporteExp", soporteExp);
    formData.append("nombreRefA", nombreRefA);
    formData.append("telefonoRefA", telefonoRefA);
    formData.append("correoRefA", correoRefA);
    formData.append("nombreRefB", nombreRefB);
    formData.append("telefonoRefB", telefonoRefB);
    formData.append("correoRefB", correoRefB);
    formData.append("eps", eps);
    formData.append("soporteEps", soporteEps);
    formData.append("pension", pension);
    formData.append("soportePension", soportePension);
    formData.append("tipoCuenta", tipoCuenta);
    formData.append("entidadBancaria", entidadBancaria);
    formData.append("numeroCuenta", numeroCuenta);
    for (let i = 0; i < inputFinanciera.length; i++) {
      formData.append("inputFinanciera", JSON.stringify(inputFinanciera[i]));
    }
    for (let i = 0; i < inputExtranjera.length; i++) {
      formData.append("inputExtranjera", JSON.stringify(inputExtranjera[i]));
    }

    for (let i = 0; i < codigoCIIU.length; i++) {
      formData.append("codigoCIIU", JSON.stringify(codigoCIIU[i]));
    }
    formData.append("rut", rut);
    formData.append("numeroRut", numeroRut);
    formData.append("fechaCorte", fechaCorte);
    formData.append("ingresosAnuales", ingresosAnuales);
    formData.append("egresosAnuales", egresosAnuales);
    formData.append("otrosIngresos", otrosIngresos);
    formData.append("patrimonio", patrimonio);
    formData.append("activos", activos);
    formData.append("pasivos", pasivos);
    formData.append("descripcionIngresos", descripcionIngresos);
    formData.append("poseeCuenta", poseeCuenta);
    for (let i = 0; i < inputCuentas.length; i++) {
      formData.append("inputCuentas", JSON.stringify(inputCuentas[i]));
    }
    formData.append("operacionesExtranjera", operacionesExtranjera);
    formData.append("exportaciones", exportaciones);
    formData.append("transferencias", transferencias);
    formData.append("pagoServicios", pagoServicios);
    formData.append("importaciones", importaciones);
    formData.append("prestamos", prestamos);
    formData.append("otras", otras);
    formData.append("tipoContrato", tipoContrato);
    formData.append("fechaIngreso", fechaIngreso);
    formData.append("fechaFin", fechaFin);
    formData.append("empresa", empresa);
    formData.append("nomina", nomina);
    formData.append("codigoIngreso", codigoIngreso);
    formData.append("sueldo", sueldo);
    formData.append("soporteContrato", soporteContrato);
    formData.append("cargo", cargo);
    formData.append("unidadFuncional", unidadFuncional);
    formData.append("unidadNegocio", unidadNegocio);

    await submitCurriculum(formData, estado);
  };

  //Informacion Financiera
  const handleinputchange = (e, index) => {
    const list = [...codigoCIIU];
    list[index] = e;
    setCodigoCIIU(list);
  };

  const handleremove = (index) => {
    const list = [...codigoCIIU];
    list.splice(index, 1);
    setCodigoCIIU(list);
  };

  const handleaddclick = () => {
    setCodigoCIIU([...codigoCIIU, { value: "" }]);
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
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoporteExp(true);
      setSoporteExp(" ");
    } else {
      setErrorSoporteExp(false);
      setSoporteExp(data);
    }
  };

  const handleSoporteEps = (data) => {
    console.log(data);
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoporteEps(true);
      setSoporteEps(" ");
    } else {
      setErrorSoporteEps(false);
      setSoporteEps(data);
    }
  };

  const handleSoportePension = (data) => {
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoportePension(true);
      setSoportePension(" ");
    } else {
      setErrorSoportePension(false);
      setSoportePension(data);
    }
  };

  const handleSoporteRut = (data) => {
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoporteRut(true);
      setRut(" ");
    } else {
      setErrorSoporteRut(false);
      setRut(data);
    }
  };

  const handleSoporteContrato = (data) => {
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoporteContrato(true);
      setSoporteContrato(" ");
    } else {
      setErrorSoporteContrato(false);
      setSoporteContrato(data);
    }
  };

  const sumPatrimonio = function () {
    setPatrimonio(Number(activos) - Number(pasivos));
  };

  const handleChangeDepartamento = (e) => {
    const selectedDepartamento = e.target.value;
    setDepartamento(selectedDepartamento);
    setMunicipios("");

    let municipiosFilter = departamentos.filter(function (departamento) {
      return departamento.departamento == e.target.value;
    });

    setMunicipios(municipiosFilter[0].ciudades);
  };

  const activateModal = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const setShowModal = () => {
    setVisible(false);
    setEditarDocumento("");
  };

  const editModal = (e, data) => {
    e.preventDefault();
    console.log(data);
    setEditarDocumento(data);
    setVisible(true);
  };

  const onchangeOperacionesExtranjera = (e) => {
    setOperacionesExtranjera(e.target.value);
    setExportaciones(false);
    setTransferencias(false);
    setPagoServicios(false);
    setImportaciones(false);
    setPrestamos(false);
    setOtras(false);
  };

  const { message } = modal;
  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        {visible === true && (
          <ModalCurriculum
            setShowModal={setShowModal}
            cargos={cargosFiltrados}
            data={editarDocumento}
          />
        )}
        <form
          className="space-y-6 "
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
                  className={
                    errorTipoDocumento === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipoDocumento(selectedDocumentType);
                  }}
                  value={tipoDocumento}
                  ref={inputRefTipoDocumento}
                >
                  <option value="elegir" disabled className="text-gray-400">
                    --Selecciona un tipo de documento--
                  </option>
                  <option value="Cedula de ciudadania">
                    Cedula de ciudadania
                  </option>
                  <option value="Cedula de extranjeria">
                    Cedula de extranjeria
                  </option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                {errorTipoDocumento === true && (
                  <span className="text-red-500 text-xs">
                    Seleccione la información requerida
                  </span>
                )}
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
                  className={
                    errorNumDocumento === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  ref={inputRefNumDocumento}
                />
                {errorNumDocumento === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                />
              </div>
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
                  className={
                    errorLugarNacimiento === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={lugarNacimiento}
                  onChange={(e) => setLugarNacimiento(e.target.value)}
                  ref={inputRefLugarNacimiento}
                />
                {errorLugarNacimiento === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorCelular === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  ref={inputRefCelular}
                />
                {errorCelular === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorCorreo === false && errorCorreoInput === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  ref={inputRefCorreo}
                />
                {errorCorreo === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
                {errorCorreoInput === true && (
                  <span className="text-red-500 text-xs">
                    Digite un correo valido
                  </span>
                )}
              </div>
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
                  className={
                    errorDireccion === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  ref={inputRefDireccion}
                />
                {errorDireccion === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorEstadoCivil === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setEstadoCivil(selectedDocumentType);
                  }}
                  value={estadoCivil}
                  ref={inputRefEstadoCivil}
                >
                  <option value="elegir" disabled className="text-gray-400">
                    --Selecciona un estado civil--
                  </option>
                  <option value="Soltero(a)">Soltero(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Viudo(a)">Viudo(a)</option>
                  <option value="Unión libre">Unión libre</option>
                </select>
                {errorEstadoCivil === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
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
                  className={
                    errorPais === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  ref={inputRefPais}
                />
                {errorPais === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label
                htmlFor="departamento"
                className="block text-sm font-medium text-gray-700"
              >
                Departamento<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="departamento"
                  name="departamento"
                  value={departamento}
                  className={
                    errorDepartamento === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  onChange={(e) => {
                    handleChangeDepartamento(e);
                  }}
                  ref={inputRefDepartamento}
                >
                  <option value="elegir" disabled>
                    -- Selecciona un Departamento--
                  </option>
                  {departamentos.map((item) => (
                    <option key={item.departamento} value={item.departamento}>
                      {item.departamento}
                    </option>
                  ))}
                </select>
                {errorDepartamento === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
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
                <select
                  id="ciudad"
                  name="ciudad"
                  placeholder="Seleccione la ciudad"
                  className={
                    errorCiudad === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={ciudad}
                  onChange={(e) => {
                    setCiudad(e.target.value);
                  }}
                  ref={inputRefCiudad}
                >
                  <option value="elegir" disabled>
                    -- Selecciona una Ciudad--
                  </option>
                  {municipios.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errorCiudad === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorNumHijos === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={numeroHijos}
                  onChange={(e) => setNumeroHijos(e.target.value)}
                  ref={inputRefNumHijos}
                />
                {errorNumHijos === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorTipoSangre === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={tipoSangre}
                  onChange={(e) => setTipoSangre(e.target.value)}
                  ref={inputRefTipoSangre}
                />
                {errorTipoSangre === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  placeholder="Digite su ultimo nivel profesional"
                  className={
                    errorNivel === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  onChange={(e) => {
                    const selectedNivel = e.target.value;
                    //console.log(selectedDocumentType);
                    setNivel(selectedNivel);
                  }}
                  value={nivel}
                  ref={inputRefNivel}
                >
                  <option value="elegir" disabled>
                    -- Selecciona un nivel academico--
                  </option>
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
                {errorNivel === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
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
                  placeholder="Digita su ultimo titulo profesional"
                  className={
                    errorTitulo === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  ref={inputRefTitulo}
                />
                {errorTitulo === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorAnioTitulo === false && errorAnioRango === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={anioTitulo}
                  onChange={(e) => setAnioTitulo(e.target.value)}
                  ref={inputAnioTitulo}
                />
                {errorAnioTitulo === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
                {errorAnioRango === true && (
                  <span className="text-red-500 text-xs">
                    No es un año valido. No se aceptan puntos ni comas
                  </span>
                )}
              </div>
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
                  className={
                    errorInstitucion === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={institucionTitulo}
                  onChange={(e) => setInstitucionTitulo(e.target.value)}
                  ref={inputInstitucion}
                />
                {errorInstitucion === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorNombreEmpresa === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={empresaExp}
                  onChange={(e) => setEmpresaExp(e.target.value)}
                  ref={inputNombreEmpresa}
                />
                {errorNombreEmpresa === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorEmpresaFechaInicio === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={fechaInicioExp}
                  onChange={(e) => setFechaInicioExp(e.target.value)}
                  ref={inputEmpresaFechaInicio}
                />
                {errorEmpresaFechaInicio === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                />
              </div>
              {errorSoporteExp === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 1mb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.soporteExp && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${curriculum[0].soporteExp
                      }`}
                    download={curriculum[0].soporteExp}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Soporte Experiencia
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-2 -mt-8">
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
                  className={
                    errorReferenciaA === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={nombreRefA}
                  onChange={(e) => setNombreRefA(e.target.value)}
                  ref={inputReferenciaA}
                />
                {errorReferenciaA === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  className={
                    errorReferenciaATelefono === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={telefonoRefA}
                  onChange={(e) => setTelefonoRefA(e.target.value)}
                  ref={inputReferenciaATelefono}
                />
                {errorReferenciaATelefono === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
              </div>
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
                  placeholder="Digita correo de la referencia 1"
                  className={
                    errorReferenciaACorreo === false &&
                      errorCorreoRefInput === false
                      ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  }
                  value={correoRefA}
                  onChange={(e) => setCorreoRefA(e.target.value)}
                  ref={inputReferenciaACorreo}
                />
                {errorReferenciaACorreo === true && (
                  <span className="text-red-500 text-xs">
                    Digite la información requerida
                  </span>
                )}
                {errorCorreoRefInput === true && (
                  <span className="text-red-500 text-xs">
                    Digite un correo valido
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Contactos
          </div>

          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              Contacto 1 <span className="italic"> (Personal)</span>
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
                />
              </div>
            </div>
          </div>
          {Object.keys(usuarioAutenticado).length !== 0 &&
            usuarioAutenticado &&
            usuarioAutenticado?.userType[0] === "colaborador" ? (
            <>
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
                    >
                      <option value="Asociacion Mutual Ser Eps">
                        Asociacion Mutual Ser Eps
                      </option>
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
                    />
                  </div>
                  {errorSoporteEps === true && (
                    <span className="text-red-500 text-xs">
                      El tamaño máximo es 1mb
                    </span>
                  )}
                  <div className="mt-3">
                    {curriculum[0]?.soporteEps && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${curriculum[0].soporteEps
                          }`}
                        download={curriculum[0].soporteEps}
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
                    />
                  </div>
                  {errorSoportePension === true && (
                    <span className="text-red-500 text-xs">
                      El tamaño máximo es 1mb
                    </span>
                  )}
                  <div className="mt-3">
                    {curriculum[0]?.soportePension && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${curriculum[0].soportePension
                          }`}
                        download={curriculum[0].soportePension}
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
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-6 ">
                          {codigoCIIU.length !== 1 && (
                            <button
                              className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => handleremove(i)}
                            >
                              Remover
                            </button>
                          )}
                          {codigoCIIU.length - 1 === i && (
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
                    />
                  </div>
                  {errorSoporteRut === true && (
                    <span className="text-red-500 text-xs">
                      El tamaño máximo es 1mb
                    </span>
                  )}
                  <div className="mt-3">
                    {curriculum[0]?.rut && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${curriculum[0].rut
                          }`}
                        download={curriculum[0].rut}
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
                    Número de Formulario
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
                    />
                  </div>
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className="hidden">
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
                    />
                  </div>
                </div>
                <div className=""></div>
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
                      onChange={(e) => {
                        setActivos(e.target.value);
                      }}
                      onBlur={(e) => {
                        sumPatrimonio(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setPasivos(e.target.value);
                      }}
                      onBlur={(e) => {
                        sumPatrimonio(e.target.value);
                      }}
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
                      readOnly="readonly"
                      onChange={(e) => setPatrimonio(e.target.value)}
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
                    <textarea
                      id="descripcionIngresos"
                      name="descripcionIngresos"
                      type="text"
                      placeholder=""
                      rows="3"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={descripcionIngresos}
                      onChange={(e) => setDescripcionIngresos(e.target.value)}
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
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite número de cuenta"
                            id="nro_cuenta"
                            name="nro_cuenta"
                            value={item.nro_cuenta}
                            onChange={(e) => handleinputchangeCuenta(e, i)}
                          />
                        </div>
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Banco
                          </label>
                          <input
                            type="text"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite banco"
                            id="banco"
                            name="banco"
                            value={item.banco}
                            onChange={(e) => handleinputchangeCuenta(e, i)}
                          />
                        </div>
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite la ciudad"
                            id="ciudad"
                            name="ciudad"
                            value={item.ciudad}
                            onChange={(e) => handleinputchangeCuenta(e, i)}
                          />
                        </div>

                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Pais
                          </label>
                          <input
                            type="text"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite el país"
                            id="pais"
                            name="pais"
                            value={item.pais}
                            onChange={(e) => handleinputchangeCuenta(e, i)}
                          />
                        </div>
                        <div className="">
                          <label className="block text-sm font-medium text-gray-700">
                            Moneda
                          </label>
                          <input
                            type="text"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite la moneda"
                            id="moneda"
                            name="moneda"
                            value={item.moneda}
                            onChange={(e) => handleinputchangeCuenta(e, i)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-6 ">
                          {inputCuentas.length !== 1 && (
                            <button
                              className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => handleremoveCuenta(i)}
                            >
                              Remover
                            </button>
                          )}
                          {inputCuentas.length - 1 === i && (
                            <button
                              className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                              onClick={handleaddclickCuenta}
                            >
                              Agregar
                            </button>
                          )}
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
                            operacionesExtranjera &&
                            operacionesExtranjera === "Si"
                          }
                          value="Si"
                          onChange={(e) =>
                            setOperacionesExtranjera(e.target.value)
                          }
                          ref={inputRefActividadEconomica}
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
                            operacionesExtranjera &&
                            operacionesExtranjera === "No"
                          }
                          value="No"
                          onChange={(e) => onchangeOperacionesExtranjera(e)}
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
                {operacionesExtranjera === "Si" ? (
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
                      />
                      <label htmlFor="otras">Otras</label>
                    </div>
                    {errorActividadEconomica === true ? (
                      <div>
                        <span className="text-red-500 text-xs">
                          Seleccione una de las anteriores opciones
                        </span>
                      </div>
                    ) : null}
                  </div>
                ) : null}

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
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Digite el nombre"
                                id="nombre"
                                name="nombre"
                                value={item.nombre}
                                onChange={(e) => handleinputchangeExt(e, i)}
                              />
                            </div>
                            <div className="">
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="text"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Digite el email"
                                id="email"
                                name="email"
                                value={item.email}
                                onChange={(e) => handleinputchangeExt(e, i)}
                              />
                            </div>
                            <div className="">
                              <label className="block text-sm font-medium text-gray-700">
                                Telefono
                              </label>
                              <input
                                type="text"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Digite el telefono"
                                id="telefono"
                                name="telefono"
                                value={item.telefono}
                                onChange={(e) => handleinputchangeExt(e, i)}
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
              <div className="hidden text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
                Referencias Bancarias
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hidden">
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                      readOnly="readonly"
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
                    <input
                      id="cargo"
                      name="cargo"
                      type="text"
                      autoComplete="cargo"
                      placeholder="Digitar el cargo"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={cargo}
                      readOnly="readonly"
                      onChange={(e) => setCargo(e.target.value)}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="hidden">
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
                      readOnly={true}
                      onChange={(e) => setUnidadFuncional(e.target.value)}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="hidden">
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
                      <option value="Uci Magangué">Uci Magangue</option>
                      <option value="Hospital Magangué">
                        Hospital Magangué
                      </option>
                      <option value="Hospital Mompox">Hospital Mompox</option>
                      <option value="Salud mental Mompox">
                        Salud mental Mompox
                      </option>
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
                      disabled={true}
                      accept=".pdf"
                    />
                  </div>
                  {errorSoporteContrato === true && (
                    <span className="text-red-500 text-xs">
                      El tamaño máximo es 1mb
                    </span>
                  )}
                  <div className="mt-3">
                    {curriculum[0]?.soporteContrato && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${curriculum[0].soporteContrato
                          }`}
                        download={curriculum[0].soporteContrato}
                        target="_blank"
                        className="underline text-blue-500 pt-5"
                      >
                        Soporte Contrato
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
                Documentos Requeridos
              </div>
              <div className="flex justify-end">
                <div className=" sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    onClick={(e) => activateModal(e)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Nuevo Documento
                  </button>
                </div>
              </div>
              <div>
                {Array.isArray(documentosRequeridos) &&
                  documentosRequeridos.length > 0 ? (
                  <ListarRequisitos
                    data={documentosRequeridos}
                    editModal={editModal}
                  />
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
                          No existen documentos cargados
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}

          {msg && <Alert alerta={alerta} />}
          {message && <ModalValidation modal={modal} />}

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto mt-3">
            <Link
              to="/"
              className="flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </Link>
            {loading === true ? (
              <button
                disabled={true}
                type="button"
                className="text-white bg-green-600  font-medium rounded text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Cargando...
              </button>
            ) : (
              <input
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                value="Guardar"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCurriculum;
