import { useContext } from "react";
import PostulacionesContext from "../context/postulacionesProvider";

const usePostulaciones = () => {
  return useContext(PostulacionesContext);
};

export default usePostulaciones;
