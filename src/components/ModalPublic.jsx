import React from "react";

export default function ModalPublic({ data, setShowModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-7xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">{data.codigo}</h3>
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
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código/Versión
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    placeholder="Digita el código"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.codigo}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="proceso"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proceso
                </label>
                <div className="mt-1">
                  <input
                    id="proceso"
                    name="proceso"
                    type="text"
                    autoComplete="proceso"
                    placeholder="Digita el proceso"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.proceso}
                  />
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
                  <textarea
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Digita el tiulo"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.titulo}
                    rows="3"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="servicio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Servicio
                </label>
                <div className="mt-1">
                  <input
                    id="servicio"
                    name="servicio"
                    type="text"
                    placeholder="Digite el servicio"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.servicio}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="tipo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo
                </label>
                <div className="mt-1">
                  <input
                    id="tipo"
                    name="tipo"
                    type="text"
                    placeholder="Digite el tipo"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.tipo}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="implementacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Implementacion
                </label>
                <div className="mt-1">
                  <input
                    id="implementacion"
                    name="implementacion"
                    type="text"
                    placeholder="Digite la implementacion"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.implementacion}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <div className="mt-1">
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    placeholder="Digite descripción"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.descripcion}
                    rows="6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="especialidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Especialidad
                </label>
                <div className="mt-1">
                  <input
                    id="especialidad"
                    name="especialidad"
                    type="text"
                    placeholder="Digite la especialidad"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.especialidad}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="responsable"
                  className="block text-sm font-medium text-gray-700"
                >
                  Responsable
                </label>
                <div className="mt-1">
                  <input
                    id="responsable"
                    name="responsable"
                    type="text"
                    placeholder="Digite el responsable"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.responsable}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fuente"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuente
                </label>
                <div className="mt-1">
                  <input
                    id="fuente"
                    name="fuente"
                    type="text"
                    placeholder="Digite la fuente"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={data.fuente}
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
