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
        
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Route("owned/all")]
        public async Task<ActionResult<CartDto[]>> GetCarts()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var carts = await _cartService.GetOwnedCarts(userId);
                return Ok(carts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
        public async Task<ActionResult> CreateNewCart()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                await _cartService.CreateCart(userId);
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
        [Route("joined/all")]
        public async Task<ActionResult<CartDto[]>> GetJoinedCarts()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var carts = await _cartService.GetJoinedCarts(userId);
                return Ok(carts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
