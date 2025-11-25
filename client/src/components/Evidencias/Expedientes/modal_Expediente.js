import { useState, useEffect } from "react";


export const ModalExpediente = ({ show, onClose, onSubmit, usuarioId }) => {

    const [form, setForm] = useState({
        NombreExpediente: "",
        Etapa_idEtapa: "1", // Registrado por defecto
        DescripcionRechazo: "",
        fechaRegistro: "",
        Usuario_idUsuario: usuarioId || ""
    });

    // Inicializar valores cada vez que se abra
    useEffect(() => {
        if (show) {
            setForm({
                NombreExpediente: "",
                Etapa_idEtapa: "1",
                DescripcionRechazo: "",
                fechaRegistro: new Date().toISOString().split("T")[0], // fecha del sistema
                Usuario_idUsuario: usuarioId
            });
        }
    }, [show, usuarioId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    if (!show) return null;

    return (
        <div className="modal show" style={{ display: "block", background: "#00000088" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Nuevo Expediente
                        </h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">

                        {/* Nombre Expediente */}
                        <div className="mb-3">
                            <label className="form-label">Nombre del Expediente</label>
                            <input
                                type="text"
                                className="form-control"
                                name="NombreExpediente"
                                value={form.NombreExpediente}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Etapa */}
                        <div className="mb-3">
                            <label className="form-label">Etapa</label>
                            <select
                                className="form-control"
                                name="Etapa_idEtapa"
                                value={form.Etapa_idEtapa}
                                onChange={handleChange}
                                disabled
                            >
                                <option value="1">Registrado</option>
                                <option value="2">En Revisión</option>
                                <option value="3">Aprobado</option>
                                <option value="4">Rechazado</option>
                            </select>
                        </div>

                        {/* Descripción Rechazo */}
                        {form.Etapa === "4" && (
                            <div className="mb-3">
                                <label className="form-label">Descripción del Rechazo</label>
                                <textarea
                                    className="form-control"
                                    name="DescripcionRechazo"
                                    value={form.DescripcionRechazo}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {/* Fecha Registro */}
                        <div className="mb-3">
                            <label className="form-label">Fecha de Registro</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.fechaRegistro}
                                readOnly
                            />
                        </div>

                        <input type="hidden" name="Usuario_idUsuario" value={form.Usuario_idUsuario} />

                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>

                        <button className="btn btn-primary" onClick={() => onSubmit(form)}>
                            Guardar Expediente
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
