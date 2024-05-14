namespace BLL.DTO
{
    public class AddItemToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int? CartId { get; set; }
    }
}
