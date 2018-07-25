using System.Collections.Generic;
using System.Threading.Tasks;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;

namespace movieapi.Services
{
    public class ActorsService : IActorsService
    {
        private IActorsRepository _actorsRepository;

        public ActorsService(IActorsRepository actorsRepository)
        {
            _actorsRepository = actorsRepository;
        }

        public List<ActorResponse> GetAll()
        {
            return _actorsRepository.GetAll();
        }

        public async Task<ActorResponse> GetById(int id)
        {
            return await _actorsRepository.GetById(id);
        }

        public async Task<ActorResponse> Create(ActorCreateUpdateRequest request)
        {
            return await _actorsRepository.Create(request);
        }

        public async Task<ActorResponse> Update(int id, ActorCreateUpdateRequest request)
        {
            return await _actorsRepository.Update(id, request);
        }

        public async Task Delete(int id)
        {
            await _actorsRepository.Delete(id);
        }
    }
}
