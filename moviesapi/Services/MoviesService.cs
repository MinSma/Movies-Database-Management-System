using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
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

        public async Task<List<Movie>> GetAll()
        {
            return await _moviesRepository.GetAll();
        }

        public async Task<Movie> GetById(int id)
        {
            return await _moviesRepository.GetById(id);
        }

        public async Task<Movie> Create(MovieCreateUpdateRequest request)
        {
            return await _moviesRepository.Create(request);
        }

        public async Task<Movie> Update(int id, MovieCreateUpdateRequest request)
        {
            return await _moviesRepository.Update(id, request);
        }

        public async Task Delete(int id)
        {
            await _moviesRepository.Delete(id);
        }
    }
}
