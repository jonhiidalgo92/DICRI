import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'
import { logIn, logOut,singUp } from "../selectors/auth.js";

import { jwtDecode } from "jwt-decode";


const authContext = createContext();

const decodeJWT = (token) => {
  try {
    const data = jwtDecode(token);
    return data;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};

  export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  };

  export const useAuth = () => {
    return useContext(authContext);
  };

  
  export const useProvideAuth = () => {
    /// Recupera 'useInfo' desde localStorage
    const storage = localStorage.getItem('userInfo');
    const [user, setUser] = useState(storage !== null);


    //Trantando el rol del user 
    const rol = localStorage.getItem('rol');
    const [role, setRol] = useState(rol !== null);

    /**
     * Servicio para iniciar sesión
     * @param {{mail:string, password:string}} credentials 
     * @returns 
     */
    let location = ''
    const signIn = (credentials) => {
      logIn(credentials)
        .then(r => {
          if (r.status === 200) {

            const tokenDecoder = decodeJWT( r.data.token )
            console.log("DATOS:" & tokenDecoder )
            //Datos del usuario en el local Storage
            const datosUser = {
              idUsuario: tokenDecoder.id,
              NombreCompleto: tokenDecoder.NombreCompleto,
              Direccion: tokenDecoder.direccion,
              email:tokenDecoder.email,
              rol: tokenDecoder.rol
            };
            // decodeJWT(r.data.token)
            localStorage.setItem("token", r.data.token); 
            //Id usuario para consultas
            localStorage.setItem("userInfo", tokenDecoder.id);
            //almacenando Cliente local 
            localStorage.setItem("userComplete", datosUser);
            //almacenando Rol
            localStorage.setItem("rol", tokenDecoder.rol);

            //Manejo de rol
            if(tokenDecoder.rol === 1)
             {
               tokenDecoder.rol = "admin"
              localStorage.setItem("rolDesc", "admin");
             }else{
              tokenDecoder.rol = "client"
              localStorage.setItem("rolDesc", "client");
             }
              

            if(tokenDecoder.rol==='admin'){
              localStorage.setItem("rol", tokenDecoder.rol);
              location = '/Administrador'
              setRol(true);
            }else{
              setRol(false);
              location = '/Perfil'
            }
            setUser(true);
           
          } else {
            setUser(false);
          
          }


          setTimeout(() => {
            Swal.fire(
              'Bienvenido!',
              '',
              'success'
            )
            .then(data =>{
              window.location = location
            })
          }, 500);

        }).catch(e => {
          console.log(e)
          Swal.fire(
            'Oops...',
            'Credenciales incorrectas!',
            'error'
          )
          setUser(false);
        })
    };
  
    /**
     * Sends to the server params to register.
     * @param {string} credentials_
     * @returns 
     */
    const singup = (credentials_)=>{
        if (!user){
            singUp(credentials_)
            .then(r => {
              if (r.status === 200) {
                
                alert('Registro Exitoso!')
              } else {
             
                alert('Huvo un error al Registrar al usuario!')
              }
            }).catch(e => {
              alert('Huvo un error al Registrar!')
              console.log(e)
            })
        }
    }

  
    /**
     * Servicio para cerrar sesión
     */
    const signOut = () => {
      logOut();
      setUser(false);
      setRol(false);
    };
  
    return {
      user,
      role,
      signIn,
      signOut,
      singup
    }
  }