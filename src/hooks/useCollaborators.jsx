import { useContext } from "react";
import CollaboratorsContext from "../context/CollaboratorsProvider";

const useCollaborators = () => {
  return useContext(CollaboratorsContext);
};

export default useCollaborators;
