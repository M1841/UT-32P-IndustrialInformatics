using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMR_BMED.Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionRecord_Prescriptions_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                table: "PrescriptionRecord");

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionRecord_Prescriptions_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                table: "PrescriptionRecord",
                columns: new[] { "PrescriptionsGlobalID", "PrescriptionsSeriesID", "PrescriptionsNumberID" },
                principalTable: "Prescriptions",
                principalColumns: new[] { "PID", "Series", "Number" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionRecord_Prescriptions_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                table: "PrescriptionRecord");

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionRecord_Prescriptions_PrescriptionsGlobalID_PrescriptionsSeriesID_PrescriptionsNumberID",
                table: "PrescriptionRecord",
                columns: new[] { "PrescriptionsGlobalID", "PrescriptionsSeriesID", "PrescriptionsNumberID" },
                principalTable: "Prescriptions",
                principalColumns: new[] { "PID", "Series", "Number" });
        }
    }
}
