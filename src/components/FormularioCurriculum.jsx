import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCurriculum from "../hooks/useCurriculum";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const FormularioCurriculum = () => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula de ciudadania");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [lugarNacimiento, setlugarNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [numeroHijos, setNumeroHijos] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");

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
      setId(auth._id);
      setEstado(curriculum[0].estado);
      setNombre(curriculum[0].nombre);
      setTipoDocumento(curriculum[0].tipoDocumento);
      setNumeroDocumento(curriculum[0].numeroDocumento);
      setFechaNacimiento(curriculum[0].fechaNacimiento?.split("T")[0]);
      setlugarNacimiento(curriculum[0].lugarNacimiento);
      setTelefono(curriculum[0].telefono);
      setCorreo(curriculum[0].correo);
      setDireccion(curriculum[0].direccion);
      setEstadoCivil(curriculum[0].estadoCivil);
      setPais(curriculum[0].pais);
      setDepartamento(curriculum[0].departamento);
      setCiudad(curriculum[0].ciudad);
      setNumeroHijos(curriculum[0].numeroHijos);
      setTipoSangre(curriculum[0].tipoSangre);
    }
  }, [curriculum]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        tipoDocumento,
        numeroDocumento,
        fechaNacimiento,
        lugarNacimiento,
        telefono,
        correo,
        direccion,
        estadoCivil,
        pais,
        departamento,
        ciudad,
        numeroHijos,
        tipoSangre,
      ].includes("")
    ) {
      console.log(
        nombre,
        tipoDocumento,
        numeroDocumento,
        fechaNacimiento,
        lugarNacimiento,
        telefono,
        correo,
        direccion,
        estadoCivil,
        pais,
        departamento,
        ciudad,
        numeroHijos,
        tipoSangre
      );
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Pasar los datos hacia el provider
    await submitCurriculum({
      id,
      estado,
      nombre,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      lugarNacimiento,
      telefono,
      correo,
      direccion,
      estadoCivil,
      pais,
      departamento,
      ciudad,
      numeroHijos,
      tipoSangre,
    });
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };

  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        {msg && <Alert alerta={alerta} />}
        <form className="space-y-6 " onSubmit={handleSubmit}>
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
                  disabled={active}
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
                    console.log(selectedDocumentType);
                    setTipoDocumento(selectedDocumentType);
                  }}
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  onChange={(e) => setlugarNacimiento(e.target.value)}
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
                  disabled={active}
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
