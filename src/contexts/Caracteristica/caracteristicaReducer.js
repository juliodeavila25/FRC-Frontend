import { ADD_CARACTERISTICA, VALIDATE_CARACTERISTICA,GET_CARACTERISTICA, GET_CARACTERISTICA_ONE, UPDATE_CARACTERISTICA, DELETE_CARACTERISTICA, CARACTERISTICA_ERROR } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARACTERISTICA:
      return {
        ...state,
        caracteristicas: action.payload
      }; 
    case ADD_CARACTERISTICA:
      return {
        ...state,
        caracteristicas: [...state.caracteristicas, action.payload]
      };
      
      case GET_CARACTERISTICA_ONE:
        //console.log(action.payload);
        return {
          ...state,
          caracteristica: action.payload
        }; /*
    case VALIDATE_CARACTERISTICA:
      return {
        ...state,
        errorformulario: true
      };
    */
    case DELETE_CARACTERISTICA:
      return {
        ...state,
        caracteristicas: state.caracteristicas.filter((caracteristica) => caracteristica._id !== action.payload),
        caracteristica: null
      };
/*
    case SEDE_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    case UPDATE_CARACTERISTICA:
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
