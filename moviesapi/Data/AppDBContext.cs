using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;

namespace movieapi.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        { }

        public DbSet<Actor> Actors { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Movie>()
                .HasOne(m => m.Genre)
                .WithMany(g => g.Movies);

            modelBuilder
                .Entity<ActorMovie>()
                .HasKey(r => new { r.MovieId, r.ActorId });

            modelBuilder
                .Entity<ActorMovie>()
                .HasOne(r => r.Movie)
                .WithMany(m => m.ActorMovies)
                .HasForeignKey(r => r.MovieId);

            modelBuilder
                .Entity<ActorMovie>()
                .HasOne(r => r.Actor)
                .WithMany(a => a.ActorMovies)
                .HasForeignKey(r => r.ActorId);
        }
    }
}
