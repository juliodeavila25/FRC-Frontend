import {
  ADD_REQUEST,
  VALIDATE_REQUEST,
  GET_REQUEST,
  GET_REQUEST_EVENT,
  GET_REQUEST_ONE,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  REQUEST_ERROR
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        requests: action.payload
      };
    case GET_REQUEST_EVENT:
      return {
        ...state,
        requests: action.payload
      };
    case GET_REQUEST_ONE:
      return {
        ...state,
        request: action.payload
      };

    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload]
      };

    case REQUEST_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    /*
    case VALIDATE_REQUEST:
      return {
        ...state,
        errorformulario: true
      };

    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.presupuestos.filter((presupuesto) => presupuesto._id !== action.payload),
        presupuesto: null
      };

    

    case UPDATE_REQUEST:
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
