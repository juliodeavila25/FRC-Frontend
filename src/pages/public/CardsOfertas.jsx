import { useState } from "react";

import ModalOfertasPublicas from "../../components/ModalOfertasPublicas";

const CardsOfertas = ({ i, item }) => {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  const activateModal = () => {
    setVisible(true);
  
  };

  const setShowModal = () => {
    setVisible(false);
  };

  return (
    <>
    {visible === true && (
        <ModalOfertasPublicas  setShowModal={setShowModal} />
      )}
    <div key={item._id} className="bg-white rounded-lg p-4 shadow-lg ">
      <div className="flex justify-between">
        <div className="text-xs">{item.createdAt?.split("T")[0]}</div>
        <div className="rounded-full bg-gray-700 text-white px-2 text-xs flex items-center">
          Salario base: $
          {item.salario.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </div>
      </div>
      <div className="my-5">
        <p className="text-md font-bold capitalize">{item.nombre}</p>
        <div className="flex justify-between items-center pt-2">
          <p className="text-md bg-blue-500 text-white inline px-2 py-1 rounded-full text-xs ">
            {item.ciudad}
          </p>
          <a className="bg-green-600 cursor-pointer rounded-lg px-2 py-1 text-white " onClick={activateModal}>
            Aplicar a oferta
          </a>
        </div>

        <p className="text-sm font-medium mt-3">Perfil:</p>
        <p className="text-sm font-light">{item.perfil}</p>

        <p className="text-sm font-medium mt-3">Funciones:</p>
        <p className="text-sm font-light">
          {showMore ? item.funciones : `${item.funciones.substring(0, 250)}`}
          <button
            className="ml-3 px-2 rounded-full bg-gray-400 text-white"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Ver menos" : "Ver más"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default CardsOfertas;
