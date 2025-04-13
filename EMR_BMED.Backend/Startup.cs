using Microsoft.AspNetCore.Authentication.JwtBearer;

using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Utils;

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

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = TokenUtils.Parameters;
        });
      services.AddAuthorization();

      services.AddCors(options =>
      {
        options.AddDefaultPolicy(policy =>
        {
          policy.WithOrigins(Environment.GetEnvironmentVariable("FRONTEND_URL")!)
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
      });

      services.AddControllers();
    }
    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();
      app.UseCors();
      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      // DbService.SeedTestData(false);
    }
  }
}
