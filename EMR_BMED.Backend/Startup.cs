using EMR_BMED.Backend.Services;

namespace EMR_BMED.Backend
{
  internal class Startup(IConfiguration configuration)
  {
    public IConfiguration Configuration { get; } = configuration;

    public static void ConfigureServices(IServiceCollection services)
    {
      // Add services here:
      // services.AddScoped<SomeService>();

      services.AddScoped<DbService>();
      services.AddScoped<AuthService>();

      services.AddControllers();
    }
    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();
      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      DbService.InitPlaceholderData();
    }
  }
}
