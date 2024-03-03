using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopyBackend.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int StatusId { get; set; }

        public virtual User User { get; set; }
        public virtual List<OrderDetails> OrderDetails { get; set; }
        public virtual Status Status { get; set; }
    }
}
