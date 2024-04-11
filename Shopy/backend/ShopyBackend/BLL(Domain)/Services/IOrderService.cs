using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(string userId);
        Task<IEnumerable<OrderDto>> GetOrdersByUserId(string userId);
    }
}
