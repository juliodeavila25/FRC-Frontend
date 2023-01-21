import { ADD_SEDE, VALIDATE_SEDE, GET_SEDE, UPDATE_SEDE, DELETE_SEDE, SEDE_ERROR } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_SEDE:
      return {
        ...state,
        sedes: action.payload
      }; 
    case ADD_SEDE:
      return {
        ...state,
        sedes: [...state.sedes, action.payload]
      };/*
    case VALIDATE_SEDE:
      return {
        ...state,
        errorformulario: true
      };
    */
    case DELETE_SEDE:
      return {
        ...state,
        sedes: state.sedes.filter((sede) => sede._id !== action.payload),
        sede: null
      };
/*
    case SEDE_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    case UPDATE_SEDE:
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
