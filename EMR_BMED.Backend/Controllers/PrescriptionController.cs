using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using EMR_BMED.Backend.Models;
using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Utils;

namespace EMR_BMED.Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PrescriptionsController(PrescriptionService prescriptionService) : ControllerBase
  {
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOne(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromRoute] Guid id)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);

      try
      {
        PrescriptionModel prescription = await prescriptionService.GetOneAsync(id);
        if (myId != prescription.PatientId && myId != prescription.DoctorId)
        {
          return Forbid();
        }
        return Ok(prescription);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpGet("patient/{id}")]
    public async Task<IActionResult> GetAllByPatient(
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
        PrescriptionModel[] prescriptions = await prescriptionService
          .GetAllByPatientAsync(id);
        return Ok(prescriptions);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpGet("doctor/{id}")]
    public async Task<IActionResult> GetAllByDoctor(
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
        PrescriptionModel[] prescriptions = await prescriptionService
          .GetAllByDoctorAsync(id);
        return Ok(prescriptions);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromBody] PrescriptionCreateDto dto)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);
      if (myId != dto.DoctrorId)
      {
        return Forbid();
      }

      try
      {
        await prescriptionService.CreateAsync(dto);
        return Ok();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
      [FromHeader(Name = "Authorization")] string authHeader,
      [FromRoute] Guid id, [FromBody] PrescriptionUpdateDto dto)
    {
      string token = authHeader.Split(' ').LastOrDefault()!;
      Guid myId = TokenUtils.ExtractId(token);
      PrescriptionModel prescription = await prescriptionService.GetOneAsync(id);
      if (myId != prescription.DoctorId)
      {
        return Forbid();
      }

      try
      {
        await prescriptionService.UpdateAsync(id, dto);
        return Ok();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
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
      PrescriptionModel prescription = await prescriptionService.GetOneAsync(id);
      if (myId != prescription.DoctorId)
      {
        return Forbid();
      }

      try
      {
        await prescriptionService.DeleteAsync(id);
        return Ok();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
    }
  }
}
