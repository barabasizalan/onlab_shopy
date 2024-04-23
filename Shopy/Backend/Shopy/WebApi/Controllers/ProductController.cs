using BLL.DTO;
using BLL.Entities;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
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
        public async Task<ActionResult<PagedProductDto>> GetProducts([FromQuery] int? page, [FromQuery] int? pageSize)
        {
            try
            {
                var products = await _productService.GetProducts(page, pageSize);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpGet]
        [Route("user/all")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByUserId()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var products = await _productService.GetProductsByUserId(userId);

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<PagedProductDto>> SearchProduct([FromQuery] string queryString, [FromQuery] int? page, [FromQuery] int? pageSize)
        {
            if (string.IsNullOrEmpty(queryString))
            {
                return BadRequest("Empty search is not valid.");
            }
            try
            {
                var products = await _productService.SearchProducts(queryString, page, pageSize);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {
            try
            {
                var products = await _productService.GetProductsByCategory(categoryId);
                return Ok(products);
            }
            catch (Exception ex)
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

                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _productService.PublishProduct(productFormDto, userId);

                return Ok("Product published successfully.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("update/{productId}")]
        public async Task<ActionResult> UpdateProduct(int productId, [FromBody] ProductFormDto productFormDto)
        {
            try
            {
                if (productFormDto == null)
                {
                    return BadRequest("Product data is missing.");
                }

                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _productService.UpdateProduct(productId, productFormDto, userId);

                return Ok("Product updated successfully.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete]
        [Route("delete/{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            try
            {
                await _productService.DeleteProduct(productId);
                return Ok("Product deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
