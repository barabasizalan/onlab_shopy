using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.DAL.Repository_implementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShopyDbContext _context;

        public OrderRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
        {
            return await _context.Orders.Where(o => o.UserId == userId).Include(o => o.OrderDetails).ToListAsync();
        }
    }
}
