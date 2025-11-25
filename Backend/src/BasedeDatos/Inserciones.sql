USE DICRI_DB;
GO
INSERT INTO Rol (Nombre, Descripcion)
VALUES 
('Coordinador', 'Acceso total al sistema'),
('Tecnico', 'Revisa expedientes');


INSERT INTO Estado (NombreEstado, DescripcionEstado)
VALUES
('Registrado', 'Expediente ingresado'),
('En Revisión', 'Expediente en proceso de evaluación'),
('Aprobado', 'Expediente validado'),
('Rechazado', 'Expediente rechazado');

INSERT INTO Usuario (Dpi, Nombre, Apellido, Correo, Contrasena, Rol_idRol)
VALUES
('3012345670101', 'Juan', 'Pérez', 'juan.perez@correo.com', '1234', 1),
('2011122233301', 'María', 'Gómez', 'maria.gomez@correo.com', 'abcd', 2),
('4567891230101', 'Carlos', 'Ramírez', 'carlos.ramirez@correo.com', 'pass', 2);

INSERT INTO Usuario (
    Dpi,
    NombreCompleto,
    Correo,
    Contrasena,
    Rol_idRol,
    Telefono,
    Direccion,
    Genero
)
VALUES (
    '1234567890101',              -- Dpi
    'Juan Pérez',                 -- NombreCompleto
    'juan.perez@example.com',     -- Correo
    'ContraseñaEncriptadaAquí',   -- Contrasena (recuerda usar HASH)
    1,                            -- Rol_idRol (debe existir en tabla Rol)
    '55551234',                   -- Telefono
    'Zona 1, Ciudad',             -- Direccion
    'Masculino'                   -- Genero
);




INSERT INTO Expediente (FechaRegistro, DescripcionRechazo, Etapa_idEtapa,NombreExpediente)
VALUES
('2025-02-15', NULL, 1,"Expediente de Caso Agua potable"),
('2025-03-15', NULL, 1,"Expediente de Caso Demanda ambiente"),

INSERT INTO Detalle_Expediente (Expediente_idExpediente, Usuario_idUsuario, FechaRevision, Resultado, JustificacionRechazo)
VALUES
(1, 1, '2025-01-16', 1, NULL),
(2, 1, '2025-01-21', 0, 'Inconsistencias en datos'),
(3, 2, '2025-02-03', 0, 'Documentos ilegibles');

INSERT INTO Indicio (Color, Tamaño, Peso, Ubicacion, Expediente_idExpediente, Usuario_idUsuario)
VALUES
('Rojo', 'Pequeño', '200g', 'Cocina', 1, 2),
('Negro', 'Mediano', '500g', 'Sala', 2, 2),
('Blanco', 'Grande', '1kg', 'Dormitorio', 1, 3),
('Azul', 'Pequeño', '150g', 'Patio', 3, 3);


INSERT INTO Indicio (
    NombreIndicio,
    Descripcion,
    Cantidad,
    Color,
    tamano,
    Peso,
    Ubicacion,
    Expediente_idExpediente,
    Usuario_idUsuario
)
VALUES
('Cuchillo metálico', 'Cuchillo encontrado en la escena con manchas sospechosas', 1, 'Plateado', '20cm', '150g', 'Cocina', 1, 1),

('Teléfono celular', 'Teléfono encontrado cerca del cuerpo, bloqueado', 1, 'Negro', '6 pulgadas', '180g', 'Sala', 1, 2),

('Mancha de sangre', 'Muestra de sangre recolectada para análisis', 3, 'Rojo oscuro', 'Variable', 'N/A', 'Habitación principal', 2, 1),

('Documento rasgado', 'Fragmento de documento parcialmente quemado', 5, 'Blanco', 'Carta', 'N/A', 'Patio', 2, 2);
