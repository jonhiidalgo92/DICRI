import { useState } from "react";

export const ModalCambiarEstado = ({ show, onClose, onSubmit, expediente }) => {
    const [estado, setEstado] = useState("");
    const [descripcion, setDescripcion] = useState("");

    
    if (!show) return null;

    return (
        <div className="modal show" style={{ display: "block", background: "#00000088" }}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Cambiar Estado</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <p><strong>Expediente:</strong> {expediente?.NombreExpediente}</p>

                        <div className="mb-3">
                            <label className="form-label">Nuevo Estado</label>
                            <select className="form-select" onChange={(e) => setEstado(e.target.value)}>
                                <option value="">Seleccione...</option>
                                <option value="1">Registrado</option>
                                <option value="2">En Revision</option>
                                <option value="3">Aprobado</option>
                                <option value="4">Rechazado</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => onSubmit(estado, descripcion)}
                        >
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};