using BLL.DTO;
using BLL.Entities;
using BLL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IProductRepository _productRepository;
        public CartItemService(ICartItemRepository cartItemRepository, IProductRepository productRepository)
        {
            _cartItemRepository = cartItemRepository;
            _productRepository = productRepository;
        }

        public async Task AddProductToCart(AddItemToCartDto addItemToCartDto)
        {
            if(!addItemToCartDto.CartId.HasValue)
            {
                throw new Exception("CartId cannot be null.");
            }

            var existingCartItem = await _cartItemRepository.GetCartItemAsync(addItemToCartDto.CartId.Value, addItemToCartDto.ProductId);

            if (existingCartItem != null)
            {
                var newQuantity = existingCartItem.Quantity + addItemToCartDto.Quantity;

                await _cartItemRepository.UpdateCartItemAsync(existingCartItem.Id, newQuantity);
            }
            else
            {
                var product = await _productRepository.GetProductByIdAsync(addItemToCartDto.ProductId);
                if (product == null)
                {
                    throw new Exception("Product not found.");
                }
                if (addItemToCartDto.Quantity <= 0)
                {
                    throw new Exception("Quantity must be greater than zero.");
                }
                if (addItemToCartDto.Quantity > product.Quantity)
                {
                    throw new Exception("Not enough products in stock.");
                }
                var cartItem = new CartItem
                {
                    ProductId = addItemToCartDto.ProductId,
                    Quantity = addItemToCartDto.Quantity,
                    CartId = addItemToCartDto.CartId.Value,
                };

                await _cartItemRepository.AddCartItemAsync(cartItem);
            }
        }

        public async Task RemoveProductFromCart(int cartItemId)
        {
            await _cartItemRepository.RemoveCartItemAsync(cartItemId);
        }
    }
}
