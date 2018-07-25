using Microsoft.AspNetCore.Mvc;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.Services;
using System;
using System.Threading.Tasks;

namespace movieapi.Controllers
{
    [Route("/api/[controller]")]
    public class RelationshipsController : Controller
    {
        private IRelationshipService _relationshipService;

        public RelationshipsController(IRelationshipRepository relationshipRepository)
        {
            _relationshipService = new RelationshipService(relationshipRepository);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] CreateDeleteRelationshipRequest request)
        {
            try
            {
                await _relationshipService.Delete(request);

                return new NoContentResult();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(new { message = e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDeleteRelationshipRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newlyAddedRelationship = await _relationshipService.Create(request);

                return new ObjectResult(newlyAddedRelationship);
            } catch (InvalidOperationException e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}
