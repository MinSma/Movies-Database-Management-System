using System.ComponentModel.DataAnnotations;

namespace movieapi.DataContracts.Requests
{
    public class GenreCreateUpdateRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
