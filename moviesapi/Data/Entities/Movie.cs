using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace movieapi.Data.Entities
{
    public class Movie
    {
        [Required]
        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public int GenreId { get; set; }

        public Genre Genre { get; set; }

        public List<Role> Roles { get; set; }
    }
}
