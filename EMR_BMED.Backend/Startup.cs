using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Services;
using EMR_BMED.Backend.Data;
using EMR_BMED.Backend.Utils;

namespace EMR_BMED.Backend
{
  internal class Startup
  {
    public static IConfiguration Configuration { get; private set; }

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public static void ConfigureServices(IServiceCollection services)
    {
      // Add services here:
      services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString")));

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

      DbService.SeedTestData();
    }
  }
}
