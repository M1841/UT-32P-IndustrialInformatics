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
    public Guid GlobalID { get; set; } // global id assigned by our EMR's system
    [Key]
    [Column("Series")]
    public Guid SeriesID { get; set; } // Seria
    [Key]
    [Column("Number")]
    public Guid NumberID { get; set; } // Numar

    // medical unit data
    public required string MedUnit { get; set; }
    public required string CUI { get; set; }
    public required string CAS { get; set; }
    public Boolean? IsApproved { get; set; }
    public Boolean? IsMF { get; set; }
    public Boolean? IsAmbulatory { get; set; }
    public Boolean? IsHospital { get; set; }
    public Boolean? IsOther { get; set; }
    public Boolean? IsMFMM { get; set; }

    // patient data
    [ForeignKey("PatientModel")]
    public required Guid PatientId {  get; set; }
    public required PatientModel Patient { get; set; }
    // the above must have Name, Surname, CNP, Birthday, Gender, Citizenship

    // user occupations here
    public Boolean? IsSalariat { get; set; }
    public Boolean? IsCoasigurat { get; set; }
    public Boolean? IsLiberProfesionist { get; set; }
    public Boolean? IsCopil { get; set; }  // <18 years old
    public Boolean? IsStudent { get; set; } // 18-26 years old
    public Boolean? IsGravida { get; set; }
    public Boolean? IsPensionar { get; set; }
    public Boolean? IsVeteran { get; set; }
    public Boolean? IsLowIncome { get; set; }
    public Boolean? IsRevolutionar { get; set; }
    public Boolean? IsHandicap { get; set; }
    public string? PNS { get; set; }
    public Boolean? IsAjutorSocial { get; set; }
    public Boolean? IsSomaj { get; set; }
    public Boolean? IsPersonalContractual { get; set; }
    public Boolean? IsCardEuropean { get; set; }
    public Boolean? IsAcorduriInternationale { get; set; }
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
    public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
    // ^ for the connection between prescriptions and meds
  }
}
