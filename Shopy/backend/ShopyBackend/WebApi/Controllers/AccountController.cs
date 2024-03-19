using Microsoft.AspNetCore.Mvc;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.WebApi.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController: ControllerBase
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var result = await _authService.LoginAsync(loginRequest);
            if (result)
            {
                var userId = await _authService.GetUserIdByUsername(loginRequest.Username);

                if (userId == null)
                    return Unauthorized(new { Message = "Invalid username or password" });

                return Ok( new {
                    Message = "Login successful",
                    Username = loginRequest.Username,
                    UserId = userId
                });
            } else
            {
                return Unauthorized( new { Message = "Invalid username or password"});
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var resultMessage = await _authService.RegisterAsync(registerRequest);
            if (resultMessage == "Registration successful.")
            {
                return Ok( new { Message = resultMessage});
            } else
            {
                return BadRequest( new { Message = resultMessage});
            }
        }

    }
}
