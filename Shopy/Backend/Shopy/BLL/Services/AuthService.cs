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
                PhoneNumber = "+36" + registerRequest.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            await _userManager.AddToRoleAsync(user, "User");

            return result.Succeeded ? "Registration successful." : "Registration failed.";
        }

        public async Task<string> GetUserRoleAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if(user != null)
            {
                var role = await _userManager.GetRolesAsync(user);
                if (role.Any())
                {
                    return role.First();
                }
            }

            return null;
        }

        public async Task<string> ChangePhoneNumberAsync(string userId, string newPhoneNumber)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return "User not found.";
            }
            user.PhoneNumber = newPhoneNumber;
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded ? "Phone number changed successfully." : "Phone number change failed.";
        }

        public async Task<string> GetPhoneNumber(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return "User not found.";
            }
            return user.PhoneNumber ?? "There is no phone number registered.";
        }
    }
}
