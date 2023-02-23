import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfCertificadoNomina from "../components/PdfCertificadoNomina";
import useNominas from "../hooks/useNominas"

const CertificadoDesprendible = () => {
 /* const [data, setData] = useState({
    nombre: "Andres Puello",
  });*/

  const { nomina, obtenerNomina } = useNominas();

  useEffect(()=>{
    obtenerNomina({"identificacion":"1050953869","periodo":"202302"});
  },[]);
  console.log(nomina);

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <PdfCertificadoNomina data={nomina} />
      </PDFViewer>
    </>
  );
};

export default CertificadoDesprendible;
