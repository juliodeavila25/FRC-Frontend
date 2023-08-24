import FormularioSarlaft from "../../components/FormularioSarlaft";

const SarlaftCreate = () => {
  return (
    <>
      <div className="text-center text-2xl text-gray-700 mt-8 font-bold ">
        Hoja de Vida - Sarlaft
      </div>
      <div className="flex min-h-full flex-col justify-center  px-6 lg:px-8">
        <FormularioSarlaft />
      </div>
    </>
  );
};

export default SarlaftCreate;
