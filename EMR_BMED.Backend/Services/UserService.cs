using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class UserService(DbService dbService)
  {
    public async Task<UserModel> GetOneAsync(Guid id)
    {
      UserModel user = await dbService.Users
        .FirstOrDefaultAsync(
          user => user.Id == id)
        ?? throw new KeyNotFoundException($"Can't find user with id={id}");

      return user;
    }

    public PatientModel[] SearchPatients(string query)
    {
      PatientModel[] patients = dbService.Users
        .OfType<PatientModel>()
        .AsEnumerable()
        .Where(patient =>
          new string[] {
            patient.Email,
            patient.Name,
            patient.Surname,
            patient.SocialNumber,
          }.Any(s =>
            s.Contains(query, StringComparison.CurrentCultureIgnoreCase)
          )
        ).Take(50)
        .ToArray();

      return patients;
    }

    public IEnumerable<PatientModel> GetAllPatients()
    {
      return dbService.Users.OfType<PatientModel>().ToList();
    }

    public async Task UpdateAsync(Guid id, PatientUpdateDto dto)
    {
      PatientModel user = (PatientModel)await UpdateGenericAsync(id, dto);

      if (dto.SocialNumber != null) { user.SocialNumber = dto.SocialNumber; }
      if (dto.Citizenship != null) { user.Citizenship = dto.Citizenship; }
      if (dto.Allergies != null) { user.Allergies = dto.Allergies; }
      if (dto.Intolerances != null) { user.Intolerances = dto.Intolerances; }
      if (dto.Conditions != null) { user.Conditions = dto.Conditions; }
      if (dto.Blood != null) { user.Blood = dto.Blood; }

      await dbService.SaveChangesAsync();
    }

    public async Task UpdateAsync(Guid id, DoctorUpdateDto dto)
    {
      DoctorModel user = (DoctorModel)await UpdateGenericAsync(id, dto);

      if (dto.Address != null) { user.Address = dto.Address; }
      if (dto.MedicalField != null) { user.MedicalField = dto.MedicalField; }

      await dbService.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
      UserModel user = await GetOneAsync(id);

      dbService.Remove(user);
      await dbService.SaveChangesAsync();
    }

    private async Task<UserModel> UpdateGenericAsync(Guid id, UserUpdateDto dto)
    {
      UserModel user = await GetOneAsync(id);

      if (dto.Password != null) { user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password); }
      if (dto.Email != null)
      {
        if (dbService.Users.Any(u => u.Email == dto.Email))
        {
          throw new EmailIsTakenException();
        }
        user.Email = dto.Email;
      }
      if (dto.Surname != null) { user.Surname = dto.Surname; }
      if (dto.Name != null) { user.Name = dto.Name; }
      if (dto.Gender != null) { user.Gender = dto.Gender; }
      if (dto.IsVerified != null) { user.IsVerified = dto.IsVerified; }
      if (dto.Phone != null) { user.Phone = dto.Phone; }

      return user;
    }
  }
}
