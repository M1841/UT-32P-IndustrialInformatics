using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class DbService : DbContext
  {
    public DbSet<UserModel> Users { get; set; }
    public DbSet<PrescriptionModel> Prescriptions { get; set; }
    public DbSet<MedicationModel> Meds { get; set; }

    public static void SeedTestData()
    {
      using var dbService = new DbService();
      if (!dbService.Database.EnsureCreated())
      {
        return;
      }
      dbService.Add(new PatientModel
      {
        Name = "John",
        Surname = "Doe",
        Email = "jdoe@email.com",
        Password = BCrypt.Net.BCrypt.HashPassword("1234"),
        Gender = "Male",
        Birthday = new DateOnly(1996, 02, 29),
        Phone = "012346789",
        Allergies = "Nuts",
        Intolerances = "Lactose",
        Conditions = "Asthma",
        Blood = "AB"
      });
      dbService.Add(new DoctorModel
      {
        Name = "Jane",
        Surname = "Smith",
        Email = "jane.smith@bmed.co",
        Password = BCrypt.Net.BCrypt.HashPassword("5678"),
        Gender = "Female",
        Birthday = new DateOnly(1987, 11, 9),
        Phone = "0987654321",
        Address = "22 Hilda Street",
        MedicalField = "Orthopedics"
      });
      dbService.SaveChanges();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      // => optionsBuilder.UseInMemoryDatabase("EMR_BMED");
      => optionsBuilder.UseSqlite("DataSource=EMR_BMED.sqlite");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<UserModel>()
        .HasDiscriminator<bool>("IsDoctor")
        .HasValue<PatientModel>(false)
        .HasValue<DoctorModel>(true);

      modelBuilder.Entity<PrescriptionModel>()
        .HasMany(p => p.Meds)
        .WithMany(m => m.Prescriptions)
        .UsingEntity("PrescriptionRecords");
    }
  }
}
