import React, { useReducer } from 'react';
import caracteristicaContext from './caracteristicaContext';
import caracteristicaReducer from './caracteristicaReducer';
import {
    ADD_CARACTERISTICA,
    VALIDATE_CARACTERISTICA,
    GET_CARACTERISTICA,
    UPDATE_CARACTERISTICA,
    DELETE_CARACTERISTICA,
    CARACTERISTICA_ERROR,
    GET_CARACTERISTICA_ONE
} from '../../types';

import clienteAxios from '../../config/axios'

const CaracteristicaState = props =>{

    const initialState = {
        caracteristicas : [],
        caracteristica:[]
        /* errorformulario: false,
        presupuesto: null,
        mensaje: null,
        presupuestoseleccionado: null,
        nuevapagina: false,
        restante: 0 */
    }
    
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (caracteristicaReducer, initialState)

    // Serie de funciones para el crud
    // Obtener los caracteristicas
  const obtenerCaracteristica = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/caracteristicas');
            dispatch({
                type : GET_CARACTERISTICA,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: CARACTERISTICA_ERROR,
                payload: alerta

            })
            
        }
    } 

    const updateCaracteristica = async espacio =>{
        //console.log(espacio);
        try {
            const resultado = await clienteAxios.put(`/api/caracteristicas/update`, espacio);
            //console.log(resultado)
            dispatch({
                type: UPDATE_CARACTERISTICA,
                payload: resultado.data.caracteristica
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    // Obtener los caracteristicas public
    const obtenerCaracteristicaPublico = async () =>{
        try {            
            const resultado = await clienteAxios.get('/api/caracteristicas/public');
            dispatch({
                type : GET_CARACTERISTICA,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: CARACTERISTICA_ERROR,
                payload: alerta

            })
            
        }
    } 

     // Obtener uno
  const obtenerCaracteristicaOne = async (espacioId) =>{
    let id = espacioId;
    try {
        const resultado = await clienteAxios.get("/api/caracteristicas/one", {
            params: { id },
          });
        dispatch({
            type : GET_CARACTERISTICA_ONE,
            payload: resultado.data
        })
    } catch (error) {
        const alerta = {
            msg:'Hubo un error',
            categoria: 'danger'
        }
        dispatch({
            type: CARACTERISTICA_ERROR,
            payload: alerta

        })
        
    }
} 


    // Add New Caracteristica
    const addCaracteristica = async request =>{
        try {
              console.log(request);
             const resultado = await clienteAxios.post('/api/caracteristicas/register', request);
             console.log(resultado);
            dispatch({
                type: ADD_CARACTERISTICA,
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

    //Elimina un caracteristica
   
    const  eliminarCaracteristica = async caracteristicaId =>{
        let id = caracteristicaId;
        try {
            const resultado = await clienteAxios.delete("/api/caracteristicas/delete", {
                params: { id },
              });
              obtenerCaracteristica()
            dispatch({
                type: DELETE_CARACTERISTICA,
                payload: caracteristicaId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: CARACTERISTICA_ERROR,
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
        <caracteristicaContext.Provider
            value = {{
                caracteristicas: state.caracteristicas,
                caracteristica: state.caracteristica,
                addCaracteristica,               
                obtenerCaracteristica,
                eliminarCaracteristica,
                obtenerCaracteristicaPublico,
                obtenerCaracteristicaOne,
                updateCaracteristica
            }}
        >
            {props.children}
        </caracteristicaContext.Provider>
    )
}

export default CaracteristicaState;