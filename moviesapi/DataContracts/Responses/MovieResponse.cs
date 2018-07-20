﻿using movieapi.Data.Entities;
using System;

namespace movieapi.DataContracts.Responses
{
    public class MovieResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

        public Genre Genre { get; set; }
    }
}
