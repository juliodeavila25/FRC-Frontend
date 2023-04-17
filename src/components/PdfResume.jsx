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
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
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
  tableColTotal: { 
    width: "100%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColWidth: {  
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
  }, 
  tableColWidthTitle: {  
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#d5eaf2',
    fontStyle: 'italic', 
    fontWeight: 900,
    fontFamily: "Helvetica-Bold"
  }
});

const PdfResume = ({ data, curriculum }) => {
  //console.log(data);
  return (
    <Document>
      <Page style={styles.body}>      
        <View style={[styles.table, { marginTop: 60}]}> 
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 12,fontFamily: "Helvetica-Bold" }]}>Hoja de Vida</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Fecha</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "15%" }]}> 
              <Text style={styles.tableCell}>18/10/2023</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Empresa</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "55%" }]}> 
              <Text style={styles.tableCell}>Fundacion Renal de Colombia</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "40%" }]}> 
              <Text style={styles.tableCell}>Cargo</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "60%" }]}> 
              <Text style={styles.tableCell}>Ingeniero de Sistemas</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Apellidos</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Deavila Pertuz</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Nombre(s)</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Julio Cesar</Text> 
            </View>
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Edad</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "10%" }]}> 
              <Text style={styles.tableCell}>34</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>N° de Cedula</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "20%" }]}> 
              <Text style={styles.tableCell}>1.143.335.800</Text> 
            </View>
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Telefono</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "25%" }]}> 
              <Text style={styles.tableCell}>3162756140</Text> 
            </View>
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Dirección</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Campestre Calle 14 #30 - 247</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Ciudad</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Cartagena</Text> 
            </View>
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "40%" }]}> 
              <Text style={styles.tableCell}>Correo Electronico</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "60%" }]}> 
              <Text style={styles.tableCell}>juliodeavila25@gmail.com</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "40%" }]}> 
              <Text style={styles.tableCell}>Estado Civil</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "60%" }]}> 
              <Text style={styles.tableCell}>Union Libre</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
                Formación Profesional
                  <Text style={[{ fontSize: 10 }]}>
                    (Ultimo nivel de escolaridad)
                </Text> 
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>Nivel</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>Maestrias</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Titulo</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Magister Gobierno TI</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "10%" }]}> 
              <Text style={styles.tableCell}>Año</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "20%" }]}> 
              <Text style={styles.tableCell}>2020</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "25%" }]}> 
              <Text style={styles.tableCell}>Institución</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "45%" }]}> 
              <Text style={styles.tableCell}>Universidad del Norte</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
                Experiencia Laboral
                  <Text style={[{ fontSize: 10 }]}>
                    (Ultima empresa donde laboró)
                </Text> 
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "30%" }]}> 
              <Text style={styles.tableCell}>Empresa</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "70%" }]}> 
              <Text style={styles.tableCell}>Universidad de Cartagena</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Fecha Inicio</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>20/07/2017</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Fecha Fin</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>13/03/2023</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
                Referencias
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal]}> 
              <Text style={[styles.tableCellLeft, { fontSize: 10 }]}>
                Referencia 1
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "30%" }]}> 
              <Text style={styles.tableCell}>Nombre</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "70%" }]}> 
              <Text style={styles.tableCell}>Andres Puellos Burgos</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Celular/Telefono</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>3012798898</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Correo</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>andrespuellos@gmail.com</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal]}> 
              <Text style={[styles.tableCellLeft, { fontSize: 10 }]}>
                Referencia 2
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "30%" }]}> 
              <Text style={styles.tableCell}>Nombre</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "70%" }]}> 
              <Text style={styles.tableCell}>Karen Garces Parra</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Celular/Telefono</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>3227074179</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Correo</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>karengarcesparra@gmail.com</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
                Seguridad Social
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "15%" }]}> 
              <Text style={styles.tableCell}>EPS</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>Salud Total</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Fondo de Pensión</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Porvenir</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal, { backgroundColor: '#d5eaf2'}]}> 
              <Text style={[styles.tableCell, { fontSize: 11,fontFamily: "Helvetica-Bold" }]}>
                Datos Contrato
              </Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Codigo Ingreso</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "25%" }]}> 
              <Text style={styles.tableCell}>1528</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Tipo Contrato</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "35%" }]}> 
              <Text style={styles.tableCell}>Fijo Unidades</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Fecha Inicio</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>20/05/2020</Text> 
            </View> 
            <View style={[styles.tableColWidthTitle, { width: "20%" }]}> 
              <Text style={styles.tableCell}>Fecha Fin</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "30%" }]}> 
              <Text style={styles.tableCell}>23/02/2023</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "40%" }]}> 
              <Text style={styles.tableCell}>Nomina</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "60%" }]}> 
              <Text style={styles.tableCell}>Magangue</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={[styles.tableColWidthTitle, { width: "40%" }]}> 
              <Text style={styles.tableCell}>Sueldo</Text> 
            </View> 
            <View style={[styles.tableColWidth, { width: "60%" }]}> 
              <Text style={styles.tableCell}>$3.191.000</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColTotal]}> 
              <Text style={[styles.tableCell, { fontSize: 12, marginTop:60 }]}>Julio Cesar Deavila Pertuz</Text> 
            </View> 
          </View> 
        </View>
      </Page>
    </Document>
  );
};

export default PdfResume;
