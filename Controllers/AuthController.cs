using Microsoft.AspNetCore.Mvc;

using IIProj.Models;
using IIProj.Services;

namespace IIProj.Controllers;

[Route("[controller]")]
public class AuthController(AuthService authService) : Controller
{
  [HttpGet("login")]
  public IActionResult LoginPage()
  {
    return View("Login");
  }

  [HttpPost("login")]
  public IActionResult HandleLogin([FromForm] LoginDTO credentials)
  {
    try
    {
      string accessToken = authService.HandleLogin(credentials);
      return Ok(accessToken);
    }
    catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }
}
