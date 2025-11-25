import {Link} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'

const Navegacion =() => {
    
    const auth = useAuth();
    const logOut = (e)=>{
        e.preventDefault();
        auth.signOut();
    }   
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className = "navbar-brand" to="/">
                DICRI
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                        {
                            !auth.user ?
                            //Logueo y registro 
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to="/Login">
                                 <p> Login</p>
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Registro">
                                <p> Registro</p> 
                                </Link>
                            </li>
                            </ul>
                                
                         :  auth.role ?
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                    <Link className="nav-link" to="/Administrador">
                                    <p> Administrador</p>  
                                    </Link>
                                    </li>
                                    <li className="nav-item">
                                    <Link className="nav-link" to="/expedientes">
                                    <p> Expedientes</p>
                                    </Link>
                                    </li>
                                <li className="nav-item">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            onClick={logOut}>
                                            Salir
                                        </button>
                                    </li>
                                </ul>
                           : // Vista del cliente
                             <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to="/Tecnico">
                               <p> Tecnico</p>
                            </Link>
                            </li>
 
                            <li className="nav-item">
                            <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={logOut}>
                                Salir
                            </button>
                            </li>
                          </ul>  
                        }
            </div>
        </div>
    </nav>
        )
}
export default Navegacion;
