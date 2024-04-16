using BLL.DTO;

namespace BLL.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(string userId);
        Task<IEnumerable<OrderDto>> GetOrdersByUserId(string userId);
    }
}
