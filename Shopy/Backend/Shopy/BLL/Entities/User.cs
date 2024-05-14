using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace BLL.Entities
{
    public class User: IdentityUser
    {
        public virtual List<Order> Orders { get; set; }

        public int? AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }

    }
}
