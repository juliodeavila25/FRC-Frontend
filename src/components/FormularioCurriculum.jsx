import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";
import useCargos from "../hooks/useCargos"
import useCollaborators from "../hooks/useCollaborators";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import ciuu from '../json/ciuu.json'
import Select from 'react-select'
import departamentos from '../json/departamentos_municipios.json'


const FormularioCurriculum = () => {
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula de ciudadania");
  const [numeroDocumento, setNumeroDocumento] = useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState( '1990-01-01');
  const [lugarNacimiento, setLugarNacimiento] = useState("");
  const [telefono, setTelefono] = useState(0);
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("Soltero(a)");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const[municipios, setMunicipios] = useState([]);
  const [numeroHijos, setNumeroHijos] = useState(0);
  const [tipoSangre, setTipoSangre] = useState("");
  //Formación Profesional
  const [nivel, setNivel] = useState("Profesional");
  const [titulo, setTitulo] = useState("");
  const [anioTitulo, setAnioTitulo] = useState(0);
  const [institucionTitulo, setInstitucionTitulo] = useState("");
  //Experiencia Profesional
  const [empresaExp, setEmpresaExp] = useState("");
  const [fechaInicioExp, setFechaInicioExp] = useState( '1990-01-01');
  const [fechaFinExp, setFechaFinExp] = useState( '1990-01-01');
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

  const[codigoCIIU, setCodigoCIIU]=useState([{
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
  const [fechaIngreso, setFechaIngreso] = useState( '1990-01-01');
  const [fechaFin, setFechaFin] = useState( '1990-01-01');
  const [empresa, setEmpresa] = useState("");
  const [nomina, setNomina] = useState("");
  const [codigoIngreso, setCodigoIngreso] = useState(0);
  const [sueldo, setSueldo] = useState(0);
  const [soporteContrato, setSoporteContrato] = useState("");
  const [errorSoporteContrato, setErrorSoporteContrato] = useState(false);
  const [cargo, setCargo] = useState("");

  const[cargosFiltrado, setCargosFiltrado] = useState([])
  const [inputReq, setInputReq] = useState([
    { nombre_requisito: " ", documento: " ", observaciones:" ", estado_requisito:"" },
  ]);
  const params = useParams();

  const {
    submitCurriculum,
    mostrarAlerta,
    alerta,
    obtenerCurriculum,
    curriculum,
    cargandoData,
  } = useCurriculum();

  const{cargos, obtenerCargosForm, cargosForm} = useCargos();

  const { auth, cargando } = useAuth();
  //console.log(auth.documento);
  //console.log(auth._id);
  useEffect(() => {
      obtenerCurriculum(auth._id);
      obtenerCargosForm()
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
      setCodigoCIIU(curriculum[0].codigoCIIU)
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

      let municipiosFilter = departamentos.filter(function(departamento){
        return departamento.departamento == curriculum[0].departamento;
        
    })

    setMunicipios(municipiosFilter[0].ciudades)

    }
  }, [curriculum]);

  useEffect(() => {
    if (Array.isArray(cargosForm) && cargosForm.length > 0 && Array.isArray(curriculum) && curriculum.length > 0) {
      setInputReq([
    { nombre_requisito: " ", documento: " ", observaciones:" ", estado_requisito:"" },
    ]);
    let cargo_new = Array.isArray(cargosForm) && cargosForm.filter(item => item.nombre.includes(cargo))
    cargo_new[0]?.inputCargos.forEach(item =>{
       return(
        setInputReq(inputReq => 
          [
            ...inputReq,
            { nombre_requisito: item.nombre_requisito, documento: "", observaciones: "", estado_requisito: item.estado_requisito },
          ]))
      
    })
    }
   
   
   

    //setInputReq(cargo_full)
    // setCargosFiltrado(Array.isArray(cargos) && cargos.filter(item => item.nombre.includes(cargo)))
    // console.log(cargosFiltrado)

   
  }, [cargosForm, curriculum])
  
  //console.log(inputReq)

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     nombre: " assa",
  //     numeroDocumento: " ",
  //     fechaNacimiento: " ",
  //     lugarNacimiento: " ",
  //     telefono: " ",
  //     correo: " ",
  //     direccion: " ",
  //     pais: " ",
  //     departamento: " ",
  //     ciudad: " ",
  //     numeroHijos: " ",
  //     tipoSangre: " ",
  //     nivel: " ",
  //     titulo: " ",
  //     anioTitulo: " ",
  //     institucionTitulo: " ",
  //     empresaExp: " ",
  //     fechaInicioExp: " ",
  //     nombreRefA: " ",
  //     telefonoRefA: " ",
  //     correoRefA: " ",
  //   },
  // });

  const submitData = async (e) => {
    e.preventDefault();

    localStorage.setItem("tipo", "formCo");

    //console.log(errors);

    if (errorSoporteExp === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Experiencia Laboral es de 500kb",
        error: true,
      });
      return;
    }

    if (errorSoporteEps === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Eps es de 500kb",
        error: true,
      });
      return;
    }

    if (errorSoportePension === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Pensión es de 500kb",
        error: true,
      });
      return;
    }

    if (errorSoporteRut === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Rut es de 500kb",
        error: true,
      });
      return;
    }

    if (errorSoporteContrato === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte del contrato es de 500kb",
        error: true,
      });
      return;
    }

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
    //console.log(formData);
    //Pasar los datos hacia el provider
    
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
    setCodigoCIIU([
      ...codigoCIIU,
      {  value: "" },
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
  
  const sumPatrimonio = function(){
    setPatrimonio(Number(activos) - Number(pasivos));
}



const handleChangeDepartamento = (e)=>{
   const selectedDepartamento = e.target.value;
    setDepartamento(selectedDepartamento);
    setMunicipios("")

    let municipiosFilter = departamentos.filter(function(departamento){
        return departamento.departamento == e.target.value;
        
    })

    setMunicipios(municipiosFilter[0].ciudades)
   
}
  
  const { msg } = alerta;


  

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

              <div className="">
                <label
                  htmlFor="tipoDocumento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departamento<span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                <select
                id="departamento"
                name="departamento"
                value={departamento}
                placeholder="Seleccione el departamento"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => {handleChangeDepartamento(e)}}
                
                >
                {departamentos.map((item) =>(
                    <option key={item.departamento} value={item.departamento}>{item.departamento}</option>
                ))}
                
                </select>
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={ciudad}
                  onChange={(e) => {setCiudad(e.target.value) }}
                  >
                  {municipios.map((item) =>(
                      <option key={item} value={item}>{item}</option>                      
                  ))}
                  
                  </select>
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroHijos}
                  onChange={(e) => setNumeroHijos(e.target.value)}
                  required
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
                />
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
                  placeholder="Digita su ultimo nivel profesional"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedNivel = e.target.value;
                    //console.log(selectedDocumentType);
                    setNivel(selectedNivel);
                  }}
                  value={nivel}
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
                
                />
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={institucionTitulo}
                  onChange={(e) => setInstitucionTitulo(e.target.value)}
                  required
                />
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={empresaExp}
                  onChange={(e) => setEmpresaExp(e.target.value)}
                  required
                />
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaInicioExp}
                  onChange={(e) => setFechaInicioExp(e.target.value)}
                  required
                />
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
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.soporteExp && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      curriculum[0].soporteExp
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
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex pt-3">
            Referencias
          </div>
          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              Referencia 1 <span className="italic"> (Familiar)</span>
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
          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              Referencia 2 <span className="italic"> (Personal)</span>
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
                />
              </div>
              {errorSoporteEps === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.soporteEps && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      curriculum[0].soporteEps
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
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.soportePension && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      curriculum[0].soportePension
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
                      onChange={(e) => handleinputchange(e, i)}  />
                      
                    </div> 
                    {/* <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        CIU
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
                        id="ciu"
                        name="ciu"
                        value={item.ciu}
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Actividad Economica
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
                        id="actividad_economica"
                        name="actividad_economica"
                        value={item.actividad_economica}
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div> */}
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
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.rut && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      curriculum[0].rut
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
                  onChange={(e) => { setActivos(e.target.value)}}
                  onBlur={(e) => { sumPatrimonio(e.target.value)}}
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
                  onChange={(e) => { setPasivos(e.target.value)}}
                  onBlur={(e) => { sumPatrimonio(e.target.value)}}
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
                        operacionesExtranjera && operacionesExtranjera === "Si"
                      }
                      value="Si"
                      onChange={(e) => setOperacionesExtranjera(e.target.value)}
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
                  placeholder="Digitar la cargo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={cargo}
                  readOnly="readonly"
                  onChange={(e) => setCargo(e.target.value)}
                />
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
                  disabled="disabled"
                  accept=".pdf"
                />
              </div>
              {errorSoporteContrato === true && (
                <span className="text-red-500 text-xs">
                  El tamaño máximo es 500kb
                </span>
              )}
              <div className="mt-3">
                {curriculum[0]?.soporteContrato && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      curriculum[0].soporteContrato
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
          <div className="">
            { inputReq &&
              Array.isArray(inputReq) && inputReq.length > 0 && inputReq.map(item =>{
                
                return(
                  <div  key={item.nombre_requisito}>
                  <>
                  {item.estado_requisito === "Activo" || item.estado_requisito === " " ? (
                        <div className="grid grid-cols-3 gap-10  items-center border border-gray-200 p-2 rounded-ful"> 
                    <div className="py-10" name="" >{item.nombre_requisito}</div>
                     <div>
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
                          id="soportePrimero"
                          name="soportePrimero"
                          //onChange={(e) => handleSoporteContrato(e.target.files[0])}
                          disabled={item.estado === "Inactivo" ? true : false}
                          accept=".pdf"
                        />
                    </div>

                     <textarea
                        id="descripcionIngresos"
                        name="descripcionIngresos"
                        type="text"
                        placeholder=""
                        rows="2"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                        //value={descripcionIngresos}
                        //onChange={(e) => setDescripcionIngresos(e.target.value)}
                      />

                  </div>
                  ): null} 
                  </>
                  </div>
                )})
             
            } 

           
          </div>
          


            
 
   
  

          {msg && <Alert alerta={alerta} />}
          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto mt-3">
            <Link
              to="/"
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

export default FormularioCurriculum;
