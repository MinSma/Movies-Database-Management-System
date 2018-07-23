using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
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

        public async Task<List<ActorResponse>> GetAll()
        {
            return await _dbContext
                .Actors
                .Select(x => new ActorResponse
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName
                })
                .ToListAsync();
        }

        public async Task<ActorResponse> GetById(int id)
        {
            var actor = await _dbContext
                .Actors
                .SingleOrDefaultAsync(x => x.Id == id);

            return new ActorResponse
            {
                Id = actor.Id,
                FirstName = actor.FirstName,
                LastName = actor.LastName
            };
        }

        public async Task<ActorResponse> Create(ActorCreateUpdateRequest request)
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
                await _dbContext
                    .ActorMovies
                    .AddAsync(new ActorMovie
                    {
                        ActorId = actor.Id,
                        MovieId = request.MovieId.Value
                    });
            }

            await _dbContext.
                SaveChangesAsync();

            return new ActorResponse
            {
                Id = actor.Id,
                FirstName = actor.FirstName,
                LastName = actor.LastName
            };
        }

        public async Task<ActorResponse> Update(int id, ActorCreateUpdateRequest request)
        {
            var actor = await _dbContext
                .Actors
                .SingleAsync(x => x.Id == id);

            actor.FirstName = request.FirstName;
            actor.LastName = request.LastName;

            await _dbContext
                .SaveChangesAsync();

            return new ActorResponse
            {
                Id = actor.Id,
                FirstName = actor.FirstName,
                LastName = actor.LastName
            };
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

        public async Task DeleteRelationship(CreateDeleteRelationshipRequest request)
        {
            _dbContext
                .ActorMovies
                .Remove(
                    await _dbContext
                    .ActorMovies
                    .Where(x => x.ActorId == request.ActorId && x.MovieId == request.MovieId)
                    .FirstAsync()
                );

            await _dbContext
                .SaveChangesAsync();
        }


        public async Task<ActorResponse> CreateRelationship(CreateDeleteRelationshipRequest request)
        {
            await _dbContext
                .ActorMovies
                .AddAsync(new ActorMovie
                {
                    ActorId = request.ActorId,
                    MovieId = request.MovieId
                });

            await _dbContext
                .SaveChangesAsync();

            var actor = await _dbContext
                .Actors
                .FirstAsync(x => x.Id == request.ActorId);

            return new ActorResponse
            {
                Id = actor.Id,
                FirstName = actor.FirstName,
                LastName = actor.LastName
            };
        }
    }
}
