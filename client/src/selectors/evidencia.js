import axios from 'axios';
import { urlServer } from '../Config/config';

  /**
 *  ------------------------------ OBTENIENDO SUBASTAS
 * Sends to information to server
 * in order to retrieve a JWT.
 * 
 * The JWT will serve to authorize the authentication
 *
 */
export const getExpedientes = () => {
    const storage = localStorage.getItem("token");
    let parametros = {
        method: 'get',
        url: `${urlServer}/api/expedientes`,
        headers: {
            'Content-Type': 'application/json',
            'Authentication': storage
        }
    };
  console.log(parametros);
  return axios(parametros);
};

  /**
 *  ------------------------------ OBTENIENDO SUBASTAS
 * Sends to information to server
 * in order to retrieve a JWT.
 * 
 * The JWT will serve to authorize the authentication
 *
 */
export const changeState = (idExpediente, idEtapa , descripcion) => {
    const storage = localStorage.getItem("token");
    let data= {
        idExpediente: idExpediente,
        Etapa_idEtapa:idEtapa,
        descripcion: descripcion
    }
    let parametros = {
        method: 'post',
        url: `${urlServer}/api/expedientes/estado`,
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authentication': storage
        }
    };
    setTimeout(() => {
        window.location = '/expedientes'
    }, 500);
  console.log(parametros);
  return axios(parametros);
};


//Agregar Expediente
export const addExpedientes = (data) => {
    const storage = localStorage.getItem("token");
    let parametros = {
        method: 'post',
        url: `${urlServer}/api/expedientes`,
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authentication': storage
        }
    };
  console.log(parametros);
  return axios(parametros);
};

//Eliminar Evidencia
export const deleteExpediente = (idIndicio) => {
    const storage = localStorage.getItem("token");

    let parametros = {
        method: "delete",
        url: `${urlServer}/api/expedientes/${idIndicio}`,
        headers: {
            "Content-Type": "application/json",
            "Authentication": storage
        }
    };

    console.log("DELETE INDICIO:", parametros);
    return axios(parametros);
};
