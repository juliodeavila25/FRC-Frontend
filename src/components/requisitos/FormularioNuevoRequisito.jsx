import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useRequisito from "../../hooks/useRequisito";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";


const FormularioNuevoRequisito = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [vigencia, setVigencia] = useState(false);
  const [emisor, setEmisor] = useState(false);
  const [fechaExp, setFechaExp] = useState(false)
  const [reference, setReference] = useState(false);
  const [estado, setEstado] = useState("Pendiente");
  const [descripcionRequisito, setDescripcionRequisito] = useState("")


  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  const inputRefEstado = useRef(null);
  const [errorEstado, setErrorEstado] = useState(false);

  const params = useParams();
  const { submitRequisitoBo, mostrarAlerta, alerta, requisitoBo, cargandoDataRequisitoBo } =
    useRequisito();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(requisitoBo._id);
      setNombre(requisitoBo.nombre);
      setEstado(requisitoBo.estado);
      setVigencia(requisitoBo.vigencia);
      setEmisor(requisitoBo.emisor);
      setFechaExp(requisitoBo.fechaExp);
      setReference(requisitoBo.reference);
      setEstado(requisitoBo.estado);
      setDescripcionRequisito(requisitoBo.descripcionRequisito);

    }
  }, [requisitoBo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    await submitRequisitoBo({
      id,
      nombre,
      vigencia,
      emisor,
      fechaExp,
      reference,
      estado,
      descripcionRequisito
    });
  };

  const { msg } = alerta;

  if (cargandoDataRequisitoBo) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Requisitos para cargos
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Requisito{" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Digita el nombre del requisito"
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

              <div className="flex space-x-4 items-center pl-4"></div>
              <div className="flex space-x-4 items-center ">
                <input
                  type="checkbox"
                  id="vigencia"
                  name="vigencia"
                  value={vigencia}
                  checked={vigencia}
                  onChange={(e) => setVigencia(e.target.checked)}

                />
                <label htmlFor="vigencia">¿Tiene fecha de vigencia?</label>
              </div>
              <div className="flex space-x-4 items-center ">
                <input
                  type="checkbox"
                  id="emisor"
                  name="emisor"
                  value={emisor}
                  checked={emisor}
                  onChange={(e) => setEmisor(e.target.checked)}
                />
                <label htmlFor="emisor">¿Emisor o expedido por?</label>
              </div>
              <div className="flex space-x-4 items-center ">
                <input
                  type="checkbox"
                  id="fechaExp"
                  name="fechaExp"
                  value={fechaExp}
                  checked={fechaExp}
                  onChange={(e) => setFechaExp(e.target.checked)}

                />
                <label htmlFor="fecha_exp">Fecha de expedición</label>
              </div>
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  id="reference"
                  name="reference"
                  value={reference}
                  checked={reference}
                  onChange={(e) => setReference(e.target.checked)}
                />
                <label htmlFor="ref">Numero de documento o referencia</label>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Estado requisito
                </label>
                <select
                  id="estado"
                  name="estado"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required={true}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="descripcionRequisito"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del requisito
                </label>
                <div>
                  <textarea
                    id="descripcionRequisito"
                    name="descripcionRequisito"
                    type="text"
                    placeholder=""
                    rows="3"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={descripcionRequisito}
                    onChange={(e) => setDescripcionRequisito(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {msg && <Alert alerta={alerta} />}

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
              <Link
                to="/requisitos/listar-requisitos"
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

export default FormularioNuevoRequisito;
