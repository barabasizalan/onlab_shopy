using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace BLL.Entities
{

    [Table("User")]
    public class User: IdentityUser
    {
        public virtual List<Order> Orders { get; set; }

    }
}
