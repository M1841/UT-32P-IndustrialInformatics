import fs from "node:fs";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

import csvUtils from "../utils/csv.utils.js";

const seedTestData = () => {
  const db = {
    users: [],
    prescriptions: [],
    medication: [],
  };

  const patient = {
    isDoctor: false,
    id: randomUUID(),
    name: "John",
    surname: "Doe",
    email: "jdoe@email.com",
    password: bcrypt.hashSync("1234", 1),
    gender: "Male",
    citizenship: "Belgian",
    socialNumber: "72902960001",
    birthday: "1996-02-29",
    phone: "012346789",
    allergies: "Nuts",
    intolerances: "Lactose",
    conditions: "Asthma",
    blood: "AB",
  };
  db.users.push(patient);

  const doctor = {
    isDoctor: true,
    id: randomUUID(),
    name: "Jane",
    surname: "Smith",
    email: "jane.smith@bmed.co",
    password: bcrypt.hashSync("5678", 1),
    gender: "Female",
    birthday: "1987-11-09",
    phone: "0987654321",
    address: "22 Hilda Street",
    medicalField: "Orthopedics",
  };
  db.users.push(doctor);

  csvUtils.importMeds().forEach((med) => {
    db.medication.push({ ...med, id: randomUUID() });
  });

  const prescription = {
    globalID: randomUUID(),
    patientId: patient.id,
    doctorId: doctor.id,
    medicationIds: [db.medication[0].id],
    medUnit: "Hospital",
    cui: "987654321",
    cas: "123456789",
    diagnostic: "Flu",
    issued: new Date(Date.now()),
    daysNumber: 7,
  };
  db.prescriptions.push(prescription);

  saveChanges(db);
};

const saveChanges = (data) => {
  fs.writeFileSync("./data/EMR_BMED.json", JSON.stringify(data));
};

export default { seedTestData, saveChanges };
