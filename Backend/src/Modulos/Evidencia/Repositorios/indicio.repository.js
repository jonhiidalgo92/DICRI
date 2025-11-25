import {connection} from "../../../Configuracion/conexion.js";

// ===============================
// GET ALL
// ===============================
export const findAll = async (idExpediente) => {
  try {
    const pool = await connection;
   console.log("Repor:" & idExpediente)
    const result = await pool.request()
      .input("Expediente_idExpediente", idExpediente)
      .query("EXEC sp_Indicio_FindAll @Expediente_idExpediente");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
// ===============================
// GET BY ID
// ===============================
export const findById = async (id) => {
  try {
    const pool = await connection;

    const result = await pool.request()
      .input("idIndicio", id)
      .query("EXEC sp_Indicio_FindById @idIndicio");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// ===============================
// CREATE
// ===============================
export const create = async (data) => {
  try {
    const pool = await connection;
    console.log(data)
    const result = await pool.request()
      .input("Color", data.Color)
      .input("tamano", data.tamano)
      .input("Peso", data.Peso)
      .input("Ubicacion", data.Ubicacion)
      .input("NombreIndicio", data.NombreIndicio)
      .input("cantidad", data.cantidad)
      .input("descripcion", data.descripcion)

      .input("Expediente_idExpediente", data.Expediente_idExpediente)
      .input("Usuario_idUsuario", data.Usuario_idUsuario)
      .query(`
        EXEC sp_Indicio_Create
          @Color,
          @tamano,
          @Peso,
          @Ubicacion,
          @NombreIndicio,
          @descripcion,
          @cantidad,
          @Expediente_idExpediente,
          @Usuario_idUsuario
      `);

    return result;
  } catch (error) {
    throw error;
  }
};

// ===============================
// UPDATE
// ===============================
// ⚠ Igual: reemplaza con tus columnas reales
export const update = async (data) => {
  try {
    const pool = await connection;

    const result = await pool.request()
      .input("idIndicio", data.idIndicio)
      .input("Color", data.Color)
      .input("tamano", data.tamano)
      .input("Peso", data.Peso)
      .input("Ubicacion", data.Ubicacion)
      .input("NombreIndicio", data.NombreIndicio)
      .input("cantidad", data.cantidad)
      .input("descripcion", data.descripcion)
      .input("Expediente_idExpediente", data.Expediente_idExpediente)
      .input("Usuario_idUsuario", data.Usuario_idUsuario)
      .query(`
        EXEC sp_Indicio_Update
          @idIndicio,
          @Color,
          @tamano,
          @Peso,
          @Ubicacion,
          @NombreIndicio,
          @descripcion,
          @cantidad,
          @Expediente_idExpediente,
          @Usuario_idUsuario
      `);


    return result;
  } catch (error) {
    throw error;
  }
};

// ===============================
// DELETE
// ===============================
export const remove = async (id) => {
  try {
    const pool = await connection;

    const result = await pool
      .request()
      .input("idIndicio", id)
      .query("EXEC sp_Indicio_Delete @idIndicio");

    return result;
  } catch (error) {
    throw error;
  }
};