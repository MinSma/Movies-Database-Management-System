using System.ComponentModel.DataAnnotations;

namespace movieapi.DataContracts.Requests
{
    public class ActorCreateUpdateRequest
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
