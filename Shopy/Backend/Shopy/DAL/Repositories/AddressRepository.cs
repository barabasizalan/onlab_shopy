using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ShopyDbContext _context;
        public AddressRepository(ShopyDbContext context)
        {
            _context = context;
        }
        public async Task AddAddressAsync(Address newAddress)
        {
            _context.Addresses.Add(newAddress);
            await _context.SaveChangesAsync();
        }
    }
}
