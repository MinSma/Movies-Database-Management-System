using movieapi.Data.Entities;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IActorsRepository
    {
        Task<List<Actor>> GetAll();
        Task<Actor> GetById(int id);
        Task<Actor> Create(ActorCreateUpdateRequest request);
        Task<Actor> Update(int id, ActorCreateUpdateRequest request);
        Task Delete(int id);
    }
}
