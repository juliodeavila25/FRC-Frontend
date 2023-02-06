import useOfertas from "../hooks/useOfertas";

const Ofertas = () => {
  const { ofertas } = useOfertas();
  return (
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
    </div>
  );
};

export default Ofertas;
