import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import usePregunta from "../../hooks/usePregunta";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import useCargos from "../../hooks/useCargos";
import ModalSave from "../ModalSave";


const FormularioNuevaPregunta = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("")
  const [cargo, setCargo] = useState("elegir");
  const [textoPreguntas, setTextoPreguntas] = useState("");
  const [respuestaPreguntas, setRespuestaPreguntas] = useState("");
  const [fuente, setFuente] = useState("Durante entrevista");
  const [estado, setEstado] = useState("Activo");

  const { obtenerCargosForm, cargosForm } = useCargos();

  const params = useParams();
  const { submitPregunta, mostrarAlerta, alerta, pregunta, cargandoDataPregunta, loading, modal } =
    usePregunta();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    obtenerCargosForm();
  }, []);

  useEffect(() => {
    if (params.id) {
      setId(pregunta._id);
      setCargo(pregunta.cargo);
      setEstado(pregunta.estado);
      setTextoPreguntas(pregunta.textoPreguntas);
      setRespuestaPreguntas(pregunta.respuestaPreguntas)
      setFuente(pregunta.fuente)

    }
  }, [pregunta]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    await submitPregunta({
      id,
      cargo,
      estado,
      textoPreguntas,
      respuestaPreguntas,
      fuente
    });
  };

  const { message } = modal;
  const { msg } = alerta;

  if (cargandoDataPregunta) return <BeatLoader color="#36d7b7" />;



  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Preguntas
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
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
                    className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                    onChange={(e) => setCargo(e.target.value)}
                    value={cargo}
                    required={true}
                  >
                    <option value="elegir" disabled>
                      -- Selecciona un cargo--
                    </option>
                    <option value="todos" >
                      Todos los cargos
                    </option>
                    {cargosForm.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.nombre}
                        </option>
                      );
                    })}
                  </select>

                </div>
              </div>

              <div>
                <label
                  htmlFor="textoPreguntas"
                  className="block text-sm font-medium text-gray-700"
                >
                  Texto de la pregunta <span className="text-red-700">*</span>
                </label>
                <div>
                  <textarea
                    id="textoPreguntas"
                    name="textoPreguntas"
                    type="text"
                    placeholder=""
                    rows="3"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={textoPreguntas}
                    onChange={(e) => setTextoPreguntas(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="respuestaPreguntas"
                  className="block text-sm font-medium text-gray-700"
                >
                  Respuesta sugerida <span className="text-red-700">*</span>
                </label>
                <div>
                  <textarea
                    id="respuestaPreguntas"
                    name="respuestaPreguntas"
                    type="text"
                    placeholder=""
                    rows="3"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={respuestaPreguntas}
                    onChange={(e) => setRespuestaPreguntas(e.target.value)}
                    required={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fuente"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuente <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="fuente"
                    name="fuente"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setFuente(e.target.fuente)}
                    value={fuente}
                  >
                    <option
                      value="elegir"
                      disabled
                      className="text-gray-400"
                    >
                      --Selecciona un tipo de documento--
                    </option>
                    <option value="Durante entrevista">Durante entrevista</option>
                    <option value="Antes de entrevista">Antes de entrevista</option>
                  </select>
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
            {message && <ModalSave modal={modal} />}

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
              <Link
                to="/preguntas/listar-preguntas"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevaPregunta;
