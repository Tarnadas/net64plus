namespace SM64O
{
    public interface IEmulatorAccessor
    {
        bool Attached { get; }
        int BaseAddress { get; }
        string WindowName { get; }
        void Open(string processName);
        int WriteMemory(int offset, byte[] buffer, int bufferLength);
        int ReadMemory(int offset, byte[] buffer, int bufferLength);
    }
}