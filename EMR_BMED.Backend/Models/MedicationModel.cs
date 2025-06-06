using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace EMR_BMED.Backend.Models
{
  [Index(nameof(Name)), Index(nameof(Method)), Index(nameof(Form)),]
  public class MedicationModel
  {
    // identification
    [Key]
    public Guid ID { get; set; } = Guid.NewGuid();

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
    public required bool IsPresRequired { get; set; }

    // optional fields
    [Column(TypeName = "nvarchar(100)")]
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
    // public virtual required ICollection<PrescriptionRecordModel> Records { get; set; }
    [JsonIgnore]
    public ICollection<PrescriptionModel> Prescriptions { get; set; } = [];
  }

  public record MedicationCreateDto(
    string Name,
    string Form,
    string Method,
    bool IsPresRequired,
    string? Brand,
    string? Indications,
    string? Contraindications,
    string? SideEffects,
    string? Warnings,
    string? Storing
  )
  { }

  public record MedicationUpdateDto(
    string? Name,
    string? Form,
    string? Method,
    bool? IsPresRequired,
    string? Brand,
    string? Indications,
    string? Contraindications,
    string? SideEffects,
    string? Warnings,
    string? Storing
  )
  { }
}
