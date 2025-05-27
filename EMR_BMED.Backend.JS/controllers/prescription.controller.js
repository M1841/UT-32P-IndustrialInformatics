import express from "express";
const router = express.Router();

import prescriptionService from "../services/prescription.service.js";
import tokenUtils from "../utils/token.utils.js";

router
  .get("/patient/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== id) {
      return res.status(403).send({});
    }

    try {
      const prescriptions = prescriptionService.getAllByUser(id, false);
      return res.status(200).send(prescriptions);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .get("/doctor/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== id) {
      return res.status(403).send({});
    }

    try {
      const prescriptions = prescriptionService.getAllByUser(id, true);
      return res.status(200).send(prescriptions);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);

    try {
      const prescription = prescriptionService.getOne(id);
      if (myId !== prescription.patientId && myId !== prescription.doctorId) {
        return res.status(403).send({});
      }
      return res.status(200).send(prescription);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .post("/", (req, res) => {
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    if (myId !== req.body.doctorId) {
      return res.status(403).send({});
    }

    try {
      prescriptionService.createOne(req.body);
      return res.status(200).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .put("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    const prescription = prescriptionService.getOne(id);
    if (myId !== prescription.doctorId) {
      return res.status(403).send({});
    }

    try {
      prescriptionService.updateOne(id, req.body);
      return res.status(200).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ").at(-1);
    const myId = tokenUtils.extractId(token);
    const prescription = prescriptionService.getOne(id);
    if (myId !== prescription.doctorId) {
      return res.status(403).send({});
    }

    try {
      prescriptionService.deleteOne(id);
      return res.status(200).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  });

export default router;
