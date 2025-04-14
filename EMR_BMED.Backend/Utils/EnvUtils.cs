namespace EMR_BMED.Backend.Utils
{
  public static class EnvUtils
  {
    public static void Load()
    {
      string path = Path.Combine(
        Directory.GetCurrentDirectory(),
        ".env"
      );

      if (!File.Exists(path))
      {
        return;
      }

      foreach (string line in File.ReadAllLines(path))
      {
        string[] pair = line.Trim().Split('=');

        if (pair.Length != 2)
        {
          continue;
        }

        string key = pair[0].Trim();
        string value = pair[1].Trim();

        Environment.SetEnvironmentVariable(key, value);
      }
    }
  }
}
