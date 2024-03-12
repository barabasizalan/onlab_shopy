using Microsoft.AspNetCore.Mvc;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.BLL_Domain_.DTO;

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
                return Ok( new {
                    Message = "Login successful",
                    Username = loginRequest.Username
                });
            } else
            {
                return Unauthorized( new { Message = "Invalid username or password"});
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var result = await _authService.RegisterAsync(registerRequest);
            if (result)
            {
                return Ok( new { Message = "Registration successful"});
            } else
            {
                return BadRequest( new { Message = "Registration failed"});
            }
        }

    }
}
