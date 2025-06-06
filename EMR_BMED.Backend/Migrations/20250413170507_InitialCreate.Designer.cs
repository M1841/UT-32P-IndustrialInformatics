﻿// <auto-generated />
using System;
using EMR_BMED.Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EMR_BMED.Backend.Migrations
{
    [DbContext(typeof(DbService))]
    [Migration("20250413170507_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EMR_BMED.Backend.Models.MedicationModel", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Contraindications")
                        .HasColumnType("text");

                    b.Property<string>("Form")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Indications")
                        .HasColumnType("text");

                    b.Property<bool>("IsPresRequired")
                        .HasColumnType("bit")
                        .HasColumnName("Requires_Prescription");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SideEffects")
                        .HasColumnType("text");

                    b.Property<string>("Storing")
                        .HasColumnType("text");

                    b.Property<string>("Warnings")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("Form");

                    b.HasIndex("Method");

                    b.HasIndex("Name");

                    b.ToTable("Meds");
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.PrescriptionModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DoctorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Dosage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("Expires")
                        .HasColumnType("date");

                    b.Property<string>("Instructions")
                        .HasColumnType("text");

                    b.Property<bool>("IsAfterMeal")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Issued")
                        .HasColumnType("date");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<Guid>("PatientId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.HasIndex("Issued");

                    b.HasIndex("PatientId");

                    b.ToTable("Prescriptions");
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.UserModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("Birthday")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.Property<bool>("IsDoctor")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Name");

                    b.HasIndex("Surname");

                    b.ToTable("Users");

                    b.HasDiscriminator<bool>("IsDoctor");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("PrescriptionRecords", b =>
                {
                    b.Property<Guid>("MedsID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PrescriptionsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("MedsID", "PrescriptionsId");

                    b.HasIndex("PrescriptionsId");

                    b.ToTable("PrescriptionRecords");
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.DoctorModel", b =>
                {
                    b.HasBaseType("EMR_BMED.Backend.Models.UserModel");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("MedicalField")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue(true);
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.PatientModel", b =>
                {
                    b.HasBaseType("EMR_BMED.Backend.Models.UserModel");

                    b.Property<string>("Allergies")
                        .HasColumnType("text");

                    b.Property<string>("Blood")
                        .HasColumnType("char(3)");

                    b.Property<string>("Conditions")
                        .HasColumnType("text");

                    b.Property<string>("Intolerances")
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue(false);
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.PrescriptionModel", b =>
                {
                    b.HasOne("EMR_BMED.Backend.Models.DoctorModel", "Doctor")
                        .WithMany("Prescriptions")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("EMR_BMED.Backend.Models.PatientModel", "Patient")
                        .WithMany("Prescriptions")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Doctor");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PrescriptionRecords", b =>
                {
                    b.HasOne("EMR_BMED.Backend.Models.MedicationModel", null)
                        .WithMany()
                        .HasForeignKey("MedsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EMR_BMED.Backend.Models.PrescriptionModel", null)
                        .WithMany()
                        .HasForeignKey("PrescriptionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.DoctorModel", b =>
                {
                    b.Navigation("Prescriptions");
                });

            modelBuilder.Entity("EMR_BMED.Backend.Models.PatientModel", b =>
                {
                    b.Navigation("Prescriptions");
                });
#pragma warning restore 612, 618
        }
    }
}
