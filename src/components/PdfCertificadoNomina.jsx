import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles_table = StyleSheet.create({
  page: { 
    flexDirection: "column",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
    
  },
  table: {
    fontSize: 10,
    width: 522,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
  },
  rowPaddingBottom: {
    flexBasis: 100
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35
  },
  marginTotal: {
    flexBasis: 20
  },
  boderTop: {        
    borderTopWidth: 1
  },
  boderRight: {        
    borderRightWidth: 1
  },
  cell: {
    borderColor: "#cc0000",
    borderStyle: "solid",
    borderWidth: 2,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch"
  },
  cellCenter: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch"
  },
  header: {
    backgroundColor: "#eee"
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c",
    margin: 15,
    fontFamily: "Times-Roman"
  },
  tableText: {
    margin: 10,
    fontSize: 10,
    //color: neutralDark
  },
  textBold: {
    fontFamily: "Times-Bold",
  }
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  textTitle: {
    color: 'blue',
    fontSize: 9
  },
});

const PdfCertificadoNomina = ({ data }) => {
  console.log(data);
  return (
    <Document>
      <Page style={styles_table.page} size="A4" wrap>
        <View style={styles_table.table}>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={[styles_table.textBold, styles.textTitle]}> FUNDACION RENAL DE COLOMBIA</Text></Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}> Fecha de Pago: </Text> 30/01/2023</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}> Periodo: </Text>01/01/2023 Al 30/01/2023</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NOMINA:</Text> MAGANGUE</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NIT </Text> 830123731 - 5</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>Causación</Text> 1/01/2023 Al 30/01/2023</Text>
              </View>
              <View style={[styles_table.row, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>CODIGO</Text> 1748</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>FECHA INGRESO</Text> 2/02/2022 </Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>SUELDO BASE</Text> 2.421.540,00</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>IDENTIFICACION</Text> 8865970</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NOMBRE</Text> CARLOS GABRIEL CASTILLO CASTRO</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>CARGO</Text> ASISTENTE DE RECURSOS HUMANOS</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
              <View style={[styles_table.row, styles_table.marginTotal, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>PAGOS</Text></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>DESCUENTOS</Text></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>Descripción - Valor</Text></Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>Descripción - Valor</Text></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
              <View style={[styles_table.row, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { textAlign: 'left',paddingLeft: '10' }]}>SUELDO</Text>
                  <Text style={[styles_table.headerText]}>2.421.540,00</Text>
                <Text style={[styles_table.headerText, styles_table.cellCenter, { textAlign: 'left',paddingRight: '10' }]}>APORTE SALUD:</Text>
                  <Text style={[styles_table.headerText]}>96.862,00</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { paddingRight: '10' }]}>APORTE PENSION</Text>
                  <Text style={[styles_table.headerText]}>96.862,00</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                <Text style={[styles_table.headerText, styles_table.cellCenter, { paddingRight: '10' }]}>OTROS DESCUENTOS</Text>
                  <Text style={[styles_table.headerText]}>72.736,00</Text>
              </View>
              <View style={[styles_table.rowPaddingBottom]}></View>      
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>TOTAL PAGOS</Text></Text>
                  <Text style={[styles_table.headerText]}>2.421.540,00</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>TOTAL DESCUENTOS</Text></Text>
                  <Text style={[styles_table.headerText]}>266.460,00</Text>
              </View>
              <View style={[styles_table.row, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>NETO A PAGAR</Text></Text>
                  <Text style={[styles_table.headerText]}>2.155.080,00</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
        </View> 
      </Page>    
    </Document>
  );
};

export default PdfCertificadoNomina;
