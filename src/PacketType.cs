namespace SM64O
{
    public enum PacketType
    {
        MemoryWrite = 0,
        ChatMessage = 1,
        CharacterSwitch = 2,
        RoundtripPing = 3,
        Handshake = 0xFF
    }
}