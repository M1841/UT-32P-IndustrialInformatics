using Xunit;

using IIProj.Exceptions;
using IIProj.Models;
using IIProj.Services;

namespace IIProj.Tests;

public class AuthTests
{
  [Theory]
  [InlineData("m1841", "1234")]
  [InlineData("admin", "0000")]
  public void ValidUserWelcome(string username, string password)
  {
    AuthService authService = new();

    LoginDTO credentials = new(username, password);
    string message = authService.HandleLogin(credentials);

    Assert.Equal($"Welcome {username}!", message);
  }

  [Fact]
  public void UserNotFound()
  {
    AuthService authService = new();

    LoginDTO credentials = new("some_user_not_in_db", "");

    Assert.Throws<UserNotFoundException>(
      () => authService.HandleLogin(credentials));
  }
}
