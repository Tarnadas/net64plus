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

        public Client(Form1 gui, IEmulatorAccessor memory, IPAddress target)
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
            };
            _connection.Connect();
        }
        
        private void OnMessage(MessageEventArgs e)
        {
            byte[] data = e.RawData;
            if (data.Length == 0) return;

            Console.WriteLine("receive packet: " + data.ToString());
            Console.WriteLine(PrintBytes(data));
            PacketType type = (PacketType)data[0];
            byte[] payload = data.Skip(1).ToArray();

            switch (type)
            {
                case PacketType.MemoryWrite:
                    ReceiveRawMemory(payload);
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

        private void ReceiveRawMemory(byte[] data)
        {
            if (data.Length == 1)
            {
                _memory.WriteMemory(0x367703, data, data.Length);
                return;
            }

            int offset = BitConverter.ToInt32(data, 0);
            if (offset < 0x365ff0 || offset > 0x369000) // Only allow 8 MB N64 RAM addresses
                return; //  Kaze: retrict it to 365ff0 to 369000

            byte[] buffer = new byte[data.Length - 4];
            data.Skip(4).ToArray().CopyTo(buffer, 0);

            _memory.WriteMemory(offset, buffer, buffer.Length);
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

        public void sendAllBytes()
        {
            //int freeRamLength = getRamLength(0x367400);
            const int len = 0x240;

            int[] offsetsToReadFrom = new int[len];
            int[] offsetsToWriteToLength = new int[len];
            int[] offsetsToWriteTo = new int[len];

            byte[] originalBuffer = new byte[len];
            _memory.ReadMemory(0x367400, originalBuffer, originalBuffer.Length);

            byte[] buffer = originalBuffer;
            Console.WriteLine(PrintBytes(buffer));

            for (int i = 0; i < len; i += 12)
            {
                if ((buffer[i] | buffer[i + 1] | buffer[i + 2] | buffer[i + 3]) == 0) continue;

                buffer = buffer.Skip(0 + i).Take(4).ToArray();
                long wholeAddress = BitConverter.ToInt32(buffer, 0);
                wholeAddress -= 0x80000000;
                offsetsToReadFrom[i + 0] = (int)wholeAddress;
                buffer = originalBuffer;

                buffer = buffer.Skip(4 + i).Take(4).ToArray();
                int wholeAddress1 = BitConverter.ToInt32(buffer, 0);
                offsetsToWriteToLength[i + 4] = (int)wholeAddress1;
                buffer = originalBuffer;

                buffer = buffer.Skip(8 + i).Take(4).ToArray();
                long wholeAddress2 = BitConverter.ToInt32(buffer, 0);
                wholeAddress2 -= 0x80000000;
                offsetsToWriteTo[i + 8] = (int)wholeAddress2;

                buffer = originalBuffer;

                readAndSend(offsetsToReadFrom[i], offsetsToWriteTo[i + 8], offsetsToWriteToLength[i + 4]);

            }
        }

        private void readAndSend(int offsetToRead, int offsetToWrite, int howMany)
        {
            byte[] buffer = new byte[howMany];
            byte[] writeOffset = BitConverter.GetBytes(offsetToWrite);

            _memory.ReadMemory(offsetToRead, buffer, buffer.Length);

            byte[] finalOffset = new byte[howMany + 4];
            writeOffset.CopyTo(finalOffset, 0);
            buffer.CopyTo(finalOffset, 4);
            
            Console.WriteLine("readAndSend");
            _connection.SendPacket(PacketType.MemoryWrite, finalOffset);
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

            Console.WriteLine("sendAllChat");
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

            Console.WriteLine("sendChatTo");
            _connection.SendPacket(PacketType.ChatMessage, payload);
        }

        public void setCharacter(int index)
        {
            Console.WriteLine("setCharacter");
            _connection.SendPacket(PacketType.CharacterSwitch, new byte[] { (byte)(index) });
        }

        public void Ping()
        {
            byte[] buffer = new byte[4];
            Array.Copy(BitConverter.GetBytes(Environment.TickCount), 0, buffer, 0, 4);

            Console.WriteLine("Ping");
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