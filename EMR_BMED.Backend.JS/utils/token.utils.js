import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "node:process";

const generateToken = (id) => {
  return jwt.sign({ sub: id, jti: randomUUID() }, env["JWT_SECRET"]);
};

const extractId = (token) => {
  let id = null;
  jwt.verify(token, env["JWT_SECRET"], async (_, decoded) => {
    id = decoded.sub;
  });
  return id;
};

export default { generateToken, extractId };
