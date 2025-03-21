namespace EMR_BMED.Backend.Models
{
  public record LoginDTO(
    string Email,
    string Password
  )
  { }

  public record TokensDTO(
    string AccessToken,
    string RefreshToken
  )
  { }
}
