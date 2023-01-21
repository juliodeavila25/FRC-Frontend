import React, { useReducer } from 'react';
import requestContext from './requestContext';
import requestReducer from './requestReducer';
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

import clienteAxios from '../../config/axios';

const RequestState = (props) => {
  const initialState = {
    requests: [],
    mensaje: null
    /* errorformulario: false,
        presupuesto: null,
        mensaje: null,
        presupuestoseleccionado: null,
        nuevapagina: false,
        restante: 0 */
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(requestReducer, initialState);

  // Serie de funciones para el crud
  // Obtener los proyectos
  /* const obtenerPresupuestos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/presupuestos');
            console.log(resultado)
            dispatch({
                type : OBTENER_PRESUPUESTOS,
                payload: resultado.data.presupuestos
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: PRESUPUESTO_ERROR,
                payload: alerta

            })
            
        }
    } */

  const obtenerRequest = async () => {
    try {
      const resultado = await clienteAxios.get('/api/solicitudes');
      dispatch({
        type: GET_REQUEST,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: REQUEST_ERROR,
        payload: alerta
      });
    }
  };

  const obtenerRequestEvent = async () => {
    try {
      const resultado = await clienteAxios.get('/api/solicitudes/event');
      dispatch({
        type: GET_REQUEST,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: REQUEST_ERROR,
        payload: alerta
      });
    }
  };

  const obtenerRequestOne = async (requestId) => {
    let id = requestId;
    try {
      const resultado = await clienteAxios.get('/api/solicitudes/one', {
        params: { id }
      });
      dispatch({
        type: GET_REQUEST_ONE,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: REQUEST_ERROR,
        payload: alerta
      });
    }
  };

  // Add New Request
  const addRequest = async (request) => {
    try {
      // console.log(request);
      const resultado = await clienteAxios.post('/api/solicitudes/register', request);
      dispatch({
        type: ADD_REQUEST,
        payload: resultado.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateRequest = async (request) => {
    console.log(request);
    try {
      const resultado = await clienteAxios.put(`/api/solicitudes/update_estado`, request);
      //console.log(resultado)
      dispatch({
        type: UPDATE_REQUEST,
        payload: resultado.data.request
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener solicitud por radicado
  const obtenerRequestByRadicado = async (requestId) => {
    console.log(requestId);
    let n_radicado = requestId;
    try {
      const resultado = await clienteAxios.get('/api/solicitudes/one_radicado', {
        params: { n_radicado }
      });
      dispatch({
        type: GET_REQUEST_ONE,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: REQUEST_ERROR,
        payload: alerta
      });
    }
  };

  /*
    //Funcion para mostrar error cuando el nombre de presupuesto y valor se encuentre vacio y se de submit
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_PRESUPUESTO
        })
    }

    //Selecciona el proyecto cuando el usuario le dio click
    const presupuestoActual = presupuestoID =>{
        dispatch({
            type: PRESUPUESTO_ACTUAL,
            payload: presupuestoID
        })
    }

    //Elimina un presupuesto
    const  eliminarPresupuesto = async presupuestoId =>{
        try {
            await clienteAxios.delete(`/api/presupuestos/${presupuestoId}`);
            dispatch({
                type: ELIMINAR_PRESUPUESTO,
                payload: presupuestoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: PRESUPUESTO_ERROR,
                payload: alerta
            })
            
        }
    }

    //Actualizar y/o editar el presupuesto seleccionado
    const actualizarPresupuesto = async presupuesto =>{
        try {
            const resultado = await clienteAxios.put(`/api/presupuestos/${presupuesto._id}`, presupuesto);
            console.log(resultado)
            dispatch({
                type: ACTUALIZAR_PRESUPUESTO,
                payload: resultado.data.presupuesto
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    //Extraer un presupuesto para edicion
    const guardarPresupuestoActual = presupuesto =>{
        console.log(presupuesto)
        dispatch({
            type: PRESUPUESTO_ACTUAL,
            payload: presupuesto
        })
    }


    //Funcion para crear agregar gasto
    const agregarGasto = () =>{
        dispatch({
            type: GASTO_NUEVO,
           // payload: presupuesto
        })
    }

    const cambiarEstado = () =>{
        dispatch({
            type: CAMBIAR_ESTADO,
           
        })
    }


    const resetearValores = () =>{
        dispatch({
            type: RESET_VALORES,
           
        })
    }
   
*/
  return (
    <requestContext.Provider
      value={{
        requests: state.requests,
        request: state.request,
        mensaje: state.mensaje,
        obtenerRequest,
        obtenerRequestEvent,
        obtenerRequestOne,
        addRequest,
        updateRequest,
        obtenerRequestByRadicado
      }}
    >
      {props.children}
    </requestContext.Provider>
  );
};

export default RequestState;
