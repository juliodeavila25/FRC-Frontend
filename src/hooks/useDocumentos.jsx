import { useContext } from "react";
import DocumentosContext from "../context/documentosProvider";

const useDocumentos = () => {
  return useContext(DocumentosContext);
};

export default useDocumentos;
