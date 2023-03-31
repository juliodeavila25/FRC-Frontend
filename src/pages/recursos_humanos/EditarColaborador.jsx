import React from 'react'
import { useParams, Link } from "react-router-dom";
import FormularioCurriculumRH from '../../components/FormularioCurriculumRH';


const EditarColaborador = () => {
const params = useParams();
  return (
    <>
    <div className="text-center text-2xl text-gray-700 mt-8 font-bold ">
      Editar Hoja de Vida
    </div>
    <div className="flex min-h-full flex-col justify-center  px-6 lg:px-8">
      <FormularioCurriculumRH/>
    </div>
  </>
  )
}

export default EditarColaborador