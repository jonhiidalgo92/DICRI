import React, { useState } from 'react';
import {singUp} from '../../selectors/auth.js'
import 'bootstrap/dist/css/bootstrap.min.css';


export  const Registro = () => {

  const [dpi, setDpi]            = useState('');
  const [nombrecompleto,   setNombre]    = useState('');
  const [correo,   setCorreo]    = useState('');
  const [telefono, setTelefono]  = useState('');
  const [contrasena, setContrasena]  = useState('');
  const [direccion,setDireccion]   = useState('');
  const [gender,   setGenero]    = useState('male');
  const role      = "tecnico";

  const handleSubmit = (e) => {
    e.preventDefault();
    let datos ={dpi,nombrecompleto,correo,telefono,contrasena, direccion,gender,role}
    singUp(datos)
    .then(r =>{
        alert(r.data.msg);
    }).catch(e=>console.log(e));
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 col-xl-5 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center login-container">
                            <form className="login-form text-center" onSubmit={handleSubmit} >
                                <h1 className="mb-5 font-weight-light text-uppercase">Sign Up</h1>
                              
                                <div className="form-group">
                                    <label className="">Nombre Completo</label>
                                    <input type="text"  className="form-control rounded-pill form-control-lg" placeholder="Nombre Usuario" name="nombre" id="nombre" autocomplete="nope"
                                     value={nombrecompleto} onChange={(e) => setNombre(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label className="">Correo Electronico</label>
                                    <input type="email" className="form-control rounded-pill form-control-lg " placeholder="E-mail" name="correo" id='correo' required
                                    value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="">DPI</label>
                                    <input type="number" className="form-control rounded-pill form-control-lg " placeholder="dpi" name="dpi" id='dpi' required
                                    value={dpi} onChange={(e) => setDpi(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="">Numero de Telefono</label>
                                    <input type="number" className="form-control rounded-pill form-control-lg " placeholder="Telefono" name="telefono" id='telefono' required
                                    value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="">Contraseña</label>
                                    <input type="password"  className="form-control rounded-pill form-control-lg " placeholder="Password" name="password" id="password" required
                                    value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="">Direccion </label>
                                    <input type="text"  className="form-control rounded-pill form-control-lg "  placeholder="Direccion" name="direccion" id="direccion" required 
                                    value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="">Genero</label>
                                    <select className="form-select rounded-pill form-control-lg "
                                     onChange={(e) => setGenero(e.target.value)} >
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="hidden"  className="form-control rounded-pill form-control-lg "  placeholder="Direccion" name="direccion" id="direccion" readOnly 
                                    value={role}/>
                                </div>
                      
                                <button id="botton" type="submit" className="btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}
