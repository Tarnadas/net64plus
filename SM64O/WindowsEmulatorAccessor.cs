using System.Runtime.InteropServices;
using System.Diagnostics;
using System;

namespace SM64O
{
    public class WindowsEmulatorAccessor : IEmulatorAccessor
    {
        [DllImport("kernel32.dll")]
        public static extern IntPtr OpenProcess(int dwDesiredAccess, bool bInheritHandle, int dwProcessId);

        [DllImport("kernel32.dll")]
        public static extern bool ReadProcessMemory(int hProcess, int lpBaseAddress, byte[] lpBuffer, int dwSize, ref int lpNumberOfBytesRead);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool WriteProcessMemory(int hProcess, int lpBaseAddress, byte[] lpBuffer, int dwSize, ref int lpNumberOfBytesWritten);

        const int PROCESS_WM_READ = 0x0010;

        private int baseAddress;
        private IntPtr processHandle;

        public void Open(string processName)
        {
            Process process = Process.GetProcessesByName("Project64")[0];

            baseAddress = ReadWritingMemory.GetBaseAddress("Project64", 4096, 4);

            processHandle = OpenProcess(0x1F0FFF, true, process.Id);
        }

        public int WriteMemory(int offset, byte[] buffer, int bufferLength)
        {
            int bytesWritten = 0;
            WriteProcessMemory((int)processHandle, baseAddress + offset, buffer, bufferLength, ref bytesWritten);
            return bytesWritten;
        }

        public int ReadMemory(int offset, byte[] buffer, int bufferLength)
        {
            int bytesRead = 0;
            ReadProcessMemory((int)processHandle, baseAddress + offset, buffer, bufferLength, ref bytesRead);
            return bytesRead;
        }
    }
}