import { ADD_ESPACIO, VALIDATE_ESPACIO, GET_ESPACIO, GET_ESPACIO_ONE, UPDATE_ESPACIO, DELETE_ESPACIO, ESPACIO_ERROR } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ESPACIO:
      return {
        ...state,
        espacios: action.payload
      }; 
    case GET_ESPACIO_ONE:
        return {
          ...state,
          espacio: action.payload
        };   
    case ADD_ESPACIO:
      return {
        ...state,
        espacios: [...state.espacios, action.payload]
      };/*
    case VALIDATE_ESPACIO:
      return {
        ...state,
        errorformulario: true
      };
    */
    case DELETE_ESPACIO:
      return {
        ...state,
        espacios: state.espacios.filter((espacio) => espacio._id !== action.payload),
        espacio: null
      };
/*
    case ESPACIO_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    case UPDATE_ESPACIO:
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
