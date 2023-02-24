import FormularioNuevoDocumento from "../../components/documents/FormularioNuevoDocumento";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import useDocumentos from "../../hooks/useDocumentos";

const EditarDocumento = () => {
  const params = useParams();
  const { obtenerDocumento, cargandoData } = useDocumentos();

  console.log(params.id);
  useEffect(() => {
    obtenerDocumento(params.id);
  }, []);

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevoDocumento />;
};

export default EditarDocumento;
