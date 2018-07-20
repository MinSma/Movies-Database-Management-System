﻿using movieapi.Data.Entities;
using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IMoviesRepository
    {
        Task<List<MovieResponse>> GetAll();
        Task<MovieResponse> GetById(int id);
        Task<MovieResponse> Create(MovieCreateUpdateRequest request);
        Task<MovieResponse> Update(int id, MovieCreateUpdateRequest request);
        Task Delete(int id);
    }
}
