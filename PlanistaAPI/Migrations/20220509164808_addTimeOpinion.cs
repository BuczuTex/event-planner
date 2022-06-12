using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanistaAPI.Migrations
{
    public partial class addTimeOpinion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "add_date",
                table: "opinions",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "add_date",
                table: "opinions");
        }
    }
}
