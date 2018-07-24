using movieapi.Data.Entities;
using System.Collections.Generic;

namespace movieapi.DataContracts.Responses
{
    public class ActorResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<MovieResponse> Movies { get; set; }
    }
}
