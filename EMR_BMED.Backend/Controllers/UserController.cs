using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using EMR_BMED.Backend.Exceptions;
using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Utils;

namespace EMR_BMED.Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UserController(UserService userService) : ControllerBase
  {
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOne([FromRoute] Guid id)
    {
      try
      {
        return Ok(await userService.GetOneAsync(id));
      }
      catch (UserNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
    }

    [HttpGet("search/{query}")]
    public IActionResult SearchPatients([FromRoute] string query)
    {
      return Ok(userService.SearchPatients(query));
    }

    [Authorize]
    [HttpPut("patient/{id}")]
    public async Task<IActionResult> Update(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromRoute] Guid id, [FromBody] PatientUpdateDto dto)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);
      if (myId != id)
      {
        return Forbid();
      }

      try
      {
        await userService.UpdateAsync(id, dto);
        return Ok();
      }
      catch (UserNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (EmailIsTakenException ex)
      {
        return Conflict(new { email = ex.Message });
      }
    }

    [Authorize]
    [HttpPut("doctor/{id}")]
    public async Task<IActionResult> Update(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromRoute] Guid id, [FromBody] DoctorUpdateDto dto)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);
      if (myId != id)
      {
        return Forbid();
      }

      try
      {
        await userService.UpdateAsync(id, dto);
        return Ok();
      }
      catch (UserNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (EmailIsTakenException ex)
      {
        return Conflict(new { email = ex.Message });
      }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromRoute] Guid id)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);
      if (myId != id)
      {
        return Forbid();
      }

      try
      {
        await userService.DeleteAsync(id);
        return NoContent();
      }
      catch (UserNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
    }
  }
}
