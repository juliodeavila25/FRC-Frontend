
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useRequisito from "../../hooks/useRequisito";
import FormularioNuevoRequisito from "../../components/requisitos/FormularioNuevoRequisito";

const EditarRequisito = () => {
  const params = useParams();
  const { obtenerRequisitoBo, cargandoDataRequisitosBo } = useRequisito();

  console.log(params.id);
  useEffect(() => {
    obtenerRequisitoBo(params.id);
  }, []); 

  if (cargandoDataRequisitosBo) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevoRequisito />;
};

export default EditarRequisito;