import express from "express";
import cors from "cors";

import dbService from "./services/db.service.js";

import authController from "./controllers/auth.controller.js";
import prescriptionController from "./controllers/prescription.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authController);
app.use("/prescription", prescriptionController);

// dbService.seedTestData();

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
