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

        public List<ActorResponse> GetAll()
        {
            return _dbContext
                .Actors
                .Select(x => new ActorResponse
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Movies = (from ma in _dbContext.ActorMovies
                              from m in _dbContext.Movies
                              where ma.ActorId == x.Id && ma.MovieId == m.Id
                              select new MovieResponse
                              {
                                  Id = m.Id,
                                  Title = m.Title,
                                  ReleaseDate = m.ReleaseDate,
                                  GenreId = m.GenreId,
                                  Actors = null
                              }).ToList()
                })
                .ToList();
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
                LastName = actor.LastName,
                Movies = (from ma in _dbContext.ActorMovies
                          from m in _dbContext.Movies
                          where ma.ActorId == actor.Id && ma.MovieId == m.Id
                          select new MovieResponse
                          {
                              Id = m.Id,
                              Title = m.Title,
                              ReleaseDate = m.ReleaseDate,
                              GenreId = m.GenreId,
                              GenreName = _dbContext.Genres.First(g => g.Id == m.GenreId).Name,
                              Actors = null
                          }).ToList()
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
                LastName = actor.LastName,
                Movies = (from ma in _dbContext.ActorMovies
                          from m in _dbContext.Movies
                          where ma.ActorId == actor.Id && ma.MovieId == m.Id
                          select new MovieResponse
                          {
                              Id = m.Id,
                              Title = m.Title,
                              ReleaseDate = m.ReleaseDate,
                              GenreId = m.GenreId,
                              GenreName = _dbContext.Genres.First(g => g.Id == m.GenreId).Name,
                              Actors = null
                          }).ToList()
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
                LastName = actor.LastName,
                Movies = (from ma in _dbContext.ActorMovies
                          from m in _dbContext.Movies
                          where ma.ActorId == actor.Id && ma.MovieId == m.Id
                          select new MovieResponse
                          {
                              Id = m.Id,
                              Title = m.Title,
                              ReleaseDate = m.ReleaseDate,
                              GenreId = m.GenreId,
                              GenreName = _dbContext.Genres.First(g => g.Id == m.GenreId).Name,
                              Actors = null
                          }).ToList()
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
    }
}
