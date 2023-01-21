import React, { useReducer } from 'react';
import espacioContext from './espacioContext';
import espacioReducer from './espacioReducer';
import {
  ADD_ESPACIO,
  VALIDATE_ESPACIO,
  GET_ESPACIO,
  GET_ESPACIO_ONE,
  UPDATE_ESPACIO,
  DELETE_ESPACIO,
  ESPACIO_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

const EspacioState = (props) => {
  const initialState = {
    espacios: [],
    espacio: []
    /* errorformulario: false,
        presupuesto: null,
        mensaje: null,
        presupuestoseleccionado: null,
        nuevapagina: false,
        restante: 0 */
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(espacioReducer, initialState);

  // Serie de funciones para el crud
  // Obtener los proyectos
  const obtenerEspacio = async () => {
    try {
      const resultado = await clienteAxios.get('/api/espacios');
      dispatch({
        type: GET_ESPACIO,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: ESPACIO_ERROR,
        payload: alerta
      });
    }
  };

  const obtenerEspacioPublico = async () => {
    try {
      const resultado = await clienteAxios.get('/api/espacios/public');
      dispatch({
        type: GET_ESPACIO,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: ESPACIO_ERROR,
        payload: alerta
      });
    }
  };

  // Obtener uno
  const obtenerEspacioOne = async (espacioId) => {
    let id = espacioId;
    try {
      const resultado = await clienteAxios.get('/api/espacios/one', {
        params: { id }
      });
      dispatch({
        type: GET_ESPACIO_ONE,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: ESPACIO_ERROR,
        payload: alerta
      });
    }
  };

  // Add New Espacio
  const addEspacio = async (request) => {
    try {
      console.log(request);
      const resultado = await clienteAxios.post('/api/espacios/register', request);
      //console.log(resultado);
      dispatch({
        type: ADD_ESPACIO,
        payload: resultado.data
      });
    } catch (error) {
      console.log(error);
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
    }*/

  //Elimina un espacio

  const eliminarEspacio = async (espacioId) => {
    let id = espacioId;
    try {
      const resultado = await clienteAxios.delete('/api/espacios/delete', {
        params: { id }
      });
      obtenerEspacio();
      dispatch({
        type: DELETE_ESPACIO,
        payload: espacioId
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'danger'
      };
      dispatch({
        type: ESPACIO_ERROR,
        payload: alerta
      });
    }
  };

  //Actualizar y/o editar el espacio seleccionado
  const updateEspacio = async (espacio) => {
    //console.log(espacio);
    try {
      const resultado = await clienteAxios.put(`/api/espacios/update`, espacio);
      //console.log(resultado)
      dispatch({
        type: UPDATE_ESPACIO,
        payload: resultado.data.espacio
      });
    } catch (error) {
      console.log(error);
    }
  };
  /*

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
    <espacioContext.Provider
      value={{
        espacios: state.espacios,
        espacio: state.espacio,
        addEspacio,
        updateEspacio,
        obtenerEspacio,
        eliminarEspacio,
        obtenerEspacioOne,
        obtenerEspacioPublico
      }}
    >
      {props.children}
    </espacioContext.Provider>
  );
};

export default EspacioState;
