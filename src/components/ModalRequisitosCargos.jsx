import { useState } from "react";
import useDocumentosRequeridos from "../hooks/useDocumentosRequeridos"
import Alert from "./Alert";
import { useEffect } from "react";
import useCargos from "../hooks/useCargos"

export default function ModalPublic({ setShowModal, infoRequisitos }) {

  const [id, setId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [nombreRequisito, setNombreRequisito] = useState("elegir");
  const [documento, setDocumento] = useState("");
  const [errorDocumento, setErrorDocumento] = useState(false);
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [observaciones, setObservaciones] = useState("")
  const [fechaVigenciaState, setFechaVigenciaState] = useState(true)


  // useEffect(() => {
  //   if (Object.keys(data).length !== 0) {
  //     setId(data._id);
  //     setEstado(data.estado)
  //     setNombreRequisito(data.nombreRequisito)
  //     setFechaVigencia(data.fechaVigencia)
  //     setObservaciones(data.observaciones)
  //   }
  // }, [data])


  // useEffect(() => {
  //   let preventDouble = cargos.inputCargos.find(item => item.nombre_requisito === nombreRequisito)
  //   console.log(preventDouble)
  //   if (preventDouble !== undefined) {
  //     setFechaVigenciaState(preventDouble.vigencia)
  //     setFechaVigencia("")
  //   }

  // }, [nombreRequisito])

console.log(infoRequisitos)



  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 sm:w-4/6 my-6 mx-auto max-w-7xl">
          {/*content*/}
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
           
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
            <div className="grid grid-cols-1 gap-6 m-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-2 gap-6">
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
                    id="nombreRequisito"
                    name="nombreRequisito"
                    placeholder="Digita el nombre del cargo"
                    className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                    value={infoRequisitos.nombreRequisito}
                    disabled={true}
                  />
                </div>
              </div>
              {Object.keys(infoRequisitos).length !== 0 && infoRequisitos.fechaVigencia !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de vigencia
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="fechaVigencia"
                      name="fechaVigencia"
                      placeholder="Digita la fecha de vigencia"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={infoRequisitos.fechaVigencia}
                      disabled={true}
                    />
                  </div>
                </div>
              ) : null}


              {Object.keys(infoRequisitos).length !== 0 && infoRequisitos.emisor !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emisor
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="emisor"
                      name="emisor"
                      placeholder="Digita el emisor"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={infoRequisitos.emisor}
                      disabled={true}
                    />
                  </div>
                </div>
              ) : null}


              {Object.keys(infoRequisitos).length !== 0 && infoRequisitos.fechaExpedicion !== "" ? (
                <div>
                  <label
                    htmlFor="fechaExpedicion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de expedicion
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="fechaExpedicion"
                      name="fechaExpedicion"
                      placeholder="Digita la fecha de expedicion"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={infoRequisitos.fechaExpedicion}
                      disabled={true}
                    />
                  </div>
                </div>) : null}

              {Object.keys(infoRequisitos).length !== 0 && infoRequisitos.numeroDocumento !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de documento
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      placeholder="Digita el nombre del documento"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={infoRequisitos.numeroDocumento}
                      disabled={true}
                    />
                  </div>
                </div>) : null}

              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documento:
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-3">
                  {infoRequisitos.documento && (
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${infoRequisitos.documento}`}
                      download={infoRequisitos.documento}
                      target="_blank"
                      className="underline text-blue-500 pt-5"
                    >
                      Ver documento
                    </a>
                  )}
                </div>
              </div>

            </div>
            </div>


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
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-[-29px] z-40 bg-black"></div>
    </>
  );
}
