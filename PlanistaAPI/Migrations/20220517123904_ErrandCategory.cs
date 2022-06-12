using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanistaAPI.Migrations
{
    public partial class ErrandCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "category_id",
                table: "errands",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_errands_category_id",
                table: "errands",
                column: "category_id");

            migrationBuilder.AddForeignKey(
                name: "fk_errands_categories_category_id",
                table: "errands",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_errands_categories_category_id",
                table: "errands");

            migrationBuilder.DropIndex(
                name: "ix_errands_category_id",
                table: "errands");

            migrationBuilder.DropColumn(
                name: "category_id",
                table: "errands");
        }
    }
}
