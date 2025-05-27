import express from "express";
const router = express.Router();

import authService from "../services/auth.service.js";

router
  .post("/login", (req, res) => {
    try {
      const token = authService.login(req.body);

      return res.send({ token });
    } catch (err) {
      if (err.name === "UserNotFoundError") {
        return res.status(404).send({ email: err.message });
      } else if (err.name === "IncorrectPasswordError") {
        return res.status(401).send({ password: err.message });
      }
    }
  })
  .post("/register/patient", (req, res) => {
    try {
      authService.register(req.body);
      return res.status(200).send({});
    } catch (err) {
      if (err.name === "EmailIsTakenError") {
        return res.status(409).send({ email: err.message });
      }
    }
  })
  .post("/register/doctor", (req, res) => {
    try {
      authService.register(req.body);
      return res.status(200).send({});
    } catch (err) {
      if (err.name === "EmailIsTakenError") {
        return res.status(409).send({ email: err.message });
      }
    }
  })
  .get("/whoami", (req, res) => {
    try {
      const user = authService.whoAmI(req.headers.authorization);
      return res.send(user);
    } catch (err) {
      if (err.name === "UserNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else {
        return res.status(400).send({ message: err.message });
      }
    }
  });

export default router;
