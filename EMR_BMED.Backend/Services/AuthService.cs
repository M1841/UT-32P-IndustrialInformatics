using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EMR_BMED.Backend.Services
{
  public class AuthService(DbService dbService)
  {
    public async Task<string> Login(LoginDTO credentials)
    {
      var user = await dbService.Users
        .FirstOrDefaultAsync(
          user => user.Username == credentials.Username)
        ?? throw new UserNotFoundException();

      if (user.Password != credentials.Password)
      {
        throw new IncorrectPasswordException();
      }

      return $"Welcome {user.Username}!";
    }
  }
}
