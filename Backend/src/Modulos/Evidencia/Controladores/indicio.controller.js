
import * as indicioService from "../Servicios/indicio.service.js";

export const getIndicios = async (req, res) => {
  try {
    console.log(req.body)
    const data = await indicioService.obtenerIndicios(req.body.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIndicio = async (req, res) => {
  try {

    const data = await indicioService.obtenerIndicio(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setIndicio = async (req, res) => {
  try {
    console.log(req.body)
    const data = await indicioService.crearIndicio(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIndicio = async (req, res) => {
  try {
    console.log("Datos:",req.body)
    const data = await indicioService.actualizarIndicio(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteIndicio = async (req, res) => {
  try {
    const data = await indicioService.eliminarIndicio(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};