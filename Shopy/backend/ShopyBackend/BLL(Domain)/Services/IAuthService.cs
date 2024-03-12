using ShopyBackend.BLL_Domain_.DTO;

namespace ShopyBackend.BLL_Domain_
{
    public interface IAuthService
    {
        Task<bool> LoginAsync(LoginRequestDto loginRequest);
        Task<bool> RegisterAsync(RegisterRequestDto registerRequest);
    }
}
