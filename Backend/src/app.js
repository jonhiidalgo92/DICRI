import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importar las rutas de los módulos
import expedienteRoutes from "./Modulos/Evidencia/Rutas/expediente.routes.js";
import indicioRoutes from "./Modulos/Evidencia/Rutas/indicio.routes.js";
import autenticacionRoutes from "./Modulos/Autenticacion/Rutas/autenticacion.routes.js";
//import coordinadorRoutes from "./Modulos/Usuario/Coordinador/Rutas/Coordinador.routes.js";
//import tecnicoRoutes from "./Modulos/Usuario/Tecnico/Rutas/Tecnico.routes.js";
// Si tienes más módulos, los agregas aquí...

const app = express();

// Middlewares globales
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS');
    next();
});

// Ruta base (opcional)
app.get("/", (req, res) => {
  res.send("DICRI Funcionando Correctamente");
});

// Registrar rutas de forma limpia
app.use("/api/expedientes", expedienteRoutes);
app.use("/api/indicios", indicioRoutes);
app.use("/api/auth", autenticacionRoutes);
//app.use("/api/coordinadores", coordinadorRoutes);
//app.use("/api/tecnicos", tecnicoRoutes);

export default app