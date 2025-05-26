import bcrypt from "bcrypt";

import db from "../data/EMR_BMED.json" with { type: "json" };
import dbService from "./db.service";

const getOne = (id) => {
  const user = db.users.find((u) => u.id === id);

  if (!!user) {
    throw new Error(`Can't find user with id=${id}`);
  }
  return user;
};

const searchPatients = (query) => {
  const patients = db.users
    .filter(
      (p) =>
        p.isDoctor === false &&
        [`${p.name} ${p.surname}`, p.email, p.socialNumber].some((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        )
    )
    .slice(0, 50);

  return patients;
};

const getAllPatients = () => {
  return db.users.filter((p) => p.isDoctor === false);
};

const updateOne = (id, dto) => {
  const user = getOne(id);

  if (!!dto.password) {
    user.password = bcrypt.hashSync(dto.password, 1);
  }
  if (!!dto.email) {
    if (db.users.some((u) => u.email === dto.email)) {
      throw new Error("Email is taken");
    }
    user.email = dto.email;
  }
  if (!!dto.name) {
    user.name = dto.name;
  }
  if (!!dto.surname) {
    user.surname = dto.surname;
  }
  if (!!dto.gender) {
    user.gender = dto.gender;
  }
  if (!!dto.phone) {
    user.phone = dto.phone;
  }

  if (user.isDoctor) {
    if (!!dto.address) {
      user.address = dto.address;
    }
    if (!!dto.medicalField) {
      user.medicalField = dto.medicalField;
    }
  } else {
    if (!!dto.socialNumber) {
      user.socialNumber = dto.socialNumber;
    }
    if (!!dto.citizenship) {
      user.citizenship = dto.citizenship;
    }
    if (!!dto.allergies) {
      user.allergies = dto.allergies;
    }
    if (!!dto.intolerances) {
      user.intolerances = dto.intolerances;
    }
    if (!!dto.conditions) {
      user.conditions = dto.conditions;
    }
    if (!!dto.blood) {
      user.blood = dto.blood;
    }
  }

  db.users = db.users.map((u) => {
    if (u.id !== id) {
      return u;
    } else {
      return user;
    }
  });
  dbService.saveChanges(db);

  return user;
};

const deleteOne = (id) => {
  getOne(id);

  db.users = db.users.filter((u) => u.id !== id);
  dbService.saveChanges(db);
};

export default { getOne, searchPatients, getAllPatients, updateOne, deleteOne };
