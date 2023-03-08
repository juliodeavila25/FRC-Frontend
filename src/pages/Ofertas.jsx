import useOfertas from "../hooks/useOfertas";

const Ofertas = () => {
  const { ofertas } = useOfertas();

  return (
    <>
    {Array.isArray(ofertas) && ofertas.length > 0 ? (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 "
      >
        {ofertas.map((oferta) => (
          <div
            key={oferta.convocatoria}
            className="py-8 px-4 rounded-lg shadow-xl  text-base   overflow-ellipsis overflow-hidden "
          >
            <div className="  ">
              <div className="border-b border-gray-100 pb-2 ">
                <p className="text-gray-700 font-bold text-lg">
                  {oferta.nombre}
                </p>
                <p className="text-gray-400 font-bold">
                  Convocatoria:{" "}
                  <span className="font-light">{oferta.convocatoria}</span>
                </p>
                <div className="mt-4 flex">
                  <button
                    type="button"
                    className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-0"
                  >
                    Ver más
                  </button>
                  <button
                    type="button"
                    className="order-0 inline-flex items-center rounded-md border border-transparent bg-corporative-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-corporative-blue-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                  >
                    Aplicar a la oferta
                  </button>
                </div>
              </div>
              <p className="text-gray-700 font-bold mt-3">
                Ciudad: <span className="font-light">{oferta.ciudad}</span>
              </p>
              <p className="text-gray-700 font-bold ">
                Salario: <span className="font-light">{oferta.salario}</span>
              </p>
              <p className="text-gray-700 font-bold ">
                Auxilios: <span className="font-light">{oferta.auxilio}</span>
              </p>
              <p className="text-gray-700 font-bold line-clamp-6">
                Perfil: <span className="font-light">{oferta.perfil}</span>
              </p>
            </div>
          </div>
        ))}
      </ul>
    </div>):(
       <div className="rounded-md bg-blue-50 p-4">
       <div className="flex">
         <div className="flex-shrink-0">
           <svg
             className="h-5 w-5 text-blue-400"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
           >
             <path
               fillRule="evenodd"
               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
               clipRule="evenodd"
             />
           </svg>
         </div>
         <div className="ml-3 flex-1 md:flex ">
           <p className="text-sm text-blue-700">
             No existen ofertas laborales vigentes.
           </p>
         </div>
       </div>
     </div>
    )}
    </>
  )
 
};

export default Ofertas;
