using movieapi.Data.Entities;
using movieapi.DataContracts.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts.Responses
{
    public interface IMoviesRepository
    {
        Task<List<Movie>> GetAll();
        Task<Movie> GetById(int id);
        Task<Movie> Create(MovieCreateUpdateRequest request);
        Task<Movie> Update(int id, MovieCreateUpdateRequest request);
        Task Delete(int id);
    }
}
