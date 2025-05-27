import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

const generateToken = (id) => {
  return jwt.sign(
    { sub: id, jti: randomUUID() },
    "A&NFX9@@9XBaQ&!Dy;o7^iXHepc6fg@4"
  );
};

const extractId = (token) => {
  let id = null;
  jwt.verify(token, "A&NFX9@@9XBaQ&!Dy;o7^iXHepc6fg@4", async (_, decoded) => {
    id = decoded.sub;
  });
  return id;
};

export default { generateToken, extractId };
