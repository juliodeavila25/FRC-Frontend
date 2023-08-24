import FormularioNuevaUnidadFuncional from "../../components/unidad_funcional/FormularioNuevaUnidadFuncional";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import useFuncional from "../../hooks/useFuncional";

const EditarUnidadFuncional = () => {
  const params = useParams();
  const { obtenerUnidadFuncional, cargandoDataFuncionales } = useFuncional();

  console.log(params.id);
  useEffect(() => {
    obtenerUnidadFuncional(params.id);
  }, []); 

  if (cargandoDataFuncionales) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevaUnidadFuncional />;
};

export default EditarUnidadFuncional;