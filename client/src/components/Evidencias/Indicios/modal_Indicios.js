import { useState, useEffect } from "react";

export const ModalIndicio = ({ show, onClose, onSubmit, indicio, expedienteId, usuarioId }) => {

    const [form, setForm] = useState({
        idIndicio: "",
        NombreIndicio: "",
        descripcion: "",
        cantidad: "",
        Color: "",
        Tamano: "",
        Peso: "",
        Ubicacion: "",
        Expediente_idExpediente: expedienteId || "",
        Usuario_idUsuario: usuarioId || ""
    });

    // Cuando se edita un indicio existente:
    useEffect(() => {
        if (indicio) {
            setForm({
                idIndicio:indicio.idIndicio || "",
                NombreIndicio: indicio.NombreIndicio || "",
                descripcion: indicio.descripcion || "",
                cantidad: indicio.cantidad || "",
                Color: indicio.Color || "",
                Tamano: indicio.tamano || "",
                Peso: indicio.Peso || "",
                Ubicacion: indicio.Ubicacion || "",
                Expediente_idExpediente: indicio.Expediente_idExpediente || "",
                Usuario_idUsuario:  indicio.Usuario_idUsuario || "",
            });
        } else {
            // Nuevo indicio
            setForm({
                idIndicio: "",
                NombreIndicio: "",
                descripcion: "",
                cantidad: "",
                Color: "",
                Tamano: "",
                Peso: "",
                Ubicacion: "",
                Expediente_idExpediente: "",
                Usuario_idUsuario: usuarioId
            });
        }
    }, [indicio, expedienteId, usuarioId]);

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
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* Nombre Indicio */}
                        <div className="mb-3">
                            <label className="form-label">Nombre Indicio</label>
                            <input
                                type="text"
                                className="form-control"
                                name="NombreIndicio"
                                value={form.NombreIndicio}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Descripcion */}
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                className="form-control"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                name="cantidad"
                                value={form.cantidad}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="row">

                            {/* Color */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Color"
                                    value={form.Color}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Tamaño */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Tamaño</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Tamano"
                                    value={form.Tamano}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Peso */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Peso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Peso"
                                    value={form.Peso}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Ubicación */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Ubicación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Ubicacion"
                                    value={form.Ubicacion}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Campos ocultos */}
                        <input type="hidden" name="Usuario_idUsuario" value={form.idIndicio} />
                        <input type="hidden" name="Expediente_idExpediente" value={form.Expediente_idExpediente} />
                        <input type="hidden" name="Usuario_idUsuario" value={form.Usuario_idUsuario} />

                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => onSubmit(form)}
                        >
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};