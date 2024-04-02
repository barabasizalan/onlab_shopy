﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShopyBackend.BLL_Domain_.Entities
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }
        [Required]
        public byte[] ImageData { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
