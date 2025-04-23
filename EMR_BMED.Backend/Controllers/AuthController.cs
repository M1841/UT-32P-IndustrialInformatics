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
    public async Task<IActionResult> Login([FromBody] LoginDto credentials)
    {
      try
      {
        string token = await authService.LoginAsync(credentials);
        return Ok(new { token });
      }
      catch (UserNotFoundException ex)
      {
        return NotFound(new { email = ex.Message });
      }
      catch (IncorrectPasswordException ex)
      {
        return Unauthorized(new { password = ex.Message });
      }
    }

    [HttpPost("register/patient")]
    public async Task<IActionResult> Register([FromBody] PatientModel patientData)
    {
      try
      {
        await authService.RegisterAsync(patientData);
        return Ok();
      }
      catch (EmailIsTakenException ex)
      {
        return Conflict(new { email = ex.Message });
      }
    }

    [HttpPost("register/doctor")]
    public async Task<IActionResult> Register([FromBody] DoctorModel doctorData)
    {
      try
      {
        await authService.RegisterAsync(doctorData);
        return Ok();
      }
      catch (EmailIsTakenException ex)
      {
        return Conflict(new { email = ex.Message });
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
        return NotFound(new { username = $"Access token doesn't belong to a user" });
      }
      catch (SecurityTokenMalformedException ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
  }
}
