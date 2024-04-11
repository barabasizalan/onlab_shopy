using Microsoft.AspNetCore.Mvc;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.WebApi.DTO;
using System.Security.Claims;

namespace ShopyBackend.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController: ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetCartItems()
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

            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddToCartDto addToCartDto)
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

            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("delete/{cartId}")]
        public async Task<IActionResult> RemoveItemFromCart(int cartId)
        {
            try
            {
                await _cartService.DeleteCartItem(cartId);
                return Ok("Cart item deleted successfully!");
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("delete/all")]
        public async Task<IActionResult> RemoveAllItemsFromCart()
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
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("update/{cartId}")]
        public async Task<IActionResult> UpdateCartItemQuantity([FromQuery] int newQuantity, int cartId)
        {
            try
            {
                await _cartService.UpdateCartItemQuantity(cartId, newQuantity);
                if(newQuantity == 0)
                {
                    return Ok("Cart item removed successfully!");
                }
                return Ok("Cart item quantity updated successfully!");
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
