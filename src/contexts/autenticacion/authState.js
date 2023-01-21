import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';

import tokenAuth from '../../config/tokenAuth';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types/index';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Registrar un usuario
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      //   console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      //Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      // console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      //TODO: Funcion para enviar el token por headers
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth/authenticated');
      //console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR
      });
    }
  };

  //Cuando el usuario inicia sesion
  const iniciarSesion = async (datos) => {
    console.log(datos);
    try {
      const respuesta = await clienteAxios.post('/api/auth/signin', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      console.log(respuesta.data);
      //Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  };

  //Cuando se cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
