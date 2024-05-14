using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Entities
{
    [Table("Carts")]
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }

        public string OwnerUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<User> Members { get; set; }
    }
}
