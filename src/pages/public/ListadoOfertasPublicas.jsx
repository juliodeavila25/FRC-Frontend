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
        name: "Ofertas",
        href: "/ofertas-publicas",
        current: location.pathname.includes("/ofertas-publicas") ? true : false,
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

export default function ListadoOfertasPublicas() {
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
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 ">
                                Listado de Oferta Laborales
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                                <div className="bg-white rounded-lg p-4 shadow-lg">
                                    <div className="flex justify-between">
                                        <div className="text-xs">12-03-1990</div>
                                        <div className="rounded-full bg-gray-700 text-white px-2 text-xs flex items-center">Salario base: $1.160.000</div>

                                    </div>
                                    <div className="mt-5">
                                        <p className="text-md font-bold">Conductor Ambulancia</p>
                                        <p className="text-md bg-blue-500 text-white inline px-2 rounded-full text-xs items-center">Mompox</p>
                                        <p className="text-sm font-medium">Perfil:</p>
                                        <p className="text-sm">
                                            Bachiller Academico
                                            documento de identificación.
                                            Experiencia de 6 meses a un año.
                                            Licencia C2.
                                            Certificados vigentes:
                                            ACLS/BLS</p>
                                        <p className="text-sm font-medium">Funciones:</p>
                                        <p className="text-sm">
                                            Manejo seguro: Conducir la ambulancia de manera segura y respetar las leyes de tráfico.
                                            Respuesta a emergencias: Responder a llamadas de emergencia y llegar rápidamente al lugar indicado.
                                            Evaluación de la escena: Evaluar la situación en el lugar de la emergencia.
                                            Atención básica: Brindar primeros auxilios básicos si es necesario.
                                            Transporte seguro: Asegurar el transporte seguro y cómodo del paciente.
                                            Comunicación: Mantener comunicación con el personal médico y el hospital.
                                            Navegación: Conocer rutas eficientes hacia centros médicos.
                                            Registro de eventos: Mantener registros precisos de la emergencia y atención.
                                            Colaboración: Trabajar junto al personal médico y otros profesionales.
                                            Mantenimiento: Mantener la ambulancia en condiciones óptimas.</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}
