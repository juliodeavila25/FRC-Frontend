import FormularioOtroDocumento from "../../../components/otros_documentos/FormularioOtroDocumento";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import useOtrosDocumentos from "../../../hooks/useOtrosDocumentos";

const EditarOtroDocumento = () => {
  const params = useParams();
  const { obtenerOtroDocumento, cargandoDocumento } = useOtrosDocumentos();

  console.log(params);
  useEffect(() => {
    obtenerOtroDocumento(params.id_documento);
  }, []);

  if (cargandoDocumento) return <BeatLoader color="#36d7b7" />;

  return <FormularioOtroDocumento />;
};

export default EditarOtroDocumento;