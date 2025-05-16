using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class PrescriptionService(DbService dbService)
  {
    public async Task<PrescriptionModel> GetOneAsync(Guid id)
    {
      PrescriptionModel prescription = await dbService.Prescriptions
        .FindAsync(id)
        ?? throw new KeyNotFoundException($"Can't find prescription with id={id}");

      return prescription;
    }

    public async Task<PrescriptionModel[]> GetAllByPatientAsync(Guid id)
    {
      PatientModel patient = await dbService.Users
        .OfType<PatientModel>()
        .FirstOrDefaultAsync(p => p.Id == id)
        ?? throw new KeyNotFoundException($"Can't find patient with id={id}");

      return patient.Prescriptions.ToArray();
    }

    public async Task<PrescriptionModel[]> GetAllByDoctorAsync(Guid id)
    {
      DoctorModel doctor = await dbService.Users
        .OfType<DoctorModel>()
        .FirstOrDefaultAsync(d => d.Id == id)
        ?? throw new KeyNotFoundException($"Can't find doctor with id={id}");

      return doctor.Prescriptions.ToArray();
    }

    public async Task CreateAsync(PrescriptionCreateDto dto)
    {
      PatientModel patient = await dbService.Users
        .OfType<PatientModel>()
        .FirstOrDefaultAsync(p => p.Id == dto.PatientId)
        ?? throw new KeyNotFoundException($"Can't find patient with id={dto.PatientId}");

      DoctorModel doctor = await dbService.Users
        .OfType<DoctorModel>()
        .FirstOrDefaultAsync(d => d.Id == dto.DoctorId)
        ?? throw new KeyNotFoundException($"Can't find patient with id={dto.DoctorId}");

      PrescriptionModel prescription = new()
      {
        MedUnit = dto.MedUnit,
        CUI = dto.CUI,
        CAS = dto.CAS,
        IsApproved = dto.IsApproved,
        IsMF = dto.IsMF,
        IsAmbulatory = dto.IsAmbulatory,
        IsHospital = dto.IsHospital,
        IsOther = dto.IsOther,
        IsMFMM = dto.IsMFMM,
        PatientId = dto.PatientId,
        Patient = patient,
        DoctorId = dto.DoctorId,
        Doctor = doctor,
        IsSalariat = dto.IsSalariat,
        IsCoasigurat = dto.IsCoasigurat,
        IsLiberProfesionist = dto.IsLiberProfesionist,
        IsCopil = dto.IsCopil,
        IsStudent = dto.IsStudent,
        IsGravida = dto.IsGravida,
        IsPensionar = dto.IsPensionar,
        IsVeteran = dto.IsVeteran,
        IsLowIncome = dto.IsLowIncome,
        IsRevolutionar = dto.IsRevolutionar,
        IsHandicap = dto.IsHandicap,
        PNS = dto.PNS,
        IsAjutorSocial = dto.IsAjutorSocial,
        IsSomaj = dto.IsSomaj,
        IsPersonalContractual = dto.IsPersonalContractual,
        IsCardEuropean = dto.IsCardEuropean,
        IsAcorduriInternationale = dto.IsAcorduriInternationale,
        IsOtherCategories = dto.IsOtherCategories,
        Diagnostic = dto.Diagnostic,
        Issued = DateTime.Now,
        DaysNumber = dto.DaysNumber,
        Records = []
      };

      MedicationModel med = await dbService.Meds
        .FindAsync(dto.MedicationId)
        ?? throw new KeyNotFoundException($"Can't find medication with id={dto.MedicationId}");
        
      prescription.Records.Add(new()
      {
        MID = dto.MedicationId,
        Meds = med,
        Prescriptions = prescription
      });

      dbService.Prescriptions.Add(prescription);
      await dbService.SaveChangesAsync();
    }

    public async Task UpdateAsync(Guid id, PrescriptionUpdateDto dto)
    {
      PrescriptionModel prescription = await GetOneAsync(id);

      if (dto.MedUnit != null) { prescription.MedUnit = dto.MedUnit; }
      if (dto.CUI != null) { prescription.CUI = dto.CUI; }
      if (dto.CAS != null) { prescription.CAS = dto.CAS; }
      if (dto.IsApproved.HasValue) { prescription.IsApproved = dto.IsApproved.Value; }
      if (dto.IsMF.HasValue) { prescription.IsMF = dto.IsMF.Value; }
      if (dto.IsAmbulatory.HasValue) { prescription.IsAmbulatory = dto.IsAmbulatory.Value; }
      if (dto.IsHospital.HasValue) { prescription.IsHospital = dto.IsHospital.Value; }
      if (dto.IsOther.HasValue) { prescription.IsOther = dto.IsOther.Value; }
      if (dto.IsMFMM.HasValue) { prescription.IsMFMM = dto.IsMFMM.Value; }
      if (dto.PatientId.HasValue)
      {
        PatientModel patient = await dbService.Users
          .OfType<PatientModel>()
          .FirstOrDefaultAsync(p => p.Id == dto.PatientId.Value)
          ?? throw new KeyNotFoundException($"Can't find patient with id={dto.PatientId}"); ;
        prescription.PatientId = dto.PatientId.Value;
        prescription.Patient = patient;
      }
      if (dto.IsSalariat.HasValue) { prescription.IsSalariat = dto.IsSalariat.Value; }
      if (dto.IsCoasigurat.HasValue) { prescription.IsCoasigurat = dto.IsCoasigurat.Value; }
      if (dto.IsLiberProfesionist.HasValue) { prescription.IsLiberProfesionist = dto.IsLiberProfesionist.Value; }
      if (dto.IsCopil.HasValue) { prescription.IsCopil = dto.IsCopil.Value; }
      if (dto.IsStudent.HasValue) { prescription.IsStudent = dto.IsStudent.Value; }
      if (dto.IsGravida.HasValue) { prescription.IsGravida = dto.IsGravida.Value; }
      if (dto.IsPensionar.HasValue) { prescription.IsPensionar = dto.IsPensionar.Value; }
      if (dto.IsVeteran.HasValue) { prescription.IsVeteran = dto.IsVeteran.Value; }
      if (dto.IsLowIncome.HasValue) { prescription.IsLowIncome = dto.IsLowIncome.Value; }
      if (dto.IsRevolutionar.HasValue) { prescription.IsRevolutionar = dto.IsRevolutionar.Value; }
      if (dto.IsHandicap.HasValue) { prescription.IsHandicap = dto.IsHandicap.Value; }
      if (dto.PNS != null) { prescription.PNS = dto.PNS; }
      if (dto.IsAjutorSocial.HasValue) { prescription.IsAjutorSocial = dto.IsAjutorSocial.Value; }
      if (dto.IsSomaj.HasValue) { prescription.IsSomaj = dto.IsSomaj.Value; }
      if (dto.IsPersonalContractual.HasValue) { prescription.IsPersonalContractual = dto.IsPersonalContractual.Value; }
      if (dto.IsCardEuropean.HasValue) { prescription.IsCardEuropean = dto.IsCardEuropean.Value; }
      if (dto.IsAcorduriInternationale.HasValue) { prescription.IsAcorduriInternationale = dto.IsAcorduriInternationale.Value; }
      if (dto.IsOtherCategories != null) { prescription.IsOtherCategories = dto.IsOtherCategories; }
      if (dto.Diagnostic != null) { prescription.Diagnostic = dto.Diagnostic; }
      if (dto.DaysNumber.HasValue) { prescription.DaysNumber = dto.DaysNumber.Value; }
      if (dto.MedicationId.HasValue)
      {
        prescription.Records.Clear();
        
        MedicationModel med = await dbService.Meds
          .FindAsync(dto.MedicationId.Value)
          ?? throw new KeyNotFoundException($"Can't find medication with id={dto.MedicationId.Value}"); ;

        prescription.Records.Add(new()
        {
          MID = dto.MedicationId.Value,
          Meds = med,
          Prescriptions = prescription
        });
      }
    }

    public async Task DeleteAsync(Guid id)
    {
      PrescriptionModel prescription = await GetOneAsync(id);

      dbService.Remove(prescription);
      await dbService.SaveChangesAsync();
    }
  }
}
