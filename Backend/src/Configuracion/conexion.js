import sql from 'mssql'
import dotenv from "dotenv";
dotenv.config();


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const connection = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Conectado a SQL Server");
    return pool;
  }).catch(err => {
    console.error("Error al conectar a SQL Server:", err);
    throw err; // Re-lanzar el error para que la app lo capture
  });