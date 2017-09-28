using System;
using System.Net;
using System.Diagnostics;
using System.Text;
using System.Linq;
using System.Windows.Forms;
using System.IO;
using System.IO.Compression;
using WebSocketSharp;

namespace SM64O
{
    public class Client
    {
        private static bool DEBUG = false;
        private readonly byte[] EMPTY = new byte[0x18];

        public int PlayerID = -1;

        private Form1 _gui;
        private WebSocketConnection _connection;
        private IEmulatorAccessor _memory;

        public Client(Form1 gui, int port, IEmulatorAccessor memory, IPAddress target, byte[] payload)
        {
            _gui = gui;
            _memory = memory;
            _connection = new WebSocketConnection("ws://" + target + ":" + port);
            _connection.OnMessage += (sender, e) =>
            {
                onMessage(e);
            };
            _connection.OnOpen += (sender, e) =>
            {
                _gui.AddChatMessage("[SERVER]", "Connected");
                _connection.Send(payload);
                // SetMessage("connected");
            };
            _connection.OnError += (sender, e) =>
            {
                MessageBox.Show(null, e.Message + "\n\n" + e.Exception, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Application.Exit();
            };
            _connection.OnClose += (sender, e) =>
            {
                _memory.WriteMemory(0x365FFC, new byte[1], 1);
                _gui.AddChatMessage("[SERVER]", "Disconnected");
                MessageBox.Show(null, "Server closed", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Application.Exit();
            };
            _connection.Connect();
        }
        
        private void onMessage(MessageEventArgs e)
        {
            byte[] data = e.RawData;
            if (data.Length == 0) return;

            PacketType type = (PacketType)data[0];
            byte[] payload = data.Skip(1).ToArray();

            switch (type)
            {
                case PacketType.Handshake:
                    _memory.WriteMemory(0x365FFC, new byte[1]{ 1 }, 1); // let client think that he is host
                    _memory.WriteMemory(0x367703, new byte[1]{ 1 }, 1); // let client think that he has player ID 1
                    PlayerID = (int)payload[0];
                    _gui.AddChatMessage("[SERVER]", "Your player ID is: " + PlayerID);
                    break;
                case PacketType.PlayerData:
                    receivePlayerData(payload);
                    break;
                case PacketType.GameMode:
                    _memory.WriteMemory(0x365FF7, payload, 1);
                    break;
                case PacketType.ChatMessage:
                    receiveChatMessage(payload);
                    break;
                case PacketType.RoundtripPing:
                    _gui.SetPing((Environment.TickCount - BitConverter.ToInt32(payload, 0)) / 2);
                    break;
                case PacketType.WrongVersion:
                    int major = (int)payload[0];
                    int minor = (int)payload[1];
                    MessageBox.Show(null, "Wrong version!\n\nPlease download version " + major + "." + minor + "\nhttps://www.github.com/Tarnadas/sm64o/releases", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Application.Exit();
                    break;
            }
        }

        private void receivePlayerData(byte[] compressed)
        {
            using (MemoryStream ms = new MemoryStream(compressed))
            using (GZipStream gs = new GZipStream(ms, CompressionMode.Decompress))
            using (MemoryStream res = new MemoryStream())
            {
                gs.CopyTo(res);
                byte[] data = res.ToArray();
                byte[] playerData = new byte[0x18];
                int j = 2;
                //Console.Write("received: ");
                //Console.WriteLine(PrintBytes(data));
                for (int i = 0; i < data.Length; i += 0x18)
                {
                    if (PlayerID == (int)data[i + 3]) continue;
                    Array.Copy(data, i, playerData, 0, 0x18);
                    playerData[3] = (byte)j;
                    //Console.Write("write: ");
                    //Console.WriteLine(PrintBytes(playerData));
                    _memory.WriteMemory(0x367700 + 0x100 * j, playerData, 0x18);
                    j++;
                }
                for (; j < 24; j++) {
                    _memory.WriteMemory(0x367700 + 0x100 * j, EMPTY, 0x18);
                }
            }
        }

        private void receiveChatMessage(byte[] data)
        {
            if (!_gui.ChatEnabled) return;

            string message = "";
            string sender = "";

            int msgLen = data[0];
            message = Program.GetASCIIString(data, 1, msgLen);
            int nameLen = data[msgLen + 1];
            sender = Program.GetASCIIString(data, msgLen + 2, nameLen);
            _gui.AddChatMessage(sender, message);
        }

        public void SendPlayerData()
        {
            byte[] payload = new byte[0x18];
            _memory.ReadMemory(0x367700, payload, 0x18);
            if (payload[0xF] != 0)
            {
                _connection.SendPacket(PacketType.PlayerData, payload);
                _memory.WriteMemory(0x367800, payload, 0x18);
            }

            /* byte[] a = new byte[4];
            _memory.ReadMemory(0x32ddf4, a, 2);
            int offset = BitConverter.ToInt16(a, 0) * 0x70;
            Console.WriteLine(offset);
            byte[] check = new byte[1];
            _memory.ReadMemory(0x207700 + offset, check, 1);
            Console.Write("check: ");
            Console.WriteLine(PrintBytes(check));
            byte[] compare = new byte[1];
            _memory.ReadMemory(0x207738 + offset, compare, 1);
            Console.Write("compare: ");
            Console.WriteLine(PrintBytes(compare));
            byte[] write = new byte[1];
            _memory.ReadMemory(0x367710 + offset, write, 1);
            Console.Write("write: ");
            Console.WriteLine(PrintBytes(write)); */
            if (DEBUG)
            {
                /* byte[] starb = new byte[4];
                _memory.ReadMemory(0x367710, starb, 4);
                int star = BitConverter.ToInt32(starb, 0);
                byte[] starb1 = new byte[4];
                _memory.ReadMemory(0x367714, starb1, 4);
                int star1 = BitConverter.ToInt32(starb1, 0);
                if (star != 0)
                {
                    Console.Write("star0: ");
                    Console.WriteLine(PrintBytes(starb));
                }
                if (star1 != 0)
                {
                    Console.Write("star1: ");
                    Console.WriteLine(PrintBytes(starb1));
                } */
                for (int i = 0; i < 24; i++)
                {
                    _memory.ReadMemory(0x367700 + 0x100 * i, payload, 0x18);
                    if (i == 0)
                    {
                        Console.Write("own player data: ");
                        Console.WriteLine(PrintBytes(payload));
                    }
                    else if ((int)payload[3] != 0)
                    {
                        Console.Write("player " + (int)payload[3] + ": ");
                        Console.WriteLine(PrintBytes(payload));
                    }
                }
            }
        }
        
        public void SetMessage(string msg)
        {
            byte[] strBuf = Encoding.ASCII.GetBytes(msg.Where(isPrintable).ToArray());
            byte[] buffer = new byte[strBuf.Length + 4];
            strBuf.CopyTo(buffer, 0);
            for (int i = 0; i < buffer.Length; i += 4)
            {
                byte[] buf = buffer.Skip(i).Take(4).ToArray();
                buf = buf.Reverse().ToArray();
                _memory.WriteMemory(0x367684 + i, buf, 4);
            }

            byte[] empty = new byte[4];
            _memory.WriteMemory(0x367680, empty, 4);
        }

        private static readonly char[] _printables = new[] { ' ', '+', '-', ',', };
        private static bool isPrintable(char c)
        {
            if (char.IsLetterOrDigit(c)) return true;
            if (Array.IndexOf(_printables, c) != -1) return true;
            return false;
        }

        public void SendAllChat(string username, string message)
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

        public void SendChatTo(string username, string message)
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

        public void SetCharacter(int index)
        {
            _memory.WriteMemory(0x365FF3, new byte[] { (byte)(index + 1) }, 1);
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