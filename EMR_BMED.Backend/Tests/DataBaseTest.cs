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
        var patients = context.Patients.ToList();
        var doctors = context.Doctors.ToList();

        var singlePatient = Assert.Single(patients);
        Assert.Equal("John", singlePatient.Name);

        var singleDoctor = Assert.Single(doctors);
        Assert.Equal("Jane", singleDoctor.Name);

      }
    }
    [Fact]
    public void AddPatientsTest()
    {
      using (var context = new DbService(true))
      {
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
      }
    }
  }
}
