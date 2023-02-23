import { useContext } from "react";
import NominasContext from "../context/nominasProvider";

const useNominas = () => {
  return useContext(NominasContext);
};

export default useNominas;
