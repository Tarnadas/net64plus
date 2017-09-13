using System;
using Hazel;

namespace SM64O
{
    public class Client
    {
        public Client()
        {}

        public Client(Connection conn)
        {
            Connection = conn;
        }

        public static implicit operator Connection(Client c)
        {
            return c.Connection;
        }

        public void SendBytes(PacketType type, byte[] data, SendOption sendOption = SendOption.None)
        {
            byte[] buffer = new byte[data.Length + 1];
            buffer[0] = (byte) type;
            Array.Copy(data, 0, buffer, 1, data.Length);

            Connection.SendBytes(buffer, sendOption);
        }

        public Connection Connection { get; private set; }
        public string Name { get; set; }
        public string CharacterName { get; set; }
        public int CharacterId { get; set; }
        public byte MajorVersion { get; set; }
        public byte MinorVersion { get; set; }
        public int Id { get; set; }
        
        public DateTime? LastUpdate { get; set; }

        public override string ToString()
        {
            return string.Format("[{0}] {1} ({2}) v{3}.{4}", Id, Name, CharacterName, MajorVersion, MinorVersion);
        }
    }
}