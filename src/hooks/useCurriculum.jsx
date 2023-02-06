import { useContext } from "react";
import CurriculumContext from "../context/CurriculumProvider";

const useCurriculum = () => {
  return useContext(CurriculumContext);
};

export default useCurriculum;
