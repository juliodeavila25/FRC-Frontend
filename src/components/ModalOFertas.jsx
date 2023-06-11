import React from "react";

export default function ModalOfertas({ data, setShowModal }) {
  console.log(data)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-11/12  md:w-8/12 mt-[20rem] md:mt-0 ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Nombre Convocatoria: <span className="italic">{data.nombre}</span> </h3>
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
                    value={data.convocatoria}
                    disabled={true}
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
                    value={data.nombre}
                    disabled={true}
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
                    value={data.fechaInicio}
                    disabled={true}
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
                    value={data.fechaFin}
                    disabled={true}
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
                    value={data.ciudad}
                    disabled={true}
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
                    value={data.salario}
                    disabled={true}
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
                    value={data.auxilio}
                    disabled={true}
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
                    value={data.bonificaciones}
                    disabled={true}
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
                    value={data.perfil}
                    rows="6"
                    disabled={true}
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
                    value={data.funciones}
                    rows="6"
                    disabled={true}

                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-green-400 text-white hover:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Aplicar a Oferta
              </button>

              <button
                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
