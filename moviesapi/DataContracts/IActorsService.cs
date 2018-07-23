using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IActorsService
    {
        Task<List<ActorResponse>> GetAll();
        Task<ActorResponse> GetById(int id);
        Task<ActorResponse> Create(ActorCreateUpdateRequest request);
        Task<ActorResponse> Update(int id, ActorCreateUpdateRequest request);
        Task Delete(int id);
        Task DeleteRelationship(CreateDeleteRelationshipRequest request);
        Task<ActorResponse> CreateRelationship(CreateDeleteRelationshipRequest request);
    }
}
