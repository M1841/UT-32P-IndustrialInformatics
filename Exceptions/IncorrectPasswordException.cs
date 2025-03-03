namespace IIProj.Exceptions;

public class IncorrectPasswordException : Exception
{
  public override string Message { get; } = "Password is incorrect";
}
