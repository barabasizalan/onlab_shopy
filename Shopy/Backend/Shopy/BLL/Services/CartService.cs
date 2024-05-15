using BLL.Repositories;
using BLL.Entities;
using BLL.DTO;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using BLL.Utils;

namespace BLL.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IUserRepository _userRepository;

        public CartService(ICartRepository cartRepository, ICartItemRepository cartItemRepository, IUserRepository userRepository)
        {
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<CartDto>> GetOwnedCarts(string userId)
        {
            var carts = await _cartRepository.GetOwnedCartsAsync(userId);

            var cartDtos = new List<CartDto>();

            foreach (var cart in carts)
            {
                var cartItems = await _cartItemRepository.GetCartItemsAsync(cart.Id);
                var cartItemDtos = new List<CartItemDto>();
                foreach (var cartItem in cartItems)

                {
                    cartItemDtos.Add(new CartItemDto
                    {
                        Id = cartItem.Id,
                        ProductId = cartItem.ProductId,
                        Quantity = cartItem.Quantity
                    });
                }
                cartDtos.Add(new CartDto
                {
                    Id = cart.Id,
                    CartItems = cartItemDtos,
                    Code = cart.Code,
                    Name = cart.Name,
                    IsOwner = cart.OwnerUserId == userId
                });
            }
            return cartDtos;
        }

        public async Task<Cart> GetCartByUserId(string userId)
        {
            var carts = await _cartRepository.GetOwnedCartsAsync(userId);
            if (carts.Count() == 0)
            {
                return null;
            }
            return carts.First();
        }

        //create a cart for a user
        public async Task CreateCart(string userId, string name)
        {
            string uniqueCode = RandomCodeGenerator.GenerateCode(6);
            var cart = new Cart
            {
                Code = uniqueCode,
                OwnerUserId = userId,
                CreatedAt = DateTime.Now,
                CartItems = new List<CartItem>(),
                Name = name
            };
            await _cartRepository.CreateCartAsync(cart);
        }

        public async Task<Cart> GetCartById(int cartId)
        {
            return await _cartRepository.GetCartByIdAsync(cartId);
        }

        public async Task<Cart> GetCartByCode(string code)
        {
            return await _cartRepository.GetCartByCodeAsync(code);
        }

        //join a user to a valid cart
        public async Task<bool> JoinCart(string userId, int cartId)
        {
            var cart = await _cartRepository.GetCartByIdAsync(cartId);
            if (cart == null)
            {
                throw new Exception("Cart not found.");
            }
            if (cart.OwnerUserId == userId)
            {
                throw new Exception("You are the owner of this cart.");
            }

            if (cart.Members.Any(m => m.Id == userId))
            {
                return false;
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            cart.Members.Add(user);
            await _cartRepository.UpdateCartAsync(cart);
            return true;
        }

        public async Task<IEnumerable<CartDto>> GetJoinedCarts(string userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }
            var carts = user.Carts;
            var cartDtos = new List<CartDto>();
            foreach (var cart in carts)
            {
                var cartItems = await _cartItemRepository.GetCartItemsAsync(cart.Id);
                var cartItemDtos = new List<CartItemDto>();
                foreach (var cartItem in cartItems)
                {
                    cartItemDtos.Add(new CartItemDto
                    {
                        Id = cartItem.Id,
                        ProductId = cartItem.ProductId,
                        Quantity = cartItem.Quantity
                    });
                }
                cartDtos.Add(new CartDto
                {
                    Id = cart.Id,
                    CartItems = cartItemDtos,
                    Code = cart.Code,
                    Name = cart.Name,
                    IsOwner = cart.OwnerUserId == userId
                });
            }
            return cartDtos;
        }
    }
}
