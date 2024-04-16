using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
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
