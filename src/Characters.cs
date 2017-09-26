using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SM64O
{
    public static class Characters
    {
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

        public static void setCharacterAll(int character, IEmulatorAccessor mem)
        {
            mem.WriteMemory(0x365FF3, new byte[] { (byte) character }, 1);
        }
    }
}
