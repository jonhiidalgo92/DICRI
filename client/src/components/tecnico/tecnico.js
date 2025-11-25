import React, { useState,useEffect } from 'react';
import {getUser} from '../../selectors/tecnico.js'

export  const Perfil = () => {

    const [idUsuario, setID] = useState('');
    const [dpi, setDpi]            = useState('');
    const [nombre,   setNombre]    = useState('');
    const [correo,   setCorreo]    = useState('');
    const [telefono, setTelefono]  = useState('');
    const [direccion,setDireccion]   = useState('');
    const [selectedFile, setSelectedFile] = useState('')
    const [imagen, setImagen]      = useState('https://i.pinimg.com/236x/21/09/47/21094753857210805aa234b3ade8cc1d.jpg');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedFile) {
          // Convierte el archivo a BASE64
          var reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            let im = reader.result;
            // var r = im.split('data:image/jpeg;base64,')
            console.log('imagen___')
            console.log(im)
            var r = im.split(',')
            var imgB64 =String(r[1]).toString()
            console.log(imgB64)
          }
        }
      }

    //Traer la informacion del usuario logueado
    useEffect(() => {
        getUser()
            .then(r => {
            if (r.status === 200) {
                let user = r.data.msg.msg[0];
                console.log(user)
                setDpi(user.dpi)
                setNombre(user.Nombrecompleto)
                setCorreo(user.correo)
                setTelefono(user.telefono)
                setDireccion(user.direccion)
                //imagen del usuario
                console.log(user.photo)
                //setImagen(user.photo)
        
            }
            })
            .catch(e => console.error(e));
    }, []);


  return (
    <div className="container">
        <div className="col-sm-9 col-md-7 col-lg-5 col-xl-5 mx-auto">
            <div className="card card-signin my-5">
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center login-container">
                        <form className="login-form text-center"  onSubmit={handleSubmit} >
                        <h1 className="mb-5 font-weight-light text-uppercase">PERFIL USUARIO</h1>

                            <div className="form-group">
                                <img src={imagen} width="100" height="100"/>
                            </div>
                        
                            <div className="form-group">
                                <label className="">Seleccione la Imagen a cargar</label>
                                <input type="file" 
                                    onChange={(e) => setSelectedFile(e.target.files[0])} required />
                            </div>

                            <div className="form-group">
                                <label className="">Nombre Completo</label>
                                <input type="text"  className="form-control rounded-pill form-control-lg" placeholder="Nombre Usuario" name="nombre" id="nombre" autocomplete="nope"
                                    value={nombre} readOnly  />
                            </div>
                            <div className="form-group">
                                <label className="">Correo Electronico</label>
                                <input type="email" className="form-control rounded-pill form-control-lg " placeholder="E-mail" name="correo" id='correo' required
                                value={correo} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="">DPI</label>
                                <input type="number" className="form-control rounded-pill form-control-lg " placeholder="dpi" name="dpi" id='dpi' required
                                value={dpi} readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="">Numero de Telefono</label>
                                <input type="number" className="form-control rounded-pill form-control-lg " placeholder="Telefono" name="telefono" id='telefono' required
                                value={telefono}  readOnly/>
                            </div>
                            <div className="form-group">
                                <label className="">Direccion </label>
                                <input type="text"  className="form-control rounded-pill form-control-lg "  placeholder="Direccion" name="direccion" id="direccion" required 
                                value={direccion}  readOnly />
                            </div>
                            <button  type="submit" id='botton' className="btn  mt-5 rounded-pill btn-block text-uppercase ">Editar Perfil</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
