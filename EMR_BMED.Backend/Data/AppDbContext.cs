///
/// version 1.0
/// Author: Emma
/// This file is the database context for the application
///

using EMR_BMED.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EMR_BMED.Backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // here you can add more tables based on whatever models you want
    public DbSet<UserModel>         Users { get; set; }
    public DbSet<DoctorModel>       Doctors { get; set; }
    public DbSet<MedicationModel>   Meds { get; set; }
    public DbSet<PrescriptionModel> Prescriptions { get; set; }
  }
}
