using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;

namespace movieapi.Data
{
    public class GenresRepository : IGenresRepository
    {
        private AppDBContext _dbContext;

        public GenresRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<List<Genre>> GetAll()
        {
            return await _dbContext
                .Genres
                .ToListAsync();
        }

        public async Task<Genre> GetById(int id)
        {
            return await _dbContext
                .Genres
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Genre> Create(GenreCreateUpdateRequest request)
        {
            var genre = new Genre
            {
                Name = request.Name
            };

            await _dbContext
                .Genres
                .AddAsync(genre);

            await _dbContext
                .SaveChangesAsync();

            return genre;
        }        

        public async Task<Genre> Update(int id, GenreCreateUpdateRequest request)
        {
            var genre = await _dbContext
                .Genres
                .SingleAsync(x => x.Id == id);

            genre.Name = request.Name;

            await _dbContext
                .SaveChangesAsync();

            return genre;
        }

        public async Task Delete(int id)
        {
            var genre = await _dbContext
                .Genres
                .SingleAsync(x => x.Id == id);

            _dbContext
                .Remove(genre);

            await _dbContext
                .SaveChangesAsync();
        }
    }
}
