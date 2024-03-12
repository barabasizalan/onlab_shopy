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

        public AuthService(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> LoginAsync(LoginRequestDto loginRequest)
        {
            var result = await _signInManager.PasswordSignInAsync(loginRequest.Username, loginRequest.Password, false, false);
            return result.Succeeded;
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
                return "Passwords do not match.";
            }
            var user = new User
            {
                UserName = registerRequest.Username,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber
            };
            var result = await _signInManager.UserManager.CreateAsync(user, registerRequest.Password);
            return result.Succeeded ? "Registration successful." : "Registration failed.";
        }
    }
}
