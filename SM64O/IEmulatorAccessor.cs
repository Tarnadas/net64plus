namespace SM64O
{
    public interface IEmulatorAccessor
    {
        int BaseAddress { get; }
        void Open(string processName);
        int WriteMemory(int offset, byte[] buffer, int bufferLength);
        int ReadMemory(int offset, byte[] buffer, int bufferLength);
    }
}