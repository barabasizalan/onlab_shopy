using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_
{
    public interface IAuthService
    {
        Task<bool> LoginAsync(LoginRequestDto loginRequest);
        Task<string> RegisterAsync(RegisterRequestDto registerRequest);
        Task<string> GetUserIdByUsername(string username);
    }
}
