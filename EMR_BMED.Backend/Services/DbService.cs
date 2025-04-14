using Microsoft.EntityFrameworkCore;

using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Services
{
  public class DbService : DbContext
  {
    public DbSet<UserModel> Users { get; set; }
    public DbSet<PrescriptionModel> Prescriptions { get; set; }
    public DbSet<MedicationModel> Meds { get; set; }
    // here you can add more tables based on whatever models you want

    public static void SeedTestData(bool IsTestDb)
    {
      using DbService dbService = new(IsTestDb);

      dbService.Add(new PatientModel
      {
        Name = "John",
        Surname = "Doe",
        Email = "jdoe@email.com",
        Password = BCrypt.Net.BCrypt.HashPassword("1234"),
        Gender = "Male",
        Citizenship = "Belgian",
        SocialNumber = "72902960001",
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
    {
      if (_isTestDb)
      {
        optionsBuilder.UseInMemoryDatabase("EMR_BMED.test");
      }
      else
      {
        // optionsBuilder.UseSqlite("DataSource=EMR_BMED.sqlite");
        optionsBuilder.UseSqlServer("Server=localhost;Database=EMR_BMED;Trusted_Connection=True;Encrypt=False");
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<UserModel>()
        .HasDiscriminator<bool>("IsDoctor")
        .HasValue<PatientModel>(false)
        .HasValue<DoctorModel>(true);

      modelBuilder.Entity<PrescriptionModel>()
        .HasMany(p => p.Records)
        //.HasMany(p => p.Meds)
        .WithMany(m => m.Prescriptions)
        .UsingEntity("PrescriptionRecords");

      modelBuilder.Entity<PrescriptionModel>()
          .HasOne(pr => pr.Patient)
          .WithMany(pt => pt.Prescriptions)
          .HasForeignKey(pr => pr.PatientId)
          .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<PrescriptionModel>()
          .HasOne(p => p.Doctor)
          .WithMany(d => d.Prescriptions)
          .HasForeignKey(p => p.DoctorId)
          .OnDelete(DeleteBehavior.NoAction);
    }

    public DbService() : base() { }
    public DbService(bool IsTestDb) : base()
    {
      _isTestDb = IsTestDb;
    }

    private readonly bool _isTestDb = false;
  }
}
