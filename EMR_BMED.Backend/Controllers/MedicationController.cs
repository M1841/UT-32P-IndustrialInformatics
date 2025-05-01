using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;

namespace EMR_BMED.Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MedicationsController(MedicationService medicationService) : ControllerBase
  {
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOne([FromRoute] Guid id)
    {
      try
      {
        MedicationModel medication = await medicationService.GetOneAsync(id);
        return Ok(medication);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpGet("search/{query}")]
    public IActionResult Search([FromRoute] string query)
    {
      MedicationModel[] medications = medicationService.Search(query);
      return Ok(medications);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MedicationCreateDto dto)
    {
      await medicationService.CreateAsync(dto);
      return Ok();
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] MedicationUpdateDto dto)
    {
      try
      {
        await medicationService.UpdateAsync(id, dto);
        return Ok();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
      try
      {
        await medicationService.DeleteAsync(id);
        return Ok();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }
  }
}
