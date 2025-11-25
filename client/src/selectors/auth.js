import axios from "axios";
import { urlServer } from "../Config/config.js";

/**
 * Sends to information to server
 * in order to retrieve a JWT.
 *
 * The JWT will serve to authorize the authentication
 * @param {string} credentials
 * @returns
 */
export const singUp = (credentials) => {
  let parametros = {
    method: "post",
    url: `${urlServer}/api/auth`,
    data: credentials
  };
  return axios(parametros);
};
/**
 * Sends to information to server
 * in order to retrieve a JWT.
 *
 * The JWT will serve to authorize the authentication
 * @param {string} credentials
 * @returns
 */
export const logIn = (credentials) => {
 var route = `${urlServer}/api/auth/login`
  let parametros = {
    method: "post",
    url: route,
    data: credentials
  };
  console.log(credentials);
  return axios(parametros);
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("rol");
  localStorage.removeItem('userComplete');
  localStorage.removeItem('rolDesc');
}

