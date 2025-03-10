using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class DbService : DbContext
  {
    public DbSet<UserModel> Users { get; set; }

    public static void InitPlaceholderData()
    {
      using DbService db = new();
      if (!db.Database.EnsureCreated())
      {
        return;
      }
      db.Add(new UserModel("M1841", "1234"));
      db.Add(new UserModel("admin", "0000"));
      db.SaveChanges();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      => optionsBuilder.UseInMemoryDatabase("EMR_BMED");
  }
}
