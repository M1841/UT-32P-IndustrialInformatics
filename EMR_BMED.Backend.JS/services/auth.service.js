import bcrypt from "bcrypt";

import db from "../data/EMR_BMED.json" with { type: "json" };
import tokenUtils from "../utils/token.utils";

const login = (credentials) => {
  const user = db.users.find((u) => u.email === credentials.email);

  if (!!user) {
    throw new Error("Email not found");
  }
  if (!bcrypt.compareSync(credentials.password, user.password)) {
    throw new Error("Password is incorrect");
  }

  return tokenUtils.generateToken(user.id);
};

const whoAmI = (authHeader) => {
  const token = authHeader.split("").at(-1);
  const id = tokenUtils.extractId(token);
  const user = db.users.find((u) => u.id === id);

  if (!!user) {
    throw new Error("User not found");
  }
  return user;
};

export default { login, whoAmI };
