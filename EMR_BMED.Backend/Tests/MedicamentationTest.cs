using Xunit;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;
namespace EMR_BMED.Backend.Tests;

public class MedicamentationTest
{
  public MedicamentationTest()
  {
    using (var context = new DbService(true))
    {
      context.Database.EnsureCreated();
      context.Database.EnsureDeleted();
      MedicationService medicationService = new MedicationService(context);
    }
  }

  [Fact]
  public void AddMedicationsTest()
  {
    using (var context = new DbService(true))
    {
      var initialCount = context.Meds.Count();
      var newMedication = new MedicationModel
      {
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(newMedication);
      context.SaveChanges();
      var finalCount = context.Meds.Count();
      Assert.True(finalCount > initialCount, "Number of medications has been modified");
    }
  }
  [Fact]
  public void GetMedicationsTest()
  {
    using (var context = new DbService(true))
    {
      var initialCount = context.Meds.Count();
      var newMedication = new MedicationModel
      {
        Name = "Aspirin",
        Form = "Tablet",
        Method = "Oral",
        IsPresRequired = false,
        Records = new List<PrescriptionRecordModel>()
      };
      context.Meds.Add(newMedication);
      context.SaveChanges();
      var finalCount = context.Meds.Count();
      Assert.True(finalCount > initialCount, "Number of medications has been modified");
    }
  }
  [Fact]
  public void SearchMedicationsTest()
  {
    using (var context = new DbService(true))
    {
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
        Name = "Paracetabol",
        Form = "Tablet",
        Method = "Oral",
        Brand = "Mayer",
        IsPresRequired = true,
        Records = new List<PrescriptionRecordModel>()
      };

      context.Meds.AddRange(med1, med2);
      context.SaveChanges();

      MedicationService medicationService = new MedicationService(context);

      var searchResult = medicationService.Search("Asp");
      
      Assert.Single(searchResult);
      Assert.Contains(searchResult, m => m.ID == med1.ID);

    }
  }
  [Fact]
  public void UpdateMedicationsTest()
  {
    DbService.SeedTestData(true);   
    using (var context = new DbService(true))
    {
      // var med = context.Meds.FirstOrDefault();
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
      context.SaveChanges();

      if (med == null)
      {
        throw new Exception("No medications found in the database.");
      }
      else
      {
        var initialName = med.Name;
        var newName = "Asprin1";
        med.Name = newName;
        context.SaveChanges();

        var updatedMed = context.Meds.FirstOrDefault(m => m.ID == med.ID);
        
        Assert.NotNull(updatedMed);
        Assert.Equal(newName, updatedMed.Name);
      }
    }
  }
  [Fact]
  public void DeleteMedicationsTest()
  {
    using (var context = new DbService(true))
    {
      //Ask Mihai why it doesn't have db service
      //var med = context.Meds.OfType<MedicationModel>().FirstOrDefault();
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
      context.SaveChanges();
      var initialCount = context.Meds.Count();

      context.Meds.Remove(med);
      context.SaveChanges();
      var finalCount = context.Meds.Count();

      Assert.Equal(initialCount - 1, finalCount);
    }
   }

  [Fact]
  public void GetOneMedicationsTest()
  {
    using (var context = new DbService(true))
    {
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
      context.SaveChanges();
      var medicationService = new MedicationService(context);
      var retrievedMed = medicationService.GetOneAsync(med.ID).Result;
      Assert.NotNull(retrievedMed);
      Assert.Equal(med.Name, retrievedMed.Name);
    }
  }
  [Fact]
  public void GetOneMedicationsNotFoundTest()
  {
    using (var context = new DbService(true))
    {
      var medicationService = new MedicationService(context);
      Assert.ThrowsAsync<KeyNotFoundException>(async () => await medicationService.GetOneAsync(Guid.NewGuid()));
    }
  }
  [Fact]
  public void GetAllMedicationsTest()
  {
    using (var context = new DbService(true))
    {
      var medicationService = new MedicationService(context);
      var medications = medicationService.GetAllMedications();
      Assert.NotNull(medications);
      Assert.IsType<List<MedicationModel>>(medications);
    }
  }
 
}

