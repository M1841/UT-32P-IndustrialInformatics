using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMR_BMED.Backend.Models
{
  [PrimaryKey("GlobalID", "SeriesID", "NumberID")] // composite key
  [Index(nameof(Issued))]
  public class PrescriptionModel
  {
    // identification
    [Key]
    [Column("PID")]
    public Guid GlobalID { get; set; } = Guid.NewGuid(); // global id assigned by our EMR's system
    [Key]
    [Column("Series")]
    public Guid SeriesID { get; set; } = Guid.NewGuid(); // Seria
    [Key]
    [Column("Number")]
    public Guid NumberID { get; set; } = Guid.NewGuid(); // Numar

    // medical unit data
    public required string MedUnit { get; set; }
    public required string CUI { get; set; }
    public required string CAS { get; set; }
    public bool? IsApproved { get; set; }
    public bool? IsMF { get; set; }
    public bool? IsAmbulatory { get; set; }
    public bool? IsHospital { get; set; }
    public bool? IsOther { get; set; }
    public bool? IsMFMM { get; set; }

    // user occupations here
    public bool? IsSalariat { get; set; }
    public bool? IsCoasigurat { get; set; }
    public bool? IsLiberProfesionist { get; set; }
    public bool? IsCopil { get; set; }  // <18 years old
    public bool? IsStudent { get; set; } // 18-26 years old
    public bool? IsGravida { get; set; }
    public bool? IsPensionar { get; set; }
    public bool? IsVeteran { get; set; }
    public bool? IsLowIncome { get; set; }
    public bool? IsRevolutionar { get; set; }
    public bool? IsHandicap { get; set; }
    public string? PNS { get; set; }
    public bool? IsAjutorSocial { get; set; }
    public bool? IsSomaj { get; set; }
    public bool? IsPersonalContractual { get; set; }
    public bool? IsCardEuropean { get; set; }
    public bool? IsAcorduriInternationale { get; set; }
    public string? IsOtherCategories { get; set; }

    // diagnostic data
    public required string Diagnostic { get; set; } // Diagnostic code

    // prescription info
    public required DateTime Issued { get; set; }
    public required int DaysNumber { get; set; }

    // validation of prescription (aka doctor signature)
    // TODO: electronic signature needed here - how to?
    // TODO: electronic seal too

    // for foreign keys (the references to the other tables)
    // patient data
    public required Guid PatientId { get; set; }
    // the above must have Name, Surname, CNP, Birthday, Gender, Citizenship
    public required Guid DoctorId { get; set; }

    [ForeignKey(nameof(DoctorModel))]
    public DoctorModel Doctor { get; set; } = null!;
    [ForeignKey(nameof(PatientModel))]
    public PatientModel Patient { get; set; } = null!;
    public ICollection<MedicationModel> Medication { get; set; } = [];
    // public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
    // ^ for the connection between prescriptions and meds
  }

  public record PrescriptionCreateDto(
    string MedUnit,
    string CUI,
    string CAS,
    bool? IsApproved,
    bool? IsMF,
    bool? IsAmbulatory,
    bool? IsHospital,
    bool? IsOther,
    bool? IsMFMM,
    Guid PatientId,
    Guid DoctorId,
    bool? IsSalariat,
    bool? IsCoasigurat,
    bool? IsLiberProfesionist,
    bool? IsCopil,
    bool? IsStudent,
    bool? IsGravida,
    bool? IsPensionar,
    bool? IsVeteran,
    bool? IsLowIncome,
    bool? IsRevolutionar,
    bool? IsHandicap,
    string? PNS,
    bool? IsAjutorSocial,
    bool? IsSomaj,
    bool? IsPersonalContractual,
    bool? IsCardEuropean,
    bool? IsAcorduriInternationale,
    string? IsOtherCategories,
    string Diagnostic,
    int DaysNumber,
    Guid MedicationId
  )
  { }

  public record PrescriptionUpdateDto(
    string? MedUnit,
    string? CUI,
    string? CAS,
    bool? IsApproved,
    bool? IsMF,
    bool? IsAmbulatory,
    bool? IsHospital,
    bool? IsOther,
    bool? IsMFMM,
    Guid? PatientId,
    Guid? DoctorId,
    bool? IsSalariat,
    bool? IsCoasigurat,
    bool? IsLiberProfesionist,
    bool? IsCopil,
    bool? IsStudent,
    bool? IsGravida,
    bool? IsPensionar,
    bool? IsVeteran,
    bool? IsLowIncome,
    bool? IsRevolutionar,
    bool? IsHandicap,
    string? PNS,
    bool? IsAjutorSocial,
    bool? IsSomaj,
    bool? IsPersonalContractual,
    bool? IsCardEuropean,
    bool? IsAcorduriInternationale,
    string? IsOtherCategories,
    string? Diagnostic,
    int? DaysNumber,
    Guid? MedicationId
  )
  { }
}
