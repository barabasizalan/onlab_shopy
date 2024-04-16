namespace BLL.DTO
{
    public class PagedProductDto
    {
        public IEnumerable<ProductDto> Products { get; set; }
        public int TotalCount { get; set; }
    }
}
