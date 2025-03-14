///
/// version 1.0
/// Author: Emma
/// Contains all the models for medication and prescriptions. 
///

using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMR_BMED.Backend.Models
{
  [Index(nameof(Name)), Index(nameof(Method)), Index(nameof(Form)), ]
  public class MedicationModel
  {
    // identification
    [Key]
    [Column("MID")]
    public Guid ID { get; set; }

    // 
    public required string Name { get; set; }
    // Form refers to the way the medication comes is (pill, injection, etc.)
    // TODO: find a better name for it lol
    [Column(TypeName = "nvarchar(100)")]
    [DisplayName("Dosage_Form")]
    public required string Form { get; set; }
    // Method refers to the way the medication is supposed to be taken (oral, intravenous, etc.)
    [Column(TypeName = "nvarchar(100)")]
    [DisplayName("Administration_Method")]
    public required string Method { get; set; }
    [Column("Requires_Prescription")]
    public required Boolean IsPresRequired { get; set; }

    // optional fields
    [Column(TypeName = "nvarchar(50)")]
    public string? Brand { get; set; }
    [Column(TypeName = "text")]
    public string? Indications { get; set; }
    [Column(TypeName = "text")]
    public string? Contraindications { get; set; }
    [Column(TypeName = "text")]
    public string? SideEffects { get; set; }
    [Column(TypeName = "text")]
    public string? Warnings { get; set; }
    [Column(TypeName = "text")]
    public string? Storing { get; set; }

    // for foreign keys (the references to the other tables)
    public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
  }


  //[PrimaryKey("PID", "DID", "UID")]
  [Index(nameof(Issued))]
  public class PrescriptionModel
  {
    // identification
    // is it necessary to make this into a composite key?
    [Key]
    [Column("PID")]
    public Guid ID { get; set; }
    [ForeignKey("DoctorModel")]
    public required int DID { get; set; }
    [ForeignKey("UserModel")]
    public required int UID { get; set; }

    // required fields
    [Column(TypeName = "text")]
    public required string Dosage { get; set; }
    // length for how long should this medication be taken / how long is the prescription valid
    // TODO: decide on this or if it needs multiple fields
    [Column(TypeName = "text")]
    public required string Duration { get; set; }
    [Column(TypeName = "date")]
    public required DateTime Issued { get; set; } // should be automatically generated from frontend
    [Column(TypeName = "bit")]
    public required Boolean IsAfterMeal { get; set; }

    // optional fields
    [Column(TypeName = "text")]
    public string? Instructions { get; set; }
    [Column(TypeName = "date")]
    public DateTime? Expires { get; set; } // calculated based on Duration or input by doctor or left empty (?)
    [Column(TypeName = "text")]
    public string? Notes { get; set; }

    // for foreign keys (the references to the other tables)
    public virtual required DoctorModel Doctor { get; set; }
    public virtual required UserModel User { get; set; }
    public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
  }



  /// <summary>
  /// Intermediary table between the Prescriptions and Meds, Users and Doctors
  /// </summary>
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
