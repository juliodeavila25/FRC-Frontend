import { useContext } from "react";
import RequisitoContext from "../context/requisitoProvider";

const useRequisito = () => {
  return useContext(RequisitoContext);
};

export default useRequisito; 
