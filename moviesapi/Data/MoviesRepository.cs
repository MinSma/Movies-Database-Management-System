﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<List<MovieResponse>> GetAll()
        {
            return await _dbContext
                .Movies
                .Select(x => new MovieResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    ReleaseDate = x.ReleaseDate,
                    Genre = _dbContext.Genres.First(g => g.Id == x.GenreId)
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
                Genre = _dbContext.Genres.First(g => g.Id == movie.GenreId)
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

            return new MovieResponse
            {
                Title = movie.Title,
                ReleaseDate = movie.ReleaseDate,
                Genre = _dbContext.Genres.First(g => g.Id == movie.GenreId)
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
                Genre = _dbContext.Genres.First(g => g.Id == movie.GenreId)
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
