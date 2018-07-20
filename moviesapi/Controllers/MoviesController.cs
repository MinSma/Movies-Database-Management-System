using Microsoft.AspNetCore.Mvc;
using movieapi.Data.Entities;
using movieapi.DataContracts;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using movieapi.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.Controllers
{
    [Route("/api/[controller]")]
    public class MoviesController : Controller
    {
        private IMoviesService _moviesService;

        public MoviesController(IMoviesRepository moviesRepository)
        {
            _moviesService = new MoviesService(moviesRepository);
        }

        [HttpGet]
        public async Task<List<MovieResponse>> GetAll()
        {
            return await _moviesService.GetAll();
        }

        [HttpGet("{id}", Name = "GetMovie")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _moviesService.GetById(id);

            if (movie == null)
            {
                return NotFound(new { message = "Movie with specified id is not found" });
            }

            return new ObjectResult(movie);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]  MovieCreateUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newlyAddedMovie = await _moviesService.Create(request);

            return CreatedAtRoute("GetMovie", new { id = newlyAddedMovie }, newlyAddedMovie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MovieCreateUpdateRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedMovie = await _moviesService.Update(id, request);

                return new ObjectResult(updatedMovie);
            }
            catch (InvalidOperationException)
            {
                return NotFound(new { message = "Movie with specified id is not found" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _moviesService.Delete(id);

                return new NoContentResult();
            }
            catch (InvalidOperationException)
            {
                return NotFound(new { message = "Movie with specified id is not found" });
            }
        }
    }
}
