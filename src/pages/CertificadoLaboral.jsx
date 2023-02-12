import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfCertificado from "../components/PdfCertificado";

const CertificadoLaboral = () => {
  const [data, setData] = useState({
    nombre: "Andres Puello",
  });

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <PdfCertificado data={data} />
      </PDFViewer>
    </>
  );
};

export default CertificadoLaboral;
