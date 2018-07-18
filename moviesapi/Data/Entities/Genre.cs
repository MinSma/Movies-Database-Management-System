using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace movieapi.Data.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Movie> Movies { get; set; }
    }
}
