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
    public async Task<IActionResult> Login([FromForm] LoginDTO credentials)
    {
      try
      {
        return Ok(await authService.LoginAsync(credentials));
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
