using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.Data
{
    public class MoviesRepository : IMoviesRepository
    {
        private AppDBContext _dbContext;

        public MoviesRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<List<Movie>> GetAll()
        {
            return await _dbContext
                .Movies
                .ToListAsync();
        }

        public async Task<Movie> GetById(int id)
        {
            return await _dbContext
                .Movies
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Movie> Create(MovieCreateUpdateRequest request)
        {
            var movie = new Movie
            {
                Title = request.Title,
                ReleaseDate = request.ReleaseDate,
                GenreId = request.GenreId
            };

            await _dbContext
                .Movies
                .AddAsync(movie);

            await _dbContext
                .SaveChangesAsync();

            return movie;
        }

        public async Task<Movie> Update(int id, MovieCreateUpdateRequest request)
        {
            var movie = await _dbContext
                .Movies
                .SingleAsync(x => x.Id == id);

            movie.Title = request.Title;
            movie.ReleaseDate = request.ReleaseDate;
            movie.GenreId = request.GenreId;

            await _dbContext
                .SaveChangesAsync();

            return movie;
        }

        public async Task Delete(int id)
        {
            var movie = await _dbContext
                .Movies
                .SingleAsync(x => x.Id == id);

            _dbContext
                .Remove(movie);

            await _dbContext
                .SaveChangesAsync();
        }
    }
}
