using Microsoft.EntityFrameworkCore;
using System.Web;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class MedicationService(DbService dbService)
  {
    public async Task<MedicationModel> GetOneAsync(Guid id)
    {
      return await dbService.Medication.FindAsync(id)
        ?? throw new KeyNotFoundException($"Can't find medication with id={id}");
    }

    public MedicationModel[] Search(string query)
    {
      var pattern = $"%{query}%";

      return dbService.Medication
        .AsEnumerable()
        .Where(m =>
          new string[] {
            m.Name,
            m.Brand ?? ""
          }.Any(s =>
            s.Contains(
              HttpUtility.UrlDecode(query), 
              StringComparison.CurrentCultureIgnoreCase)
          )
        ).Take(50)
        .OrderBy(m => m.Name)
        .ToArray();
    }

    public IEnumerable<MedicationModel> GetAllMedications()
    {
      return dbService.Medication.ToList();
    }

    public async Task CreateAsync(MedicationCreateDto dto)
    {
      await dbService.Medication.AddAsync(new()
      {
        Name = dto.Name,
        Form = dto.Form,
        Method = dto.Method,
        IsPresRequired = dto.IsPresRequired,
        Brand = dto.Brand,
        Indications = dto.Indications,
        Contraindications = dto.Contraindications,
        SideEffects = dto.SideEffects,
        Warnings = dto.Warnings,
        Storing = dto.Storing,
      });

      await dbService.SaveChangesAsync();
    }

    public async Task UpdateAsync(Guid id, MedicationUpdateDto dto)
    {
      MedicationModel med = await GetOneAsync(id);

      if (dto.Name != null) { med.Name = dto.Name; }
      if (dto.Form != null) { med.Form = dto.Form; }
      if (dto.Method != null) { med.Method = dto.Method; }
      if (dto.IsPresRequired.HasValue) { med.IsPresRequired = dto.IsPresRequired.Value; }
      if (dto.Brand != null) { med.Brand = dto.Brand; }
      if (dto.Indications != null) { med.Indications = dto.Indications; }
      if (dto.Contraindications != null) { med.Contraindications = dto.Contraindications; }
      if (dto.SideEffects != null) { med.SideEffects = dto.SideEffects; }
      if (dto.Warnings != null) { med.Warnings = dto.Warnings; }
      if (dto.Storing != null) { med.Storing = dto.Storing; }

      await dbService.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
      MedicationModel med = await GetOneAsync(id);

      dbService.Remove(med);
      await dbService.SaveChangesAsync();
    }
  }
}
