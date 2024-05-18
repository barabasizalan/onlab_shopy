using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ShopyDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(ShopyDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.Users.Include(u => u.Carts).FirstOrDefaultAsync(u => u.Id == userId);
            if(user != null)
            {
                return user;
            }
            else
            {
                throw new Exception("User not found.");
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userManager.UpdateAsync(user);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var user = await _userManager.Users.Where(_userManager => _userManager.UserName == username).FirstOrDefaultAsync();
            if(user != null)
            {
                return user;
            }
            else
            {
                throw new Exception("User not found.");
            }
        }
    }
}
