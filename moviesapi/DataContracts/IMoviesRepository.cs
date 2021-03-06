﻿using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IMoviesRepository
    {
        Task<List<MovieResponse>> GetAll(string text);
        Task<MovieResponse> GetById(int id);
        Task<MovieResponse> Create(MovieCreateUpdateRequest request);
        Task<MovieResponse> Update(int id, MovieCreateUpdateRequest request);
        Task Delete(int id);
    }
}
