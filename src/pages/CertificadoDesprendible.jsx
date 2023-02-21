import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfCertificadoNomina from "../components/PdfCertificadoNomina";

const CertificadoDesprendible = () => {
  const [data, setData] = useState({
    nombre: "Andres Puello",
  });

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <PdfCertificadoNomina data={data} />
      </PDFViewer>
    </>
  );
};

export default CertificadoDesprendible;
