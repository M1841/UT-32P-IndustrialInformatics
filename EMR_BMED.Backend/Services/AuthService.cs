using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Utils;
using BCrypt.Net;

namespace EMR_BMED.Backend.Services
{
  public class AuthService(DbService dbService)
  {
    public async Task<string> LoginAsync(LoginDto credentials)
    {
      UserModel user = await dbService.Users
        .FirstOrDefaultAsync(
          user => user.Email == credentials.Email)
        ?? throw new UserNotFoundException();

      if (!BCrypt.Net.BCrypt.Verify(credentials.Password, user.Password))
      {
        throw new IncorrectPasswordException();
      }

      return TokenUtils.GenerateToken(user.Id);
    }

    public async Task RegisterAsync(UserModel userData)
    {
      if (dbService.Users.Any(u => u.Email == userData.Email))
      {
        throw new EmailIsTakenException();
      }

      userData.Password = BCrypt.Net.BCrypt.HashPassword(userData.Password);

      await dbService.Users.AddAsync(userData);
      await dbService.SaveChangesAsync();
    }

    public async Task<UserModel> WhoAmI(string authHeader)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid id = TokenUtils.ExtractId(token);
      UserModel user = await dbService.Users.FirstOrDefaultAsync(
        user => user.Id == id
      ) ?? throw new UserNotFoundException();
      return user;
    }
  }
}
