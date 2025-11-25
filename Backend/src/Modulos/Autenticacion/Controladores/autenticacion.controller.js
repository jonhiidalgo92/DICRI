import { loginService, changePasswordService } from "../Servicios/autenticacion.service.js";

export const login = async (req, res) => {
  try {
    const { Correo, password } = req.body;
    const result = await loginService(Correo, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const message = await changePasswordService(userId, oldPassword, newPassword);
    res.json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};