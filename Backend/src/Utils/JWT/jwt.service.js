import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dicri";

export const generarToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};