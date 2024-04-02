using Microsoft.AspNetCore.Identity;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;
using System.Threading.Tasks;

namespace ShopyBackend.DAL
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<string> RegisterAsync(RegisterRequestDto registerRequest)
        {
            var existingEmailUser = await _userManager.FindByEmailAsync(registerRequest.Email);
            if (existingEmailUser != null)
            {
                return "Email is already in use.";
            }

            var existingUsernameUser = await _userManager.FindByNameAsync(registerRequest.Username);
            if (existingUsernameUser != null)
            {
                return "Username is already in use.";
            }

            var existingPhoneNumberUser = await _userManager.FindByNameAsync(registerRequest.PhoneNumber);
            if (existingPhoneNumberUser != null)
            {
                return "Phone number is already in use.";
            }

            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return "Passwords don't match.";
            }

            var user = new User
            {
                UserName = registerRequest.Username,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            return result.Succeeded ? "Registration successful." : "Registration failed.";
        }
    }
}
