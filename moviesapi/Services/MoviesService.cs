using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.Services
{
    public class MoviesService : IMoviesService
    {
        private IMoviesRepository _moviesRepository;

        public MoviesService(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }

        public async Task<List<MovieResponse>> GetAll(string text)
        {
            return await _moviesRepository.GetAll(text);
        }

        public async Task<MovieResponse> GetById(int id)
        {
            return await _moviesRepository.GetById(id);
        }

        public async Task<MovieResponse> Create(MovieCreateUpdateRequest request)
        {
            return await _moviesRepository.Create(request);
        }

        public async Task<MovieResponse> Update(int id, MovieCreateUpdateRequest request)
        {
            return await _moviesRepository.Update(id, request);
        }

        public async Task Delete(int id)
        {
            await _moviesRepository.Delete(id);
        }
    }
}
