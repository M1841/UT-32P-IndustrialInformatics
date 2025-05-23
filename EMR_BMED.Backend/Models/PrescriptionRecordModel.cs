// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace EMR_BMED.Backend.Models
// {
//   /// <summary>
//   /// Intermediary table between the Prescriptions and Meds, Users and Doctors
//   /// </summary>
//   public class PrescriptionRecordModel
//   {
//     [Key]
//     [ForeignKey("PrescriptionModel")]
//     [Column("PID")]
//     public Guid PID { get; set; } // global id assigned by our EMR's system
//     [Key]
//     [ForeignKey("PrescriptionModel")]
//     [Column("PID Series")]
//     public Guid PIDSeries { get; set; } // Seria
//     [Key]
//     [ForeignKey("PrescriptionModel")]
//     [Column("PID Number")]
//     public Guid PIDNumber { get; set; } // Numar
//     [Key]
//     [ForeignKey("MedicationModel")]
//     public required Guid MID { get; set; }


//     // for foreign keys (the references to the other tables)
//     public virtual required MedicationModel Meds { get; set; }
//     public virtual required PrescriptionModel Prescriptions { get; set; }
//   }
// }
