using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.DAL.Repository_implementation
{
    public class StatusRepository : IStatusRepository
    {
        private readonly ShopyDbContext _context;

        public StatusRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task<Status> GetStatusByIdAsync(int statusId)
        {
            return await _context.Statuses.FindAsync(statusId);
        }

        public async Task<Status> GetStatusByNameAsync(string statusName)
        {
            return await _context.Statuses.FirstOrDefaultAsync(s => s.Name == statusName);
        }
    }
}
