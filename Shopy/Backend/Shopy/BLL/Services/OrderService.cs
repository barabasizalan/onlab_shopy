﻿using BLL.DTO;
using BLL.Entities;
using BLL.Repositories;

namespace BLL.Services
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository, IProductRepository productRepository, IStatusRepository statusRepository, IPaymentMethodRepository paymentMethodRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _statusRepository = statusRepository;
            _paymentMethodRepository = paymentMethodRepository;
        }

        //todo: based on the cartId, delete the cart after placing the order
        public async Task<OrderDto> CreateOrder(string userId, CreateOrderDto createOrderDto)
        {
            var cart = await _cartRepository.GetCartByIdAsync(createOrderDto.CartId);
            if (cart == null)
            {
                throw new Exception("Cart not found.");
            }

            if(cart.CartItems.Count == 0)
            {
                throw new Exception("Cart is empty.");
            }

            foreach(var cartItem in cart.CartItems)
            {
                var product = await _productRepository.GetProductByIdAsync(cartItem.ProductId);
                if(product == null)
                {
                    throw new Exception("Product not found.");
                }
                if(cartItem.Quantity > product.Quantity)
                {
                    throw new Exception("Not enough products in stock.");
                }
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                StatusId = 0,
                OrderDetails = new List<OrderDetail>(),
                PaymentMethodId = createOrderDto.PaymentMethodId
            };

            Status status = await _statusRepository.GetStatusByNameAsync("Ordered");
            if (status != null)
            {
                order.StatusId = status.Id;
            }
            else
            {
                throw new Exception("Status not found.");
            }

            foreach (var cartItem in cart.CartItems)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    PurchasePrice = cartItem.Product.Price
                };
                order.OrderDetails.Add(orderDetail);

                // Update product quantities
                var product = await _productRepository.GetProductByIdAsync(cartItem.ProductId);
                product.Quantity -= cartItem.Quantity;
                await _productRepository.UpdateProductAsync(product);
            }

            await _orderRepository.AddOrderAsync(order);

            // Clear the cartitems from the cart
            await _cartRepository.DeleteCartItemsFromCartAsync(userId);

            //delete the cart
            await _cartRepository.DeleteCartAsync(cart);

            var orderDto = MapOrderToDto(order);

            return orderDto;
        }

        private OrderDto MapOrderToDto(Order order)
        {
            var paymentMethod = _paymentMethodRepository.GetPaymentMethodByIdAsync(order.PaymentMethodId).Result;

            if(paymentMethod == null)
            {
                throw new Exception("Payment method not found.");
            }

            var orderDetailsDto = new List<OrderDetailDto>();

            foreach (var orderDetail in order.OrderDetails)
            {
                var product = _productRepository.GetProductByIdAsync(orderDetail.ProductId).Result;

                if(product == null)
                {
                    throw new Exception("Product not found.");
                }

                var orderDetailDto = new OrderDetailDto
                {
                    Id = orderDetail.Id,
                    OrderId = orderDetail.OrderId,
                    Product = new ProductDto
                    {
                        Id = product.Id,
                        Name = product.Name,
                        Description = product.Description,
                        Price = product.Price,
                        Quantity = product.Quantity,
                        CategoryId = product.CategoryId,
                        ImageBase64 = Convert.ToBase64String(product.Image.ImageData)
                    },
                    Quantity = orderDetail.Quantity,
                    PurchasePrice = orderDetail.PurchasePrice
                };

                orderDetailsDto.Add(orderDetailDto);
            }

            return new OrderDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                Status = order.Status,
                PaymentMethod = new PaymentMethodDto
                {
                    Id = paymentMethod.Id,
                    Method = paymentMethod.Method
                },
                OrderDetails = orderDetailsDto
            };
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserId(string userId)
        {
            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            if(orders == null)
            {
                return Enumerable.Empty<OrderDto>();
            }

            var orderDtos = new List<OrderDto>();

            foreach (var order in orders)
            {
                var orderDto = MapOrderToDto(order);
                orderDtos.Add(orderDto);
            }

            return orderDtos;
        }
    }
}
