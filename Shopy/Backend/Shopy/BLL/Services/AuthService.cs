using BLL.DTO;
using BLL.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;

        public AuthService(UserManager<User> userManager)
        {
            _userManager = userManager;
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
