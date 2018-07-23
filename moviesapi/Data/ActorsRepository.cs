using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace movieapi.Data
{
    public class ActorsRepository : IActorsRepository
    {
        private AppDBContext _dbContext;

        public ActorsRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<List<Actor>> GetAll()
        {
            return await _dbContext
                .Actors
                .ToListAsync();
        }

        public async Task<Actor> GetById(int id)
        {
            return await _dbContext
                .Actors
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Actor> Create(ActorCreateUpdateRequest request)
        {
            var actor = new Actor
            {
                FirstName = request.FirstName,
                LastName = request.LastName
            };

            await _dbContext
                .Actors
                .AddAsync(actor);

            await _dbContext
                .SaveChangesAsync();

            if (request.MovieId.HasValue)
            {
                _dbContext
                    .ActorMovies
                    .Add(new ActorMovie
                    {
                        ActorId = actor.Id,
                        MovieId = request.MovieId.Value
                    });
            }

            return actor;
        }

        public async Task<Actor> Update(int id, ActorCreateUpdateRequest request)
        {
            var actor = await _dbContext
                .Actors
                .SingleAsync(x => x.Id == id);

            actor.FirstName = request.FirstName;
            actor.LastName = request.LastName;

            await _dbContext
                .SaveChangesAsync();

            return actor;
        }

        public async Task Delete(int id)
        {
            var actor = await _dbContext
                .Actors
                .SingleAsync(x => x.Id == id);

            _dbContext
                .RemoveRange(
                    _dbContext
                        .ActorMovies
                        .Where(x => x.ActorId == id)
                );

            _dbContext
                .Remove(actor);

            await _dbContext
                .SaveChangesAsync();
        }
    }
}
