import FormularioRequisitosCargos from "../../components/requisitos_cargos/FormularioRequisitosCargos";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";

import useDocumentosRequisitos from "../../hooks/useDocumentosRequisitos";

const EditarRequisitosCargos = () => {
  const params = useParams();

  const { obtenerRequisitoCargo, cargandoDataDocumentos } = useDocumentosRequisitos()

  console.log(params.id);
  useEffect(() => {
    obtenerRequisitoCargo(params.id);
  }, []);

  if (cargandoDataDocumentos) return <BeatLoader color="#36d7b7" />;

  return <FormularioRequisitosCargos />;
};

export default EditarRequisitosCargos;