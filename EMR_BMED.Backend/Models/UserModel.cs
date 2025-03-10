namespace EMR_BMED.Backend.Models
{
  public class UserModel(string username, string password)
  {
    public Guid Id { get; set; }
    public string Username { get; set; } = username;
    public string Password { get; set; } = password;
  }
}
