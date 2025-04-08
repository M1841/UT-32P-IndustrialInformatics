using Xunit;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using EMR_BMED.Backend.Utils;

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
      LoginDto credentials = new("unregistered_account", "");

      await Assert.ThrowsAsync<UserNotFoundException>(
        () => authService.LoginAsync(credentials));
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
