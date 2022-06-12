using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanistaAPI.Migrations
{
    public partial class ProposalForCompanies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_events_addresses_address_id",
                table: "events");

            migrationBuilder.DropForeignKey(
                name: "fk_events_categories_category_id",
                table: "events");

            migrationBuilder.DropForeignKey(
                name: "fk_events_users_user_id",
                table: "events");

            migrationBuilder.AlterColumn<Guid>(
                name: "user_id",
                table: "events",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "category_id",
                table: "events",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "address_id",
                table: "events",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "fk_events_addresses_address_id",
                table: "events",
                column: "address_id",
                principalTable: "addresses",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_events_categories_category_id",
                table: "events",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_events_users_user_id",
                table: "events",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_events_addresses_address_id",
                table: "events");

            migrationBuilder.DropForeignKey(
                name: "fk_events_categories_category_id",
                table: "events");

            migrationBuilder.DropForeignKey(
                name: "fk_events_users_user_id",
                table: "events");

            migrationBuilder.AlterColumn<Guid>(
                name: "user_id",
                table: "events",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "category_id",
                table: "events",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "address_id",
                table: "events",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_events_addresses_address_id",
                table: "events",
                column: "address_id",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_events_categories_category_id",
                table: "events",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_events_users_user_id",
                table: "events",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
