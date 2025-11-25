--AUTENTICACION
CREATE OR ALTER PROCEDURE sp_FindUserByEmail
    @Correo NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Usuario
    WHERE Correo = @Correo;
END;

CREATE OR ALTER PROCEDURE sp_FindUserById
    @idUsuario INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Usuarios
    WHERE idUsuario = @idUsuario;
END;

CREATE OR ALTER PROCEDURE sp_UpdateUserPassword
    @idUsuario INT,
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios
    SET password = @password
    WHERE idUsuario = @idUsuario;
END;

-- iNDICIOS
CREATE OR ALTER PROCEDURE sp_Indicio_FindAll
    @Expediente_idExpediente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        I.idIndicio,
        I.NombreIndicio,
        I.descripcion,
        I.cantidad,
        I.Color,
        I.tamano,
        I.Peso,
        I.Ubicacion,
        I.Expediente_idExpediente,
        I.Usuario_idUsuario,
        U.NombreCompleto AS NombreCompleto
    FROM Indicio I
    LEFT JOIN Usuario U ON U.idUsuario = I.Usuario_idUsuario
    WHERE I.Expediente_idExpediente = @Expediente_idExpediente;
END;

CREATE OR ALTER PROCEDURE sp_Indicio_FindById
    @idIndicio INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        I.idIndicio,
        I.Color,
        I.tamano,
        I.Peso,
        I.Ubicacion,
        I.Expediente_idExpediente,
        I.Usuario_idUsuario,
        U.NombreCompleto AS NombreCompletoUsuario
    FROM Indicio I
    LEFT JOIN Usuario U ON U.idUsuario = I.Usuario_idUsuario
    WHERE I.idIndicio = @idIndicio;
END;

CREATE OR ALTER PROCEDURE sp_Indicio_Create
    @Color NVARCHAR(50),
    @tamano NVARCHAR(50),
    @Peso NVARCHAR(50),
    @Ubicacion NVARCHAR(200),
    @NombreIndicio NVARCHAR(200),
    @descripcion NVARCHAR(MAX),
    @cantidad INT,
    @Expediente_idExpediente INT,
    @Usuario_idUsuario INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Indicio (
        Color, tamano, Peso, Ubicacion, NombreIndicio, descripcion, cantidad,
        Expediente_idExpediente, Usuario_idUsuario
    ) VALUES (
        @Color, @tamano, @Peso, @Ubicacion, @NombreIndicio, @descripcion, @cantidad,
        @Expediente_idExpediente, @Usuario_idUsuario
    );
END;


CREATE OR ALTER PROCEDURE sp_Indicio_Update
    @idIndicio INT,
    @Color NVARCHAR(50),
    @tamano NVARCHAR(50),
    @Peso NVARCHAR(50),
    @Ubicacion NVARCHAR(200),
    @NombreIndicio NVARCHAR(200),
    @descripcion NVARCHAR(MAX),
    @cantidad INT,
    @Expediente_idExpediente INT,
    @Usuario_idUsuario INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Indicio SET
        Color = @Color,
        tamano = @tamano,
        Peso = @Peso,
        Ubicacion = @Ubicacion,
        NombreIndicio = @NombreIndicio,
        descripcion = @descripcion,
        cantidad = @cantidad,
        Expediente_idExpediente = @Expediente_idExpediente,
        Usuario_idUsuario = @Usuario_idUsuario
    WHERE idIndicio = @idIndicio;
END;

CREATE OR ALTER PROCEDURE sp_Indicio_Delete
    @idIndicio INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Indicio
    WHERE idIndicio = @idIndicio;
END;

-- EXPEDIENTES


CREATE PROCEDURE sp_FindAllExpedientes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Expediente;
END;
GO

CREATE PROCEDURE sp_FindExpedienteById
    @idExpediente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM Expediente 
    WHERE idExpediente = @idExpediente;
END;
GO

CREATE PROCEDURE sp_CreateExpediente
    @FechaRegistro DATE,
    @DescripcionRechazo VARCHAR(255),
    @Etapa_idEtapa INT,
    @NombreExpediente VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Expediente (FechaRegistro, DescripcionRechazo, Etapa_idEtapa, NombreExpediente)
    VALUES (@FechaRegistro, @DescripcionRechazo, @Etapa_idEtapa, @NombreExpediente);
END;
GO


CREATE PROCEDURE sp_UpdateExpediente
    @idExpediente INT,
    @Etapa_idEtapa INT,
    @Descripcion VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Expediente
    SET 
        Etapa_idEtapa = @Etapa_idEtapa,
        DescripcionRechazo = @Descripcion
    WHERE 
        idExpediente = @idExpediente;
END;
GO

--Eliminacion de un expediente en Cascada con indicios  y detalles
CREATE OR ALTER PROCEDURE sp_DeleteExpediente
    @idExpediente INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verifica si ya hay una transacción abierta
    DECLARE @TransactionStarted BIT = 0;

    BEGIN TRY

        -- Si no hay transacción previa, iniciar una
        IF @@TRANCOUNT = 0
        BEGIN
            SET @TransactionStarted = 1;
            BEGIN TRANSACTION;
        END

        -- 1. Borrar indicios
        DELETE FROM Indicios
        WHERE Expediente_idExpediente = @idExpediente;

        -- 2. Borrar detalles
        DELETE FROM Detalle_Expediente
        WHERE Expediente_idExpediente = @idExpediente;

        -- 3. Borrar expediente
        DELETE FROM Expediente
        WHERE idExpediente = @idExpediente;

        -- Hacer commit solo si este SP inició la transacción
        IF @TransactionStarted = 1 AND @@TRANCOUNT > 0
        BEGIN
            COMMIT TRANSACTION;
        END

    END TRY
    BEGIN CATCH

        -- Hacer rollback solo si este SP inició la transacción
        IF @TransactionStarted = 1 AND @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        -- ⚠ IMPORTANTE: el punto y coma ANTES de THROW
        ;
        THROW;
    END CATCH
END;