import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  //Token a cambiar al tener archivo .env
  const secretJWT = process.env.JWT_SECRET || "dicri";

  if (!header) {
    return res.status(401).json({ message: "Token requerido" });
  }

  //Extrae el token del frontEnd
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretJWT);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};