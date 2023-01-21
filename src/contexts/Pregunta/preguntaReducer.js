import { ADD_PREGUNTA, VALIDATE_PREGUNTA,GET_PREGUNTA, GET_PREGUNTA_ONE, UPDATE_PREGUNTA, DELETE_PREGUNTA, PREGUNTA_ERROR } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PREGUNTA:
      return {
        ...state,
        preguntas: action.payload
      }; 
    case ADD_PREGUNTA:
      return {
        ...state,
        preguntas: [...state.preguntas, action.payload]
      };
      
      case GET_PREGUNTA_ONE:
        //console.log(action.payload);
        return {
          ...state,
          pregunta: action.payload
        }; 
    /*
    case VALIDATE_PREGUNTA:
      return {
        ...state,
        errorformulario: true
      };
    */
    case DELETE_PREGUNTA:
      return {
        ...state,
        preguntas: state.preguntas.filter((pregunta) => pregunta._id !== action.payload),
        pregunta: null
      };
/*
    case SEDE_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    case UPDATE_PREGUNTA:
      return {
        ...state,
        requests: state.presupuestos.map((presupuesto) =>
          presupuesto._id === action.payload._id ? action.payload : presupuesto
        ),
        presupuestoseleccionado: null,
        nuevapagina: false
      };
    */
    default:
      return state;
  }
};
