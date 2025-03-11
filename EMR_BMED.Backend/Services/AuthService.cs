using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Utils;
using BCrypt.Net;

namespace EMR_BMED.Backend.Services
{
  public class AuthService(DbService dbService)
  {
    public async Task<string> LoginAsync(LoginDTO credentials)
    {
      AccountModel account = await dbService.Accounts
        .FirstOrDefaultAsync(
          user => user.Username == credentials.Username)
        ?? throw new UserNotFoundException();

      if (!BCrypt.Net.BCrypt.Verify(credentials.Password, account.Password))
      {
        throw new IncorrectPasswordException();
      }

      return TokenUtils.GenerateToken(account.Username);
    }
  }
}
