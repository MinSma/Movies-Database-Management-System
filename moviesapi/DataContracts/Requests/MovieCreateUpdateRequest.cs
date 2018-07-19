using System;
using System.ComponentModel.DataAnnotations;

namespace movieapi.DataContracts.Requests
{
    public class MovieCreateUpdateRequest
    {
        [Required]
        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public int GenreId { get; set; }
    }
}
