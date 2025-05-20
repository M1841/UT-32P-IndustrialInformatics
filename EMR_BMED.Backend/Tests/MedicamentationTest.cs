using Xunit;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace EMR_BMED.Backend.Tests
{
  public class MedicamentationTest : IDisposable
  {
    public MedicamentationTest()
    {
      using var context = new DbService(true);
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();
    }

    public void Dispose()
    {
      using var context = new DbService(true);
      context.Database.EnsureDeleted();
    }

    [Fact]
    public async Task AddMedicationsTestAsync()
    {
      await using var context = new DbService(true);
      var initialCount = await context.Meds.CountAsync();

      var newMedication = new MedicationModel
      {
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(newMedication);
      await context.SaveChangesAsync();

      var finalCount = await context.Meds.CountAsync();
      Assert.True(finalCount > initialCount, "Number of medications has not increased");
    }

    [Fact]
    public async Task GetMedicationsTestAsync()
    {
      await using var context = new DbService(true);
      var initialCount = await context.Meds.CountAsync();

      var newMedication = new MedicationModel
      {
        Name = "Ibuprofen",
        Form = "Capsule",
        Method = "Oral",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(newMedication);
      await context.SaveChangesAsync();

      var finalCount = await context.Meds.CountAsync();
      Assert.True(finalCount > initialCount, "Number of medications has not increased");
    }

    [Fact]
    public async Task SearchMedicationsTestAsync()
    {
      await using var context = new DbService(true);
      var med1 = new MedicationModel
      {
        ID = Guid.NewGuid(),
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        Brand = "Mayer",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      var med2 = new MedicationModel
      {
        ID = Guid.NewGuid(),
        Name = "Paracetamol",
        Form = "Tablet",
        Method = "Oral",
        Brand = "Mayer",
        IsPresRequired = true,
        Records = new List<PrescriptionRecordModel>()
      };
      await context.Meds.AddRangeAsync(med1, med2);
      await context.SaveChangesAsync();

      var medicationService = new MedicationService(context);
      var searchResult = medicationService.Search("Asp");

      Assert.Single(searchResult);
      Assert.Contains(searchResult, m => m.ID == med1.ID);
    }

    [Fact]
    public async Task UpdateMedicationsTestAsync()
    {
      DbService.SeedTestData(true);
      await using var context = new DbService(true);

      var med = await context.Meds.FirstOrDefaultAsync();
      if (med == null)
        throw new Exception("No medications found in the database.");

      var newName = "AspirinPlus";
      med.Name = newName;
      await context.SaveChangesAsync();

      var updatedMed = await context.Meds.FirstOrDefaultAsync(m => m.ID == med.ID);
      Assert.NotNull(updatedMed);
      Assert.Equal(newName, updatedMed.Name);
    }

    [Fact]
    public async Task DeleteMedicationsTestAsync()
    {
      await using var context = new DbService(true);

      var med = new MedicationModel
      {
        ID = Guid.NewGuid(),
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        Brand = "Mayer",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(med);
      await context.SaveChangesAsync();
      var initialCount = await context.Meds.CountAsync();

      context.Meds.Remove(med);
      await context.SaveChangesAsync();
      var finalCount = await context.Meds.CountAsync();

      Assert.Equal(initialCount - 1, finalCount);
    }

    [Fact]
    public async Task GetOneMedicationsTestAsync()
    {
      await using var context = new DbService(true);

      var med = new MedicationModel
      {
        ID = Guid.NewGuid(),
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        Brand = "Mayer",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(med);
      await context.SaveChangesAsync();

      var medicationService = new MedicationService(context);
      var retrievedMed = await medicationService.GetOneAsync(med.ID);

      Assert.NotNull(retrievedMed);
      Assert.Equal(med.Name, retrievedMed.Name);
    }

    [Fact]
    public async Task GetOneMedicationsNotFoundTestAsync()
    {
      await using var context = new DbService(true);
      var medicationService = new MedicationService(context);

      await Assert.ThrowsAsync<KeyNotFoundException>(async () =>
          await medicationService.GetOneAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task GetAllMedicationsTestAsync()
    {
      await using var context = new DbService(true);
      var medicationService = new MedicationService(context);

      // GetAllMedications is synchronous
      var medications = medicationService.GetAllMedications();

      Assert.NotNull(medications);
      Assert.IsType<List<MedicationModel>>(medications);
    }
  }
}
