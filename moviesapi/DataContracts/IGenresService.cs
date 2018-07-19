using movieapi.Data.Entities;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IGenresService
    {
        Task<List<Genre>> GetAll();
        Task<Genre> GetById(int id);
        Task<Genre> Create(GenreCreateUpdateRequest request);
        Task<Genre> Update(int id, GenreCreateUpdateRequest request);
        Task Delete(int id);
    }
}
