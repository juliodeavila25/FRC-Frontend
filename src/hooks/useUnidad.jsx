import { useContext } from "react";
import UnidadContext from "../context/unidadProvider";

const useUnidad = () => {
  return useContext(UnidadContext);
};

export default useUnidad; 
