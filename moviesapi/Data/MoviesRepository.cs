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
    public class MoviesRepository : IMoviesRepository
    {
        private AppDBContext _dbContext;

        public MoviesRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<List<MovieResponse>> GetAll(string text)
        {
            if(text != null)
            {
                return await _dbContext
                .Movies
                .Where(x => x.Title.ToLower().Contains(text.ToLower()) ||
                            x.Genre.Name.ToLower().Contains(text.ToLower()) ||
                            x.ReleaseDate.Date.ToString().Contains(text.ToLower())
                 )
                .Select(x => new MovieResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    ReleaseDate = x.ReleaseDate,
                    GenreId = _dbContext.Genres.First(g => g.Id == x.GenreId).Id,
                    GenreName = _dbContext.Genres.First(g => g.Id == x.GenreId).Name,
                    Actors = _dbContext.Actors.Where(a => a.MovieId == x.Id)
                            .Select(a => new ActorResponse { Id = a.Id, FirstName = a.FirstName, LastName = a.LastName })
                            .ToList()
                })
                .ToListAsync();
            }

            return await _dbContext
                .Movies
                .Select(x => new MovieResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    ReleaseDate = x.ReleaseDate,
                    GenreId = _dbContext.Genres.First(g => g.Id == x.GenreId).Id,
                    GenreName = _dbContext.Genres.First(g => g.Id == x.GenreId).Name,
                    Actors = _dbContext.Actors.Where(a => a.MovieId == x.Id)
                            .Select(a => new ActorResponse { Id = a.Id, FirstName = a.FirstName, LastName = a.LastName })
                            .ToList()
                })
                .ToListAsync();
        }

        public async Task<MovieResponse> GetById(int id)
        {
            var movie = await _dbContext
                .Movies
                .SingleOrDefaultAsync(x => x.Id == id);

            return new MovieResponse
            {
                Id = movie.Id,
                Title = movie.Title,
                ReleaseDate = movie.ReleaseDate,
                GenreId = _dbContext.Genres.First(g => g.Id == movie.GenreId).Id,
                GenreName = _dbContext.Genres.First(g => g.Id == movie.GenreId).Name,
                Actors = _dbContext.Actors.Where(a => a.MovieId == movie.Id)
                            .Select(a => new ActorResponse { Id = a.Id, FirstName = a.FirstName, LastName = a.LastName })
                            .ToList()
            };
        }

        public async Task<MovieResponse> Create(MovieCreateUpdateRequest request)
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

            if (request.Actors != null)
            {

                foreach (var actor in request.Actors)
                {
                    await _dbContext
                        .Actors
                        .AddAsync(new Actor
                        {
                            FirstName = actor.FirstName,
                            LastName = actor.LastName,
                            MovieId = movie.Id
                        });
                }

                await _dbContext
                    .SaveChangesAsync();
            }

            var genre = await _dbContext
                .Genres
                .SingleOrDefaultAsync(x => x.Id == request.GenreId);

            var actors = _dbContext
                .Actors
                .Where(a => a.MovieId == movie.Id)
                .Select(a => new ActorResponse
                {
                    Id = a.Id,
                    FirstName = a.FirstName,
                    LastName = a.LastName
                })
                .ToList();

            return new MovieResponse
            {
                Id = movie.Id,
                Title = request.Title,
                ReleaseDate = request.ReleaseDate,
                GenreId = genre.Id,
                GenreName = genre.Name,
                Actors = actors
            };
        }

        public async Task<MovieResponse> Update(int id, MovieCreateUpdateRequest request)
        {
            var movie = await _dbContext
                .Movies
                .SingleAsync(x => x.Id == id);

            movie.Title = request.Title;
            movie.ReleaseDate = request.ReleaseDate;
            movie.GenreId = request.GenreId;

            await _dbContext
                .SaveChangesAsync();

            return new MovieResponse
            {
                Id = movie.Id,
                Title = movie.Title,
                ReleaseDate = movie.ReleaseDate,
                GenreId = _dbContext.Genres.First(g => g.Id == movie.GenreId).Id,
                GenreName = _dbContext.Genres.First(g => g.Id == movie.GenreId).Name,
                Actors = _dbContext.Actors.Where(a => a.MovieId == movie.Id)
                            .Select(a => new ActorResponse { Id = a.Id, FirstName = a.FirstName, LastName = a.LastName })
                            .ToList()
            };
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