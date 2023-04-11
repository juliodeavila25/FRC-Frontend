import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";


/*

const styles_array = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '25%',
  },
  row2: {
    width: '25%',
  },
  row3: {
    width: '25%',
  },
  row4: {
    width: '25%',
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  rowView: {
    display: 'flex', 
    flexDirection: 'row', 
    borderTop: '1px solid #EEE', 
    paddingTop: 8, 
    paddingBottom: 8, 
    textAlign: "center"
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    padding: 4,
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10,
    padding: 4,
    color: "#1a245c",
  }
})

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
*/
const styles = StyleSheet.create({
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0,
    margin: "30",
    fontFamily: "Helvetica"
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    marginBottom: 5,
    fontSize: 10 
  }, 
  tableCellLeft: { 
 	marginLeft: 5,
    marginTop: 5, 
    marginBottom: 5,
    fontSize: 10,
    textAlign: 'left',
    fontFamily: "Helvetica-Bold"
  }, 
  tableCellRight: { 
 	marginRight: 10,
    marginTop: 0, 
    marginBottom: 5,
    fontSize: 10,
    textAlign: 'right',
    fontFamily: "Helvetica"
  }, 
  tableColTotal: { 
    width: "100%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableColWidthTitle: {  
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#ededed',
    fontStyle: 'italic', 
    fontWeight: 900,
    fontFamily: "Helvetica-Bold"
  },
  tableColWidthTitleBlank: {  
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: 'white',
    fontFamily: "Helvetica-Bold"
  },
  textBr: {
    marginTop: 12,
  },
  textBold: {
    fontFamily: "Helvetica-Bold"
  }
});

const styles_table = StyleSheet.create({
  page: { 
    flexDirection: "column",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
    
  },
  table: {
    fontSize: 9,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0,
  }
});

const styles_array = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '25%',
  },
  row2: {
    width: '25%',
  },
  row3: {
    width: '25%',
  },
  row4: {
    width: '25%',
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  rowView: {
    display: 'flex', 
    flexDirection: 'row', 
    borderTop: '1px solid #EEE', 
    paddingTop: 8, 
    paddingBottom: 8, 
    textAlign: "center"
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    padding: 4,
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10,
    padding: 4,
    fontFamily: "Helvetica"
  }
});
/*
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});*/

