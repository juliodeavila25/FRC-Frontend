
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useHerramienta from "../../../hooks/useHerramienta";
import FormularioNuevaHerramienta from "../../../components/herramientas/FormularioNuevaHerramienta";

const EditarHerramienta = () => {
  const params = useParams();
  const { obtenerHerramienta, cargandoDataHerramienta } = useHerramienta();

  console.log(params.id);
  useEffect(() => {
    obtenerHerramienta(params.id);
  }, []);

  if (cargandoDataHerramienta) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevaHerramienta />;
};

export default EditarHerramienta;