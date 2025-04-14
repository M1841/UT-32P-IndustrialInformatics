namespace EMR_BMED.Backend.Exceptions
{
  public class UserNotFoundException : Exception
  {
    public new string Message { get; init; } = "User doesn't exist";
  }
  public class IncorrectPasswordException : Exception
  {
    public new string Message { get; init; } = "Password is incorrect";
  }
  public class EmailIsTakenException : Exception
  {
    public new string Message { get; init; } = "Email address is taken";
  }
}
