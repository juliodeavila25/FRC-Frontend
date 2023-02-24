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
    fontSize: 9,
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
    flexBasis: 30
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
    padding: 10,
    fontSize: 10,
    fontWeight: 1200,
    color: "#1a245c",
    margin: 5,
    fontFamily: "Times-Roman"
  },
  tableText: {
   // margin: 10,
    fontSize: 9,
    //color: neutralDark
  },
  textBold: {
    fontFamily: "Times-Bold",
  },
  textHidden: {
    display: "none",
    color: "white"
  }
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 17,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 13,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 11,
    marginBottom: 5,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 11,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  textTitle: {
    color: 'blue',
    fontSize: 8
  },
});

const PdfCertificadoNomina = ({ data, curriculum }) => {
  console.log(curriculum);
  return (   
    <Document>
      <Page style={styles_table.page} size="A4" wrap>
        <View style={styles_table.table}>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={[styles_table.textBold, styles.textTitle, { fontSize: '11'} ]}> {curriculum[0].empresa}</Text></Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}> Fecha de Pago: </Text> {data.fecha_pago}</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}> Periodo: </Text>{data.periodo_inicio} Al {data.periodo_fin}</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NOMINA:</Text> MAGANGUE</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NIT </Text> 830123731 - 5</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>Causación</Text> {data.periodo_inicio} Al {data.periodo_fin}</Text>
              </View>
              <View style={[styles_table.row, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>CODIGO</Text> {curriculum[0].codigoIngreso}</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
                <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>FECHA INGRESO</Text> 2/02/2022 </Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>SUELDO BASE</Text> { data.sueldo_basico_format }</Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>IDENTIFICACION</Text> {data.identificacion}</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>NOMBRE</Text> {data.nombre_completo}</Text>
                  <Text style={[styles_table.headerText]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textBold}>CARGO</Text> {data.cargo}</Text>
                  <Text style={[styles_table.headerText]}><Text style={styles_table.textHidden}>NOMBRE {data.nombre_completo} </Text></Text>
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
              <View style={[styles_table.tableText, { paddingLeft: '20' }]}>
                <View style={[styles_table.row,  {flexBasis: 25}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>SUELDO</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.sueldo_basico_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>APORTE SALUD</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{data.apt_salud_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 25}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>AUX TRANSPORTE</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.aux_transp_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>APORTE PENSION</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{data.apt_pension_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 30}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>HORAS EXTRAS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.horas_extras_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>RETENCIÓN. FUENTE</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{data.ret_fuente_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 30}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>RECARGO NOCTURNO</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.rec_nocturno_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>OTROS DESCUENTOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{data.otros_descuentos_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 35}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>AUXILIOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.auxilios_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 35}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>OTROS PAGOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}>{ data.otros_pagos_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                </View>
              </View>            
              <View style={[styles_table.rowPaddingBottom]}></View>      
              <View style={[styles_table.row, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { textAlign: 'left',paddingLeft: '10' }]}><Text style={styles_table.textBold}>TOTAL PAGOS</Text></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { textAlign: 'right',paddingLeft: '2' }]}>{ data.total_pagos_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}><Text style={styles_table.textBold}>TOTAL DESCUENTOS</Text></Text>
                  <Text style={[styles_table.headerText]}>{ data.total_descuentos_format }</Text>
              </View>
              <View style={[styles_table.row, styles_table.boderTop, styles.header]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { textAlign: 'left',paddingLeft: '10' }]}><Text style={styles_table.textBold}>NETO A PAGAR</Text></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { paddingLeft: '7' }]}>{ data.total_neto_pagado_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter]}></Text>
                  <Text style={[styles_table.headerText]}></Text>
              </View>
        </View> 
      </Page>    
    </Document>
  );
};

export default PdfCertificadoNomina;
