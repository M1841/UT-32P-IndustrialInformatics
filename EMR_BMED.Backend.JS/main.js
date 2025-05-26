import express from "express";

import dbService from "./services/db.service.js";

const app = express();

app.use(express.json());

dbService.seedTestData();

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
