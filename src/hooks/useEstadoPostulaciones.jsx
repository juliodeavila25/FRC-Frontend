import { useContext } from "react";
import EstadoPostulacionesContext from "../context/estadoPostulacionesProvider";

const useEstadoPostulaciones = () => {
  return useContext(EstadoPostulacionesContext);
};

export default useEstadoPostulaciones;
