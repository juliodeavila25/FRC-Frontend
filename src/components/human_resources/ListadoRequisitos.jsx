import { useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";

const ListadoRequisitos = ({ listadoCargos, selectedCargo }) => {
  const [requisitosCargos, setRequisitosCargos] = useState([]);

  useEffect(() => {
    let cargo = listadoCargos.filter((item) => item.nombre === selectedCargo);

    setRequisitosCargos(cargo);
  }, [selectedCargo]);

  return (
    <>
      {Array.isArray(requisitosCargos) &&
        requisitosCargos[0]?.requisitos.length > 0 ? (
        requisitosCargos[0]?.requisitos.map((item) => {
          return (
            <div
              key={item._id}
              className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-xl flex items-center"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <FcDocument className="text-lg" />
                </div>
                <div className="ml-3 ">
                  <p className="text-sm text-gray-900 font-bold">{item.nombre}</p>
                  <p className="text-sm text-gray-900 italic">{item.descripcionRequisito}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
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
                No existen requisitos para este cargo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListadoRequisitos;
