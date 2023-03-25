import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfCertificadoNomina from "../components/PdfCertificadoNomina";
import useNominas from "../hooks/useNominas"
import useAuth from "../hooks/useAuth";
import useCurriculum from "../hooks/useCurriculum";
import { BeatLoader } from "react-spinners";
const CertificadoDesprendible = () => {
 /* const [data, setData] = useState({
    nombre: "Andres Puello",
  });*/
  const { auth, cargando } = useAuth();
  const {cargandoData, nomina, obtenerNomina } = useNominas();
  const { curriculum, obtenerCurriculum } = useCurriculum();

  useEffect(()=>{
    const periodo = localStorage.getItem("periodo");
    obtenerNomina(auth.documento, periodo);
    obtenerCurriculum(auth._id);
  },[]);


   if (cargandoData) return <BeatLoader color="#36d7b7" />;
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
