import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfCertificadoNomina from "../components/PdfCertificadoNomina";
import useNominas from "../hooks/useNominas"
import useAuth from "../hooks/useAuth";
import useCurriculum from "../hooks/useCurriculum";

const CertificadoDesprendible = () => {
 /* const [data, setData] = useState({
    nombre: "Andres Puello",
  });*/
  const { auth, cargando } = useAuth();
  const { nomina, obtenerNomina } = useNominas();
  const { curriculum, obtenerCurriculum } = useCurriculum();

  useEffect(()=>{
    obtenerNomina(auth.documento);
    obtenerCurriculum(auth._id);
  },[]);
  console.log(nomina);
  console.log(curriculum);
  return (
    <>
      {Object.keys(curriculum).length !== 0 && (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PdfCertificadoNomina data={nomina} curriculum={curriculum} />
        </PDFViewer>
      )}      
    </>
  );
};

export default CertificadoDesprendible;
