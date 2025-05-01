using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class MedicationService(DbService dbService)
  {
    public async Task<MedicationModel> GetOneAsync(Guid id)
    {
      return await dbService.Meds.FindAsync(id)
        ?? throw new KeyNotFoundException();
    }

    public MedicationModel[] Search(string query)
    {
      return dbService.Meds.Where(m =>
        new string[] {
          m.Name,
          m.Brand ?? ""
        }.Any(s =>
          s.Contains(query, StringComparison.CurrentCultureIgnoreCase)
        )
      ).ToArray();
    }

    public async Task CreateAsync(MedicationCreateDto dto)
    {
      await dbService.Meds.AddAsync(new()
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
        Records = []
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
