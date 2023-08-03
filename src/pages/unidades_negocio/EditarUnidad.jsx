import FormularioNuevaUnidad from "../../components/unidad_negocio/FormularioNuevaUnidad";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import useUnidad from "../../hooks/useUnidad";

const EditarUnidad = () => {
  const params = useParams();
  const { obtenerUnidad, cargandoDataUnidades } = useUnidad();

  console.log(params.id);
  useEffect(() => {
    obtenerUnidad(params.id);
  }, []); 

  if (cargandoDataUnidades) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevaUnidad />;
};

export default EditarUnidad;