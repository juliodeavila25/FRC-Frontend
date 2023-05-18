import FormularioNuevoCargo from "../../components/cargos/FormularioNuevoCargo";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import useCargos from "../../hooks/useCargos";

const EditarCargo = () => {
  const params = useParams();
  const { obtenerCargo, cargandoDataCargos } = useCargos();

  console.log(params.id);
  useEffect(() => {
    obtenerCargo(params.id);
  }, []); 

  if (cargandoDataCargos) return <BeatLoader color="#36d7b7" />;

  return <FormularioNuevoCargo />;
};

export default EditarCargo;