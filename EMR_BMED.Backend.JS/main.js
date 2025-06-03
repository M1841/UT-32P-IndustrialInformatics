import express from "express";
import cors from "cors";
import { env } from "node:process";

import dbService from "./services/db.service.js";

import authController from "./controllers/auth.controller.js";
import medicationController from "./controllers/medication.controller.js";
import prescriptionController from "./controllers/prescription.controller.js";
import userController from "./controllers/user.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authController);
app.use("/medication", medicationController);
app.use("/prescription", prescriptionController);
app.use("/user", userController);

// dbService.seedTestData();

app.listen(8080, () => {
  if (!env["JWT_SECRET"]) {
    console.log("Missing or invalid JWT secret in .env");
    process.exit(1);
  } else {
    console.log("Server running at http://localhost:8080");
  }
});
