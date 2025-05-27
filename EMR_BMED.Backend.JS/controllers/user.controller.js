import express from "express";
const router = express.Router();

import userService from "../services/user.service.js";
import tokenUtils from "../utils/token.utils.js";

router
  .get("patient/all", (req, res) => {
    const patients = userService.getAllPatients();
    return res.status(200).send(patients);
  })
  .get("/search/:query", (req, res) => {
    const patients = userService.searchPatients(req.params.query);
    return res.status(200).send(patients);
  })
  .get("/:id", (req, res) => {
    try {
      const user = userService.getOne(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .put("/patient/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== id) {
      return res.status(403).send({});
    }

    try {
      userService.updateOne(id, req.body);
      return res.status(200).send({});
    } catch (err) {
      if (err.name === "UserNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "EmailIsTakenError") {
        return res.status(409).send({ email: err.message });
      }
    }
  })
  .put("/doctor/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== id) {
      return res.status(403).send({});
    }

    try {
      userService.updateOne(id, req.body);
      return res.status(200).send({});
    } catch (err) {
      if (err.name === "UserNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "EmailIsTakenError") {
        return res.status(409).send({ email: err.message });
      }
    }
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== id) {
      return res.status(403).send({});
    }
    try {
      userService.deleteOne(id);
      return res.status(204).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  });

export default router;
