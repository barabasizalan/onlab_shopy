using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopyBackend.Models;

namespace ShopyBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ShopyDbContext _context;

        public ProductsController(ShopyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts() {
            return await _context.Product.ToListAsync();
        }


        [HttpGet]
        [Route("{queryString}")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct(string queryString)
        {
            if(string.IsNullOrEmpty(queryString))
            {
                return BadRequest("Empty search is not valid.");
            }

            var products = await _context.Product
                .Where(p => p.Name.Contains(queryString))
                .ToListAsync();

            if(products == null || !products.Any())
            {
                return NotFound("There aren't any products matching your search.");
            }
            
            return Ok(products);
        }

        [HttpGet]
        [Route("category")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory([FromQuery] string categoryName)
        {
            try
            {
                var category = await _context.Category.FirstOrDefaultAsync(c => c.Name.Contains(categoryName));
                if (category == null)
                {
                    return NotFound("Category was not found!");
                }

                var products = await _context.Product
                    .Where(p => p.CategoryId == category.Id)
                    .ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
