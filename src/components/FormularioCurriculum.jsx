import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const FormularioCurriculum = () => {
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula de ciudadania");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [lugarNacimiento, setLugarNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [numeroHijos, setNumeroHijos] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  //Formación Profesional
  const [nivel, setNivel] = useState("Profesional");
  const [titulo, setTitulo] = useState("");
  const [anioTitulo, setAnioTitulo] = useState("");
  const [institucionTitulo, setInstitucionTitulo] = useState("");
  //Experiencia Profesional
  const [empresaExp, setEmpresaExp] = useState("");
  const [fechaInicioExp, setFechaInicioExp] = useState("");
  const [fechaFinExp, setFechaFinExp] = useState("");
  const [soporteExp, setSoporteExp] = useState("");
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
  const [pension, setPension] = useState("Protección");
  const [soportePension, setSoportePension] = useState("");
  //Informacion financiera
  const [inputFinanciera, setinputFinanciera] = useState([
    { ciu: "", actividad_economica: "" },
  ]);

  const [rut, setRut] = useState("");
  const [numeroRut, setNumeroRut] = useState("");
  const [fechaCorte, setFechaCorte] = useState("");
  const [ingresosAnuales, setIngresosAnuales] = useState("");
  const [egresosAnuales, setEgresosAnuales] = useState("");
  const [otrosIngresos, setOtrosIngresos] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [activos, setActivos] = useState("");
  const [pasivos, setPasivos] = useState("");
  const [descripcionIngresos, setDescripcionIngresos] = useState("");

  const [poseeCuenta, setPoseeCuenta] = useState("Si");
  const [inputCuentas, setInputCuentas] = useState([
    { nro_cuenta: "", banco: "", ciudad: "", pais: "", moneda: "" },
  ]);

  const [operacionesExtranjera, setOperacionesExtranjera] = useState("Si");

  const [exportaciones, setExportaciones] = useState("");
  const [transferencias, setTransferencias] = useState("");
  const [pagoServicios, setPagoServicios] = useState("");
  const [importaciones, setImportaciones] = useState("");
  const [prestamos, setPrestamos] = useState("");
  const [otras, setOtras] = useState("");

  //Referencias Bancarias
  const [tipoCuenta, setTipoCuenta] = useState("Ahorro");
  const [entidadBancaria, setEntidadBancaria] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  //Contractual
  const [tipoContrato, setTipoContrato] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const params = useParams();

  const {
    submitCurriculum,
    mostrarAlerta,
    alerta,
    obtenerCurriculum,
    curriculum,
    cargandoData,
  } = useCurriculum();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    obtenerCurriculum(auth._id);
  }, []);

  useEffect(() => {
    if (curriculum.length > 0) {
      console.log(curriculum);
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
      setRut(curriculum[0].rut);
      setNumeroRut(curriculum[0].numeroRut);
      setFechaCorte(curriculum[0].fechaCorte);
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
      setFechaIngreso(curriculum[0].fechaIngreso);
      setFechaFin(curriculum[0].fechaFin);
    }
  }, [curriculum]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   [
    //     nombre,
    //     tipoDocumento,
    //     numeroDocumento,
    //     fechaNacimiento,
    //     lugarNacimiento,
    //     telefono,
    //     correo,
    //     direccion,
    //     estadoCivil,
    //     pais,
    //     departamento,
    //     ciudad,
    //     numeroHijos,
    //     tipoSangre,
    //     nivel,
    //     titulo,
    //     anioTitulo,
    //     institucionTitulo,
    //     empresaExp,
    //     fechaInicioExp,
    //     fechaFinExp,
    //     nombreRefA,
    //     telefonoRefA,
    //     correoRefA,
    //     nombreRefB,
    //     telefonoRefB,
    //     correoRefB,
    //     eps,
    //     pension,
    //     tipoCuenta,
    //     entidadBancaria,
    //     numeroCuenta
    //   ].includes("")
    // ) {
    //   console.log(
    //     nombre,
    //     tipoDocumento,
    //     numeroDocumento,
    //     fechaNacimiento,
    //     lugarNacimiento,
    //     telefono,
    //     correo,
    //     direccion,
    //     estadoCivil,
    //     pais,
    //     departamento,
    //     ciudad,
    //     numeroHijos,
    //     tipoSangre,
    //     nivel,
    //     titulo,
    //     anioTitulo,
    //     institucionTitulo,
    //     empresaExp,
    //     fechaInicioExp,
    //     fechaFinExp,
    //     nombreRefA,
    //     telefonoRefA,
    //     correoRefA,
    //     nombreRefB,
    //     telefonoRefB,
    //     correoRefB,
    //     eps,
    //     pension,
    //     tipoCuenta,
    //     entidadBancaria,
    //     numeroCuenta
    //   );
    //   mostrarAlerta({
    //     msg: "Todos los campos son obligatorios",
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
    console.log(formData);
    //Pasar los datos hacia el provider
    await submitCurriculum(formData, estado);
    // id,
    //   estado,
    //   nombre,
    //   tipoDocumento,
    //   numeroDocumento,
    //   fechaNacimiento,
    //   lugarNacimiento,
    //   telefono,
    //   correo,
    //   direccion,
    //   estadoCivil,
    //   pais,
    //   departamento,
    //   ciudad,
    //   numeroHijos,
    //   tipoSangre,
    //   nivel,
    //   titulo,
    //   anioTitulo,
    //   institucionTitulo,
    //   empresaExp,
    //   fechaInicioExp,
    //   fechaFinExp,
    //   nombreRefA,
    //   telefonoRefA,
    //   correoRefA,
    //   nombreRefB,
    //   telefonoRefB,
    //   correoRefB,
    //   eps,
    //   pension,
    //   tipoCuenta,
    //   entidadBancaria,
    //   numeroCuenta,
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };

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
      { nro_cuenta: "", banco: "", ciudad: "", pais: "", moneda: "" },
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

  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        {msg && <Alert alerta={alerta} />}
        <form
          className="space-y-6 "
          onSubmit={handleSubmit}
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
                Nombre completo
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tipoDocumento"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Documento
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
                Documento de Identidad
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Nacimiento
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
                Lugar de Nacimiento
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Celular/Telefono
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electronico
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="estadoCivil"
                className="block text-sm font-medium text-gray-700"
              >
                Estado Civil
              </label>
              <div className="mt-1">
                <input
                  id="estadoCivil"
                  name="estadoCivil"
                  type="text"
                  placeholder="Digite su estado civil"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={estadoCivil}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="block text-sm font-medium text-gray-700"
              >
                Pais
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="departamento"
                className="block text-sm font-medium text-gray-700"
              >
                Departamento
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad
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
                />
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tipoSangre"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Sangre
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
                Nivel
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
                Titulo
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="anioTitulo"
                className="block text-sm font-medium text-gray-700"
              >
                Año obtención titulo
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="institucionTitulo"
                className="block text-sm font-medium text-gray-700"
              >
                Institución
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
                Empresa
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fechaInicioExp"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Inicio
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
                  onChange={(e) => setSoporteExp(e.target.files[0])}
                />
              </div>
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
              Referencia 1
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="nombreRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="telefonoRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Celular/Telefono
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="correoRefA"
                className="block text-sm font-medium text-gray-700"
              >
                Correo
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
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              Referencia 2
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
                >
                  <option value="Sura">Sura</option>
                  <option value="Salud Total">Salud Total</option>
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
                  onChange={(e) => setSoporteEps(e.target.files[0])}
                />
              </div>
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
                  <option value="Protección">Protección</option>
                  <option value="Porvenir">Porvenir</option>
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
                  onChange={(e) => setSoportePension(e.target.files[0])}
                />
              </div>
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
            {inputFinanciera.map((item, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5"
                >
                  <div className="">
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
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-6 ">
                    {inputFinanciera.length !== 1 && (
                      <button
                        className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => handleremove(i)}
                      >
                        Remover
                      </button>
                    )}
                    {inputFinanciera.length - 1 === i && (
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
                  onChange={(e) => setRut(e.target.files[0])}
                />
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
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fechaCorte"
                className="block text-sm font-medium text-gray-700"
              >
                Número RUT
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
                  value="exportaciones"
                  checked={exportaciones === "exportaciones"}
                  onChange={(e) => setExportaciones(e.target.value)}
                />
                <label htmlFor="exportaciones">Exportaciones</label>
              </div>

              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="transferencias"
                  name="transferencias"
                  value="transferencias"
                  checked={transferencias === "transferencias"}
                  onChange={(e) => setTransferencias(e.target.value)}
                />
                <label htmlFor="transferencias">Transferencias</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="pagoServicios"
                  name="pagoServicios"
                  value="pagoServicios"
                  checked={pagoServicios === "pagoServicios"}
                  onChange={(e) => setPagoServicios(e.target.value)}
                />
                <label htmlFor="pagoServicios">Pago de Servicios</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="importaciones"
                  name="importaciones"
                  value="importaciones"
                  checked={importaciones === "importaciones"}
                  onChange={(e) => setImportaciones(e.target.value)}
                />
                <label htmlFor="importaciones">Importaciones</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="prestamos"
                  name="prestamos"
                  value="prestamos"
                  checked={prestamos === "prestamos"}
                  onChange={(e) => setPrestamos(e.target.value)}
                />
                <label htmlFor="prestamos">Prestamos en Moneda</label>
              </div>
              <div className="flex space-x-4 items-center  pl-4">
                <input
                  type="checkbox"
                  id="otras"
                  name="otras"
                  value="otras"
                  checked={otras === "otras"}
                  onChange={(e) => setOtras(e.target.value)}
                />
                <label htmlFor="otras">Otras</label>
              </div>
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
          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
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
