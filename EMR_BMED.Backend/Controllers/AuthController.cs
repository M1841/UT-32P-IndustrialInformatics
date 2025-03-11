using Microsoft.AspNetCore.Mvc;

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
        return NotFound($"User doesn't exist");
      }
      catch (IncorrectPasswordException)
      {
        return Unauthorized("Password is incorrect");
      }
    }
  }
}
