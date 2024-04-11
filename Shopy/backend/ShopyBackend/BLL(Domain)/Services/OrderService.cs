using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IStatusRepository _statusRepository;

        public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository, IProductRepository productRepository, IStatusRepository statusRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _statusRepository = statusRepository;
        }

        public async Task<Order> CreateOrder(string userId)
        {
            var cartItems = await _cartRepository.GetAllCartItemsAsync(userId);
            if(cartItems == null)
            {
                throw new Exception("Cart is empty.");
            }

            //Check if there are enough products in stock
            foreach(var cartItem in cartItems)
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

            await _orderRepository.AddOrderAsync(order);

            //Update product quantities
            foreach(var cartItem in cartItems)
            {
                var product = await _productRepository.GetProductByIdAsync(cartItem.ProductId);
                product.Quantity -= cartItem.Quantity;
                await _productRepository.UpdateProductAsync(product);
            }

            //Clear the cart
            await _cartRepository.DeleteAllFromCartAsync(userId);
            return order;
        }
    }
}
