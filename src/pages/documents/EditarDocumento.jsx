import FormularioNuevoDocumento from "../../components/documents/FormularioNuevoDocumento";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOfertas from "../../hooks/useOfertas";
import { BeatLoader } from "react-spinners";

const EditarDocumento = () => {
  const params = useParams();
  const { obtenerOferta, cargandoData } = useOfertas();

  console.log(params.id);
  useEffect(() => {
    obtenerOferta(params.id);
  }, []);

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevoDocumento />;
};

export default EditarDocumento;
