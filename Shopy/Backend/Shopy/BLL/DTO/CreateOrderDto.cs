﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class CreateOrderDto
    {
        public int PaymentMethodId { get; set; }
        public int CartId { get; set; }
    }
}
