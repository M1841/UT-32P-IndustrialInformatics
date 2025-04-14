using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMR_BMED.Backend.Models {
  /// <summary>
  /// Intermediary table between the Prescriptions and Meds, Users and Doctors
  /// </summary>
  [Keyless]
  public class PrescriptionRecordModel {
    [ForeignKey("PrescriptionModel")]
    public required int PID { get; set; }
    [ForeignKey("MedicationModel")]
    public required int MID { get; set; }


    // for foreign keys (the references to the other tables)
    public virtual required MedicationModel Meds { get; set; }
    public virtual required PrescriptionModel Prescriptions { get; set; }
  }
}
