using System;

namespace movieapi.DataContracts.Responses
{
    public class MovieResponse
    {
        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string GenreName { get; set; }
    }
}
