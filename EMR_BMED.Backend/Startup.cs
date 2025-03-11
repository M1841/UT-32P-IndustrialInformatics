using System.Text;
using EMR_BMED.Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace EMR_BMED.Backend
{
  internal class Startup(IConfiguration configuration)
  {
    public IConfiguration Configuration { get; } = configuration;

    public static void ConfigureServices(IServiceCollection services)
    {
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "localhost:8080",
            ValidAudience = "localhost:4200",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EVo2@bvz^9NEt$3J78x43TPWD&AvHz%#"))
          };
        });
      services.AddAuthorization();

      services.AddCors(options =>
      {
        options.AddDefaultPolicy(policy =>
        {
          policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
      });

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
