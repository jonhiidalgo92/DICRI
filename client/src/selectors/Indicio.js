import axios from 'axios';
import { urlServer } from '../Config/config';

/**
 *  ------------------------------ OBTENER INDICIOS POR EXPEDIENTE
 */
export const getIndicios = (id) => {
    const storage = localStorage.getItem("token");
    let data= {
        id: id
    }

    let parametros = {
        method: 'post',
        url: `${urlServer}/api/indicios/all`,
        data:data,
        headers: {
            'Content-Type': 'application/json',
            'Authentication': storage
        }
    };
  console.log("Parametros:" ,parametros);
  return axios(parametros);
};


/**
 *  ------------------------------ INSERTAR INDICIO
 */
export const insertIndicio = (data) => {
    const storage = localStorage.getItem("token");
    delete data.idIndicio;
    let parametros = {
        method: "post",
        url: `${urlServer}/api/indicios/add`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            "Authentication": storage
        }
    };
    console.log("INSERT INDICIO:", parametros);
    return axios(parametros);
};

/**
 *  ------------------------------ ACTUALIZAR INDICIO
 */
export const updateIndicio = (data) => {
    const storage = localStorage.getItem("token");

    let parametros = {
        method: "post",
        url: `${urlServer}/api/indicios/estado`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            "Authentication": storage
        }
    };

    console.log("UPDATE INDICIO:", parametros);
    return axios(parametros);
};

/**
 *  ------------------------------ ELIMINAR INDICIO
 */
export const deleteIndicio = (idIndicio) => {
    const storage = localStorage.getItem("token");

    let parametros = {
        method: "delete",
        url: `${urlServer}/api/indicios/${idIndicio}`,
        headers: {
            "Content-Type": "application/json",
            "Authentication": storage
        }
    };

    console.log("DELETE INDICIO:", parametros);
    return axios(parametros);
};