using Xunit;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Exceptions;

namespace EMR_BMED.Backend.Tests
{
  public class AuthTest
  {
    [Theory]
    [InlineData("M1841", "1234")]
    [InlineData("admin", "0000")]
    public async void SuccessfulLogin(string username, string password)
    {
      LoginDTO credentials = new(username, password);
      string message = await authService.LoginAsync(credentials);

      Assert.Equal($"Welcome {username}!", message);
    }

    [Fact]
    public async void UserNotFound()
    {
      LoginDTO credentials = new("unregistered_user", "");

      await Assert.ThrowsAsync<UserNotFoundException>(
        () => authService.LoginAsync(credentials));
    }

    public AuthTest()
    {
      dbService = new();
      authService = new AuthService(dbService);
      DbService.SeedTestData();
    }

    private readonly DbService dbService;
    private readonly AuthService authService;
  }
}
