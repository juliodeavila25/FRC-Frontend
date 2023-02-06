import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const PdfCertificado = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.author}>CL0003475</Text>
    </Page>
  </Document>
);

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

export default PdfCertificado;
