using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class UpdateQuantityDto
    {
        public int CartId { get; set; }
        public int CartItemId { get; set; }
        public int NewQuantity { get; set; }
    }
}
