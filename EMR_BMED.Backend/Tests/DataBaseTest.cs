using Xunit;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;
using Microsoft.Extensions.Options;

namespace EMR_BMED.Backend.Tests
{
 public class DataBaseTest
  {
    public DataBaseTest()
    {
      using (var context = new DbService(true))
      {
        context.Database.EnsureCreated();
        context.Database.EnsureDeleted();
      }
    }

    [Fact]
    public void SeedTestData()
    {
      DbService.SeedTestData(true);

      using (var context = new DbService(true))
      {
        var bPatients = context.Users.OfType<PatientModel>().Count();
        var bDoctors = context.Users.OfType<DoctorModel>().Count();

        DbService.SeedTestData(true);

        var aPatients = context.Users.OfType<PatientModel>().Count();
        var aDoctors = context.Users.OfType<DoctorModel>().Count();

        Assert.True(aPatients > bPatients, "Number of patients has been modified");
        Assert.True(aDoctors > bDoctors, "Number of patients has been modified");
      }
    }
    [Fact]
    public void AddPatientsTest()
    {
      using (var context = new DbService(true))
      {
        var initialCount = context.Users.OfType<PatientModel>().Count();
        var email = "alexjon@gmail.com";
        var password = "12345";


        var newPatient = new PatientModel
        {
          Name = "Ale",
          Surname = "Jon",
          Email = email,
          Password = BCrypt.Net.BCrypt.HashPassword(password),
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
        context.SaveChanges();

        var patientCount = context.Users.OfType<PatientModel>().Count();
        Assert.Equal(initialCount+1, patientCount);

      }
    }

    [Fact]
    public void updateDoctorsTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var doctor = context.Users.OfType<DoctorModel>()
                                  .FirstOrDefault();
        if (doctor == null)
        {
          Assert.True(false, "Doctor not found");
        }
        else
        {
          doctor.Address = "Strada Victoriei,Nr.11";
        }
        context.SaveChanges();
      }

      using (var context = new DbService(true))
      {
        var doctor = context.Users.OfType<DoctorModel>()
                                  .FirstOrDefault();
        if (doctor == null)
        {
          Assert.True(false, "Doctor not found");
        }
        else
        {
          Assert.Equal("Strada Victoriei,Nr.11", doctor.Address);
        }
      }
    }
    [Fact]
    public void deletePatientTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var patient = context.Users.OfType<PatientModel>()
                                   .FirstOrDefault();
        Assert.NotNull(patient);
        var contextBDelete = context.Users.OfType<PatientModel>().Count();


        context.Users.Remove(patient);
        context.SaveChanges();

        var contextADelete = context.Users.OfType<PatientModel>().Count();
        Assert.True(contextADelete < contextBDelete, "Patient was not deleted");
      }
    }
    [Fact]
    public void UserSeparationTest()
    {
      DbService.SeedTestData(true);

      using (var context = new DbService(true))
      {
        var allUsers = context.Users.ToList();
        var patients = context.Users.OfType<PatientModel>().ToList();
        var doctors = context.Users.OfType<DoctorModel>().ToList();

        Assert.NotEmpty(patients);
        Assert.NotEmpty(doctors);
        Assert.Equal(allUsers.Count, patients.Count + doctors.Count);
      }
    }
    [Fact]
    public void PrescriptionPatientTest()
    {
      DbService.SeedTestData(true);
      using (var context = new DbService(true))
      {
        var patient = context.Users.OfType<PatientModel>()
                                   .FirstOrDefault();
        var doctor = context.Users.OfType<DoctorModel>()
                                  .FirstOrDefault();
        if (patient == null || doctor == null)
        {
          Assert.True(false, "Patient or doctor not found");
        }
        else
        {
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
          context.SaveChanges();
        }
      }
      using (var context = new DbService(true))
      {
        var patientPress = context.Users.OfType<PatientModel>()
                                        .Include(p => p.Prescriptions)
                                        .FirstOrDefault();
        Assert.NotNull(patientPress);
        Assert.True(patientPress.Prescriptions.Any(), "Patient has prescriptions");
      }
    }
  }
}
