using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class SharedCartCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SharedCartId",
                table: "Cart",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SharedCart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValueSql: "NEWID()"),
                    CreatedByUserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedCart", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_SharedCartId",
                table: "Cart",
                column: "SharedCartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_SharedCart_SharedCartId",
                table: "Cart",
                column: "SharedCartId",
                principalTable: "SharedCart",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_SharedCart_SharedCartId",
                table: "Cart");

            migrationBuilder.DropTable(
                name: "SharedCart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_SharedCartId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "SharedCartId",
                table: "Cart");
        }
    }
}
