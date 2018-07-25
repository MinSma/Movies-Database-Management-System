using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Threading.Tasks;

namespace movieapi.Services
{
    public class RelationshipService : IRelationshipService
    {
        private IRelationshipRepository _relationshipRepository;

        public RelationshipService(IRelationshipRepository relationshipRepository)
        {
            _relationshipRepository = relationshipRepository;
        }

        public async Task Delete(CreateDeleteRelationshipRequest request)
        {
            await _relationshipRepository.Delete(request);
        }

        public async Task<RelationshipResponse> Create(CreateDeleteRelationshipRequest request)
        {
            return await _relationshipRepository.Create(request);
        }
    }
}
