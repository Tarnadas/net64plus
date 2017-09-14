namespace SM64O
{
    public interface IEmulatorAccessor
    {
        bool Attached { get; }
        int BaseAddress { get; }
        int MainModuleAddress { get; }
        string WindowName { get; }
        void Open(string processName);
        int WriteMemory(int offset, byte[] buffer, int bufferLength);
        int ReadMemory(int offset, byte[] buffer, int bufferLength);

        int WriteMemoryAbs(int address, byte[] buffer, int bufferLength);
        int ReadMemoryAbs(int address, byte[] buffer, int bufferLength);
    }
}