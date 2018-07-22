using movieapi.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace movieapi.DataContracts.Requests
{
    public class MovieCreateUpdateRequest
    {
        [Required]
        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public int GenreId { get; set; }

        public List<Actor> Actors { get; set; }
    }
}
