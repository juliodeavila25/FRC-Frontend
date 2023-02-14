import FormularioNuevaOferta from "../../components/human_resources/FormularioNuevaOferta";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOfertas from "../../hooks/useOfertas";
import { BeatLoader } from "react-spinners";

const EditarConvocatoria = () => {
  const params = useParams();
  const { obtenerOferta, cargandoData } = useOfertas();

  console.log(params.id);
  useEffect(() => {
    obtenerOferta(params.id);
  }, []);

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevaOferta />;
};

export default EditarConvocatoria;
