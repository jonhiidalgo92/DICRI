import axios from 'axios';
import { urlServer } from '..config/config.js';


/**
 * Sends to information to server
 * in order to retrieve a JWT.
 * 
 * The JWT will serve to authorize the authentication
 */
 export const getUsers = () => {
    const storage = localStorage.getItem("userInfo");
    const token = localStorage.getItem('token');
    let dato = {
        admin: storage
    }

    let parametros = {
        method: 'get',
        url: `${urlServer}/api/coordinador`,
        data:dato,
        headers: {
            'Content-Type': 'application/json',
            'Authentication': token
        }
    }
    console.log(parametros);
    return axios(parametros)
  }