import bcrypt from "bcryptjs";
import { findUserByEmail, findUserById, updatePassword } from "../Repositorios/autenticacion.repository.js";
import { generarToken } from "../../../Utils/JWT/jwt.service.js";


export const loginService = async (Correo, password) => {

  console.log("correo: " & Correo & "contraseña. " &password)
  const user = await findUserByEmail(Correo);
  if (!user) throw new Error("Usuario no encontrado");

  //Encriptar 
  //const salt = await bcrypt.genSalt(10);     // Genera un salt seguro
  //const hashedPassword = await bcrypt.hash(password, salt);

  //Validacion encriptacion
  const isMatch = await bcrypt.compare(password, user.Contrasena);
  if (!isMatch) throw new Error("Credenciales incorrectas");

  // Genera JWT
  const token = generarToken({
      id: user.idUsuario,
      nombre: user.NombreCompleto,
      direccion: user.direccion,
      email: user.Correo,
      rol: user.Rol_idRol
  });


  return {
    message: "Login exitoso",
    token: token,
    user: {
      id: user.idUsuario,
      nombre: user.NombreCompleto,
      direccion: user.direccion,
      email: user.Correo,
      rol: user.Rol_idRol
    }
  };
};

export const changePasswordService = async (userId, oldPassword, newPassword) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("La contraseña actual es incorrecta");

  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePassword(user.idUsuario, hashed);

  return "Contraseña actualizada correctamente";
};