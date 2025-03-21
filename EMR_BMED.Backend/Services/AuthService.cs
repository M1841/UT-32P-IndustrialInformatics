using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Utils;

namespace EMR_BMED.Backend.Services
{
  public class AuthService(DbService dbService)
  {
    public async Task<string> LoginAsync(LoginDTO credentials)
    {
      var user = await dbService.Users
        .FirstOrDefaultAsync(
          user => user.Email == credentials.Email)
        ?? throw new UserNotFoundException();

      if (!BCrypt.Net.BCrypt.Verify(credentials.Password, user.Password))
      {
        throw new IncorrectPasswordException();
      }

      return TokenUtils.GenerateToken(user.ID);
    }

    public async Task<UserModel> WhoAmI(string authHeader)
    {
      var token = authHeader.Split(' ').LastOrDefault()!;
      var id = TokenUtils.ExtractId(token);
      var user = await dbService.Users.FirstOrDefaultAsync(
        user => user.ID == id
      ) ?? throw new UserNotFoundException();
      return user;
    }
  }
}
