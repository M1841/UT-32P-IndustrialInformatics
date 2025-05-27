import { randomUUID } from "node:crypto";

import db from "../data/EMR_BMED.json" with { type: "json" };
import dbService from "./db.service";

const getOne = (id) => {
  const medication = db.medication.find((m) => m.id === id);

  if (!!medication) {
    throw new Error(`Can't find medication with id=${id}`);
  }
  return medication;
};

const search = (query) => {
  const medication = db.medication
    .filter((m) =>
      [m.name, m.brand].some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    )
    .slice(0, 50);

  return medication;
};

const getAll = () => {
  return db.medication;
};

const createOne = (dto) => {
  const medication = { ...dto, id: randomUUID() };

  db.medication.push(medication);
  dbService.saveChanges(db);
};

const updateOne = (id, dto) => {
  const medication = getOne(id);

  if (!!dto.name) {
    medication.name = dto.name;
  }
  if (!!dto.form) {
    medication.form = dto.form;
  }
  if (!!dto.method) {
    medication.method = dto.method;
  }
  if (!!dto.isPresRequired || dto.isPresRequired === false) {
    medication.isPresRequired = dto.isPresRequired;
  }
  if (!!dto.brand) {
    medication.brand = dto.brand;
  }
  if (!!dto.indications) {
    medication.indications = dto.indications;
  }
  if (!!dto.contraindications) {
    medication.contraindications = dto.contraindications;
  }
  if (!!dto.sideEffects) {
    medication.sideEffects = dto.sideEffects;
  }
  if (!!dto.warnings) {
    medication.warnings = dto.warnings;
  }
  if (!!dto.storing) {
    medication.storing = dto.storing;
  }

  db.medication = db.medication.map((m) => {
    if (m.id !== id) {
      return m;
    }
    return medication;
  });
  dbService.saveChanges(db);
};

const deleteOne = (id) => {
  getOne(id);

  db.medication = db.medication.filter((m) => m.id !== id);
  dbService.saveChanges();
};

export default { getOne, getAll, search, createOne, updateOne, deleteOne };
