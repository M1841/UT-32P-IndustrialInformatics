using Microsoft.AspNetCore.Mvc;

using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Utils;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace EMR_BMED.Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController(AuthService authService) : ControllerBase
  {
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO credentials)
    {
      try
      {
        string token = await authService.LoginAsync(credentials);
        return Ok(new { token });
      }
      catch (UserNotFoundException)
      {
        return NotFound(new { username = $"User doesn't exist" });
      }
      catch (IncorrectPasswordException)
      {
        return Unauthorized(new { password = "Password is incorrect" });
      }
    }

    // Temporary
    [Authorize]
    [HttpGet("whoami")]
    public IActionResult WhoAmI([FromHeader(Name = "Authorization")] string authHeader)
    {
      try
      {
        string token = authHeader.Split(' ').LastOrDefault()!;
        string username = TokenUtils.ExtractUsername(token);
        return Ok(new { username });
      }
      catch (SecurityTokenMalformedException)
      {
        return BadRequest(new { message = "Access token is malformed" });
      }
    }
  }
}
