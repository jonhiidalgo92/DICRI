import {connection} from "../../../Configuracion/conexion.js";


export const findUserByEmail = async (Correo) => {
  try {
    const pool = await connection;
    const result = await pool.request()
      .input("Correo", Correo)
    .query("EXEC sp_FindUserByEmail @Correo");

    return result.recordset[0]; // un solo usuario
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (idUsuario) => {
  try {
    const pool = await connection;

    const result = await pool.request()
      .input("idUsuario", idUsuario)
      .query("EXEC sp_FindUserById @idUsuario");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (idUsuario, hashedPassword) => {
  try {
    const pool = await connection;

    const result = await pool.request()
      .input("password", hashedPassword)
      .input("idUsuario", idUsuario)
      .query("EXEC sp_UpdateUserPassword @idUsuario, @password");

    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};