import React, { useState } from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import {
    FcSurvey
} from "react-icons/fc";


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

const FormularioEntrevista = ({ preguntas }) => {
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className="px-8 mb-8">
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader
                    className="text-base font-semibold text-gray-900"
                    onClick={() => handleOpen(1)}
                >
                    <div className="flex space-x-2 items-center italic  py-2">
                        <FcSurvey className="text-lg" />
                        <p>
                            Preguntas a realizar:
                        </p>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    {preguntas[0].inputPreguntas.map((item, i) => {
                        return (
                            <>
                                <p className='pb-2 font-bold'>Pregunta Nro: {i + 1}</p>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 pt-5 border-2 border-blue-200 mb-4 p-4 rounded-lg'>

                                    <div>
                                        <label
                                            htmlFor="textoPreguntas"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Texto de la pregunta <span className="text-red-700">*</span>
                                        </label>
                                        <div>
                                            <textarea
                                                id="textoPreguntas"
                                                name="textoPreguntas"
                                                type="text"
                                                placeholder=""
                                                rows="3"
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                value={item.textoPreguntas}
                                                //onChange={(e) => handleinputchangePreguntas(e, i)}

                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="respuestaPreguntas"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Respuesta sugerida <span className="text-red-700">*</span>
                                        </label>
                                        <div>
                                            <textarea
                                                id="respuestaPreguntas"
                                                name="respuestaPreguntas"
                                                type="text"
                                                placeholder=""
                                                rows="3"
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                value={item.respuestaPreguntas}
                                                //onChange={(e) => handleinputchangePreguntas(e, i)}

                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="respuestaPreguntas"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Respuesta entrevistado <span className="text-red-700">*</span>
                                        </label>
                                        <div>
                                            <textarea
                                                id="respuestaPreguntas"
                                                name="respuestaPreguntas"
                                                type="text"
                                                placeholder=""
                                                rows="3"
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

                                                //onChange={(e) => handleinputchangePreguntas(e, i)}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="tipoEntrevista"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Calificación <span className="text-red-700">*</span>
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="tipoEntrevista"
                                                name="tipoEntrevista"
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            // onChange={(e) => {
                                            //     const selectedDocumentType = e.target.value;

                                            //     setTipoDocumento(selectedDocumentType);
                                            // }}
                                            //value={concepto}
                                            //ref={inputRefTipoDocumento}
                                            >
                                                <option value="elegir" disabled className="text-gray-400">
                                                    --Selecciona una calificación--
                                                </option>
                                                <option value="Buena">Buena</option>
                                                <option value="Regular">Regular</option>
                                                <option value="Mala">Mala</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )

                    })}

                    <div className="flex space-x-4 items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">

                        <input
                            type="submit"
                            className="cursor-pointer bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            value="Guardar respuestas"
                        />
                    </div>
                </AccordionBody>
            </Accordion>

        </div>
    )
}

export default FormularioEntrevista