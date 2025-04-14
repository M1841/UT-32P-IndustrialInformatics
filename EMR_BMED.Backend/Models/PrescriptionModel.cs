using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMR_BMED.Backend.Models
{
  //[PrimaryKey("PID", "DID", "UID")]
  [Index(nameof(Issued))]
  public class PrescriptionModel
  {
    // identification
    // is it necessary to make this into a composite key?
    [Key]
    public Guid Id { get; set; }
    [ForeignKey(nameof(DoctorModel))]
    public required Guid DoctorId { get; set; }
    [ForeignKey(nameof(PatientModel))]
    public required Guid PatientId { get; set; }

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
    public required bool IsAfterMeal { get; set; }

    // optional fields
    [Column(TypeName = "text")]
    public string? Instructions { get; set; }
    [Column(TypeName = "date")]
    public DateTime? Expires { get; set; } // calculated based on Duration or input by doctor or left empty (?)
    [Column(TypeName = "text")]
    public string? Notes { get; set; }

    // for foreign keys (the references to the other tables)
    public virtual required DoctorModel Doctor { get; set; }
    public virtual required PatientModel Patient { get; set; }
    // public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
    public virtual required ICollection<MedicationModel> Meds { get; set; }
  }
}
