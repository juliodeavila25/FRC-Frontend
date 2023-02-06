import FormularioCurriculum from "../components/FormularioCurriculum";

const CurriculumVitae = () => {
  return (
    <>
      <div className="text-center text-2xl text-gray-700 mt-8 font-bold ">
        Hoja de Vida
      </div>
      <div className="flex min-h-full flex-col justify-center  px-6 lg:px-8">
        <FormularioCurriculum />
      </div>
    </>
  );
};

export default CurriculumVitae;
