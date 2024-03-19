using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ShopyBackend.DAL.Entities
{

    [Table("User")]
    public class User: IdentityUser
    {
        public virtual List<Order> Orders { get; set; }

    }
}
