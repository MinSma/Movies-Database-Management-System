using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace movieapi.Migrations
{
    public partial class AddActorMovieDBSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovie_Actors_ActorId",
                table: "ActorMovie");

            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovie_Movies_MovieId",
                table: "ActorMovie");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActorMovie",
                table: "ActorMovie");

            migrationBuilder.RenameTable(
                name: "ActorMovie",
                newName: "ActorMovies");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovie_ActorId",
                table: "ActorMovies",
                newName: "IX_ActorMovies_ActorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActorMovies",
                table: "ActorMovies",
                columns: new[] { "MovieId", "ActorId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Actors_ActorId",
                table: "ActorMovies",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Movies_MovieId",
                table: "ActorMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Actors_ActorId",
                table: "ActorMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Movies_MovieId",
                table: "ActorMovies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActorMovies",
                table: "ActorMovies");

            migrationBuilder.RenameTable(
                name: "ActorMovies",
                newName: "ActorMovie");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovies_ActorId",
                table: "ActorMovie",
                newName: "IX_ActorMovie_ActorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActorMovie",
                table: "ActorMovie",
                columns: new[] { "MovieId", "ActorId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovie_Actors_ActorId",
                table: "ActorMovie",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovie_Movies_MovieId",
                table: "ActorMovie",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
