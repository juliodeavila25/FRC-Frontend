import { useContext } from "react";
import OtrosDocumentosContext from "../context/otrosDocumentosProvider";


const useOtrosDocumentos = () => {
  return useContext(OtrosDocumentosContext);
};

export default useOtrosDocumentos;
