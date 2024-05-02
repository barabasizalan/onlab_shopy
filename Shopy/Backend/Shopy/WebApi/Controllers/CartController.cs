using BLL.DTO;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IProductService _productService;

        public CartController(ICartService cartService, IProductService productService)
        {
            _cartService = cartService;
            _productService = productService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CartItemDto[]>> GetCartItems()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cartItems = await _cartService.GetCartItems(userId);
                return Ok(cartItems);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> AddItemToCart([FromBody] AddToCartDto addToCartDto)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _cartService.AddToCart(userId, addToCartDto);

                return Ok("Cart item added succesfully!");

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("delete/{cartId}")]
        public async Task<ActionResult> RemoveItemFromCart(int cartId)
        {
            try
            {
                await _cartService.DeleteCartItem(cartId);
                return Ok("Cart item deleted successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("delete/all")]
        public async Task<ActionResult> RemoveAllItemsFromCart()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _cartService.DeleteAllCartItems(userId);
                return Ok("All cart items deleted successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("update/{cartId}")]
        public async Task<ActionResult> UpdateCartItemQuantity([FromQuery] int newQuantity, int cartId)
        {
            try
            {
                await _cartService.UpdateCartItemQuantity(cartId, newQuantity);
                if (newQuantity == 0)
                {
                    return Ok("Cart item removed successfully!");
                }
                return Ok("Cart item quantity updated successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("number-of-items")]
        public async Task<ActionResult<int>> GetNumberOfCartItems()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var numberOfItems = await _cartService.GetNumberOfCartItems(userId);
                return Ok(numberOfItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("total-price")]
        public async Task<ActionResult<decimal>> CalculateTotal()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cartItems = await _cartService.GetCartItems(userId);

                decimal total = 0;

                foreach (var item in cartItems)
                {
                    var product = await _productService.GetProductsById(item.ProductId);
                    total += product.Price * item.Quantity;
                }

                return Ok(total);
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
