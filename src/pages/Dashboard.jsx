import useOfertas from "../hooks/useOfertas";

const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { ofertas } = useOfertas();

  console.log(ofertas);
  return (
    <>
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">
            Ofertas recientes
          </h2>
          <button
            type="button"
            className="order-0 inline-flex items-center rounded-md border border-transparent bg-corporative-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-corporative-blue-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
          >
            Ver todas las ofertas
          </button>
        </div>

        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 "
        >
          {ofertas.slice(0, 3).map((oferta) => (
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

      {/* Projects table (small breakpoint and up) */}
      <div className="mt-8 block mb-10">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span className="lg:pl-2 text-lg">Ofertas Aplicadas</span>
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
                  scope="col"
                >
                  Salario
                </th>
                <th
                  className=" border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                  scope="col"
                >
                  Fecha de Aplicación
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={classNames(
                          project.bgColorClass,
                          "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                        )}
                        aria-hidden="true"
                      />
                      <a href="#" className="truncate hover:text-gray-600">
                        <span>
                          Auxiliar de Enfermería
                          <span className="font-normal text-gray-500 pl-1">
                            en Mompox
                          </span>
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-500 hidden  md:table-cell">
                    $1.000.000
                  </td>
                  <td className=" whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                    06/02/2023
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
