import { useState, useEffect } from 'react';
import { getExpedientes, changeState,addExpedientes ,deleteExpediente} from '../../../selectors/evidencia';
import {ModalCambiarEstado} from '../Expedientes/modalCambiarEstado'
import {ModalExpediente} from '../Expedientes/modal_Expediente'
import {Indicios} from "../Indicios/indicios"
import Swal from 'sweetalert2'

export const Expedi = () => {

    const [expedientes, setExpedientes] = useState([]);

   ///Modal Cambio de estado y cambio de descripcion
   const [showModal, setShowModal] = useState(false); 
   const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);

   //Mostrar Indicios 
   const [mostrarIndicios, setMostrarIndicios] = useState(false);

   //Nuevo Expediente 
   const [showModalNuevo, setShowModalNuevo] = useState(false);
    const storage = localStorage.getItem("userInfo");
useEffect(() => {
        getExpedientes()
            .then(r => {
                if (r.status === 200) {
                    console.log('lista expedientes:', r.data);
                    setExpedientes(r.data);
                }
            })
            .catch(e => Swal.fire(
                        'Oops...',
                        'Error Al Obtener Expedientes!',
                         e )
            );
    }, []);


//Eliminiacion de Expediente 

const eliminarExpediente = (exp) => {

    Swal.fire({
        title: "¿Eliminar expediente?",
        html: `
            <b>ID:</b> ${exp.idExpediente}<br>
            <b>Nombre:</b> ${exp.NombreExpediente}<br><br>
            Esta acción no se puede deshacer.
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33"
    }).then((result) => {

        if (result.isConfirmed) {
            deleteExpediente(exp.idExpediente)
                .then(() => {
                    // Recargo la lista actualizada
                    return getExpedientes();
                })
                .then((r) => {
                    setExpedientes(r.data);
                    Swal.fire({
                        title: "Eliminado",
                        text: "El expediente fue eliminado correctamente.",
                        icon: "success",
                        timer: 1500
                    });
                })
                .catch((e) => {
                    Swal.fire(
                        'Oops...',
                        'Error al eliminar expediente',
                        'error'
                    );
                });
        }
    });
};

    return (
        <div className="container"> 
            <div className="card">
                <div className="card-body">
                   <h2 class="text-center my-4 p-3 bg-dark text-white rounded shadow">
                        Lista de Expedientes
                    </h2>
                    <button
                        class="btn btn-dark position-absolute top-0 start-0 m-3"
                        onClick={() => {
                            setShowModalNuevo(true);
                        }}
                    >
                        + Agregar Expediente
                    </button>
                    <div className="table-responsive-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDExpediente</th>
                                <th>Nombre Expediente</th>
                                <th>Fecha Registro</th>
                                <th>Descripcion Rechazo</th>
                                <th>Estado</th>
                                <th>Accion</th>
                                <th>Indicios</th>
                            </tr>
                        </thead>

                        <tbody>
                                {expedientes.map(exp => (
                                [
                                    /* === Fila del expediente === */
                                    <tr key={`exp-${exp.idExpediente}`}>
                                        <td>{exp.idExpediente}</td>
                                        <td>{exp.NombreExpediente}</td>
                                        <td>{exp.FechaRegistro}</td>
                                        <td>{exp.DescripcionRechazo}</td>

                                        <td>
                                            {{
                                                1: "Registrado",
                                                2: "En Revision",
                                                3: "Aprobado",
                                                4: "Rechazado"
                                            }[exp.Etapa_idEtapa] || "Desconocido"}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm px-1 py-0"
                                                onClick={() => { 
                                                    setExpedienteSeleccionado(exp); 
                                                    setShowModal(true); 
                                                }}
                                            >
                                                <i className="fa fa-minus-square"></i> Cambiar
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm px-1 py-0 ms-2"
                                                onClick={() => eliminarExpediente(exp)}
                                            >
                                                <i className="fa fa-trash"></i> Eliminar
                                            </button>
                                        </td>
                                        <td>
                                            <td>
                                                <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => {
                                                setExpedienteSeleccionado(exp);
                                                setMostrarIndicios(true);
                                                }}
                                                >
                                                Ver Indicios
                                                </button>
                                            </td>
                                        </td>
                                    </tr>,

                                ]
                            ))}
                        </tbody>
                    </table>

                    </div>

                </div>
            </div>
            <ModalCambiarEstado 
            show={showModal} 
            onClose={() => setShowModal(false)} 
            expediente={expedienteSeleccionado} 
            onSubmit={(nuevoEstado, descripcion) => 
            { 
                changeState( expedienteSeleccionado.idExpediente, 
                             nuevoEstado, 
                            descripcion ) 
                            .then(() => { setShowModal(false); }) 
                            .catch(e => 
                                Swal.fire(
                                'Oops...',
                                'Error al Editar Expediente!',
                                e )
                            ); 
            }} />

            {mostrarIndicios && (
            <Indicios 
            idExpediente={expedienteSeleccionado.idExpediente}
            nombreExpediente={expedienteSeleccionado.NombreExpediente}
            onClose={() => setMostrarIndicios(false)}
            />
            )}

            <ModalExpediente
            show={showModalNuevo}
            onClose={() => setShowModalNuevo(false)}
            usuarioId={storage}
            onSubmit={(form) => {

            addExpedientes(form)
            .then(() => {
            Swal.fire(
              'Expediente Agregado Con Exito!',
              '',
              'success'
            )
            // Recargas lista de expedientes
            return getExpedientes();
            })
            .then(r => {
            setExpedientes(r.data);
            setShowModalNuevo(false);
            })
            .catch(e => {
            console.error(e);
            });
            }}
            />
        </div>
    );
};