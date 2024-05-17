using BLL.DTO;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {
            try
            {
                var resultMessage = await _authService.RegisterAsync(registerRequest);
                if (resultMessage == "Registration successful.")
                {
                    return Ok(new { Message = resultMessage });
                }
                else
                {
                    return BadRequest(new { Message = resultMessage });
                }
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("role")]
        public async Task<IActionResult> GetUserRole([FromQuery] string username)
        {
            try
            {
                var userRole = await _authService.GetUserRoleAsync(username);
                if (userRole != null)
                {
                    return Ok(new { Role = userRole });
                }
                else
                {
                    return BadRequest(new { Message = "User not found." });
                }
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("change-phone-number")]
        public async Task<IActionResult> ChangePhoneNumber([FromBody] string newPhoneNumber)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }
                var resultMessage = await _authService.ChangePhoneNumberAsync(userId, newPhoneNumber);
                if (resultMessage == "Phone number changed successfully.")
                {
                    return Ok(new { Message = resultMessage });
                }
                else
                {
                    return BadRequest(new { Message = resultMessage });
                }
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("phone-number")]
        public async Task<IActionResult> GetPhoneNumber()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }
                var phoneNumber = await _authService.GetPhoneNumber(userId);
                return Ok(new { PhoneNumber = phoneNumber });
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
