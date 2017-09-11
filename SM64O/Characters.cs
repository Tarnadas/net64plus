using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SM64O
{
    class Characters
    {

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool WriteProcessMemory(int hProcess, int lpBaseAddress, byte[] lpBuffer, int dwSize, ref int lpNumberOfBytesWritten);

        public static void setUsername(IntPtr processHandle, int baseAddress)
        {
            int bytesWritten = 0;
            byte[] buffer = Encoding.ASCII.GetBytes("Logged in");

            byte[] newArray = new byte[buffer.Length + 4];
            buffer.CopyTo(newArray, 0);

            for (int i = 0; i < newArray.Length; i += 4)
            {
                byte[] newBuffer = newArray.Skip(i).Take(4).ToArray();
                newBuffer = newBuffer.Reverse().ToArray();
                WriteProcessMemory((int)processHandle, baseAddress + 0x367684 + i, newBuffer, newBuffer.Length, ref bytesWritten);
            }

            byte[] overWriteBuffer = new byte[] { 0x00, 0x00, 0x00, 0x00 };
            overWriteBuffer = overWriteBuffer.Reverse().ToArray();
            WriteProcessMemory((int)processHandle, baseAddress + 0x367680, overWriteBuffer, overWriteBuffer.Length, ref bytesWritten);
        }

        public static void setCharacter(string character, IntPtr processHandle, int baseAddress)
        {
            if (character == "Mario")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x01 }, 1, ref bytesWritten);
            }
            if (character == "Luigi")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x02 }, 1, ref bytesWritten);
            }
            if (character == "Yoshi")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x03 }, 1, ref bytesWritten);
            }
            if (character == "Wario")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x04 }, 1, ref bytesWritten);
            }
            if (character == "Peach")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x05 }, 1, ref bytesWritten);
            }
            if (character == "Toad")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x06 }, 1, ref bytesWritten);
            }
            if (character == "Waluigi")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x07 }, 1, ref bytesWritten);
            }
            if (character == "Rosalina")
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x365FF3, new byte[] { 0x08 }, 1, ref bytesWritten);
            }
        }
    }
}
