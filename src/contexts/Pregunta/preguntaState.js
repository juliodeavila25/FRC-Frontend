import React, { useReducer } from 'react';
import preguntaContext from './preguntaContext';
import preguntaReducer from './preguntaReducer';
import {
    ADD_PREGUNTA,
    VALIDATE_PREGUNTA,
    GET_PREGUNTA,
    UPDATE_PREGUNTA,
    DELETE_PREGUNTA,
    PREGUNTA_ERROR,
    GET_PREGUNTA_ONE
} from '../../types';

import clienteAxios from '../../config/axios'

const PreguntaState = props =>{

    const initialState = {
        preguntas : [],
        pregunta:[]
        /* errorformulario: false,
        presupuesto: null,
        mensaje: null,
        presupuestoseleccionado: null,
        nuevapagina: false,
        restante: 0 */
    }
    
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (preguntaReducer, initialState)

    // Serie de funciones para el crud
    // Obtener los preguntas
  const obtenerPregunta = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/preguntas');
            dispatch({
                type : GET_PREGUNTA,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: PREGUNTA_ERROR,
                payload: alerta

            })
            
        }
    } 

    const updatePregunta = async espacio =>{
        //console.log(espacio);
        try {
            const resultado = await clienteAxios.put(`/api/preguntas/update`, espacio);
            //console.log(resultado)
            dispatch({
                type: UPDATE_PREGUNTA,
                payload: resultado.data.pregunta
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    // Obtener los preguntas public
    const obtenerPreguntaPublico = async () =>{
        try {            
            const resultado = await clienteAxios.get('/api/preguntas/public');
            dispatch({
                type : GET_PREGUNTA,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: PREGUNTA_ERROR,
                payload: alerta

            })
            
        }
    } 

     // Obtener uno
  const obtenerPreguntaOne = async (espacioId) =>{
    let id = espacioId;
    try {
        const resultado = await clienteAxios.get("/api/preguntas/one", {
            params: { id },
          });
        dispatch({
            type : GET_PREGUNTA_ONE,
            payload: resultado.data
        })
    } catch (error) {
        const alerta = {
            msg:'Hubo un error',
            categoria: 'danger'
        }
        dispatch({
            type: PREGUNTA_ERROR,
            payload: alerta

        })
        
    }
} 


    // Add New Pregunta
    const addPregunta = async request =>{
        try {
              console.log(request);
             const resultado = await clienteAxios.post('/api/preguntas/register', request);
             console.log(resultado);
            dispatch({
                type: ADD_PREGUNTA,
                payload: resultado.data
            }) 
        } catch (error) {
            console.log(error);
        }
    }
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

    //Elimina un pregunta
   
    const  eliminarPregunta = async preguntaId =>{
        let id = preguntaId;
        try {
            const resultado = await clienteAxios.delete("/api/preguntas/delete", {
                params: { id },
              });
              obtenerPregunta()
            dispatch({
                type: DELETE_PREGUNTA,
                payload: preguntaId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: PREGUNTA_ERROR,
                payload: alerta
            })
            
        }
    }
    /*
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
        <preguntaContext.Provider
            value = {{
                preguntas: state.preguntas,
                pregunta: state.pregunta,
                addPregunta,               
                obtenerPregunta,
                eliminarPregunta,
                obtenerPreguntaPublico,
                obtenerPreguntaOne,
                updatePregunta
            }}
        >
            {props.children}
        </preguntaContext.Provider>
    )
}

export default PreguntaState;