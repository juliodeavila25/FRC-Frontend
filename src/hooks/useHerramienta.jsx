import { useContext } from "react";
import HerramientaContext from "../context/herramientaProvider";

const useHerramienta = () => {
  return useContext(HerramientaContext);
};

export default useHerramienta; 
