using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace SM64O
{
    static class ReadWritingMemory
    {
        [DllImport("kernel32", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern int OpenProcess(int dwDesiredAccess, int bInheritHandle, int dwProcessId);
        [DllImport("kernel32", EntryPoint = "WriteProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]

        private static extern int WriteProcessMemory1(int hProcess, int lpBaseAddress, ref int lpBuffer, int nSize, ref int lpNumberOfBytesWritten);
        [DllImport("kernel32", EntryPoint = "WriteProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern float WriteProcessMemory2(int hProcess, int lpBaseAddress, ref float lpBuffer, int nSize, ref int lpNumberOfBytesWritten);
        [DllImport("kernel32", EntryPoint = "WriteProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern long WriteProcessMemory3(int hProcess, int lpBaseAddress, ref long lpBuffer, int nSize, ref int lpNumberOfBytesWritten);
        [DllImport("kernel32", EntryPoint = "ReadProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]

        private static extern int ReadProcessMemory1(int hProcess, int lpBaseAddress, ref int lpBuffer, int nSize, ref int lpNumberOfBytesRead);
        [DllImport("kernel32", EntryPoint = "ReadProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern float ReadProcessMemory2(int hProcess, int lpBaseAddress, ref float lpBuffer, int nSize, ref int lpNumberOfBytesRead);
        [DllImport("kernel32", EntryPoint = "ReadProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern long ReadProcessMemory3(int hProcess, int lpBaseAddress, ref long lpBuffer, int nSize, ref int lpNumberOfBytesRead);
        [DllImport("kernel32", EntryPoint = "ReadProcessMemory", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern byte[] ReadProcessMemory4(int hProcess, int lpBaseAddress, byte[] lpBuffer, int iSize, ref int lpNumberOfBytesRead);

        public static bool WriteDMAInteger(string Process, int Address, int[] Offsets, int Value, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadInteger(Process, lvl, nsize) + Offsets[i - 1];
            }
            WriteInteger(Process, lvl, Value, nsize);
            return true;
        }

        public static int ReadDMAInteger(string Process, int Address, int[] Offsets, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadInteger(Process, lvl, nsize) + Offsets[i - 1];
            }
            int vBuffer = 0;
            vBuffer = ReadInteger(Process, lvl, nsize);
            return vBuffer;
        }

        public static bool WriteDMAFloat(string Process, int Address, int[] Offsets, float Value, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadFloat(Process, lvl, nsize) + Offsets[i - 1];
            }
            WriteFloat(Process, lvl, Value, nsize);
            return true;
        }

        public static float ReadDMAFloat(string Process, int Address, int[] Offsets, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadFloat(Process, lvl, nsize) + Offsets[i - 1];
            }
            float vBuffer = 0;
            vBuffer = ReadFloat(Process, lvl, nsize);
            return vBuffer;
        }

        public static bool WriteDMALong(string Process, int Address, int[] Offsets, long Value, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadLong(Process, lvl, nsize) + Offsets[i - 1];
            }
            WriteLong(Process, lvl, Value, nsize);
            return true;
        }

        public static long ReadDMALong(string Process, int Address, int[] Offsets, int Level, int nsize = 4)
        {
            int lvl = Address;
            for (int i = 1; i <= Level; i++)
            {
                lvl = ReadLong(Process, lvl, nsize) + Offsets[i - 1];
            }
            long vBuffer = 0;
            vBuffer = ReadLong(Process, lvl, nsize);
            return vBuffer;
        }

        public static void WriteNOPs(string ProcessName, int Address, int NOPNum)
        {
            int C = 0;
            int B = 0;
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return;
            }

            B = 0;

            int reference = 0x90;
            int reference2 = 0;

            for (C = 1; C <= NOPNum; C++)
            {
                WriteProcessMemory1(hProcess, Address + B, ref reference, 1, ref reference2);
                B = B + 1;
            }
        }

        public static void WriteXBytes(string ProcessName, int Address, string Value)
        {
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return;
            }

            int C = 0;
            int B = 0;
            int D = 0;
            int V = 0;

            int reference = 0;

            B = 0;
            D = 1;
            for (C = 1; C <= (Value.Length / 2); C++)
            {
                V = Convert.ToByte(Value.Substring(D, 2));
                WriteProcessMemory1(hProcess, Address + B, ref V, 1, ref reference);
                B = B + 1;
                D = D + 2;
            }

        }

        public static void WriteInteger(string ProcessName, int Address, int Value, int nsize = 4)
        {
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return;
            }

            int hAddress = 0;
            int vBuffer = 0;
            hAddress = Address;
            vBuffer = Value;

            int reference = Convert.ToInt32(vBuffer);
            int reference2 = 0;

            WriteProcessMemory1(hProcess, hAddress, ref reference, nsize, ref reference2);
        }

        public static void WriteFloat(string ProcessName, int Address, float Value, int nsize = 4)
        {
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return;
            }

            int hAddress = 0;
            float vBuffer = 0;

            hAddress = Address;
            vBuffer = Value;

            int reference = 0;

            WriteProcessMemory2(hProcess, hAddress, ref vBuffer, nsize, ref reference);
        }

        public static void WriteLong(string ProcessName, int Address, long Value, int nsize = 4)
        {
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return;
            }

            int hAddress = 0;
            long vBuffer = 0;

            hAddress = Address;
            vBuffer = Value;

            int reference = 0;

            WriteProcessMemory3(hProcess, hAddress, ref vBuffer, nsize, ref reference);
        }

        public static int ReadInteger(string ProcessName, int Address, int nsize = 4)
        {
            int functionReturnValue = 0;
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return functionReturnValue;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return functionReturnValue;
            }

            int hAddress = 0;
            int vBuffer = 0;

            int reference = 0;

            hAddress = Address;
            ReadProcessMemory1(hProcess, hAddress, ref vBuffer, nsize, ref reference);
            return vBuffer;
        }

        public static int ReadFloat(string ProcessName, int Address, int nsize = 4)
        {
            int functionReturnValue = 0;
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return functionReturnValue;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return functionReturnValue;
            }

            int hAddress = 0;
            int vBuffer = 0;

            hAddress = Address;

            int reference = 0;

            ReadProcessMemory1(hProcess, hAddress, ref vBuffer, nsize, ref reference);
            return vBuffer;
        }

        public static int ReadLong(string ProcessName, int Address, int nsize = 4)
        {
            int functionReturnValue = 0;
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return functionReturnValue;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return functionReturnValue;
            }

            int hAddress = 0;
            int vBuffer = 0;

            int reference = 0;

            hAddress = Address;
            ReadProcessMemory1(hProcess, hAddress, ref vBuffer, nsize, ref reference);
            return vBuffer;
        }

        public static int GetBaseAddress(string ProcessName, int scanStep = 0x1000, int nsize = 4)
        {
            if (ProcessName.EndsWith(".exe"))
            {
                ProcessName = ProcessName.Replace(".exe", "");
            }
            Process[] MyP = Process.GetProcessesByName(ProcessName);
            if (MyP.Length == 0)
            {
                MessageBox.Show(ProcessName + " isn't open!");
                return 0;
            }
            int hProcess = OpenProcess(0x1f0ff, 0, MyP[0].Id);
            if (hProcess == 0)
            {
                MessageBox.Show("Failed to open " + ProcessName + "!");
                return 0;
            }

            int vBuffer = 0;
            int startPoint = 0x00000000;

            if (scanStep < 0x1000)
            {
                startPoint = 0x00000000;
            }
            else if (scanStep < 0x100)
            {
                startPoint = 0;
            }

            for (int x = startPoint; x <= 0x72D00000; x += scanStep)
            {
                //Label1.Text = "Currently processing address: " & x

                int reference = 0;

                ReadProcessMemory1(hProcess, x, ref vBuffer, nsize, ref reference);
                if (vBuffer == 0x3C1A8032)
                {
                    reference = 0;
                    ReadProcessMemory1(hProcess, x + 4, ref vBuffer, nsize, ref reference);
                    if (vBuffer == 0x275A7650)
                    {
                        return x;
                    }
                }
            }

            return 0;
        }

    }
}
