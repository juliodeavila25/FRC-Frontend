import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useFuncional from "../../hooks/useFuncional";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useCargos from "../../hooks/useCargos";
import useUnidad from "../../hooks/useUnidad";

const FormularioNuevaUnidadFuncional = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("elegir");
  const [estado, setEstado] = useState("Pendiente");
  const [inputCargos, setInputCargos] = useState([
    {
      cargo: "",
      cantidad: "",
    },
  ]);

  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const [errorNombre, setErrorNombre] = useState(false);

  const inputRefEstado = useRef(null);
  const [errorEstado, setErrorEstado] = useState(false);

  const inputRefNegocio = useRef(null);
  const [errorUnidadNegocio, seterrorUnidadNegocio] = useState(false);

  const params = useParams();
  const { obtenerFuncionalesForm, funcionalesForm, alerta, cargandoDataFuncionales,funcional, submitFuncional } =
  useFuncional();

  const { unidadesForm, obtenerUnidadesForm } =
  useUnidad();

  const { auth, cargando } = useAuth();

  const { obtenerCargosForm, cargosForm } = useCargos();


  useEffect(() => {
    if (params.id) {
      setId(funcional._id);
      setNombre(funcional.nombre);
      setNegocio(funcional.negocio)
      setEstado(funcional.estado);
      setInputCargos(funcional.inputCargos)
    }
  }, [funcional]);

  useEffect(() => {
    obtenerUnidadesForm();
    obtenerFuncionalesForm();
    obtenerCargosForm();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === "") {
      inputRef.current.focus();
      setErrorNombre(true);
      return;
    } else {
      setErrorNombre(false);
    }

    if (negocio === "elegir") {
      inputRefNegocio.current.focus();
      seterrorUnidadNegocio(true);
      return;
    } else {
      seterrorUnidadNegocio(false);
    }

    await submitFuncional({
      id,
      nombre,
      negocio,
      inputCargos,
      estado,
    });
  };

  const handleaddclick = () => {
    setInputCargos([
      ...inputCargos,
      {
        cargo: "",
        cantidad: "",
      },
    ]);
  };

  const handleinputchange = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...inputCargos];
    if (e.target.type === "checkbox") {
      list[index][name] = checked;
    } else {
      list[index][name] = value;
    }
    setInputCargos(list);
  };

  const handleremove = (index) => {
    const list = [...inputCargos];
    list.splice(index, 1);
    setInputCargos(list);
  };

  const { msg } = alerta;

  if (cargandoDataFuncionales) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Unidad Funcional
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Unidad Funcional{" "}
                  <span className="text-red-700">*</span>
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
                  htmlFor="negocio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidad de negocio
                </label>
                <div className="mt-1">
                  <select
                    id="negocio"
                    name="negocio"
                    className={
                      errorUnidadNegocio === false
                        ? "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        : "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none  sm:text-sm"
                    }
                    onChange={(e) => setNegocio(e.target.value)}
                    value={negocio}
                    ref={inputRefNegocio}
                    required={true}
                  >
                    <option value="elegir" disabled>
                      -- Selecciona una unidad de negocio--
                    </option>
                    {unidadesForm.map((item, i) => {
                      return (
                        <option key={i} value={item.nombre}>
                          {item.nombre}
                        </option>
                      );
                    })}
                  </select>
                  {errorUnidadNegocio === true && (
                    <span className="text-red-500 text-xs">
                      Seleccione una unidad de negocio
                    </span>
                  )}
                </div>
              </div>
            </div>

            {inputCargos &&
              Array.isArray(inputCargos) &&
              inputCargos.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6  items-center "
                  >
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 pt-4">
                        Nombre Cargo
                      </label>
                      <select
                        id="nombre_cargo"
                        name="nombre_cargo"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => handleinputchange(e, i)}
                        value={item.nombre_cargo}
                        required={true}
                        // disabled={
                        //   (Array.isArray(cargo.inputCargos) &&
                        //     i >= cargo.inputCargos?.length) ||
                        //   (params.id === undefined && inputCargos.length >= 1)
                        //     ? false
                        //     : true
                        // }
                      >
                        <option
                          value="elegir"
                          disabled
                          className="text-gray-400"
                        >
                          --Selecciona un cargo--
                        </option>
                        {cargosForm.map((item, i) => {
                          return (
                            <option key={i} value={item.nombre}>
                              {item.nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="cantidad"
                        className="block text-sm font-medium text-gray-700 pt-4"
                      >
                        Cantidad
                        <span className="text-red-700">*</span>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="cantidad"
                          name="cantidad"
                          placeholder="Digita la cantidad"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={item.cantidad}
                          onChange={(e) => handleinputchange(e, i)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4  ">
                      {inputCargos.length !== 1 && (
                        <button
                          className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => handleremove(i)}
                        >
                          Remover
                        </button>
                      )}

                      {inputCargos.length - 1 === i && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
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

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto pt-10">
              <Link
                to="/unidades-funcionales/listar-unidades-funcionales"
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

export default FormularioNuevaUnidadFuncional;
