import ListarOfertas from "../../components/human_resources/ListarOfertas";

import useCargos from "../../hooks/useCargos";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const ListarConvocatorias = () => {

  const { obtenerCargosForm, cargandoDataForm } = useCargos();

  useEffect(() => {
    obtenerCargosForm();
  }, []);

  if (cargandoDataForm) return <BeatLoader color="#36d7b7" />;
  return <ListarOfertas />;
};

export default ListarConvocatorias;
