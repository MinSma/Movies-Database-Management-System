﻿using Microsoft.AspNetCore.Mvc;

namespace reactdotnet.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("/dist/index.html", "text/html");
        }
    }
}
