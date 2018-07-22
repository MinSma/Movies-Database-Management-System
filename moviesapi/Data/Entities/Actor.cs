using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace movieapi.Data.Entities
{
    public class Actor
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public int MovieId { get; set; }

        public Movie Movie { get; set; }
    }
}
