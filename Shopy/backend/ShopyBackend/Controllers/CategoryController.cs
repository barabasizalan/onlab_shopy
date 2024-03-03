using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopyBackend.Models;

namespace ShopyBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
        private readonly ShopyDbContext _context;

        public CategoryController(ShopyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Category.ToListAsync();
        }
    }
}
