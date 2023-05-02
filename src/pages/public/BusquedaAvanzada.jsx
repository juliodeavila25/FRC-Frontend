import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from "react-spinners";
import clienteAxios from "../../config/clienteAxios";
import PublicTable from "../../components/table/PublicTable";
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
    name: "Documentos",
    href: "/documentos",
    current: location.pathname.includes("/documentos") ? true : false,
  },
  {
    name: "Busqueda",
    href: "/busqueda-avanzada",
    current: location.pathname.includes("/busqueda-avanzada") ? true : false,
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
  const[documentosPublicos, setDocumentosPublicos] = useState([]);
  const[datosFiltrados, setFiltrados] = useState([])
  const[busqueda, setBusqueda] = useState(false)
  const[proceso, setProceso] = useState("")
  const[servicio, setServicio] = useState("")
  const[tipo, setTipo] = useState("")
  const[especialidad, setEspecialidad] = useState("")
  const[responsable, setResponsable] = useState("")
  const[titulo, setTitulo] = useState("")
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
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
      accessor: "codigo"
    },
    { Header: "Proceso", accessor: "proceso"},
    { Header: "Titulo", accessor: "titulo"},
    { Header: "Tags", 
      accessor: "selectedTag",
      Cell: ({ value }) => {
        return (value.length > 0 && value.map((tag)=> (<span key={tag} className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs ">{tag}</span> )))
      },
    },
    {
      Header: "Fecha de creación",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
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

  const handleSubmit = (e) =>{
    e.preventDefault()
    setFiltrados([])
    if (proceso !== "" || titulo !== "" || servicio !== "" || tipo !== "" 
        || especialidad !== "" || responsable !== "" || titulo !== ""){
        setBusqueda(true)
        let arrayInputCargos = [];
         for(let i=0; i < documentosPublicos.length; i++){
            let procesoNormalizado = documentosPublicos[i].proceso.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let tituloNormalizado = documentosPublicos[i].titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let servicioNormalizado = documentosPublicos[i].servicio.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let tipoNormalizado = documentosPublicos[i].tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let especialidadNormalizado = documentosPublicos[i].especialidad.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let resposableNormalizado = documentosPublicos[i].responsable.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            
            
            
            if(procesoNormalizado.includes(proceso.toLowerCase()) && 
                tituloNormalizado.includes(titulo.toLowerCase()) && 
                servicioNormalizado.includes(servicio.toLowerCase()) && 
                tipoNormalizado.includes(tipo.toLowerCase())&& 
                especialidadNormalizado.includes(especialidad.toLowerCase())&& 
                resposableNormalizado.includes(responsable.toLowerCase())
                ){
                arrayInputCargos.push(documentosPublicos[i]);
               setFiltrados(arrayInputCargos)
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

  console.log(datosFiltrados)

  // if (!documentosPublicos) return <BeatLoader color="#36d7b7" />;
  console.log(documentosPublicos);
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
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
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
                                <input
                                type="text"
                                id="proceso"
                                name="proceso"
                                placeholder="Búsqueda por proceso"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={proceso}
                                onChange={(e) => setProceso(e.target.value)}
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
                                <input
                                type="text"
                                id="tipo"
                                name="tipo"
                                placeholder="Búsqueda por tipo"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
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

                         <div>
                            <label
                                htmlFor="responsable"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Responsable
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                id="responsable"
                                name="responsable"
                                placeholder="Búsqueda por responsable"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={responsable}
                                onChange={(e) => setResponsable(e.target.value)}
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
            
            {busqueda === false  ? (

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
             
            ) :  Array.isArray(datosFiltrados) && datosFiltrados.length > 0 ? (
                <>
               <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <PublicTable data={datosFiltrados} columns={headers} />
              </div>
              </>
            ): null}
          </main>
        </div>
      </div>
    </>
  );
}
