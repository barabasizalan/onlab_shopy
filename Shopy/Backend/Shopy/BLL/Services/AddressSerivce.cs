﻿using BLL.DTO;
using BLL.Entities;
using BLL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AddressSerivce : IAddressService
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IUserRepository _userRepository;

        public AddressSerivce(IAddressRepository addressRepository, IUserRepository userRepository)
        {
            _addressRepository = addressRepository;
            _userRepository = userRepository;
        }

        public async Task AddAddressToUser(string userId, int addressId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if(user != null)
            {
                user.AddressId = addressId;
                await _userRepository.UpdateUserAsync(user);
            }
        }

        public async Task<Address> CreateAddress(AddressRequestDto addressRequestDto)
        {
            if(addressRequestDto == null)
            {
                throw new Exception("Address request is null.");
            }
            var newAddress = new Address
            {
                Street = addressRequestDto.Street,
                City = addressRequestDto.City,
                ZipCode = addressRequestDto.ZipCode,
                Country = addressRequestDto.Country
            };
            await _addressRepository.AddAddressAsync(newAddress);
            return newAddress;
        }

        public async Task<Address> GetAddressByUserId(string userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            
            if(user != null)
            {
                if (user.AddressId != null)
                {
                    return await _addressRepository.GetAddressByIdAsync(user.AddressId);
                }
            }
            return null;
        }

        public async Task UpdateAddress(int id, AddressRequestDto addressRequestDto)
        {
            var address = await _addressRepository.GetAddressByIdAsync(id);
            if(address != null)
            {
                address.Street = addressRequestDto.Street;
                address.City = addressRequestDto.City;
                address.ZipCode = addressRequestDto.ZipCode;
                address.Country = addressRequestDto.Country;
                await _addressRepository.UpdateAddressAsync(address);
            }
        }
    }
}
