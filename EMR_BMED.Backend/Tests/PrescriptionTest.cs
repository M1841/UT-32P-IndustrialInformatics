using Xunit;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;
using Microsoft.Extensions.Options;
using System.Numerics;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EMR_BMED.Backend.Tests
{
  public class PrescriptionTest : IDisposable
  {
    public PrescriptionTest()
    {
      using (var context = new DbService(true))
      {
        context.Database.EnsureCreated();
        context.Database.EnsureDeleted();
      }
    }

    public void Dispose()
    {
      using (var context = new DbService(true))
      {
        context.Database.EnsureDeleted();
      }
    }

    [Fact]
    public async Task AddPrescriptionTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var patient = await context.Users.OfType<PatientModel>().FirstOrDefaultAsync();
        var doctor = await context.Users.OfType<DoctorModel>().FirstOrDefaultAsync();
        var initialCount = await context.Prescriptions.CountAsync();

        if (doctor == null || patient == null)
        {
          throw new Exception("Doctor or patient not found");
        }

        var prescription = new PrescriptionModel
        {
          PatientId = patient.Id,
          Patient = patient,
          DoctorId = doctor.Id,
          Doctor = doctor,
          Diagnostic = "Flu",
          Issued = DateTime.Now,
          DaysNumber = 7,
          CAS = "123456789",
          CUI = "987654321",
          MedUnit = "Hospital",
          Records = new List<PrescriptionRecordModel>()
        };
        context.Add(prescription);
        await context.SaveChangesAsync();

        var updatedCount = await context.Prescriptions.CountAsync();
        Assert.True(updatedCount > initialCount, "Prescription was not added");
      }
    }

    [Fact]
    public async Task UpdatePrescriptionTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var prescription = await context.Prescriptions.OfType<PrescriptionModel>().FirstAsync();

        var newDiagnostic = "Flu1";
        prescription.Diagnostic = newDiagnostic;
        await context.SaveChangesAsync();

        var updated = await context.Prescriptions
                     .FirstOrDefaultAsync(p => p.GlobalID == prescription.GlobalID);

        Assert.NotNull(updated);
        Assert.Equal(newDiagnostic, updated.Diagnostic);
      }
    }

    [Fact]
    public async Task DeletePrescriptionTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var prescription = await context.Prescriptions.OfType<PrescriptionModel>().FirstOrDefaultAsync();
        var initialCount = await context.Prescriptions.CountAsync();

        context.Remove(prescription);
        await context.SaveChangesAsync();

        var updatedCount = await context.Prescriptions.CountAsync();
        Assert.True(updatedCount < initialCount, "Prescription was not deleted");
      }
    }

    [Fact]
    public async Task GetPrescriptionTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var prescription = await context.Prescriptions.OfType<PrescriptionModel>().FirstOrDefaultAsync();
        if (prescription == null)
        {
          throw new Exception("Prescription not found");
        }

        var retrieved = await context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .FirstOrDefaultAsync(p => p.GlobalID == prescription.GlobalID);

        Assert.NotNull(retrieved);
        Assert.Equal(prescription.GlobalID, retrieved.GlobalID);
      }
    }

    [Fact]
    public async Task GetAllPrescriptionsTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var count = await context.Prescriptions.CountAsync();
        var retrieved = await context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .ToListAsync();

        Assert.Equal(count, retrieved.Count);
      }
    }

    [Fact]
    public async Task GetPrescriptionsByDoctorTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var doctor = await context.Users.OfType<DoctorModel>().FirstOrDefaultAsync();
        if (doctor == null)
          throw new Exception("Doctor not found");

        var expected = await context.Prescriptions
            .Where(p => p.DoctorId == doctor.Id)
            .CountAsync();

        var retrieved = await context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .Where(p => p.DoctorId == doctor.Id)
            .ToListAsync();

        Assert.Equal(expected, retrieved.Count);
      }
    }

    [Fact]
    public async Task GetPrescriptionsByPatientTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var patient = await context.Users.OfType<PatientModel>().FirstOrDefaultAsync();
        if (patient == null)
          throw new Exception("Patient not found");

        var expected = await context.Prescriptions
                                     .Where(p => p.PatientId == patient.Id)
                                      .CountAsync();

        var retrieved = await context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .Where(p => p.PatientId == patient.Id)
            .ToListAsync();

        Assert.Equal(expected, retrieved.Count);
      }
    }

    [Fact]
    public async Task GetPrescriptionByIdWithMedicationsTest()
    {
      DbService.SeedTestData(true);
      await using (var context = new DbService(true))
      {
        var prescription = await context.Prescriptions
                                        .FirstAsync();

        if (prescription == null)
          throw new Exception("Prescription not found");

        var retrievedPrescription = await context.Prescriptions
                                                 .Include(p => p.Patient)
                                                 .Include(p => p.Doctor)
                                                 .Include(p => p.Records)
                                                 .ThenInclude(r => r.Meds)
            .FirstOrDefaultAsync(p => p.GlobalID == prescription.GlobalID);

        Assert.NotNull(retrievedPrescription);
        Assert.Equal(prescription.GlobalID, retrievedPrescription.GlobalID);
        
        Assert.All(retrievedPrescription.Records, r => Assert.NotNull(r.Meds));
      }
    }
  }
}
