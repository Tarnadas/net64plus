using System;
using System.Net;
using System.Diagnostics;
using System.Text;
using System.Linq;
using WebSocketSharp;

namespace SM64O
{
    public class Client
    {

        private Form1 _gui;
        private WebSocketConnection _connection;
        private IEmulatorAccessor _memory;
        private bool _connected;

        public Client(Form1 gui, IEmulatorAccessor memory, IPAddress target, byte[] payload)
        {
            _connected = false;
            _gui = gui;
            _memory = memory;
            _connection = new WebSocketConnection("ws://" + target + ":8080");
            _connection.OnMessage += (sender, e) =>
            {
                OnMessage(e);
            };
            _connection.OnOpen += (sender, e) =>
            {
                _connected = true;
                Console.WriteLine("connected");
                _connection.Send(payload);
            };
            _connection.OnError += (sender, e) =>
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.Exception);
            };
            _connection.OnClose += (sender, e) =>
            {
                _connected = false;
                Console.WriteLine("disconnected");
                _memory.WriteMemory(0x365FFC, new byte[1]{ 0 }, 1);
            };
            _connection.Connect();
        }
        
        private void OnMessage(MessageEventArgs e)
        {
            byte[] data = e.RawData;
            if (data.Length == 0) return;

            PacketType type = (PacketType)data[0];
            byte[] payload = data.Skip(1).ToArray();

            switch (type)
            {
                case PacketType.Handshake:
                    _memory.WriteMemory(0x365FFC, new byte[1]{ 2 }, 1);
                    _memory.WriteMemory(0x367703, payload, 1);
                    break;
                case PacketType.PlayerData:
                    ReceivePlayerData(payload);
                    break;
                case PacketType.GameMode:
                    _memory.WriteMemory(0x365FF7, payload, 1);
                    break;
                case PacketType.ChatMessage:
                    ReceiveChatMessage(payload);
                    break;
                case PacketType.RoundtripPing:
                    // We got our pong
                    int sendTime = BitConverter.ToInt32(payload, 0);
                    int currentTime = Environment.TickCount;

                    int elapsed = currentTime - sendTime;

                    _gui.setPing(elapsed / 2);
                    break;
            }
        }

        private void ReceivePlayerData(byte[] data)
        {
            int playerId = (int)data[3] + 3;
            _memory.WriteMemory(0x367700 + 0x100 * playerId, data, 0x18);
        }

        private void ReceiveChatMessage(byte[] data)
        {
            if (!_gui.ChatEnabled) return;

            string message = "";
            string sender = "";

            int msgLen = data[0];
            message = Program.GetASCIIString(data, 1, msgLen);
            int nameLen = data[msgLen + 1];
            sender = Program.GetASCIIString(data, msgLen + 2, nameLen);

            Characters.setMessage(message, _memory);
            _gui.addChatMessage(sender, message);
        }

        public void sendPlayerData()
        {
            byte[] payload = new byte[0x18];
            _memory.ReadMemory(0x367700, payload, 0x18);

            _connection.SendPacket(PacketType.PlayerData, payload);
        }

        public void sendAllChat(string username, string message)
        {
            string name = "HOST";

            if (!string.IsNullOrWhiteSpace(username))
                name = username;

            if (message.Length > Form1.MAX_CHAT_LENGTH)
                message = message.Substring(0, Form1.MAX_CHAT_LENGTH);

            if (name.Length > Form1.MAX_CHAT_LENGTH)
                name = name.Substring(0, Form1.MAX_CHAT_LENGTH);

            byte[] messageBytes = Encoding.ASCII.GetBytes(message);
            byte[] usernameBytes = Encoding.ASCII.GetBytes(name);


            byte[] payload = new byte[1 + messageBytes.Length + 1 + usernameBytes.Length];

            payload[0] = (byte)messageBytes.Length;

            Array.Copy(messageBytes, 0, payload, 1, messageBytes.Length);

            payload[messageBytes.Length + 1] = (byte)usernameBytes.Length;

            Array.Copy(usernameBytes, 0, payload, 1 + messageBytes.Length + 1, usernameBytes.Length);

            _connection.SendPacket(PacketType.ChatMessage, payload);

        }

        public void sendChatTo(string username, string message)
        {
            string name = "HOST";

            if (!string.IsNullOrWhiteSpace(username))
                name = username;

            if (message.Length > Form1.MAX_CHAT_LENGTH)
                message = message.Substring(0, Form1.MAX_CHAT_LENGTH);

            if (name.Length > Form1.MAX_CHAT_LENGTH)
                name = name.Substring(0, Form1.MAX_CHAT_LENGTH);

            byte[] messageBytes = Encoding.ASCII.GetBytes(message);
            byte[] usernameBytes = Encoding.ASCII.GetBytes(name);


            byte[] payload = new byte[1 + messageBytes.Length + 1 + usernameBytes.Length];

            payload[0] = (byte)messageBytes.Length;

            Array.Copy(messageBytes, 0, payload, 1, messageBytes.Length);

            payload[messageBytes.Length + 1] = (byte)usernameBytes.Length;

            Array.Copy(usernameBytes, 0, payload, 1 + messageBytes.Length + 1, usernameBytes.Length);

            _connection.SendPacket(PacketType.ChatMessage, payload);
        }

        public void setCharacter(int index)
        {
            _connection.SendPacket(PacketType.CharacterSwitch, new byte[] { (byte)(index) });
        }

        public void Ping()
        {
            byte[] buffer = new byte[4];
            Array.Copy(BitConverter.GetBytes(Environment.TickCount), 0, buffer, 0, 4);

            _connection.SendPacket(PacketType.RoundtripPing, buffer);
        }

        private string PrintBytes(byte[] byteArray)
        {
            var sb = new StringBuilder("new byte[] { ");
            for(var i = 0; i < byteArray.Length; i++)
            {
                var b = byteArray[i];
                sb.Append(b);
                if (i < byteArray.Length -1)
                {
                    sb.Append(", ");
                }
            }
            sb.Append(" }");
            return sb.ToString();
        }
    }
}