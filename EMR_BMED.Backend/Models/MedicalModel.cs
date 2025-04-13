///
/// version 1.0
/// Author: Emma
/// Contains all the models for medication and prescriptions. 
///

using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Tracing;
using System.Runtime.CompilerServices;

namespace EMR_BMED.Backend.Models
{
  [Index(nameof(CommercialName)), Index(nameof(DCI))] // alternate keys
  public class MedicationModel
  {
    // identification
    [Key]
    [Column("MID")]
    public Guid ID { get; set; } // this will be CIM

    // required fields
    [Column(TypeName = "text")]
    public required string CommercialName { get; set; }
    [Column(TypeName = "text")]
    public required string DCI { get; set; }
    [Column(TypeName = "text")]
    public required string PharmaForm { get; set; } // comprimat, injectie, etc.
    [Column(TypeName = "text")]
    public required string Concentration { get; set; }
    [Column(TypeName = "text")]
    public required string ATC { get; set; } // anatomical therapeutic cemical classification
    [Column(TypeName = "text")]
    public required string RequirePrescription {  get; set; }  // can only be PR, PRF, P6L, PS, OTC etc.
    [Column(TypeName = "text")]
    public required string Availability { get; set; }
    [Column(TypeName = "text")]
    public required string Packaging { get; set; } // because sometimes only the packaging differs
    

    // TODO: add the medical leaflet/prospectus of the medicine over here
    

    // for foreign keys (the references to the other tables)
    public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
  }


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

    // pacient data
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string CNP { get; set; }
    public required DateTime Birthday { get; set; }
    public required Boolean Gender { get; set; }
    public required string Citizenship { get; set; }
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



  /// <summary>
  /// Intermediary table between the Prescriptions and Meds, Users and Doctors
  /// </summary>
  [Keyless]
  public class PrescriptionRecordModel
  {
    [ForeignKey("PrescriptionModel")]
    public required int PID { get; set; }
    [ForeignKey("MedicationModel")]
    public required int MID { get; set; }
    

    // for foreign keys (the references to the other tables)
    public virtual required MedicationModel   Meds { get; set; }
    public virtual required PrescriptionModel Prescriptions { get; set; }
  }
}
