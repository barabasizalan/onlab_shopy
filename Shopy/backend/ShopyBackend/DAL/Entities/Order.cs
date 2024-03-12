using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopyBackend.DAL.Entities
{
    [Table("Order")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int StatusId { get; set; }
        public virtual List<OrderDetails> OrderDetails { get; set; }
        public virtual Status Status { get; set; }
    }
}
