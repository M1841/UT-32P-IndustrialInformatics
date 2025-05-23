using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMR_BMED.Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropTable(
                name: "PrescriptionRecordModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meds",
                table: "Meds");

            migrationBuilder.RenameTable(
                name: "Meds",
                newName: "Medication");

            migrationBuilder.RenameIndex(
                name: "IX_Meds_Name",
                table: "Medication",
                newName: "IX_Medication_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Meds_Method",
                table: "Medication",
                newName: "IX_Medication_Method");

            migrationBuilder.RenameIndex(
                name: "IX_Meds_Form",
                table: "Medication",
                newName: "IX_Medication_Form");

            migrationBuilder.AddColumn<Guid>(
                name: "DoctorModel",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PatientModel",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PrescriptionModel",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medication",
                table: "Medication",
                column: "ID");

            migrationBuilder.CreateTable(
                name: "PrescriptionRecord",
                columns: table => new
                {
                    MedicationID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PrescriptionsGlobalID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PrescriptionsSeriesID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PrescriptionsNumberID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrescriptionRecord", x => new { x.MedicationID, x.PrescriptionsGlobalID, x.PrescriptionsSeriesID, x.PrescriptionsNumberID });
                    table.ForeignKey(
                        name: "FK_PrescriptionRecord_Medication_MedicationID",
                        column: x => x.MedicationID,
                        principalTable: "Medication",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PrescriptionRecord_Prescriptions_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                        columns: x => new { x.PrescriptionsGlobalID, x.PrescriptionsSeriesID, x.PrescriptionsNumberID },
                        principalTable: "Prescriptions",
                        principalColumns: new[] { "PID", "Series", "Number" });
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionRecord_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                table: "PrescriptionRecord",
                columns: new[] { "PrescriptionsGlobalID", "PrescriptionsSeriesID", "PrescriptionsNumberID" });

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropTable(
                name: "PrescriptionRecord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medication",
                table: "Medication");

            migrationBuilder.DropColumn(
                name: "DoctorModel",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "PatientModel",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "PrescriptionModel",
                table: "Prescriptions");

            migrationBuilder.RenameTable(
                name: "Medication",
                newName: "Meds");

            migrationBuilder.RenameIndex(
                name: "IX_Medication_Name",
                table: "Meds",
                newName: "IX_Meds_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Medication_Method",
                table: "Meds",
                newName: "IX_Meds_Method");

            migrationBuilder.RenameIndex(
                name: "IX_Medication_Form",
                table: "Meds",
                newName: "IX_Meds_Form");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meds",
                table: "Meds",
                column: "ID");

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
                name: "IX_PrescriptionRecordModel_MID",
                table: "PrescriptionRecordModel",
                column: "MID");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
