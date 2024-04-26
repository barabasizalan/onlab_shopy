using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface IAddressRepository
    {
        Task AddAddressAsync(Address newAddress);
        Task<Address> GetAddressByIdAsync(int? addressId);
        Task UpdateAddressAsync(Address address);
    }
}
