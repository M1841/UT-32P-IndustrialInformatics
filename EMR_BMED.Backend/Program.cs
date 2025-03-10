namespace EMR_BMED.Backend
{
  internal static class Program
  {
    static void Main()
    {
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
