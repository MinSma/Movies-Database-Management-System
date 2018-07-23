using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace movieapi.DataContracts.Requests
{
    public class CreateDeleteRelationshipRequest
    {
        public int MovieId { get; set; }

        public int ActorId { get; set; }
    }
}
