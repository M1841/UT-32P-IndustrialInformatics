using Xunit;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;
using Microsoft.Extensions.Options;

namespace EMR_BMED.Backend.Tests
{
  public class AuthTest
  {
    [Theory]
    [InlineData("jdoe@email.com", "1234")]
    [InlineData("jane.smith@bmed.co", "5678")]
    public async void SuccessfulLogin(string email, string password)
    {
      LoginDto credentials = new(email, password);
      Guid expectedId = (await dbService.Users
        .FirstOrDefaultAsync(u => u.Email == email))!.Id;

      string token = await authService.LoginAsync(credentials);
      Guid actualId = TokenUtils.ExtractId(token);

      Assert.Equal(expectedId, actualId);
    }

    [Fact]
    public async void UserNotFound()
    {
      LoginDto credentials = new("unregistered_account", "123");

      await Assert.ThrowsAsync<UserNotFoundException>(
        () => authService.LoginAsync(credentials));
    }

    [Fact]
    public async Task RegisterAsyncTest()
    {
      var email = "jdo1e@gmail.com";
      var password = "123451";
      var hashedPass = BCrypt.Net.BCrypt.HashPassword(password);
      var userP = new PatientModel
      {
        Id = Guid.NewGuid(),
        Email = email,
        Password = hashedPass,
        Name = "Alex",
        Surname = "Alex",
        Gender = "M",
        Birthday = DateOnly.ParseExact("18.02.2003", "dd.MM.yyyy"),
        Citizenship = "Romanian",
        SocialNumber = "13223443"
      };
      await authService.RegisterAsync(userP);

      var patientFromDb = await dbService.Users.FirstOrDefaultAsync(u => u.Id == userP.Id);
      Assert.NotNull(patientFromDb);
      Assert.NotEqual(password, patientFromDb.Password);
      Assert.True(BCrypt.Net.BCrypt.Verify(hashedPass, patientFromDb.Password), "The hashed password doesn't match the original one!");
    }

    [Fact]
    public async Task DuplicateAccountTest()
    {
      var email = "alexJon@gmail.com";
      var password = "123451";
      var hashedPass = BCrypt.Net.BCrypt.HashPassword(password);

      var user1 = new PatientModel
      {
        Id = Guid.NewGuid(),
        Email = email,
        Password = hashedPass,
        Name = "AlexJon",
        Surname = "Ale1x",
        Gender = "M",
        Birthday = DateOnly.ParseExact("18.02.2003", "dd.MM.yyyy"),
        Citizenship = "Romanian",
        SocialNumber = "432132"
      };

      var user2 = new PatientModel
      {
        Id = Guid.NewGuid(),
        Email = email,
        Password = hashedPass,
        Name = "Alex",
        Surname = "AleJon",
        Gender = "M",
        Birthday = DateOnly.ParseExact("12.04.2006", "dd.MM.yyyy"),
        Citizenship = "Germany",
        SocialNumber = "432132"
      };

      await dbService.Users.AddAsync(user1);
      await dbService.Users.AddAsync(user2);
      await dbService.SaveChangesAsync();

      var token = await authService.LoginAsync(new LoginDto(email, password));
      var tokenUserID = TokenUtils.ExtractId(token);

      Assert.True(tokenUserID == user1.Id || tokenUserID == user2.Id, "Token needs to correspond to one of the accounts!");
    }

    [Fact]
    public async Task WhoAmITest()
    {
      var userID = Guid.NewGuid();
      var email = "jdoe@gmail.com";
      var password = "123451";
      var hashedPass = BCrypt.Net.BCrypt.HashPassword(password);

      var resultedUser = new PatientModel
      {
        Id = Guid.NewGuid(),
        Email = email,
        Password = hashedPass,
        Name = "Alex",
        Surname = "Alex",
        Gender = "M",
        Birthday = DateOnly.ParseExact("18.02.2003", "dd.MM.yyyy"),
        Citizenship = "Romanian",
        SocialNumber = "13223443"
      };

      var exists = await dbService.Users.AnyAsync(u => u.Id == userID);
      if (!exists)
      {
        await dbService.Users.AddAsync(resultedUser);
        await dbService.SaveChangesAsync();
      }

      var token = await authService.LoginAsync(new LoginDto(email, password));
      string authHeader = $"Bearer {token}";

      var actualUser = await authService.WhoAmI(authHeader);

      Assert.NotNull(actualUser);
      Assert.Equal(resultedUser.Id, actualUser.Id);
      Assert.Equal(resultedUser.Email, actualUser.Email);
      Assert.Equal(resultedUser.Name, actualUser.Name);
      Assert.Equal(resultedUser.Surname, actualUser.Surname);
    }

    public AuthTest()
    {
      Environment.SetEnvironmentVariable(
        "JWT_SECRET", "12345678901234567890123456789012");
      dbService = new(true);
      authService = new AuthService(dbService);
      DbService.SeedTestData(true);
    }

    private readonly DbService dbService;
    private readonly AuthService authService;
  }
}
