-- ========================================
-- CREAR BASE DE DATOS
-- ========================================
CREATE DATABASE DICRI_DB;
GO
USE DICRI_DB;
GO

-- ========================================
-- TABLA: Rol
-- ========================================
CREATE TABLE Rol (
    idRol INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(45) NOT NULL,
    Descripcion VARCHAR(45)
);
GO

-- ========================================
-- TABLA: Estado
-- ========================================
CREATE TABLE Estado (
    idEstado INT IDENTITY(1,1) PRIMARY KEY,
    NombreEstado VARCHAR(45) NOT NULL,
    DescripcionEstado VARCHAR(45)
);
GO

-- ========================================
-- TABLA: Usuario
-- ========================================
CREATE TABLE Usuario (
    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    Dpi VARCHAR(45) NOT NULL,
    NombreCompleto VARCHAR(45),
    Correo VARCHAR(45),
    Contrasena VARCHAR(255),
    Telefono VARCHAR(45),
    Direccion VARCHAR(45),
    Genero VARCHAR(45),
    Rol_idRol INT NOT NULL,

    CONSTRAINT FK_Usuario_Rol FOREIGN KEY (Rol_idRol)
        REFERENCES Rol(idRol)
);
GO

-- ========================================
-- TABLA: Expediente
-- ========================================
CREATE TABLE Expediente (
    idExpediente INT IDENTITY(1,1) PRIMARY KEY,
    FechaRegistro DATE NOT NULL,
    DescripcionRechazo VARCHAR(45),
    Etapa_idEtapa INT NOT NULL,   -- Se relaciona con Estado

    CONSTRAINT FK_Expediente_Estado FOREIGN KEY (Etapa_idEtapa)
        REFERENCES Estado(idEstado)
);
GO

-- ========================================
-- TABLA: Detalle_Expediente
-- ========================================
CREATE TABLE Detalle_Expediente (
    idDetalle_Expediente INT IDENTITY(1,1) PRIMARY KEY,
    Expediente_idExpediente INT NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FechaRevision DATE,
    Resultado TINYINT,
    JustificacionRechazo VARCHAR(45),

    CONSTRAINT FK_Detalle_Expediente_Exp FOREIGN KEY (Expediente_idExpediente)
        REFERENCES Expediente(idExpediente),

    CONSTRAINT FK_Detalle_Expediente_Usuario FOREIGN KEY (Usuario_idUsuario)
        REFERENCES Usuario(idUsuario)
);
GO

-- ========================================
-- TABLA: Indicio
-- ========================================
CREATE TABLE Indicio (
    idIndicio INT IDENTITY(1,1) PRIMARY KEY,
    
    NombreIndicio VARCHAR(100) NULL,
    Descripcion VARCHAR(255) NULL,
    Cantidad INT NULL,

    Color VARCHAR(45) NULL,
    tamano VARCHAR(45) NULL,
    Peso VARCHAR(45) NULL,
    Ubicacion VARCHAR(45) NULL,

    Expediente_idExpediente INT NOT NULL,
    Usuario_idUsuario INT NOT NULL,

    CONSTRAINT FK_Indicio_Expediente 
        FOREIGN KEY (Expediente_idExpediente) REFERENCES Expediente(idExpediente),

    CONSTRAINT FK_Indicio_Usuario 
        FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);
GO
