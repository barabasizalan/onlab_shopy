using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] int? limit, [FromHeader(Name = "Cookie")] string cookie)
        {
            try
            {
                if (string.IsNullOrEmpty(cookie))
                {
                    return BadRequest("Cookie is missing.");
                }

                var products = await _productService.GetProducts(limit);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }


        [HttpGet]
        [Route("{queryString}")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct(string queryString)
        {
            if (string.IsNullOrEmpty(queryString))
            {
                return BadRequest("Empty search is not valid.");
            }
            try
            {
                var products = await _productService.SearchProducts(queryString);
                return Ok(products);
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory([FromQuery] string category)
        {
            try
            {
                var products = await _productService.GetProductsByCategory(category);
                return Ok(products);
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("publish")]
        public async Task<ActionResult> PublishProduct([FromBody] ProductFormDto productFormDto)
        {
            try
            {
                if (productFormDto == null)
                {
                    return BadRequest("Product data is missing.");
                }

                await _productService.PublishProduct(productFormDto);

                return Ok("Product published successfully.");

            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
