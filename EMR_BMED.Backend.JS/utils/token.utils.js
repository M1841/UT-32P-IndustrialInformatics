import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

const generateToken = (id) => {
  return jwt.sign({ sub: id, jti: randomUUID() });
};

const extractId = (token) => {
  let id = null;
  jwt.verify(token, "", async (_, decoded) => {
    id = decoded.sub;
  });

  return id;
};

export default { generateToken, extractId };
