using Microsoft.AspNetCore.Identity;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.BLL_Domain_.DTO;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.DAL
{
    public class AuthService: IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthService(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<bool> LoginAsync(LoginRequestDto loginRequest)
        {
            var result = await _signInManager.PasswordSignInAsync(loginRequest.Username, loginRequest.Password, false, false);
            return result.Succeeded;
        }

        public async Task<bool> RegisterAsync(RegisterRequestDto registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return false;
            }
            var user = new User
            {
                UserName = registerRequest.Username,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber
            };
            var result = await _signInManager.UserManager.CreateAsync(user, registerRequest.Password);
            return result.Succeeded;
        }
    }
}
