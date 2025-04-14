using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMR_BMED.Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropTable(
                name: "PrescriptionRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Dosage",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Expires",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Instructions",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsAfterMeal",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Prescriptions");

            migrationBuilder.RenameColumn(
                name: "DoctorId",
                table: "Prescriptions",
                newName: "Number");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Prescriptions",
                newName: "Series");

            migrationBuilder.AddColumn<string>(
                name: "Citizenship",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialNumber",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Verified",
                table: "Users",
                type: "bit",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Issued",
                table: "Prescriptions",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddColumn<Guid>(
                name: "PID",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CAS",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CUI",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DaysNumber",
                table: "Prescriptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Diagnostic",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "DoctorModelId",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAcorduriInternationale",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAjutorSocial",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAmbulatory",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCardEuropean",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCoasigurat",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCopil",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsGravida",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsHandicap",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsHospital",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsLiberProfesionist",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsLowIncome",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMF",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMFMM",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOther",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IsOtherCategories",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPensionar",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPersonalContractual",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRevolutionar",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSalariat",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSomaj",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsStudent",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsVeteran",
                table: "Prescriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MedUnit",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PNS",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions",
                columns: new[] { "PID", "Series", "Number" });

            migrationBuilder.CreateTable(
                name: "PrescriptionRecordModel",
                columns: table => new
                {
                    PID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PIDSeries = table.Column<Guid>(name: "PID Series", type: "uniqueidentifier", nullable: false),
                    PIDNumber = table.Column<Guid>(name: "PID Number", type: "uniqueidentifier", nullable: false),
                    MID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrescriptionRecordModel", x => new { x.PID, x.PIDSeries, x.PIDNumber, x.MID });
                    table.ForeignKey(
                        name: "FK_PrescriptionRecordModel_Meds_MID",
                        column: x => x.MID,
                        principalTable: "Meds",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrescriptionRecordModel_Prescriptions_PID_PID Series_PID Number",
                        columns: x => new { x.PID, x.PIDSeries, x.PIDNumber },
                        principalTable: "Prescriptions",
                        principalColumns: new[] { "PID", "Series", "Number" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_DoctorModelId",
                table: "Prescriptions",
                column: "DoctorModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionRecordModel_MID",
                table: "PrescriptionRecordModel",
                column: "MID");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorModelId",
                table: "Prescriptions",
                column: "DoctorModelId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.DropTable(
                name: "PrescriptionRecordModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Citizenship",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SocialNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Verified",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PID",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "CAS",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "CUI",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "DaysNumber",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Diagnostic",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsAcorduriInternationale",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsAjutorSocial",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsAmbulatory",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsCardEuropean",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsCoasigurat",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsCopil",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsGravida",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsHandicap",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsHospital",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsLiberProfesionist",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsLowIncome",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsMF",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsMFMM",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsOther",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsOtherCategories",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsPensionar",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsPersonalContractual",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsRevolutionar",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsSalariat",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsSomaj",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsStudent",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "IsVeteran",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "MedUnit",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "PNS",
                table: "Prescriptions");

            migrationBuilder.RenameColumn(
                name: "Number",
                table: "Prescriptions",
                newName: "DoctorId");

            migrationBuilder.RenameColumn(
                name: "Series",
                table: "Prescriptions",
                newName: "Id");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Issued",
                table: "Prescriptions",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Dosage",
                table: "Prescriptions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Prescriptions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Expires",
                table: "Prescriptions",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Instructions",
                table: "Prescriptions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAfterMeal",
                table: "Prescriptions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Prescriptions",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prescriptions",
                table: "Prescriptions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "PrescriptionRecords",
                columns: table => new
                {
                    MedsID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PrescriptionsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrescriptionRecords", x => new { x.MedsID, x.PrescriptionsId });
                    table.ForeignKey(
                        name: "FK_PrescriptionRecords_Meds_MedsID",
                        column: x => x.MedsID,
                        principalTable: "Meds",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrescriptionRecords_Prescriptions_PrescriptionsId",
                        column: x => x.PrescriptionsId,
                        principalTable: "Prescriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_DoctorId",
                table: "Prescriptions",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionRecords_PrescriptionsId",
                table: "PrescriptionRecords",
                column: "PrescriptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
