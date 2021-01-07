using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace simpleShape
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome")
            Console.WriteLine("Please Enter an integer values");
            int times = Int32.Parse(Console.ReadLine());
          
            for(int count=1; count<=times; count++)
            {
                Console.WriteLine("");
                for(int next=1; next<=times; next++)
                {
                    if(next % 2 == 0)
                    {
                        Console.Write("O");
                    }
                    else
                    {
                        Console.Write("X");
                    }
                }
            }
            Console.WriteLine("");
        }
    }
}
