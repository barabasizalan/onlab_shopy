using BLL.DTO;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly ICartItemService _cartItemService;
        
        public CartController(ICartService cartService, ICartItemService cartItemService)
        {
            _cartService = cartService;
            _cartItemService = cartItemService;
        }

        [HttpGet]
        [Route("owned-joined/all")]
        public async Task<ActionResult<CartDto[]>> GetAllCarts()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }
                var ownedCarts = await _cartService.GetOwnedCarts(userId);
                var joinedCarts = await _cartService.GetJoinedCarts(userId);
                var allCarts = ownedCarts.Concat(joinedCarts).ToArray();
                return Ok(allCarts);
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> CreateNewCart([FromBody] string name)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _cartService.CreateCart(userId, name);
                return Ok("Cart created successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("total-quantity/{cartId}")]
        public async Task<ActionResult<int>> GetNumberOfProductsInCart(int cartId)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cart = await _cartService.GetCartById(cartId);
                if (cart == null)
                {
                    return Ok(0);
                }

                var quantity = cart.CartItems.Sum(c => c.Quantity);
                return Ok(quantity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("join/{code}")]
        public async Task<ActionResult> JoinCart(string code)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cart = await _cartService.GetCartByCode(code.ToUpper());
                if (cart == null)
                {
                    return NotFound("Cart not found.");
                }

                var succesfulJoin = await _cartService.JoinCart(userId, cart.Id);
                if(!succesfulJoin)
                {
                    return BadRequest("Cart already joined.");
                }
                return Ok("Cart joined successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("total-price")]
        public async Task<ActionResult<decimal>> GetTotalPrice(int cartId)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cart = await _cartService.GetCartById(cartId);
                if (cart == null)
                {
                    return Ok(0);
                }

                decimal totalPrice = 0;
                foreach (var cartItem in cart.CartItems)
                {
                    var item = await _cartItemService.GetCartItemById(cartItem.Id);
                    totalPrice += item.Product.Price * item.Quantity;
                }
                return Ok(totalPrice);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("members/{cartId}")]
        public async Task<ActionResult<string[]>> GetCartMembers(int cartId)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var cart = await _cartService.GetCartById(cartId);
                if (cart == null)
                {
                    return NotFound("Cart not found.");
                }

                var members = cart.Members.Select(c => c.UserName).ToArray();
                return Ok(members);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("remove-member")]
        public async Task<ActionResult> RemoveMember([FromBody] RemoveCartMemberDto removeCartMemberDto)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var result = await _cartService.RemoveMemberFromCart(userId, removeCartMemberDto);
                if(result)
                {
                    return Ok("Member successfully removed.");
                } else
                {
                    return BadRequest("Member not found in the cart.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        

    }
}
