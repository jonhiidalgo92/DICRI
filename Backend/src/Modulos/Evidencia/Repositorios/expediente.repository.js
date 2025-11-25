import {connection} from "../../../Configuracion/conexion.js";


export const findAll = async () => {
  try {
    const pool = await connection;
    const result = await pool.request().query("EXEC sp_FindAllExpedientes");
    return result.recordset;
  } catch (err) {
    console.error("Error en expediente.repository.findAll:", err);
    throw err;
  }
};

export const findById = async (id) => {
  try {
    const pool = await connection;
    const result = await pool
      .request()
      .input("idExpediente", id)
      .query("EXEC sp_FindExpedienteById @idExpediente");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// CREATE
export const create = async (data) => {
  try {
    const pool = await connection;
    const result = await pool
      .request()
      .input("FechaRegistro", data.fechaRegistro)        
      .input("DescripcionRechazo", data.DescripcionRechazo) 
      .input("Etapa_idEtapa", data.Etapa_idEtapa)        
      .input("NombreExpediente", data.NombreExpediente)
      .query(`
        EXEC sp_CreateExpediente 
            @FechaRegistro,
            @DescripcionRechazo,
            @Etapa_idEtapa,
            @NombreExpediente
      `);
    return result;
  } catch (error) {
    throw error;
  }
};

// UPDATE
export const update = async (idExpediente, Etapa_idEtapa, descripcion) => {
  try {
    const pool = await connection;
    const result = await pool
      .request()
      .input("idExpediente", idExpediente)
      .input("Etapa_idEtapa", Etapa_idEtapa)
      .input("descripcion", descripcion)
      .query(`
        EXEC sp_UpdateExpediente
            @idExpediente,
            @Etapa_idEtapa,
            @Descripcion
      `);
    return result;
  } catch (error) {
    throw error;
  }
};

// DELETE
export const remove = async (id) => {
  try {
    const pool = await connection;

    const result = await pool
      .request()
      .input("idExpediente", id)
      .query("EXEC sp_DeleteExpediente @idExpediente");

    return result;
  } catch (error) {
    throw error;
  }
};