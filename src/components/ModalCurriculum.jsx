import { useState } from "react";
import useDocumentosRequeridos from "../hooks/useDocumentosRequeridos"
import Alert from "./Alert";
import { useEffect } from "react";
import useCargos from "../hooks/useCargos"

export default function ModalPublic({ setShowModal, cargos, data }) {

  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombreRequisito, setNombreRequisito] = useState("elegir");
  const [documento, setDocumento] = useState("");
  const [errorDocumento, setErrorDocumento] = useState(false);
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [observaciones, setObservaciones] = useState("")
  const [fechaVigenciaState, setFechaVigenciaState] = useState(true)


  const { submitDocumentosRequeridos, alerta, mostrarAlerta, documentosRequeridos } = useDocumentosRequeridos();
  const { cargosForm } = useCargos();


  console.log(cargos)


  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setId(data._id);
      setEstado(data.estado)
      setNombreRequisito(data.nombreRequisito)
      setFechaVigencia(data.fechaVigencia)
      setObservaciones(data.observaciones)
    }
  }, [data])


  useEffect(() => {
    let preventDouble = cargos.inputCargos.find(item => item.nombre_requisito === nombreRequisito)
    console.log(preventDouble)
    if (preventDouble !== undefined) {
      setFechaVigenciaState(preventDouble.vigencia)
      setFechaVigencia("")
    }

  }, [nombreRequisito])



  const handleDocumento = (data) => {

    const maxfilesize = (1024 * 1024);

    if (data && data.size > maxfilesize) {
      setErrorDocumento(true);
      setDocumento(" ");
    } else {
      setErrorDocumento(false);
      setDocumento(data);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    let preventDouble = documentosRequeridos.find(item => item.nombreRequisito === nombreRequisito)
    if (preventDouble !== undefined && data?.nombreRequisito !== nombreRequisito) {
      mostrarAlerta({
        msg: "Documento seleccionado ya existe en su Curriculum",
        error: true,
      });
      return;
    }



    if (nombreRequisito === "elegir") {
      mostrarAlerta({
        msg: "Debe seleccionar un tipo de documento",
        error: true,
      });
      return;
    }

    if (errorDocumento === true) {
      mostrarAlerta({
        msg: "Tamaño máximo del soporte de Experiencia Laboral es de 500kb",
        error: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombreRequisito", nombreRequisito);
    formData.append("documento", documento);
    formData.append("fechaVigencia", fechaVigencia);
    formData.append("observaciones", observaciones);

    await submitDocumentosRequeridos(formData, estado);

    setTimeout(() => {
      setShowModal(false)
    }, 2000);
  };



  const { msg } = alerta;



  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 sm:w-1/2 my-6 mx-auto max-w-7xl">
          {/*content*/}
          <form
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onSubmit={submitData}
            encType="multipart/form-data"
          >
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
              <div className="mt-2 font-bold" >Info. Documento Requerido</div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 p-8">
              <div>
                <label
                  htmlFor="nombreRequisito"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del requisito
                </label>
                <div className="mt-1">
                  <select
                    id="nombreRequisito"
                    name="nombreRequisito"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setNombreRequisito(e.target.value)}
                    value={nombreRequisito}
                    required={true}
                  >
                    <option value="elegir" disabled >
                      -- Selecciona un documento--
                    </option>
                    {cargos.inputCargos.map((item, i) => {
                      return (
                        <option key={i} value={item.nombre_requisito}>
                          {item.nombre_requisito}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="documento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documento
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
                    name="documento"
                    id="documento"
                    onChange={(e) => handleDocumento(e.target.files[0])}
                    accept=".pdf"
                    required={documento !== "" && true}
                  />
                </div>

                {errorDocumento === true && (
                  <span className="text-red-500 text-xs">
                    El tamaño máximo es 1mb
                  </span>
                )}
                <div className="mt-1">
                  {data?.documento && (
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${data.documento
                        }`}
                      download={data.documento}
                      target="_blank"
                      className="underline text-blue-500 pt-5"
                    >
                      Ver Documento
                    </a>
                  )}
                </div>
              </div>
              {fechaVigenciaState === true ? (
                <div>
                  <label
                    htmlFor="fechaVigencia"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de vencimiento
                  </label>
                  <div className="mt-1">
                    <input
                      id="fechaVigencia"
                      name="fechaVigencia"
                      type="date"
                      placeholder="Digite la fecha"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={fechaVigencia}
                      onChange={(e) => setFechaVigencia(e.target.value)}
                      required={true}
                    />
                  </div>
                </div>
              ) : null}



              <div>
                <label
                  htmlFor="observaciones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Observaciones
                </label>
                <div className="mt-1">
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    type="text"
                    placeholder="Digita las observaciones"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={observaciones}
                    rows="3"
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {msg && <Alert alerta={alerta} />}
            {/*footer*/}
            <div className="flex space-x-4 items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <input
                type="submit"
                className="cursor-pointer bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                value="Guardar"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
