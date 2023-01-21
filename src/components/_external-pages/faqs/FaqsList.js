import { Icon } from '@iconify/react';
import { useState, useContext, useEffect } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeIn, MotionInView } from '../../animate';
import caracteristicaContext from 'src/contexts/Caracteristica/caracteristicaContext';
import preguntaContext from 'src/contexts/Pregunta/preguntaContext';
// ----------------------------------------------------------------------

const MOCK_FAQS = [...Array(8)].map((_, index) => ({
  id: mockData.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: mockData.text.description(index)
}));

// ----------------------------------------------------------------------

export default function FaqsList() {
  //Get Preguntas
  const PreguntaContext = useContext(preguntaContext);
  const { obtenerPreguntaPublico, preguntas } =  PreguntaContext;
  console.log(preguntas);
  useEffect(() => {
    obtenerPreguntaPublico();
  }, []);
  return (
    <MotionInView variants={varFadeIn}>
      {preguntas.map((list) => (
        <Accordion key={list.id}>
          <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
            <Typography variant="subtitle1">{list.nombre}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{list.respuesta}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MotionInView>
  );
}
