import { useContext } from "react";
import OfertasContext from "../context/ofertasProvider";

const useOfertas = () => {
  return useContext(OfertasContext);
};

export default useOfertas;
