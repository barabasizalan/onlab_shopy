namespace ShopyBackend.WebApi.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int StatusId { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
    }
}
