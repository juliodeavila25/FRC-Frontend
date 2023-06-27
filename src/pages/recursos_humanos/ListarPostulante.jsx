import React from 'react'
import { useParams, Link } from "react-router-dom";
import FormularioCurriculumPostulante from '../../components/FormularioCurriculumPostulante';


const ListarPostulante = () => {
    const params = useParams();
    return (
        <>
            <div className="text-center text-2xl text-gray-700 mt-8 font-bold ">
                Validar Hoja de Vida
            </div>
            <div className="flex min-h-full flex-col justify-center  px-6 lg:px-8">
                <FormularioCurriculumPostulante />
            </div>
        </>
    )
}

export default ListarPostulante