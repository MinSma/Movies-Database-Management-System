using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IRelationshipService
    {
        Task Delete(CreateDeleteRelationshipRequest request);
        Task<RelationshipResponse> Create(CreateDeleteRelationshipRequest request);
    }
}
