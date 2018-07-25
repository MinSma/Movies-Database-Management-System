using Microsoft.EntityFrameworkCore;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace movieapi.Data
{
    public class RelationshipRepository : IRelationshipRepository
    {
        private AppDBContext _dbContext;

        public RelationshipRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task Delete(CreateDeleteRelationshipRequest request)
        {
            var movie = await _dbContext
                .Movies
                .FirstOrDefaultAsync(x => x.Id == request.MovieId);

            if (movie == null)
            {
                throw new InvalidOperationException("Movie with specified id is not found");
            }

            var actor = await _dbContext
                .Actors
                .FirstOrDefaultAsync(x => x.Id == request.ActorId);

            if (actor == null)
            {
                throw new InvalidOperationException("Actor with specified id is not found");
            }

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

        public async Task<RelationshipResponse> Create(CreateDeleteRelationshipRequest request)
        {
            var movie = await _dbContext
                .Movies
                .FirstOrDefaultAsync(x => x.Id == request.MovieId);

            if (movie == null)
            {
                throw new InvalidOperationException("Movie with specified id is not found");
            }

            var actor = await _dbContext
                .Actors
                .FirstOrDefaultAsync(x => x.Id == request.ActorId);

            if(actor == null)
            {
                throw new InvalidOperationException("Actor with specified id is not found");
            }

            await _dbContext
                .ActorMovies
                .AddAsync(new ActorMovie
                {
                    ActorId = request.ActorId,
                    MovieId = request.MovieId
                });

            await _dbContext
                .SaveChangesAsync();

            return new RelationshipResponse
            {
                MovieId = request.MovieId,
                ActorId = request.ActorId
            };
        }
    }
}
