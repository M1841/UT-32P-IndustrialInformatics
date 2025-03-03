namespace IIProj.Exceptions;

public class UserNotFoundException : Exception
{
  public override string Message { get; } = "User does not exist";
}
