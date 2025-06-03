import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

import db from "../data/EMR_BMED.json" with { type: "json" };
import dbService from "./db.service.js";
import tokenUtils from "../utils/token.utils.js";

const login = (credentials) => {
  const user = db.users.find((u) => u.email === credentials.email);

  if (!user) {
    throw { name: "UserNotFoundError", message: "Email not found" };
  }
  if (!bcrypt.compareSync(credentials.password, user.password)) {
    throw { name: "IncorrectPasswordError", message: "Password is incorrect" };
  }

  return tokenUtils.generateToken(user.id);
};

const register = (user) => {
  if (db.users.some((u) => u.email === user.email)) {
    throw { name: "EmailIsTakenError", message: "Email is taken" };
  }
  console.log(user);
  db.users.push({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
    phone: user.phoneNumber,
    id: randomUUID(),
  });
  dbService.saveChanges(db);
};

const whoAmI = (authHeader) => {
  const token = authHeader.split(" ").at(-1);
  const id = tokenUtils.extractId(token);
  const user = db.users.find((u) => u.id === id);

  if (!user) {
    throw {
      name: "UserNotFoundError",
      message: "Access token doesn't belong to a user",
    };
  }
  return user;
};

export default { login, register, whoAmI };
