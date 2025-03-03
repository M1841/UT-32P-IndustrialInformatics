using IIProj.Exceptions;
using IIProj.Models;

namespace IIProj.Services;

public class AuthService
{
  public string HandleLogin(LoginDTO credentials)
  {
    var user = _users
      .Where(u => u.Username == credentials.Username)
      .FirstOrDefault()
      ?? throw new UserNotFoundException();

    if (user.Password != credentials.Password)
    {
      throw new IncorrectPasswordException();
    }

    return $"Welcome {user.Username}!";
  }

  public AuthService()
  {
    _users.Add(new("m1841", "1234"));
    _users.Add(new("admin", "0000"));
  }

  private readonly List<LoginDTO> _users = [];
}
