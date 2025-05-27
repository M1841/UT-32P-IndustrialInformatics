import { randomUUID } from "node:crypto";

import db from "../data/EMR_BMED.json" with { type: "json" };
import dbService from "./db.service.js";

const getOne = (id) => {
  const prescription = db.prescriptions.find((p) => p.globalID === id);

  if (!!prescription) {
    throw new Error(`Can't find prescription with id=${id}`);
  }
  return includeForeignEntities(prescription);
};

const getAllByUser = (id, isDoctor) => {
  const user = db.users.find((u) => u.isDoctor === isDoctor && u.id === id);

  if (!user) {
    throw new Error(
      `Can't find ${isDoctor ? "doctor" : "patient"} with id=${id}`
    );
  }

  return db.prescriptions
    .filter((p) => (isDoctor ? p.doctorId === id : p.patientId === id))
    .map((p) => includeForeignEntities(p));
};

const createOne = (dto) => {
  const patient = db.users.find(
    (u) => u.isDoctor === false && u.id === dto.patientId
  );
  if (!!patient) {
    throw new Error(`Can't find patient with id=${dto.patientId}`);
  }

  const doctor = db.users.find(
    (u) => u.isDoctor === true && u.id === dto.doctorId
  );
  if (!!doctor) {
    throw new Error(`Can't find doctor with id=${dto.doctorId}`);
  }

  const prescription = { ...dto, globalID: randomUUID(), medicationIds: [] };

  for (const medId of dto.medicationIds) {
    const medication = db.medication.find((m) => m.id === medId);

    if (!!medication) {
      throw new Error(`Can't find medication with id=${medId}`);
    }
    prescription.medicationIds.push(medId);
  }

  db.prescriptions.push(prescription);
  dbService.saveChanges(db);
};

const updateOne = (id, dto) => {
  const prescription = getOne(id);

  if (!!dto.medUnit) {
    prescription.medUnit = dto.medUnit;
  }
  if (!!dto.cui) {
    prescription.cui = dto.cui;
  }
  if (!!dto.cas) {
    prescription.cas = dto.cas;
  }
  if (!!dto.isApproved || dto.isApproved === false) {
    prescription.isApproved = dto.isApproved;
  }
  if (!!dto.isMF || dto.isMF === false) {
    prescription.isMF = dto.isMF;
  }
  if (!!dto.isAmbulatory || dto.isAmbulatory === false) {
    prescription.isAmbulatory = dto.isAmbulatory;
  }
  if (!!dto.isHospital || dto.isHospital === false) {
    prescription.isHospital = dto.isHospital;
  }
  if (!!dto.isOther || dto.isOther === false) {
    prescription.isOther = dto.isOther;
  }
  if (!!dto.isMFMM || dto.isMFMM === false) {
    prescription.isMFMM = dto.isMFMM;
  }
  if (!!dto.isSalariat || dto.isSalariat === false) {
    prescription.isSalariat = dto.isSalariat;
  }
  if (!!dto.isCoasigurat || dto.isCoasigurat === false) {
    prescription.isCoasigurat = dto.isCoasigurat;
  }
  if (!!dto.isLiberProfesionist || dto.isLiberProfesionist === false) {
    prescription.isLiberProfesionist = dto.isLiberProfesionist;
  }
  if (!!dto.isCopil || dto.isCopil === false) {
    prescription.isCopil = dto.isCopil;
  }
  if (!!dto.isStudent || dto.isStudent === false) {
    prescription.isStudent = dto.isStudent;
  }
  if (!!dto.isGravida || dto.isGravida === false) {
    prescription.isGravida = dto.isGravida;
  }
  if (!!dto.isPensionar || dto.isPensionar === false) {
    prescription.isPensionar = dto.isPensionar;
  }
  if (!!dto.isVeteran || dto.isVeteran === false) {
    prescription.isVeteran = dto.isVeteran;
  }
  if (!!dto.isLowIncome || dto.isLowIncome === false) {
    prescription.isLowIncome = dto.isLowIncome;
  }
  if (!!dto.isRevolutionar || dto.isRevolutionar === false) {
    prescription.isRevolutionar = dto.isRevolutionar;
  }
  if (!!dto.isHandicap || dto.isHandicap === false) {
    prescription.isHandicap = dto.isHandicap;
  }
  if (!!dto.isAjutorSocial || dto.isAjutorSocial === false) {
    prescription.isAjutorSocial = dto.isAjutorSocial;
  }
  if (!!dto.isSomaj || dto.isSomaj === false) {
    prescription.isSomaj = dto.isSomaj;
  }
  if (!!dto.isPersonalContractual || dto.isPersonalContractual === false) {
    prescription.isPersonalContractual = dto.isPersonalContractual;
  }
  if (!!dto.isCardEuropean || dto.isCardEuropean === false) {
    prescription.isCardEuropean = dto.isCardEuropean;
  }
  if (
    !!dto.isAcorduriInternationale ||
    dto.isAcorduriInternationale === false
  ) {
    prescription.isAcorduriInternationale = dto.isAcorduriInternationale;
  }
  if (!!dto.isOtherCategories) {
    prescription.isOtherCategories = dto.isOtherCategories;
  }
  if (!!dto.diagnostic) {
    prescription.diagnostic = dto.diagnostic;
  }
  if (!!dto.daysNumber) {
    prescription.daysNumber = dto.daysNumber;
  }

  db.prescriptions = db.prescriptions.map((p) => {
    if (p.globalID !== id) {
      return p;
    }
    return prescription;
  });
  dbService.saveChanges(db);
};

const deleteOne = (id) => {
  getOne(id);
  db.prescriptions = db.prescriptions.filter((p) => p.globalID !== id);
  dbService.saveChanges(db);
};

const includeForeignEntities = (prescription) => {
  return {
    ...prescription,
    patient: db.users.find((u) => u.id === prescription.patientId),
    doctor: db.users.find((u) => u.id === prescription.doctorId),
    medication: db.medication.filter((m) =>
      prescription.medicationIds.includes(m.id)
    ),
  };
};

export default { getOne, getAllByUser, createOne, updateOne, deleteOne };
