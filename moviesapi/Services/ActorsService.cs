using System.Collections.Generic;
using System.Threading.Tasks;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;

namespace movieapi.Services
{
    public class ActorsService : IActorsService
    {
        private IActorsRepository _actorsRepository;

        public ActorsService(IActorsRepository actorsRepository)
        {
            _actorsRepository = actorsRepository;
        }

        public async Task<List<Actor>> GetAll()
        {
            return await _actorsRepository.GetAll();
        }

        public async Task<Actor> GetById(int id)
        {
            return await _actorsRepository.GetById(id);
        }

        public async Task<Actor> Create(ActorCreateUpdateRequest request)
        {
            return await _actorsRepository.Create(request);
        }

        public async Task<Actor> Update(int id, ActorCreateUpdateRequest request)
        {
            return await _actorsRepository.Update(id, request);
        }

        public async Task Delete(int id)
        {
            await _actorsRepository.Delete(id);
        }
    }
}
