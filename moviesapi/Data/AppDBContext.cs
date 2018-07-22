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
                .Entity<Movie>()
                .HasMany(m => m.Actors)
                .WithOne(a => a.Movie);
        }
    }
}
