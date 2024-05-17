using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequestDto registerRequestDto);
        Task<string> GetUserRoleAsync(string username);
        Task<string> ChangePhoneNumberAsync(string userId, string newPhoneNumber);
        Task<string> GetPhoneNumber(string userId);
    }
}
