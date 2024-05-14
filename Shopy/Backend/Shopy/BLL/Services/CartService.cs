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
        private readonly IProductRepository _productRepository;

        public CartService(ICartRepository cartRepository, ICartItemRepository cartItemRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<CartDto>> GetCarts(string userId)
        {
            var carts = await _cartRepository.GetCartsAsync(userId);

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
                });
            }
            return cartDtos;
        }

        public async Task<Cart> GetCartByUserId(string userId)
        {
            var carts = await _cartRepository.GetCartsAsync(userId);
            if (carts.Count() == 0)
            {
                return null;
            }
            return carts.First();
        }

        //create a cart for a user
        public async Task CreateCart(string userId)
        {
            string uniqueCode = RandomCodeGenerator.GenerateCode(6);
            var cart = new Cart
            {
                Code = uniqueCode,
                OwnerUserId = userId,
                CreatedAt = DateTime.Now,
                CartItems = new List<CartItem>()
            };
            await _cartRepository.CreateCartAsync(cart);
        }
    }
}
