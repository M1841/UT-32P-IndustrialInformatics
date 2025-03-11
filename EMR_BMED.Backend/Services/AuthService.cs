using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

      if (account.Password != credentials.Password)
      {
        throw new IncorrectPasswordException();
      }

      return GenerateToken(account.Username);
    }

    private string GenerateToken(string username)
    {
      Claim[] claims = [
        new (JwtRegisteredClaimNames.Sub, username),
        new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      ];

      SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes("EVo2@bvz^9NEt$3J78x43TPWD&AvHz%#"));
      SigningCredentials credentials = new(key, SecurityAlgorithms.HmacSha256);

      JwtSecurityToken token = new(
        issuer: "localhost:8080",
        audience: "localhost:4200",
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: credentials
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
