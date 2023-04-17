import { useContext } from "react";
import NominaDetalladasContext from "../context/nominaDetalladasProvider";

const useNominaDetalladas = () => {
  return useContext(NominaDetalladasContext);
};

export default useNominaDetalladas;
