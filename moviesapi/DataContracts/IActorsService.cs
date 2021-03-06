﻿using movieapi.DataContracts.Requests;
using movieapi.DataContracts.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movieapi.DataContracts
{
    public interface IActorsService
    {
        List<ActorResponse> GetAll();
        Task<ActorResponse> GetById(int id);
        Task<ActorResponse> Create(ActorCreateUpdateRequest request);
        Task<ActorResponse> Update(int id, ActorCreateUpdateRequest request);
        Task Delete(int id);
    }
}
