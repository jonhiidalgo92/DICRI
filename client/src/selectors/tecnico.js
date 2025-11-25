import axios from 'axios';
import { urlServer } from "../Config/config.js";

/**
 * get products 
 * in order to retrieve a JWT.
 */
 export const getUser = () => {
    //Traer Id del usuario en el storage
    const storage = localStorage.getItem("userInfo");
    const token = localStorage.getItem('token');
    let dato = {
        idUsuario: storage
    }
 
    let parametros = {
      method: 'post',
      url: `${urlServer}/api/tecnico`,
      data:dato,
      headers: {
          'Content-Type': 'application/json',
          'Authentication': token
      }
    }
    console.log(parametros)
    return axios(parametros)
  }


