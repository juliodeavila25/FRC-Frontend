import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOfertas from "../../hooks/useOfertas";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const FormularioNuevaOferta = () => {
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0,10);
  
  
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  //   const [estado, setEstado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [convocatoria, setConvocatoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState(date);
  const [fechaFin, setFechaFin]= useState("")
  const [ciudad, setCiudad] = useState("");
  const [salario, setSalario] = useState("");
  const [auxilio, setAuxilio] = useState("");
  const [bonificaciones, setBonificaciones] = useState("");
  const [perfil, setPerfil] = useState("");
  const [funciones, setFunciones] = useState("");
  const [estadoConvocatoria, setEstadoConvocatoria]= useState("Activa")

  const params = useParams();

  console.log(params.id);

  const {
    submitOferta,
    mostrarAlerta,
    alerta,
    obtenerOferta,
    oferta,
    cargandoData,
  } = useOfertas();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(oferta._id);
      setNombre(oferta.nombre);
      setConvocatoria(oferta.convocatoria);
      setCiudad(oferta.ciudad);
      setSalario(oferta.salario);
      setAuxilio(oferta.auxilio);
      setBonificaciones(oferta.bonificaciones);
      setPerfil(oferta.perfil);
      setFunciones(oferta.funciones);
      setFechaInicio(oferta.fechaInicio?.split("T")[0]);
      setFechaFin(oferta.fechaFin?.split("T")[0]);
      setEstadoConvocatoria(oferta.estadoConvocatoria)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        convocatoria,
        ciudad,
        salario,
        auxilio,
        bonificaciones,
        perfil,
        funciones,
      ].includes("")
    ) {
      console.log(
        nombre,
        convocatoria,
        ciudad,
        salario,
        auxilio,
        bonificaciones,
        perfil,
        funciones
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
      auxilio,
      bonificaciones,
      perfil,
      funciones,
      fechaInicio,
      fechaFin,
      estadoConvocatoria
    });
  
  };

  const { msg } = alerta;

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
                Nro. Convocatoria <span class="text-red-700">*</span>
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
                  required="true"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Convocatoria <span class="text-red-700">*</span>
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
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaInicio"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Inicio <span class="text-red-700">*</span>
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
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha fin <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"  
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  placeholder="Digita tu numero de documento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="salario"
                className="block text-sm font-medium text-gray-700"
              >
                Salario <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="salario"
                  name="salario"
                  type="text"
                  placeholder="Seleccione su fecha de nacimiento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="auxilio"
                className="block text-sm font-medium text-gray-700"
              >
                Auxilio <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="auxilio"
                  name="auxilio"
                  type="text"
                  placeholder="Digite su lugar de nacimiento"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={auxilio}
                  onChange={(e) => setAuxilio(e.target.value)}
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bonificaciones"
                className="block text-sm font-medium text-gray-700"
              >
                Bonificaciones <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="bonificaciones"
                  name="bonificaciones"
                  type="text"
                  placeholder="Digite su número de telefono"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={bonificaciones}
                  onChange={(e) => setBonificaciones(e.target.value)}
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="perfil"
                className="block text-sm font-medium text-gray-700"
              >
                Perfil <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="perfil"
                  name="perfil"
                  type="text"
                  placeholder="Digite su correo electrónico"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                  disabled={active}
                  rows="6"
                  required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="funciones"
                className="block text-sm font-medium text-gray-700"
              >
                Funciones <span class="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="funciones"
                  name="funciones"
                  type="funciones"
                  placeholder="Digite su dirección"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={funciones}
                  onChange={(e) => setFunciones(e.target.value)}
                  rows="6"
                  required="true"
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
                  <option value="elegir" disabled className="text-gray-400" >
                    --Selecciona un estado--
                  </option>
                  <option value="Activa">
                    Activa
                  </option>
                  <option value="Pausada">
                    Pausada
                  </option>
                  <option value="Inactiva">Inactiva</option>
                </select>
                 
              </div>
            </div>
          </div>
          {msg && <Alert alerta={alerta} />}
          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
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
