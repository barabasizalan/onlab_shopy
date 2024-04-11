using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Repository_interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    }
}
