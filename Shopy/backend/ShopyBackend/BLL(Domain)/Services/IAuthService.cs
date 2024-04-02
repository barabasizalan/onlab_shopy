using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequestDto registerRequest);
    }
}
