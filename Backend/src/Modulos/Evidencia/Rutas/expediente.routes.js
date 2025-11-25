import { Router } from "express";
import {
  getExpedientes,
  getExpediente,
  setExpediente,
  updateExpediente,
  deleteExpediente,
} from "../Controladores/expediente.controller.js";

const router = Router();

router.get("/", getExpedientes);
router.get("/:id", getExpediente);
router.post("/", setExpediente);
router.post("/estado", updateExpediente);
router.delete("/:id", deleteExpediente);

export default router;