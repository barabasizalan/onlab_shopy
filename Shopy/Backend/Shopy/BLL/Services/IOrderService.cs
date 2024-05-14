using BLL.DTO;

namespace BLL.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(string userId, CreateOrderDto createOrderDto);
        Task<IEnumerable<OrderDto>> GetOrdersByUserId(string userId);
    }
}
