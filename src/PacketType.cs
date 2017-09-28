namespace SM64O
{
    public enum PacketType
    {
        Handshake = 0,
        PlayerData = 1,
        GameMode = 2,
        ChatMessage = 3,
        CharacterSwitch = 4,
        RoundtripPing = 5,
        WrongVersion = 6
    }
}