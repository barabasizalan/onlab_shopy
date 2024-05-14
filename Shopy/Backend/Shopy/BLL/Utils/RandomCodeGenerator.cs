using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Utils
{
    public class RandomCodeGenerator
    {
        private static readonly Random random = new Random();
        private const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string GenerateCode(int length)
        {
            StringBuilder code = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                code.Append(characters[random.Next(characters.Length)]);
            }
            return code.ToString();
        }
    }
}
