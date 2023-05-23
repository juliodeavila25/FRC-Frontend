import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useAuth from "../hooks/useAuth";
import PdfCertificado from "../components/PdfCertificado";
import useNominas from "../hooks/useNominas";
import useCurriculum from "../hooks/useCurriculum";
import { BeatLoader } from "react-spinners";

const CertificadoLaboral = () => {
  /*const [data, setData] = useState({
    nombre: "Andres Puello",
  });*/

  const { auth, cargando } = useAuth();
  const { cargandoData, nominas, obtenerNomina } = useNominas();
  const { curriculum, obtenerCurriculum } = useCurriculum();
  
  //const { nomina, obtenerNomina } = useNominas();

  useEffect(() => {
    obtenerCurriculum(auth._id);
  }, []);
  //console.log(auth._id);
  //console.log(auth.documento);

  
  //let curriculum_individual = curriculum[0];
  if (Object.keys(curriculum).length !== 0) {
    console.log(curriculum);
 /* }

  if(Array.isArray(nominas) && nominas.length > 0){
  const data = nominas[0]*/
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    function currencyFormat(num) {
      return "" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    function documentFormat(num) {
      return "" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    function numeroALetras(n){
      var num = parseInt((n*100)+'');
  
      var centavos = num%100;
      var numero = parseInt(n+'');
  
      var respuesta = '';
  
      if (numero > 999) {
          if ((numero+'').length > 6) {
              
              var residuo  = parseInt((numero + ''))%1000000;
              var x  = parseInt(numero/1000000);
      
              if (x == 1) {
                  respuesta = ' UN MILLON ' + numeroALetras(residuo);
              } else {
                  respuesta = numeroALetras(x) + ' MILLONES ' + numeroALetras(residuo);
              }
          }else if ((numero+'').length > 3) {
              var residuo  = parseInt((numero + ''))%1000;
              var x  = parseInt(numero/1000);
      
              if (x == 1) {
                  respuesta = ' MIL' + numeroALetras(residuo);
              } else {
                  respuesta = numeroALetras(x) + ' MIL ' + numeroALetras(residuo);
              }
          }        
      } else {
          if (numero == 100) {
              respuesta = 'CIEN';
          }else if (numero > 100) {
              var cen = parseInt(numero/100);
              var dec = numero % 100;
  
              respuesta = ' ' + centenas_nal(cen) + ' ' + numeroALetras(dec);
          }else{
              var dec = numero % 100;
  
              if (dec < 20) {
                  respuesta = ' ' + unidades_nal(dec);
              } else {
                  var unis = dec%10;
                  var ddec = parseInt(dec/10);
  
                  if (unis != 0) {
                      respuesta = ' ' + decenas_nal(ddec) + ' Y ' + unidades_nal(unis);
                  } else {
                      respuesta = ' ' + decenas_nal(ddec);
                  }
              }
          }
      }
  
      return respuesta;
  }
  
  ///////////////////////////
  
  function unidades_nal(n){
      if (n + '' == '1') {
          return 'UNO'
      }
      if (n + '' == '2') {
          return 'DOS'
      }
      if (n + '' == '3') {
          return 'TRES'
      }
      if (n + '' == '4') {
          return 'CUATRO'
      }
      if (n + '' == '5') {
          return 'CINCO'
      }
      if (n + '' == '6') {
          return 'SEIS'
      }
      if (n + '' == '7') {
          return 'SIETE'
      }
      if (n + '' == '8') {
          return 'OCHO'
      }
      if (n + '' == '9') {
          return 'NUEVE'
      }
  
      
      if (n + '' == '10') {
          return 'DIEZ'
      }
      if (n + '' == '11') {
          return 'ONCE'
      }
      if (n + '' == '12') {
          return 'DOCE'
      }
      if (n + '' == '13') {
          return 'TRECE'
      }
      if (n + '' == '14') {
          return 'CATORCE'
      }
      if (n + '' == '15') {
          return 'QUINCE'
      }
      if (n + '' == '16') {
          return 'DIECISEIS'
      }
      if (n + '' == '17') {
          return 'DIECISIETE'
      }
      if (n + '' == '18') {
          return 'DIECIOCHO'
      }
      if (n + '' == '19') {
          return 'DIECINUEVE'
      }
  
      return '';
  }
  
  function decenas_nal(n){
      if (n + '' == '1') {
          return 'DIEZ'
      }
      if (n + '' == '2') {
          return 'VEINTE'
      }
      if (n + '' == '3') {
          return 'TREINTA'
      }
      if (n + '' == '4') {
          return 'CUARENTA'
      }
      if (n + '' == '5') {
          return 'CINCUENTA'
      }
      if (n + '' == '6') {
          return 'SESENTA'
      }
      if (n + '' == '7') {
          return 'SETENTA'
      }
      if (n + '' == '8') {
          return 'OCHENTA'
      }
      if (n + '' == '9') {
          return 'NOVENTA'
      }
      
      return '';
  }
  
  function centenas_nal(n){
      if (n + '' == '1') {
          return 'CIENTO'
      }
      if (n + '' == '2') {
          return 'DOCIENTOS'
      }
      if (n + '' == '3') {
          return 'TRECIENTOS'
      }
      if (n + '' == '4') {
          return 'CUATROCIENTOS'
      }
      if (n + '' == '5') {
          return 'QUINIENTOS'
      }
      if (n + '' == '6') {
          return 'SEISCIENTOSD'
      }
      if (n + '' == '7') {
          return 'SETECIENTOS'
      }
      if (n + '' == '8') {
          return 'OCHOCIENTOS'
      }
      if (n + '' == '9') {
          return 'NOVECIENTOS'
      }
      
      return '';
  }
  
  /////////////////
  
  function numerosAMeses(n){
      if (n + '' == '1') {
          return 'ENERO'
      }
      if (n + '' == '2') {
          return 'FEBRERO'
      }
      if (n + '' == '3') {
          return 'MARZO'
      }
      if (n + '' == '4') {
          return 'ABRIL'
      }
      if (n + '' == '5') {
          return 'MAYO'
      }
      if (n + '' == '6') {
          return 'JUNIO'
      }
      if (n + '' == '7') {
          return 'JULIO'
      }
      if (n + '' == '8') {
          return 'AGOSTO'
      }
      if (n + '' == '9') {
          return 'SEPTIEMBRE'
      }
      if (n + '' == '11') {
          return 'NOVIEMBRE'
      }
      if (n + '' == '12') {
          return 'DICIEMBRE'
      }
  
      return ''
  }
  
  function numeroADias(n){
      if (n + '' == '1') {
          return 'LUNES'
      }
      if (n + '' == '2') {
          return 'MARTES'
      }
      if (n + '' == '3') {
          return 'MIERCOLES'
      }
      if (n + '' == '4') {
          return 'JUEVES'
      }
      if (n + '' == '5') {
          return 'VIERNES'
      }
      if (n + '' == '6') {
          return 'SABADO'
      }
      if (n + '' == '0') {
          return 'DOMINGO'
      }
  
      return ''
  }
      
   
      //data["identificacion_format"] = documentFormat(data.identificacion);
      //Pagos
      curriculum[0]["sueldo_basico_format"] = currencyFormat(curriculum[0].sueldo);
     /*data["total_neto_pagado_format"] = currencyFormat(data.total_neto_pagado);
      data["aux_transp_format"] = currencyFormat(data.aux_transp);
      data["horas_extras_format"] = currencyFormat(data.horas_extras);
      data["rec_nocturno_format"] = currencyFormat(data.rec_nocturno);
      data["auxilios_format"] = currencyFormat(data.auxilios);
      data["otros_pagos_format"] = currencyFormat(data.otros_pagos);
      data["total_pagos_format"] = currencyFormat(data.total_pagos);
      //Descuentos
      data["apt_salud_format"] = currencyFormat(data.apt_salud);
      data["apt_pension_format"] = currencyFormat(data.apt_pension);
      data["ret_fuente_format"] = currencyFormat(data.ret_fuente);
      data["otros_descuentos_format"] = currencyFormat(data.otros_descuentos);
      data["total_descuentos_format"] = currencyFormat(data.total_descuentos);*/
      //Monena a Letras
      let numero_letras = numeroALetras(curriculum[0].sueldo);
      const numero_letras_trim = numero_letras.replace(/\s+/g, ' ').trim();
      //Date
      let dia_letras = numeroALetras(day);
      const dia_letras_trim = dia_letras.replace(/\s+/g, ' ').trim();
      let mes_letras = numerosAMeses(month);
      const mes_letras_trim = mes_letras.replace(/\s+/g, ' ').trim();
      let anio_letras = numeroALetras(year);
      const anio_letras_trim = anio_letras.replace(/\s+/g, ' ').trim();
      curriculum[0]["sueldo_basico_letras"] = numero_letras_trim;
      curriculum[0]["dia"] = day;
      curriculum[0]["dia_letras"] = dia_letras_trim;
      curriculum[0]["mes"] = month;
      curriculum[0]["mes_letras"] = mes_letras_trim;
      curriculum[0]["anio"] = year;
      curriculum[0]["anio_letras"] = anio_letras_trim;
  }
  
   if (cargandoData && !curriculum) return <BeatLoader color="#36d7b7" />;
   
  return (
    <>
      {Object.keys(curriculum).length !== 0 /*&&  Array.isArray(nominas) && nominas.length > 0 */?(
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PdfCertificado /*data={nominas[0]} */ curriculum={curriculum} />
        </PDFViewer>
      ): null}
    </>
  );
};

export default CertificadoLaboral;
