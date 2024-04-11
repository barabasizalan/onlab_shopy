using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(string userId);
    }
}
