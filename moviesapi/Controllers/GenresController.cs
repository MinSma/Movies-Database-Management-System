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
    public class GenresController : Controller
    {
        private IGenresService _genresService;

        public GenresController(IGenresRepository genresRepository)
        {
            _genresService = new GenresService(genresRepository);
        }

        [HttpGet]
        public async Task<List<Genre>> GetAll()
        {
            return await _genresService.GetAll();
        }

        [HttpGet("{id}", Name = "GetGenre")]
        public async Task<IActionResult> GetById(int id)
        {
            var genre = await _genresService.GetById(id);

            if (genre == null)
            {
                return NotFound(new { message = "Genre with specified id is not found" });
            }

            return new ObjectResult(genre);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GenreCreateUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newlyAddedGenre = await _genresService.Create(request);

            return CreatedAtRoute("GetGenre", new { id = newlyAddedGenre }, newlyAddedGenre);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GenreCreateUpdateRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedActor = await _genresService.Update(id, request);

                return new ObjectResult(updatedActor);
            }
            catch (InvalidOperationException)
            {
                return NotFound(new { message = "Genre with specified id is not found" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _genresService.Delete(id);

                return new NoContentResult();
            }
            catch (InvalidOperationException)
            {
                return NotFound(new { message = "Genre with specified id is not found" });
            }
        }
    }
}
