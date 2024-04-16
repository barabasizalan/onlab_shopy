using BLL.DTO;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;

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
            var resultMessage = await _authService.RegisterAsync(registerRequest);
            if (resultMessage == "Registration successful.")
            {
                return Ok(new { Message = resultMessage });
            }
            else
            {
                return BadRequest(new { Message = resultMessage });
            }
        }

    }
}
