import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from "react-spinners";
import clienteAxios from "../../config/clienteAxios";
import PublicTableFilter from "../../components/table/PublicTableFilter";
import { format } from "date-fns";
import ModalPublic from "../../components/ModalPublic";
import { Link, useLocation } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Inicio",
    href: "/",

  },

  {
    name: "Busqueda",
    href: "documentos/busqueda-avanzada",
    current: location.pathname.includes("/documentos") ? true : false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BusquedaAvanzada() {
  const [documentosPublicos, setDocumentosPublicos] = useState([]);
  const [datosFiltrados, setFiltrados] = useState([])
  const [busqueda, setBusqueda] = useState(false)
  const [proceso, setProceso] = useState(" ")
  const [servicio, setServicio] = useState("")
  const [tipo, setTipo] = useState(" ")
  const [especialidad, setEspecialidad] = useState("")
  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [resultados, setResultados] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const obtenerDocumentosPublicos = async () => {
      try {
        const { data } = await clienteAxios("/documentos/publicos");
        setDocumentosPublicos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDocumentosPublicos();
  }, []);

  const activateModal = (info) => {
    setVisible(true);
    setData(info);
  };

  const setShowModal = () => {
    setVisible(false);
  };


  const [headers, setHeaders] = useState([
    {
      Header: "Código",
      accessor: (originalRow, rowIndex) => (
        <div className="">
          <p>{originalRow.codigo?.toString().padStart(5, '0')}</p>
        </div>
      ),
    },
    { Header: "Proceso", accessor: "proceso" },
    {
      Header: "Titulo",
      accessor: (originalRow, rowIndex) => (
        <div className="">

          <p>{originalRow.titulo}</p>
          <div className="flex flex-wrap mt-2 gap-2">{originalRow.tags.map(item => {
            return (
              <p className="bg-blue-400 px-3 rounded-full text-white">{item.name}</p>
            )
          })}</div>
        </div>
      ),
    },

    {
      Header: "Implementación",
      accessor: "implementacion",
    },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2 items-center " >
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() => activateModal(originalRow)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <a
            className="text-blue-500 hover:text-blue-900"
            href={originalRow.link}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      ),
    },
  ]);

  const handleSubmit = (e) => {

    e.preventDefault()
    setFiltrados([])
    if (proceso !== "" || titulo !== "" || servicio !== "" || tipo !== ""
      || especialidad !== "" || titulo !== "") {
      console.log(proceso)
      setBusqueda(true)
      let arrayInputCargos = [];
      if (Array.isArray(documentosPublicos) && documentosPublicos.length > 0) {
        for (let i = 0; i < documentosPublicos.length; i++) {
          let procesoNormalizado = documentosPublicos[i].proceso.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          let tituloNormalizado = documentosPublicos[i].titulo.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          let servicioNormalizado = documentosPublicos[i].servicio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          let tipoNormalizado = documentosPublicos[i].tipo.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          let especialidadNormalizado = documentosPublicos[i].especialidad.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()


          if (procesoNormalizado.includes(proceso.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
            tituloNormalizado.includes(titulo.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
            servicioNormalizado.includes(servicio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
            tipoNormalizado.includes(tipo.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
            especialidadNormalizado.includes(especialidad.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())

          ) {
            console.log(proceso.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), procesoNormalizado)
            arrayInputCargos.push(documentosPublicos[i]);


            setFiltrados(arrayInputCargos)

            setResultados(false)

          } else {
            setResultados(true)
          }


        }
      }

    }

    // if( titulo !== ""){
    //      setBusqueda(true)
    //     let arrayInputCargos = [];
    //      for(let i=0; i < documentosPublicos.length; i++){
    //         if(documentosPublicos[i].titulo.includes(titulo)){
    //             arrayInputCargos.push(documentosPublicos[i]);
    //            setFiltrados(arrayInputCargos)
    //         }
    //      }

    // } 



  }



  if (!documentosPublicos) return <BeatLoader color="#36d7b7" />;

  return (
    <>
      {visible === true && (
        <ModalPublic data={data} setShowModal={setShowModal} />
      )}
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {/* Profile dropdown */}
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 lg:pl-8">
                Listado Maestro de Documentos y Formatos
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 px-8">
              <form className="lg:pl-8" onSubmit={handleSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10">
                  <div>
                    <label
                      htmlFor="proceso"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Proceso
                    </label>
                    <div className="mt-1">
                      <select
                        id="proceso"
                        name="proceso"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          const selectedDocumentType = e.target.value;

                          setProceso(selectedDocumentType);
                        }}
                        value={proceso}
                      >
                        <option value="">
                          {" "}
                        </option>
                        <option value="Atención en Salud">
                          Atención en Salud
                        </option>
                        <option value="Apoyo Administrativo y Operativo">
                          Apoyo Administrativo y Operativo
                        </option>
                        <option value="Mejoramiento Continuo">
                          Mejoramiento Continuo
                        </option>
                        <option value="Direccionamiento Estrategico">Direccionamiento Estrategico</option>
                      </select>
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
                      <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Búsqueda por titulo"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
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
                        type="text"
                        id="servicio"
                        name="servicio"
                        placeholder="Búsqueda por servicio"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={servicio}
                        onChange={(e) => setServicio(e.target.value)}
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
                      <select
                        id="tipo"
                        name="tipo"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          const selectedDocumentType = e.target.value;

                          setTipo(selectedDocumentType);
                        }}
                        value={tipo}
                      >
                        <option value=" ">
                          {" "}
                        </option>
                        <option value="Documento">
                          Documento
                        </option>
                        <option value="Formato">
                          Formato
                        </option>

                      </select>

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
                        type="text"
                        id="especialidad"
                        name="especialidad"
                        placeholder="Búsqueda por especialidad"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                      />
                    </div>
                  </div>



                </div>
                <div className="flex justify-center mt-10 ">
                  <input
                    type="submit"
                    className="flex w-60 justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                    value="Buscar"
                  />

                </div>

              </form>
            </div>
            {busqueda === false ? (
              <div className="rounded-md bg-blue-50 p-4 mt-10">
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
                      Por favor ingresa un criterio de busqueda
                    </p>
                  </div>
                </div>
              </div>

            ) : Array.isArray(datosFiltrados) && datosFiltrados.length < 0 && resultados === true ? (
              <div className="rounded-md bg-blue-50 p-4 mt-10">
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
                      Tu criterio de búsqueda no generó resultados
                    </p>
                  </div>
                </div>
              </div>
            ) : Array.isArray(datosFiltrados) && datosFiltrados.length > 0 ? (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <PublicTableFilter data={datosFiltrados} columns={headers} />
                </div>
              </>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}
