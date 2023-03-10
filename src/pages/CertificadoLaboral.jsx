import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useAuth from "../hooks/useAuth";
import PdfCertificado from "../components/PdfCertificado";
import useNominas from "../hooks/useNominas";
import useCurriculum from "../hooks/useCurriculum";

const CertificadoLaboral = () => {
  /*const [data, setData] = useState({
    nombre: "Andres Puello",
  });*/

  const { auth, cargando } = useAuth();
  const { nomina, obtenerNomina } = useNominas();
  const { curriculum, obtenerCurriculum } = useCurriculum();

  //const { nomina, obtenerNomina } = useNominas();

  useEffect(() => {
    obtenerNomina(auth.documento);
    obtenerCurriculum(auth._id);
  }, []);
  //console.log(auth._id);
  //console.log(auth.documento);

  if (Object.keys(curriculum).length !== 0) {
    console.log(curriculum);
  }

  return (
    <>
      {Object.keys(curriculum).length !== 0 && (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PdfCertificado data={nomina} curriculum={curriculum} />
        </PDFViewer>
      )}
    </>
  );
};

export default CertificadoLaboral;
