using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class DbService : DbContext
  {
    public DbSet<AccountModel> Accounts { get; set; }

    public static void SeedTestData()
    {
      using DbService dbService = new();
      if (!dbService.Database.EnsureCreated())
      {
        return;
      }
      dbService.Add(new AccountModel(
        "M1841",
        BCrypt.Net.BCrypt.HashPassword("1234")
      ));
      dbService.Add(new AccountModel(
        "admin",
        BCrypt.Net.BCrypt.HashPassword("0000")
      ));
      dbService.SaveChanges();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      => optionsBuilder.UseInMemoryDatabase("EMR_BMED");
  }
}
