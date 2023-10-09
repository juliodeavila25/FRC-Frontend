import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useHerramienta from "../../hooks/useHerramienta";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";


const FormularioNuevaHerramienta = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcionHerramienta, setDescripcionHerramienta] = useState("")
  const [estado, setEstado] = useState("Activo");



  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  const inputRefEstado = useRef(null);
  const [errorEstado, setErrorEstado] = useState(false);

  const params = useParams();
  const { submitHerramienta, mostrarAlerta, alerta, herramienta, cargandoDataHerramienta } =
    useHerramienta();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(herramienta._id);
      setNombre(herramienta.nombre);
      setEstado(herramienta.estado);
      setDescripcionHerramienta(herramienta.descripcionHerramienta);

    }
  }, [herramienta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    await submitHerramienta({
      id,
      nombre,
      estado,
      descripcionHerramienta
    });
  };

  const { msg } = alerta;

  if (cargandoDataHerramienta) return <BeatLoader color="#36d7b7" />;



  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Herramientas
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre herramienta
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Digita el nombre de la herramienta"
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
                  htmlFor="descripcionHerramienta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción de la herramienta
                  <span className="text-red-700">*</span>
                </label>
                <div>
                  <textarea
                    id="descripcionHerramienta"
                    name="descripcionHerramienta"
                    type="text"
                    placeholder=""
                    rows="3"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={descripcionHerramienta}
                    onChange={(e) => setDescripcionHerramienta(e.target.value)}
                    required={true}
                  />
                </div>
              </div>


              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required={true}
                >

                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

            </div>

            {msg && <Alert alerta={alerta} />}

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
              <Link
                to="/herramientas/listar-herramientas"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevaHerramienta;
