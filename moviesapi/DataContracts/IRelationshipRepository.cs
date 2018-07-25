using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IRelationshipRepository
    {
        Task Delete(CreateDeleteRelationshipRequest request);
        Task<RelationshipResponse> Create(CreateDeleteRelationshipRequest request);
    }
}
