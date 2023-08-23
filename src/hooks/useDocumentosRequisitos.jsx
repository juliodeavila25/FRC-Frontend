import { useContext } from "react";
import DocumentosRequisitosContext from "../context/documentosRequisitosProvider";

const useDocumentosRequisitos = () => {
  return useContext(DocumentosRequisitosContext);
};

export default useDocumentosRequisitos; 
