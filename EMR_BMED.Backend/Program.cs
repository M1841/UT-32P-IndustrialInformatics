using EMR_BMED.Backend.Utils;

namespace EMR_BMED.Backend
{
  internal static class Program
  {
    static void Main()
    {
      EnvUtils.Load();
      CreateHostBuilder().Build().Run();
    }

    static IHostBuilder CreateHostBuilder() =>
     Host.CreateDefaultBuilder()
      .ConfigureWebHostDefaults(builder =>
      {
        builder.UseStartup<Startup>();
      });
  }
}
