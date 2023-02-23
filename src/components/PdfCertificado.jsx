import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    paddingLeft: 10,
    textAlign: "left",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  textbr: {
    margin: 1,
    paddingLeft: 10,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  textb: {
    margin: 1,
    paddingLeft: 10,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Bold",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  sign: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: 150,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PdfCertificado = ({ data }) => {
  console.log(data);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.author}>CL0003475</Text>
        <Image
          style={styles.image}
          src="data:image/png;base64,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"
        />
        <Text style={styles.subtitle}>CERTIFICADO LABORAL</Text>
        <Text style={styles.text}>
          El señor(a)<Text style={styles.textb}> {data.nombre_completo} </Text>
          identificado(a) con cédula de ciudadanía número
          <Text style={styles.textb}> { data.identificacion_format }</Text>, presta sus
          servicios como <Text style={styles.textb}> {data.cargo} </Text> en la
          Fundación Renal de Colombia, desde el día 1 de septiembre del 2022 con
          un Contrato de Trabajo Vigente a
          <Text style={styles.textb}> Obra y Labor</Text>, devengando un
          Salario Mensual<Text style={styles.textb}> actual </Text>
          de:{" "}
          <Text style={styles.textb}>
            {data.sueldo_basico_letras} pesos (${ data.sueldo_basico_format}){" "}
          </Text>{" "}
          M/CTE. :
        </Text>
        <Text style={styles.text}>
          El presente certificado se expide a solicitud del interesado a los { data.dia_letras } ({data.dia}) días del mes de { data.mes_letras } del { data.anio_letras } ({data.anio}) a
          solicitud de <Text style={styles.textb}>A QUIEN INTERESE </Text>.
        </Text>
        <Text style={styles.text}>Cordialmente,</Text>
        <Image
          style={styles.sign}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Firma_de_Juan_Jos%C3%A9_Pradera.svg/2560px-Firma_de_Juan_Jos%C3%A9_Pradera.svg.png"
        />
        <Text style={styles.textb}>Mardelis Herrera Machado</Text>
        <Text style={styles.textb}>Fundacion Renal de Colombia</Text>
        <Text style={styles.textb}>Nit: 830 123 731-5</Text>
        <Text style={styles.textb}>CRA 11 No 71-41 oficina 406</Text>
        <Text style={styles.text}>
          <Text style={styles.textb}>Nota:</Text> La alteración indebida de
          cualquiera de los datos acá consignados, constituirá delito de
          falsedad en documento público que puede servir de prueba y en
          consecuencia acarreará las sanciones previstas en el código penal.
          Este certificado podra ser verificado en la siguiente direccion:
          http://www.fundacionrenaldecolombia.com/. Usando el codigo:
          aceb5760-69f2-11ed-a409-522753663d7e
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PdfCertificado;
