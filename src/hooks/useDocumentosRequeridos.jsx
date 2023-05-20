import { useContext } from "react";
import DocumentosRequeridosContext from "../context/documentosRequeridosProvider";

const useDocumentos = () => {
  return useContext(DocumentosRequeridosContext);
};

export default useDocumentos;
