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

        public void SendBytes(byte[] data, SendOption sendOption = SendOption.None)
        {
            Connection.SendBytes(data, sendOption);
        }

        public Connection Connection { get; private set; }
        public string Name { get; set; }
        public string CharacterName { get; set; }
        public int CharacterId { get; set; }
        public byte Version { get; set; }
    }
}