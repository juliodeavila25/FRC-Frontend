import React, { useReducer } from 'react';
import sedeContext from './sedeContext';
import sedeReducer from './sedeReducer';
import {
    ADD_SEDE,
    VALIDATE_SEDE,
    GET_SEDE,
    UPDATE_SEDE,
    DELETE_SEDE,
    SEDE_ERROR
} from '../../types';

import clienteAxios from '../../config/axios'

const SedeState = props =>{

    const initialState = {
        sedes : []
        /* errorformulario: false,
        presupuesto: null,
        mensaje: null,
        presupuestoseleccionado: null,
        nuevapagina: false,
        restante: 0 */
    }
    
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (sedeReducer, initialState)

    // Serie de funciones para el crud
    // Obtener los sedes
  const obtenerSede = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/sedes');
            dispatch({
                type : GET_SEDE,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: SEDE_ERROR,
                payload: alerta

            })
            
        }
    } 

    // Obtener los sedes public
    const obtenerSedePublicas = async () =>{
        try {            
            const resultado = await clienteAxios.get('/api/sedes/public');
            dispatch({
                type : GET_SEDE,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: SEDE_ERROR,
                payload: alerta

            })
            
        }
    } 


    // Add New Sede
    const addSede = async request =>{
        try {
             // console.log(request);
             const resultado = await clienteAxios.post('/api/sedes/register', request);
             console.log(resultado);
            dispatch({
                type: ADD_SEDE,
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

    //Elimina un sede
   
    const  eliminarSede = async sedeId =>{
        let id = sedeId;
        try {
            const resultado = await clienteAxios.delete("/api/sedes/delete", {
                params: { id },
              });
              obtenerSede()
            dispatch({
                type: DELETE_SEDE,
                payload: sedeId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: SEDE_ERROR,
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
        <sedeContext.Provider
            value = {{
                sedes: state.sedes,
                addSede,               
                obtenerSede,
                eliminarSede,
                obtenerSedePublicas,
            }}
        >
            {props.children}
        </sedeContext.Provider>
    )
}

export default SedeState;