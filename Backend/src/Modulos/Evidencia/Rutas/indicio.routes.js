import { Router } from "express";
import {
  getIndicios,
  getIndicio,
  setIndicio,
  updateIndicio,
  deleteIndicio,
} from "../Controladores/indicio.controller.js";

const router = Router();

router.post("/all/", getIndicios);
router.get("/:id", getIndicio);
router.post("/add", setIndicio);
router.post("/estado/", updateIndicio);
router.delete("/:id", deleteIndicio);

export default router;