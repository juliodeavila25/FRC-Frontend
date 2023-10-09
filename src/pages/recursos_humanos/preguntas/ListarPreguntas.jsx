import ListarPreguntasTotal from "../../../components/preguntas/ListarPreguntas"
import useCargos from "../../../hooks/useCargos";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const ListarPreguntas = () => {


  const { obtenerCargosForm, cargandoDataForm } = useCargos();


  useEffect(() => {
    obtenerCargosForm();
  }, []);

  if (cargandoDataForm) return <BeatLoader color="#36d7b7" />;

  return (
    <ListarPreguntasTotal />
  )
}

export default ListarPreguntas