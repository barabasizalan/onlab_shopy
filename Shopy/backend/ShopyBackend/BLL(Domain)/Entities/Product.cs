using ShopyBackend.BLL_Domain_.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopyBackend.DAL.Entities
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public int Vat { get; set; }
        public string UserId { get; set; }

        [Required]
        [ForeignKey("Image")]
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public virtual Category Category { get; set; }
    }
}
