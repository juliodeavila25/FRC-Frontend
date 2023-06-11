import { useEffect, Fragment, useState } from "react"
import useOfertas from "../../hooks/useOfertas"
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { FcBusinessContact, FcInspection, FcAssistant, FcCancel, FcOk } from "react-icons/fc";
import Table from "../../components/table/Table"


function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}


const ListarPostulantes = () => {
    const [open, setOpen] = useState(0);
    const [curriculums, setCurriculums] = useState([])

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const params = useParams();
    const {
        obtenerPostulantesPorOferta, postulantes
    } = useOfertas();

    useEffect(() => {
        obtenerPostulantesPorOferta(params.id)
    }, [])


    useEffect(() => {
        if (Array.isArray(postulantes) && postulantes.length > 0) {
            console.log(postulantes)
            const mergedObj = postulantes.reduce((acc, cur) => ({ ...acc, ...cur }), {});
            setCurriculums(mergedObj)
        }
    }, [postulantes])


    const [headers, setHeaders] = useState([
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        { Header: "Documento", accessor: "numeroDocumento" },
        { Header: "Titulo", accessor: "titulo" },
        {
            Header: " ",
            accessor: (originalRow, rowIndex) => (
                <div className="flex space-x-2">
                    <button
                        className="text-blue-500 hover:text-blue-900"
                        onClick={() =>
                            navigate(
                                `/colaboradores/editar-colaborador/${originalRow._id}`
                            )
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </button>
                    <button
                        className="text-blue-500 hover:text-blue-900"
                        onClick={() => redireccionar(originalRow._id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                    </button>
                </div>
            ),
        },
    ]);


    console.log(curriculums)

    return (
        <Fragment>
            <div className="px-4 sm:px-6 lg:px-10 mt-5 mb-5 ">
                <div className="mt-8 flex flex-col">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Listado de postulantes</h1>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link
                                to="/recursos-humanos/listar-convocatorias"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 mx-auto mt-10">
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader className="text-base font-semibold text-gray-900" onClick={() => handleOpen(1)}>
                        <div className="flex space-x-3 items-center">
                            <FcBusinessContact className="text-lg" />
                            <p>En proceso</p>
                        </div>

                    </AccordionHeader>
                    <AccordionBody>
                        {Object.keys(curriculums).length !== 0 ? (
                            <>
                                <Table
                                    data={[curriculums]}
                                    columns={headers}
                                />
                            </>
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
                                            No existen postulantes en proceso.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader className="text-base font-semibold text-gray-900" onClick={() => handleOpen(2)}>
                        <div className="flex space-x-3 items-center">
                            <FcInspection className="text-lg" />
                            <p> Preseleccionado</p>
                        </div>

                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at.
                        We&apos;re constantly growing. We&apos;re constantly making mistakes.
                        We&apos;re constantly trying to express ourselves and actualize our
                        dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                    <AccordionHeader className="text-base font-semibold text-gray-900" onClick={() => handleOpen(3)}>
                        <div className="flex space-x-3 items-center">
                            <FcAssistant className="text-lg" />
                            <p> Entrevista realizada</p>
                        </div>

                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at.
                        We&apos;re constantly growing. We&apos;re constantly making mistakes.
                        We&apos;re constantly trying to express ourselves and actualize our
                        dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                    <AccordionHeader className="text-base font-semibold text-gray-900" onClick={() => handleOpen(4)}>
                        <div className="flex space-x-3 items-center">
                            <FcCancel className="text-lg" />
                            <p>  No continúa</p>
                        </div>

                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at.
                        We&apos;re constantly growing. We&apos;re constantly making mistakes.
                        We&apos;re constantly trying to express ourselves and actualize our
                        dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                    <AccordionHeader className="text-base font-semibold text-gray-900" onClick={() => handleOpen(5)}>
                        <div className="flex space-x-3 items-center">
                            <FcOk className="text-lg" />
                            <p>Contratado</p>
                        </div>

                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at.
                        We&apos;re constantly growing. We&apos;re constantly making mistakes.
                        We&apos;re constantly trying to express ourselves and actualize our
                        dreams.
                    </AccordionBody>
                </Accordion>
            </div>
        </Fragment>
    )
}

export default ListarPostulantes