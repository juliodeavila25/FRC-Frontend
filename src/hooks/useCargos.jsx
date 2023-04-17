import { useContext } from "react";
import CargosContext from "../context/cargosProvider";

const useCargos = () => {
  return useContext(CargosContext);
};

export default useCargos;
