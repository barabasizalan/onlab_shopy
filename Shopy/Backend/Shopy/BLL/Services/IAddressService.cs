using BLL.DTO;
using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IAddressService
    {
        Task AddAddressToUser(string userId, int addressId);
        Task<Address> CreateAddress(AddressRequestDto addressRequestDto);
    }
}
