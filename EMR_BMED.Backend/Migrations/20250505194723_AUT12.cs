using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMR_BMED.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AUT12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "DoctorModelId",
                table: "Prescriptions");

            migrationBuilder.AddColumn<Guid>(
                name: "DoctorId",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_DoctorId",
                table: "Prescriptions",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Users_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_DoctorId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Prescriptions");

            migrationBuilder.AddColumn<Guid>(
                name: "DoctorModelId",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_DoctorModelId",
                table: "Prescriptions",
                column: "DoctorModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Users_DoctorModelId",
                table: "Prescriptions",
                column: "DoctorModelId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
