///
/// version 2.0
/// Authors: Emma, Mihai
///

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMR_BMED.Backend.Models
{
  /// <summary>
  /// Represents the pacient / normal user. Not representative of a doctor user
  /// </summary>
  /// 
  public class PatientModel : UserModel
  {
    [Column(TypeName = "text")]
    public required string SocialNumber { get; set; } // in Romania, CNP

    [Column(TypeName = "text")]
    public required string Citizenship { get; set; }

    [Column(TypeName = "text")]
    public string? Allergies { get; set; }

    [Column(TypeName = "text")]
    public string? Intolerances { get; set; }

    // TODO: possibly automatically update conditions based on doctor's prescription
    [Column(TypeName = "text")]
    public string? Conditions { get; set; }

    // TODO: not yet sure if this should be nullable or required for setting up the account
    [Column(TypeName = "char(3)")]
    public string? Blood { get; set; }
  }

  public class DoctorModel : UserModel
  {
    [Column(TypeName = "text")]
    public string? Address { get; set; }

    [Column(TypeName = "text")]
    public required string MedicalField { get; set; }
  }

  [Index(nameof(Email), IsUnique = true)]
  [Index(nameof(Surname))]
  [Index(nameof(Name))]
  public abstract class UserModel
  {
    // global identification in our database
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    // authentication info
    public required string Password { get; set; }

    [Column(TypeName = "varchar(50)")]
    public required string Email { get; set; }

    // required fields
    [Column(TypeName = "nvarchar(50)")]
    public required string Surname { get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public required string Name { get; set; }

    [Column(TypeName = "nvarchar(10)")]
    public required string Gender { get; set; }

    [Column(TypeName = "date")]
    public required DateOnly Birthday { get; set; }

    // optional fields
    [Column("Verified")]
    public bool? IsVerified { get; set; }
    [Column(TypeName = "nvarchar(25)")]
    public string? Phone { get; set; }

    // to allow for foreign keys in other tables
    public ICollection<PrescriptionModel> Prescriptions { get; set; } = [];
  }

  public record UserUpdateDto
  {
    public string? Password;
    public string? Email;
    public string? Surname;
    public string? Name;
    public string? Gender;
    public bool? IsVerified;
    public string? Phone;
  }

  public record DoctorUpdateDto : UserUpdateDto
  {
    public string? Address;
    public string? MedicalField;
  }

  public record PatientUpdateDto : UserUpdateDto
  {
    public string? SocialNumber;
    public string? Citizenship;
    public string? Allergies;
    public string? Intolerances;
    public string? Conditions;
    public string? Blood;
  }
}
