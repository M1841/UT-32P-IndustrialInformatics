using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EMR_BMED.Backend.Utils
{
  public static class TokenUtils
  {
    public static string GenerateToken(Guid id)
    {
      Claim[] claims = [
        new (JwtRegisteredClaimNames.Sub, id.ToString()),
        new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      ];

      JwtSecurityToken token = new(
        issuer: Environment.GetEnvironmentVariable("BACKEND_URL"),
        audience: Environment.GetEnvironmentVariable("FRONTEND_URL"),
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: Credentials
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static Guid ExtractId(string token)
    {
      JwtSecurityTokenHandler handler = new();

      if (handler.ReadToken(token) is JwtSecurityToken jwtToken
        && jwtToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub) is Claim claim
      )
      {
        return Guid.Parse(claim.Value);
      }
      else
      {
        throw new SecurityTokenMalformedException();
      }
    }

    static TokenUtils()
    {
      string jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET")!;

      Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
      Credentials = new(Key, SecurityAlgorithms.HmacSha256);

      Parameters = new()
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("BACKEND_URL"),
        ValidAudience = Environment.GetEnvironmentVariable("FRONTEND_URL"),
        IssuerSigningKey = Key
      };
    }

    public static TokenValidationParameters Parameters { get; }
    private static SecurityKey Key { get; }
    private static SigningCredentials Credentials { get; }
  }
}
