import  { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export  const Login = () => {
  const auth = useAuth();
  const [correo,   setCorreo] = useState('');
  const [password, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    var cred = {
        Correo: correo,
        password: password
    }
    auth.signIn(cred)
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 col-xl-5 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center login-container">
                            <form className="login-form text-center" onSubmit={handleSubmit} autocomplete="off" >
                                <h1 className="mb-5">LOGIN</h1>
                                <div className="form-group">
                                    <label className="">Correo Electronico</label>
                                    <input name="alias"  type="text" className="form-control rounded-pill form-control-lg"
                                     value={correo} onChange={(e) => setCorreo(e.target.value)}  placeholder="Correo" />
                                </div>
                                <div className="form-group">
                                    <label className="">Contraseña</label>
                                    <input name="password"  type="password" className="form-control rounded-pill form-control-lg" placeholder="Password"
                                    value={password} onChange={(e) => setContrasena(e.target.value)} />
                                </div>
                                <button  type="submit" id='botton' className="btn  mt-5 rounded-pill btn-block text-uppercase " >Login</button>   
                                <p className="mt-3 font-weight-normal">No tienes cuenta aun? <a href="/Registro"><strong>Registrate Aca</strong></a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
