import { useContext } from "react";
import FuncionalContext from "../context/funcionalProvider";

const useFuncional= () => {
  return useContext(FuncionalContext);
};

export default useFuncional; 
