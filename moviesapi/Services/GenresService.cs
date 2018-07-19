using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.Services
{
    public class GenresService : IGenresService
    {
        private IGenresRepository _genresRepository;

        public GenresService(IGenresRepository genresRepository)
        {
            _genresRepository = genresRepository;
        }

        public async Task<List<Genre>> GetAll()
        {
            return await _genresRepository.GetAll();
        }

        public async Task<Genre> GetById(int id)
        {
            return await _genresRepository.GetById(id);
        }

        public async Task<Genre> Create(GenreCreateUpdateRequest request)
        {
            return await _genresRepository.Create(request);
        }

        public async Task<Genre> Update(int id, GenreCreateUpdateRequest request)
        {
            return await _genresRepository.Update(id, request);
        }

        public async Task Delete(int id)
        {
            await _genresRepository.Delete(id);
        }
    }
}
