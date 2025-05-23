using Xunit;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace EMR_BMED.Backend.Tests
{
  public class DataBaseTest : IDisposable
  {
    public DataBaseTest()
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
    public async Task SeedDataTestAsync()
    {
      DbService.SeedTestData(true);
      await using var context = new DbService(true);

      var bPatients = await context.Users.OfType<PatientModel>().CountAsync();
      var bDoctors = await context.Users.OfType<DoctorModel>().CountAsync();

      DbService.SeedTestData(true);

      var aPatients = await context.Users.OfType<PatientModel>().CountAsync();
      var aDoctors = await context.Users.OfType<DoctorModel>().CountAsync();

      Assert.True(aPatients > bPatients, "Number of patients has not increased");
      Assert.True(aDoctors > bDoctors, "Number of doctors has not increased");
    }

    [Fact]
    public async Task AddPatientsTestAsync()
    {
      DbService.SeedTestData(true);
      await using var context = new DbService(true);

      var initialCount = await context.Users.OfType<PatientModel>().CountAsync();
      var passwordHash = BCrypt.Net.BCrypt.HashPassword("12345");

      var newPatient = new PatientModel
      {
        Name = "Ale",
        Surname = "Jon",
        Email = "alexjon@gmail.com",
        Password = passwordHash,
        Gender = "M",
        Citizenship = "romanian",
        SocialNumber = "13243332",
        Birthday = DateOnly.ParseExact("12.02.2003", "dd.MM.yyyy"),
        Phone = "03344343",
        Allergies = "None",
        Intolerances = "None",
        Conditions = "None",
        Blood = "A2"
      };
      context.Add(newPatient);
      await context.SaveChangesAsync();

      var patientCount = await context.Users.OfType<PatientModel>().CountAsync();
      Assert.True(patientCount > initialCount, "Patient was not added");
    }

    [Fact]
    public async Task UpdateDoctorsTestAsync()
    {
      DbService.SeedTestData(true);
      await using (var context = new DbService(true))
      {
        var doctor = await context.Users.OfType<DoctorModel>().FirstOrDefaultAsync();
        Assert.NotNull(doctor);

        doctor.Address = "Strada Victoriei,Nr.11";
        await context.SaveChangesAsync();
      }

      await using (var context = new DbService(true))
      {
        var doctor = await context.Users.OfType<DoctorModel>().FirstOrDefaultAsync();
        Assert.NotNull(doctor);
        Assert.Equal("Strada Victoriei,Nr.11", doctor.Address);
      }
    }

    [Fact]
    public async Task DeletePatientTestAsync()
    {
      DbService.SeedTestData(true);
      await using var context = new DbService(true);

      var patient = await context.Users.OfType<PatientModel>().FirstOrDefaultAsync();
      Assert.NotNull(patient);

      var beforeCount = await context.Users.OfType<PatientModel>().CountAsync();
      context.Users.Remove(patient);
      await context.SaveChangesAsync();

      var afterCount = await context.Users.OfType<PatientModel>().CountAsync();
      Assert.True(afterCount < beforeCount, "Patient was not deleted");
    }

    [Fact]
    public async Task UserSeparationTestAsync()
    {
      DbService.SeedTestData(true);
      await using var context = new DbService(true);

      var allUsers = await context.Users.ToListAsync();
      var patients = await context.Users.OfType<PatientModel>().ToListAsync();
      var doctors = await context.Users.OfType<DoctorModel>().ToListAsync();

      Assert.NotEmpty(patients);
      Assert.NotEmpty(doctors);
      Assert.Equal(allUsers.Count, patients.Count + doctors.Count);
    }

    [Fact]
    public async Task PrescriptionPatientTestAsync()
    {
      DbService.SeedTestData(true);
      await using (var context = new DbService(true))
      {
        var patient = await context.Users.OfType<PatientModel>().FirstOrDefaultAsync();
        var doctor = await context.Users.OfType<DoctorModel>().FirstOrDefaultAsync();
        Assert.NotNull(patient);
        Assert.NotNull(doctor);

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
          Medication = new List<MedicationModel>()
        };
        context.Add(prescription);
        await context.SaveChangesAsync();
      }

      await using var verifyContext = new DbService(true);
      var patientWithPrescriptions = await verifyContext.Users
          .OfType<PatientModel>()
          .Include(p => p.Prescriptions)
          .FirstOrDefaultAsync();

      Assert.NotNull(patientWithPrescriptions);
      Assert.NotEmpty(patientWithPrescriptions.Prescriptions);
    }
  }
}
