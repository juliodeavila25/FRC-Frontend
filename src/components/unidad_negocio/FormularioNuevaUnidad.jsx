import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useUnidad from "../../hooks/useUnidad";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const FormularioNuevaUnidad = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  
  const [estado, setEstado] = useState("Pendiente");
  

  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  const inputRefEstado = useRef(null);
  const [errorEstado, setErrorEstado] = useState(false);

  const params = useParams();
  const { submitUnidad, mostrarAlerta, alerta, unidad, cargandoDataUnidad } = useUnidad();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(unidad._id);
      setNombre(unidad.nombre);
      setEstado(unidad.estado);
    }
  }, [unidad]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    await submitUnidad({
      id,
      nombre,
      estado
     
    });
  };

  
  const { msg } = alerta;

  if (cargandoDataUnidad) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Unidad de Negocio
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Unidad de Negocio <span className="text-red-700">*</span>
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
                    disabled={auth?.userType[0] === "gerente" ? false : true}
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
                to="/unidades-negocio/listar-unidades-negocio"
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

export default FormularioNuevaUnidad;
