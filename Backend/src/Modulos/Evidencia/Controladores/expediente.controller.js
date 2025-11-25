import * as expedienteService from "../Servicios/expediente.service.js";

export const getExpedientes = async (req, res) => {
  try {
    const data = await expedienteService.obtenerExpedientes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExpediente = async (req, res) => {
  try {
    const data = await expedienteService.obtenerExpediente(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setExpediente = async (req, res) => {
  try {
    const data = await expedienteService.crearExpediente(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExpediente = async (req, res) => {
  try {
    const data = await expedienteService.actualizarExpediente(req.body );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExpediente = async (req, res) => {
  try {
    const data = await expedienteService.eliminarExpediente(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};