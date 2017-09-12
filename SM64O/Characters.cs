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
        public static void setMessage(string msg, IEmulatorAccessor mem)
        {
            int bytesWritten = 0;
            byte[] buffer = Encoding.ASCII.GetBytes(msg);

            byte[] newArray = new byte[buffer.Length + 4];
            buffer.CopyTo(newArray, 0);

            for (int i = 0; i < newArray.Length; i += 4)
            {
                byte[] newBuffer = newArray.Skip(i).Take(4).ToArray();
                newBuffer = newBuffer.Reverse().ToArray();
                mem.WriteMemory(0x367684 + i, newBuffer, newBuffer.Length);
            }

            byte[] overWriteBuffer = new byte[] { 0x00, 0x00, 0x00, 0x00 };
            overWriteBuffer = overWriteBuffer.Reverse().ToArray();
            mem.WriteMemory(0x367680, overWriteBuffer, overWriteBuffer.Length);
        }

        public static void setCharacter(string character, IEmulatorAccessor mem)
        {
            if (character == "Mario")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x01 }, 1);
            }
            if (character == "Luigi")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x02 }, 1);
            }
            if (character == "Yoshi")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x03 }, 1);
            }
            if (character == "Wario")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x04 }, 1);
            }
            if (character == "Peach")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x05 }, 1);
            }
            if (character == "Toad")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x06 }, 1);
            }
            if (character == "Waluigi")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x07 }, 1);
            }
            if (character == "Rosalina")
            {
                int bytesWritten = 0;
                mem.WriteMemory(0x365FF3, new byte[] { 0x08 }, 1);
            }
        }
    }
}
