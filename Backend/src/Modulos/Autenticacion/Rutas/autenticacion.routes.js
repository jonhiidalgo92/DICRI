import { Router } from "express";
import { login, changePassword } from "../Controladores/autenticacion.controller.js";

const router = Router();

// login sin token
router.post("/login", login);

// cambiar contraseña sin token (pero requiere ID)
router.put("/cambiarpassword", changePassword);

export default router;