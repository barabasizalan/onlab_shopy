using BLL.Entities;

namespace BLL.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public Status Status{ get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
        public PaymentMethodDto PaymentMethod { get; set; }
    }
}
