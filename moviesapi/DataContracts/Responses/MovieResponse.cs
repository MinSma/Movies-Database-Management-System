using movieapi.Data.Entities;
using System;
using System.Collections.Generic;

namespace movieapi.DataContracts.Responses
{
    public class MovieResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public int GenreId { get; set; }

        public string GenreName { get; set; }

        public List<ActorResponse> Actors { get; set; }
    }
}
