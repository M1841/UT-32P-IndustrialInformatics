import express from "express";
const router = express.Router();

import medicationService from "../services/medication.service.js";

router
  .get("/all", (req, res) => {
    const medication = medicationService.getAll();
    return res.status(200).send(medication);
  })
  .get("/search/:query", (req, res) => {
    const medication = medicationService.search(req.params.query);
    return res.status(200).send(medication);
  })
  .get("/:id", (req, res) => {
    try {
      const medication = medicationService.getOne(req.params.id);
      return res.status(200).send(medication);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .put("/:id", (req, res) => {
    try {
      const id = req.params.id;
      medicationService.updateOne(id, req.body);
      return res.status(200).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  })
  .delete("/:id", (req, res) => {
    try {
      const id = req.params.id;
      medicationService.deleteOne(id);
      return res.status(200).send({});
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  });

export default router;