const PdfCertificadoNomina = ({ data, curriculum }) => {
  //console.log(curriculum);
  const data_table = [{
        "codigo": 6,
        "concepto": "APORTE SALUD ",
        "tipo": "Descuento ",
        "valor": -127640
    },
    {
        "codigo": 7,
        "concepto": "APORTE PENSION ",
        "tipo": "Descuento ",
        "valor": -127640
    },
    {
        "codigo": 1,
        "concepto": "SUELDO ",
        "tipo": "Pago ",
        "valor": 3191000
    }];
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  return (
    <Document>
      <Page style={styles.body} size="A4" wrap>      
      <View style={[styles.table, { marginTop: 60,borderWidth: 0 }]}> 
        <View style={[styles.tableRow, { }]}>
          <View style={[styles.tableColTotal, { backgroundColor: 'white',borderWidth: 0}]}> 
            <Text style={[styles.tableCell, { fontSize: 12,fontFamily: "Helvetica-Bold" }]}>Comprobante de Nomina</Text> 
          </View> 
        </View> 
        <View style={styles.tableRow}> 
          <View style={[styles.tableColWidthTitleBlank, { width: "50%", marginTop: 30, marginBottom: 0 }]}> 
            <Image
              style={styles.image}
              src="data:image/png;base64,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"
            />
            <Text style={styles.tableCell}>Fundacion Renal de Colombia</Text> 
            <Text style={styles.tableCell}>NIT 830123731 - 5</Text>
          </View> 
          <View style={[styles.tableColWidthTitleBlank, { width: "50%", marginTop: 30 }]}> 
            <Text style={styles.tableCellRight}>
              Periodo de Pago: <Text style={styles.textBold}>{data.periodo_inicio} Al {data.periodo_fin}</Text>
            </Text>
            <Text style={styles.tableCellRight}>
              Comprobante Número: <Text style={styles.textBold}>{curriculum[0].codigoIngreso}</Text>
            </Text>
            <Text style={styles.textBr}>
            </Text>
            <Text style={styles.tableCellRight}>
              Nombre: <Text style={styles.textBold}>{data.nombre_completo}</Text>
            </Text>
            <Text style={styles.tableCellRight}>
              Identificación: <Text style={styles.textBold}>{data.identificacion}</Text>
            </Text>
            <Text style={styles.tableCellRight}>
              Cargo: <Text style={styles.textBold}>{data.cargo}</Text>
            </Text>
            <Text style={styles.tableCellRight}>
              Salario Básico: <Text style={styles.textBold}> {USDollar.format(data.sueldo_basico)}</Text>
            </Text>
          </View>  
        </View>
        <Text style={styles.textBr}></Text>
        <View style={[styles_table.table, {backgroundColor: '#ededed',borderBottomWidth: 0, borderTopWidth:1 , borderRightWidth:1 , borderLeftWidth:1}]}>
          <View style={styles_array.tableRow}>
            <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
              Ingresos/Deducciones
            </Text> 
          </View>
        </View>  
        <View style={[styles_table.table, {borderTopWidth: 1,borderLeftWidth: 1}]}>
          <View style={styles_array.tableRow}>
            <View style={styles_array.tableCol}> 
              <Text style={[styles_array.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>Codigo</Text> 
            </View> 
            <View style={styles_array.tableCol}>              
              <Text style={[styles_array.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>Concepto</Text>
            </View> 
            <View style={styles_array.tableCol}>
              <Text style={[styles_array.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>Tipo</Text>
            </View> 
            <View style={styles_array.tableCol}> 
              <Text style={[styles_array.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>Valor</Text>
            </View> 
          </View>
          {data_table.map((row, i) => (
            <View key={i} style={styles_array.tableRow} wrap={false}>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.codigo}</Text>
              </Text>              
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.concepto}</Text>              
              </Text>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.tipo}</Text>
              </Text>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{USDollar.format(row.valor)} </Text>
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.textBr}></Text>
        <View style={styles.tableRow}> 
          <View style={[styles.tableCol, { width: "40%", fontFamily: "Helvetica-Bold"  }]}> 
            <Text style={styles.tableCell}>Total Ingresos</Text> 
          </View> 
          <View style={[styles.tableColWidth, { width: "60%" }]}> 
            <Text style={styles.tableCellRight}>{USDollar.format(data.total_pagos)}</Text> 
          </View> 
        </View> 
        <View style={styles.tableRow}> 
          <View style={[styles.tableCol, { width: "40%", fontFamily: "Helvetica-Bold" }]}> 
            <Text style={styles.tableCell}>Total Deducciones</Text> 
          </View> 
          <View style={[styles.tableColWidth, { width: "60%" }]}> 
            <Text style={styles.tableCellRight}>{USDollar.format(data.total_descuentos)}</Text> 
          </View> 
        </View>
        <Text style={styles.textBr}></Text>
        <View style={styles.tableRow}> 
          <View style={[styles.tableColWidthTitle, { width: "40%", fontFamily: "Helvetica-Bold" }]}> 
            <Text style={styles.tableCell}>Neto a Pagar</Text> 
          </View> 
          <View style={[styles.tableColWidth, { width: "60%", backgroundColor: '#ededed' }]}> 
            <Text style={[styles.tableCellRight, {marginTop: 5, fontFamily: "Helvetica-Bold"}]}>{USDollar.format(data.total_neto_pagado)}</Text> 
          </View> 
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableColTotal, {borderWidth: 0}]}> 
            <Text style={[styles.tableCell, { fontSize: 12, marginTop:40 }]}>
              Este comprobante de nomina fue elaborado y enviado a través del portal FRC. 
              	<Link src='http://www.fundacionrenaldecolombia.com/'>
                <Text style={{ fontSize: 12 }}>Validación</Text>
            	</Link>
            </Text>
          </View> 
        </View> 
      </View>
    </Page>
    {/* 
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
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>SUELDO</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.sueldo_basico_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>APORTE SALUD</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{data.apt_salud_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 25}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>AUX TRANSPORTE</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.aux_transp_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>APORTE PENSION</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{data.apt_pension_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 30}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>HORAS EXTRAS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.horas_extras_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>RETENCIÓN. FUENTE</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{data.ret_fuente_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 30}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>RECARGO NOCTURNO</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.rec_nocturno_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>OTROS DESCUENTOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{data.otros_descuentos_format}</Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 35}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>AUXILIOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.auxilios_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}></Text>
                </View>
                <View style={[styles_table.row,  {flexBasis: 35}]}>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}>OTROS PAGOS</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}>{ data.otros_pagos_format }</Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 150 }]}></Text>
                  <Text style={[styles_table.headerText, styles_table.cellCenter, { width: 50 }]}></Text>
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
      <Page style={styles_table.page} size="A4" wrap>
      <View style={styles_table.table}>
          <View style={styles_array.tableRow}>
            <View style={styles_array.tableCol}> 
              <Text style={styles_array.tableCell}>Codigo</Text> 
            </View> 
            <View style={styles_array.tableCol}> 
              <Text style={styles_array.tableCell}>Concepto</Text> 
            </View> 
            <View style={styles_array.tableCol}> 
              <Text style={styles_array.tableCell}>Tipo</Text> 
            </View> 
            <View style={styles_array.tableCol}> 
              <Text style={styles_array.tableCell}>Valor</Text> 
            </View> 
          </View>
          {data_table.map((row, i) => (
            <View key={i} style={styles_array.tableRow} wrap={false}>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.codigo}</Text>
              </Text>              
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.concepto}</Text>              
              </Text>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{row.tipo}</Text>
              </Text>
              <Text style={styles_array.tableCol}>
                <Text style={styles_array.tableCell}>{USDollar.format(row.valor)} </Text>
              </Text>
            </View>
          ))}
        </View>
      </Page>*/}
    </Document>
  );
};

export default PdfCertificadoNomina;
