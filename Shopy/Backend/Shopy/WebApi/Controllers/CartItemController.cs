using BLL.DTO;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _cartItemService;
        private readonly ICartService _cartService;

        public CartItemController(ICartItemService cartItemService, ICartService cartService)
        {
            _cartItemService = cartItemService;
            _cartService = cartService;
        }

        //add in item to the cart. Check if the cart exists, if not create a new cart and add the item to the cart
        //if the cart exists, check if the item is already in the cart, if it is, update the quantity of the item
        //if the item is not in the cart, add the item to the cart
        //if the cart is not the users, check if he is a member of the cart and add the item to the cart
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> AddItemToCart([FromBody] AddItemToCartDto addItemToCartDto, string name)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cart = await _cartService.GetCartByUserId(userId);
                if (cart == null)
                {
                    await _cartService.CreateCart(userId, name);
                    cart = await _cartService.GetCartByUserId(userId);
                    addItemToCartDto.CartId = cart.Id;
                }

                //TODO: check if the user is part of the cart

                await _cartItemService.AddProductToCart(addItemToCartDto);

                return Ok("Product added to cart successfully!");
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //remove an item from the cart
        [HttpDelete]
        [Route("delete/{cartItemId}")]
        public async Task<ActionResult> RemoveItemFromCart(int cartItemId)
        {
            try
            {
                await _cartItemService.RemoveProductFromCart(cartItemId);
                return Ok("Product removed from cart successfully!");
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("update-quantity")]
        public async Task<ActionResult> UpdateQuantity([FromBody] UpdateQuantityDto updateQuantityDto)
        {
            try
            {
                await _cartItemService.UpdateCartItemQuantity(updateQuantityDto);
                if(updateQuantityDto.NewQuantity == 0)
                {
                    return Ok("Product removed from cart successfully!");
                }
                return Ok("Quantity updated successfully!");
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
