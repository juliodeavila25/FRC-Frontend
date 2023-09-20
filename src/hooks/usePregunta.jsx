import { useContext } from "react";
import PreguntaContext from "../context/preguntaProvider";

const usePregunta = () => {
  return useContext(PreguntaContext);
};

export default usePregunta; 
