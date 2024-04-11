using Microsoft.AspNetCore.Mvc;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.WebApi.DTO;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ShopyBackend.WebApi.Controllers
{
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Route("create-order")]
        public async Task<IActionResult> CreateOrder()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var order = await _orderService.CreateOrder(userId);

                return Ok(order);

            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("user/orders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByUserId()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var orders = await _orderService.GetOrdersByUserId(userId);

                if(orders == null)
                {
                    return NotFound("No orders found for this user.");
                }

                return Ok(orders);

            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
