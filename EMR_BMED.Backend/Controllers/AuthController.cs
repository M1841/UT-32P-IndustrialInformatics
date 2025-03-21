using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Exceptions;

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
        return NotFound(new { email = $"User doesn't exist" });
      }
      catch (IncorrectPasswordException)
      {
        return Unauthorized(new { password = "Password is incorrect" });
      }
    }

    // Temporary
    [Authorize]
    [HttpGet("whoami")]
    public async Task<IActionResult> WhoAmI([FromHeader(Name = "Authorization")] string authHeader)
    {
      try
      {
        var user = await authService.WhoAmI(authHeader);
        return Ok(new { user.Name, user.Surname });
      }
      catch (UserNotFoundException)
      {
        return NotFound(new { username = $"Access token doesn't belond to a user" });
      }
      catch (SecurityTokenMalformedException)
      {
        return BadRequest(new { message = "Access token is malformed" });
      }
    }
  }
}
