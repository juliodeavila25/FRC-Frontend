
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import usePregunta from "../../../hooks/usePregunta";
import FormularioNuevaPregunta from "../../../components/preguntas/FormularioNuevaPregunta";

const EditarPregunta = () => {
  const params = useParams();
  const { obtenerPregunta, cargandoDataPregunta } = usePregunta();

  console.log(params.id);
  useEffect(() => {
    obtenerPregunta(params.id);
  }, []);

  if (cargandoDataPregunta) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevaPregunta />;
};

export default EditarPregunta;