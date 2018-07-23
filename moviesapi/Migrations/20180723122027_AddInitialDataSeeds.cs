using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace movieapi.Migrations
{
    public partial class AddInitialDataSeeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Genres (Name) " +
                "VALUES ('Action'), ('Drama'), ('Comedy')");

            migrationBuilder.Sql("INSERT INTO Movies (Title, ReleaseDate, GenreId) " +
                "VALUES ('Seven Pounds', '2009-02-27', (SELECT Id FROM Genres WHERE Name = 'Drama' )), " +
                "('Pursuit of Hapiness', '2006-11-05', (SELECT Id FROM Genres WHERE Name = 'Drama' ))");

            migrationBuilder.Sql("INSERT INTO Actors (FirstName, LastName) " +
                "VALUES ('Tom', 'Hanks'), ('Will', 'Smith'), ('Dwayne', 'Johnson')," +
                "('Denziel', 'Washington'), ('Harrison', 'Ford')");

            migrationBuilder.Sql("INSERT INTO ActorMovie (MovieId, ActorId) VALUES (1, 1), (1, 2), (1, 3), (2, 4), (2, 1), (2, 5)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
