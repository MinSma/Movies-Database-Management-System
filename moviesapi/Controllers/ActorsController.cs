using Microsoft.AspNetCore.Mvc;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.Controllers
{
    [Route("/api/[controller]")]
    public class ActorsController : Controller
    {
        private IActorsService _actorsService;

        public ActorsController(IActorsRepository actorsRepository)
        {
            _actorsService = new ActorsService(actorsRepository);
        }

        [HttpGet]
        public async Task<List<Actor>> GetAll()
        {
            return await _actorsService.GetAll();
        }

        [HttpGet("{id}", Name = "GetActor")]
        public async Task<IActionResult> GetById(int id)
        {
            var actor = await _actorsService.GetById(id);

            if (actor == null)
            {
                return NotFound(new { message = "Actor with specified id is not found" });
            }

            return new ObjectResult(actor);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]  ActorCreateUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newlyAddedActor = await _actorsService.Create(request);

            return CreatedAtRoute("GetActor", new { id = newlyAddedActor }, newlyAddedActor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActorCreateUpdateRequest request)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedActor = await _actorsService.Update(id, request);

                return new ObjectResult(updatedActor);
            }
            catch (InvalidOperationException)
            {
                return NotFound(new { message = "Actor with specified id is not found" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _actorsService.Delete(id);

                return new NoContentResult();
            }
            catch(InvalidOperationException)
            {
                return NotFound(new { message = "Actor with specified id is not found" });
            }
        }
    }
}
