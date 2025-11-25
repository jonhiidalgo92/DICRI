import { useState, useEffect } from 'react';
import { getIndicios,updateIndicio,insertIndicio,deleteIndicio } from '../../../selectors/Indicio';
import {ModalIndicio} from '../Indicios/modal_Indicios';
import Swal from 'sweetalert2'
export const Indicios = ({ idExpediente,nombreExpediente }) => {

    const [indicios, setIndicios] = useState([]);

    const [showModalIndicios, setShowModalIndicios] = useState(false);
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
const [indicioSeleccionado, setIndicioSeleccionado] = useState(null);
const storage = localStorage.getItem("userInfo");
    // Cargar todos los indicios
    useEffect(() => {
        cargarIndicios(idExpediente);
    }, [idExpediente]);

    const cargarIndicios = (idExpediente) => {
        getIndicios(idExpediente)
            .then(r => {
                if (r.status === 200) {
                    console.log("Expediente:", idExpediente);
                    console.log("Lista de indicios:", r.data);
                    setIndicios(r.data);
                }
            })
            .catch(e => console.error(e));
    };

    //Datos en modo Crear nuevo
    const handleAgregar = () => {
        setIndicioSeleccionado(null);    // Limpia los datos 
        setShowModalIndicios(true);
        setExpedienteSeleccionado({ idExpediente:idExpediente});
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                                <h2 class="text-center my-4 p-3 bg-primary text-white rounded shadow">
                 Indicios del  Expediente: {idExpediente} : {nombreExpediente}
                </h2>
                <div class="mb-4">
                    <button
                        class="btn btn-dark position-absolute top-0 start-0 m-3"
                         onClick={handleAgregar}
                    >
                        + Agregar Nuevo Indicio
                    </button>
                </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID Indicio</th>
                                    <th>Nombre Indicio</th>
                                    <th>Descripcion</th>
                                    <th>Cantidad</th>
                                    <th>Color</th>
                                    <th>Tamaño</th>
                                    <th>Peso</th>
                                    <th>Ubicación</th>
                                    <th>Nombre Técnico</th>
                                    <th>Expediente</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {indicios.map(ind => (
                                    <tr key={ind.idIndicio}>
                                        <td>{ind.idIndicio}</td>
                                        <td>{ind.NombreIndicio}</td>
                                        <td>{ind.descripcion}</td>
                                        <td>{ind.cantidad}</td>

                                        <td>{ind.Color}</td>
                                        <td>{ind.tamano}</td>
                                        <td>{ind.Peso}</td>
                                        <td>{ind.Ubicacion}</td>
                                        <td>{ind.NombreCompleto}</td>
                                        <td>{ind.Expediente_idExpediente}</td>

                                        <td>
                                            <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                            setIndicioSeleccionado(ind);
                                             setExpedienteSeleccionado({
                                                idExpediente: ind.Expediente_idExpediente 
                                            });
                                            
                                            setShowModalIndicios(true);
                                            }}
                                            >
                                            Editar Indicio
                                            </button>
                                            
                                            {/* BOTÓN ELIMINAR */}
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    if (window.confirm("¿Seguro que deseas eliminar este indicio?")) {
                                                        deleteIndicio(ind.idIndicio)
                                                            .then(() => {
                                                            Swal.fire(
                                                                    'Indicio Eliminado Con Exito!',
                                                                    '',
                                                                    'success'
                                                                )  
                                                                cargarIndicios(idExpediente);
                                                            })
                                                            .catch((err) => {
                                                                console.error("Error eliminando indicio:", err);
                                                            });
                                                    }
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <ModalIndicio
                show={showModalIndicios}
                onClose={() => setShowModalIndicios(false)}
                expediente={expedienteSeleccionado}
                indicio={indicioSeleccionado} 
                onSubmit={(form) => { 
                    // EDITAR
                    if (indicioSeleccionado) {
                        updateIndicio(form)
                            .then(() => {
                         Swal.fire(
                                'Indicio Editado Con Exito!',
                                '',
                                'success'
                            )
                                cargarIndicios(idExpediente);
                                setShowModalIndicios(false);
                            });
                    }
                    // CREAR
                    else {
                        insertIndicio({
                            ...form,
                            Expediente_idExpediente: expedienteSeleccionado.idExpediente
                        })
                            .then(() => {
                            Swal.fire(
                                'Indicio Agregado Con Exito!',
                                '',
                                'success'
                            )
                                cargarIndicios(idExpediente);
                                setShowModalIndicios(false);
                                setIndicioSeleccionado(form);
                            });
                    }
                }}
            />
        </div>
    );
};