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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] int? limit) {
            try
            {
                var query = _context.Product.Include(p => p.Category).AsQueryable();

                if (limit != null)
                {
                    query = query.Take((int)limit);
                }

                var products = await query.ToListAsync();
                return products;
            } catch (Exception ex)
            {
                return StatusCode(500, "Internal server error!");
            }

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
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory([FromQuery] string category)
        {
            try
            {
                var categorySearch = await _context.Category.FirstOrDefaultAsync(c => c.Name.Contains(category));
                if (categorySearch == null)
                {
                    return NotFound("Category was not found!");
                }

                var products = await _context.Product
                    .Where(p => p.CategoryId == categorySearch.Id)
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
