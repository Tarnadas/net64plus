using Hazel;
using Hazel.Udp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using ConnectionState = Hazel.ConnectionState;

namespace SM64O
{
    public partial class Form1 : Form
    {
        /*
         * important strings can be stored to save processing time having to build them over and over from methods
         * current implementations will not be bothered; however, switching them over in time would do well
         * also makes changing a file/folder name EZ
         */
        public static readonly string BASE_DIR = AppDomain.CurrentDomain.BaseDirectory;
        public static readonly string PATCHES_DIR = BASE_DIR + "/Patches/";
        public static readonly string RESSOURCES_DIR = BASE_DIR + "/Ressources/";
        //your bannde
        public const string BANDS_FILE = "bans.txt";

        public static ConnectionListener listener = null;
        public static Connection connection = null;
        public static Client[] playerClient = new Client[23];

        private ListBox _dynamicChatbox;
        private string _bands = "";

        private bool _chatEnabled = true;
        private int _updateRate = 16;

        private IEmulatorAccessor _memory;
        private const int MinorVersion = 3;
        private const int MajorVersion = 1;

        private const int HandshakeDataLen = 28;
        private const int MaxChatLength = 24;

        private Task _mainTask;
        private UPnPWrapper _upnp;
        private bool _closing;

        public Form1()
        {
            listener = null;
            connection = null;
            playerClient = new Client[23];

            InitializeComponent();

            _upnp = new UPnPWrapper();
            _upnp.Available += UpnpOnAvailable;
            if (_upnp.UPnPAvailable)
                UpnpOnAvailable(_upnp, EventArgs.Empty);
            _upnp.Initialize();

            //if Patches does not exist, make it!
            Directory.CreateDirectory(PATCHES_DIR);
            string[] fileEntries = Directory.GetFiles(PATCHES_DIR);

            foreach (var file in fileEntries)
            {
                string fileName = Path.GetFileName(file); //file is the full path of the file, fileName is only the file's name (with extension)
                string ressourcesParallel = RESSOURCES_DIR + fileName;
                byte[] buffer = File.ReadAllBytes(file);

                //this version allows overwriting existing files in Ressources. Not uncommenting just in case this method is unfavored.
                //File.Copy(file, ressourcesParallel, true);

                if (File.Exists(ressourcesParallel))
                {
                    File.Delete(ressourcesParallel);
                }

                for (int i = 0; i < buffer.Length; i += 4)
                {
                    byte[] newBuffer = buffer.Skip(i).Take(4).ToArray();
                    newBuffer = newBuffer.Reverse().ToArray();
                    using (var fs = new FileStream(ressourcesParallel, FileMode.OpenOrCreate, FileAccess.Write))
                    {
                        fs.Seek(i, SeekOrigin.Current);
                        fs.Write(newBuffer, 0, newBuffer.Length);
                    }
                }
            }

            //moving this outside so we don't read the bans file for every file in the patches directory!
            if (File.Exists(BANDS_FILE))
            {
                foreach (var line in File.ReadAllLines(BANDS_FILE))
                {
                    _bands += line + " ";
                }
            }

            // TODO: Change this according to OS
            _memory = new WindowsEmulatorAccessor();

            this.Text = "SM64 Online Tool v1.3.1 Hotfix";
        }

        private void UpnpOnAvailable(object o, EventArgs eventArgs)
        {
            if (checkBoxServer.Checked)
            {
                textBoxAddress.Text = _upnp.GetExternalIp();
            }

            toolStripStatusLabel1.Text = "Universal Plug 'n' Play is available!";
        }

        private void die(string msg)
        {
            MessageBox.Show(null, msg, "Critical Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Application.Exit();
        }

        private string getRomName()
        {
            string romname = null;
            byte[] buffer = new byte[64];

            switch (comboBoxEmulator.Text)
            {
                case "Project64":
                    // Super Mario 64 (u) - Project 64 v2.3.3
                    string windowName = _memory.WindowName;


                    for (int i = windowName.Length - 1; i >= 0; i--)
                    {
                        if (windowName[i] == '-')
                        {
                            romname = windowName.Substring(0, i).Trim();
                            break;
                        }
                    }
                    break;
                case "Mupen64":
                    string wndname = _memory.WindowName;

                    for (int i = wndname.Length - 1; i >= 0; i--)
                    {
                        if (wndname[i] == '-')
                        {
                            romname = wndname.Substring(0, i).Trim();
                            break;
                        }
                    }
                    break;
                case "Nemu64":
                    _memory.ReadMemoryAbs(_memory.MainModuleAddress + 0x3C8A10C, buffer, buffer.Length);

                    romname = Program.GetASCIIString(buffer, 0, Array.IndexOf(buffer, (byte)0));
                    break;
                case "Mupen64+":
                    {
                        _memory.ReadMemoryAbs(_memory.GetModuleBaseAddress("mupen64plus.dll") + 0x1751CA0, buffer, buffer.Length);

                        romname = Program.GetASCIIString(buffer, 0, Array.IndexOf(buffer, (byte)0));
                    }
                    break;
            }

            return romname;
        }

        private void sendAllChat(string message)
        {
            string name = "HOST";

            if (!string.IsNullOrWhiteSpace(usernameBox.Text))
                name = usernameBox.Text;

            if (message.Length > MaxChatLength)
                message = message.Substring(0, MaxChatLength);

            if (name.Length > MaxChatLength)
                name = name.Substring(0, MaxChatLength);

            byte[] messageBytes = Encoding.ASCII.GetBytes(message);
            byte[] usernameBytes = Encoding.ASCII.GetBytes(name);


            byte[] payload = new byte[1 + messageBytes.Length + 1 + usernameBytes.Length];

            payload[0] = (byte)messageBytes.Length;

            Array.Copy(messageBytes, 0, payload, 1, messageBytes.Length);

            payload[messageBytes.Length + 1] = (byte)usernameBytes.Length;

            Array.Copy(usernameBytes, 0, payload, 1 + messageBytes.Length + 1, usernameBytes.Length);

            if (listener != null)
            {
                for (int i = 0; i < playerClient.Length; i++)
                    if (playerClient[i] != null)
                        playerClient[i].SendBytes(PacketType.ChatMessage, payload, SendOption.Reliable);
            }
            else
            {
                connection.SendBytes(PacketType.ChatMessage, payload, SendOption.Reliable);
            }


            if (_chatEnabled && listener != null)
            {
                Characters.setMessage(message, _memory);

                if (_dynamicChatbox != null)
                {
                    _dynamicChatbox.Items.Insert(0, string.Format("{0}: {1}", "HOST", message));

                    if (_dynamicChatbox.Items.Count > 10)
                        _dynamicChatbox.Items.RemoveAt(10);
                }
            }
        }

        private void sendChatTo(string message, Connection conn)
        {
            string name = "HOST";

            if (!string.IsNullOrWhiteSpace(usernameBox.Text))
                name = usernameBox.Text;

            if (message.Length > MaxChatLength)
                message = message.Substring(0, MaxChatLength);

            if (name.Length > MaxChatLength)
                name = name.Substring(0, MaxChatLength);

            byte[] messageBytes = Encoding.ASCII.GetBytes(message);
            byte[] usernameBytes = Encoding.ASCII.GetBytes(name);


            byte[] payload = new byte[1 + messageBytes.Length + 1 + usernameBytes.Length];

            payload[0] = (byte)messageBytes.Length;

            Array.Copy(messageBytes, 0, payload, 1, messageBytes.Length);

            payload[messageBytes.Length + 1] = (byte)usernameBytes.Length;

            Array.Copy(usernameBytes, 0, payload, 1 + messageBytes.Length + 1, usernameBytes.Length);

            conn.SendBytes(PacketType.ChatMessage, payload, SendOption.Reliable);
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            buttonJoin.Enabled = false;

            backgroundPanel.Enabled = false;

            try
            {

                Task memoryRead = null;
                switch (comboBoxEmulator.Text)
                {
                    case "Project64":
                        memoryRead = Task.Run(() => _memory.Open("Project64"));
                        break;
                    case "Nemu64":
                        memoryRead = Task.Run(() => _memory.Open("Nemu64"));
                        break;
                    case "Mupen64":
                        memoryRead = Task.Run(() => _memory.Open("Mupen64"));
                        break;
                    case "Mupen64+":
                        memoryRead = Task.Run(() => _memory.Open("mupen64plus-ui-console", 32));
                        break;
                    default:
                        die("No emulator was chosen. This should never happen. Yell at Guad if you can see this!");
                        return;
                }

                toolStripStatusLabel1.Text = "Scanning emulator memory...";

                await memoryRead;
            }
            catch (IndexOutOfRangeException)
            {
                die("Your emulator is not running!");
                return;
            }

            try
            {
                if (checkBoxServer.Checked)
                {
                    textBoxAddress.Text = "";
                    int port = (int)numericUpDown2.Value;

                    if (_upnp.UPnPAvailable && !checkBoxLAN.Enabled)
                    {
                        _upnp.AddPortRule(port, false, "SM64O");
                        textBoxAddress.Text = _upnp.GetExternalIp();
                    }

                    listener = new UdpConnectionListener(new NetworkEndPoint(IPAddress.Any, port));
                    listener.NewConnection += NewConnectionHandler;

                    toolStripStatusLabel1.Text = "Starting server...";

                    await Task.Run((Action)listener.Start);

                    if (!checkBoxLAN.Checked)
                    {
                        toolStripStatusLabel1.Text = "Querying SM64O port service...";
                        bool success = await NetworkHelper.RequestAssistance(port);

                        if (success)
                        {
                            if (string.IsNullOrEmpty(textBoxAddress.Text) && !string.IsNullOrEmpty(NetworkHelper.ExternalIp))
                                textBoxAddress.Text = NetworkHelper.ExternalIp;
                        }
                        else
                        {
                            var result = MessageBox.Show(this,
                                "Your ports do not seem to be forwarded!\n" +
                                "Nobody outside of your local network will be able to connect. " +
                                "If you would like to play on LAN, tick the checkbox.\n\nWould you like to continue anyways?", "Attention",
                                MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                            if (result == DialogResult.No)
                            {
                                Application.Exit();
                                return;
                            }
                        }
                    }

                    toolStripStatusLabel1.Text = "Server started!";

                    insertChatBox();

                    panel2.Enabled = true;
                    playerCheckTimer.Start();

                    Characters.setMessage("server created", _memory);
                }
                else
                {
                    toolStripStatusLabel1.Text = "Connecting to server...";

                    byte[] payload = new byte[HandshakeDataLen];
                    payload[0] = (byte)MinorVersion;
                    payload[1] = (byte)this.comboBoxChar.SelectedIndex;
                    payload[2] = (byte)MajorVersion;

                    string username = usernameBox.Text;

                    if (string.IsNullOrWhiteSpace(username))
                    {
                        username = getRandomUsername();
                        usernameBox.Text = username;
                    }

                    usernameBox.Enabled = false;

                    byte[] usernameBytes = Encoding.ASCII.GetBytes(username);
                    int len = usernameBytes.Length;
                    if (len > 24) // Arbitrary max length
                        len = 24;

                    payload[3] = (byte)len;
                    Array.Copy(usernameBytes, 0, payload, 4, len);

                    IPAddress target = null;
                    bool isIp6 = false;

                    string text = textBoxAddress.Text.Trim();

                    if (!IPAddress.TryParse(text, out target))
                    {
                        // Maybe DNS?
                        try
                        {
                            var dns = Dns.GetHostEntry(text);
                            if (dns.AddressList.Length > 0)
                                target = dns.AddressList[0];
                            else throw new SocketException();
                        }
                        catch (SocketException ex)
                        {
                            MessageBox.Show(this,
                                "Could not connect to server:\n" + ex.Message);
                            Application.Exit();
                            return;
                        }
                    }

                    isIp6 = target.AddressFamily == AddressFamily.InterNetworkV6;

                    NetworkEndPoint endPoint = new NetworkEndPoint(target, (int)numericUpDown2.Value, isIp6 ? IPMode.IPv6 : IPMode.IPv4);
                    connection = new UdpClientConnection(endPoint);
                    connection.DataReceived += DataReceived;
                    connection.Disconnected += ConnectionOnDisconnected;

                    labelPlayersOnline.Text = "Chat Log:";

                    await Task.Run(() => connection.Connect(payload, 3000));

                    pingTimer.Start();
                }
            }
            catch (HazelException ex)
            {
                string msg = "Could not connect/start server!";
                if (ex.InnerException != null)
                    msg = "Could not connect/start server:\n" + ex.InnerException.Message;
                die(msg);
                return;
            }
            catch (Exception ex)
            {
                // TODO: add logging 
                die("Could not connect/start server:\n" + ex.Message + "\n\nMore info:\n" + ex);
                return;
            }

            checkBoxServer.Enabled = false;

            timer1_Tick();
            buttonJoin.Enabled = false;

            numUpDownInterval.Enabled = true;

            chatBox.Enabled = true;
            buttonChat.Enabled = true;
            numericUpDown2.Enabled = false;
            checkBoxLAN.Enabled = false;
            textBoxAddress.ReadOnly = true;

            comboBoxEmulator.Enabled = false;
            //comboBox2.Enabled = false;

            checkBoxChat.Enabled = true;

            buttonReset.Enabled = true;

            Characters.setCharacter(comboBoxChar.SelectedItem.ToString(), _memory);

            loadPatches();

            toolStripStatusLabel1.Text = "Loaded ROM " + getRomName();

            if (checkBoxServer.Checked)
            {
                writeValue(new byte[] { 0x00, 0x00, 0x00, 0x01 }, 0x365FFC);
            }

            Settings sets = new Settings();

            sets.LastIp = checkBoxServer.Checked ? "" : textBoxAddress.Text;
            sets.LastPort = (int)numericUpDown2.Value;
            sets.Username = usernameBox.Text;

            sets.LastEmulator = comboBoxEmulator.SelectedIndex;
            sets.LastCharacter = comboBoxChar.SelectedIndex;

            Settings.Save(sets, "settings.xml");

            backgroundPanel.Enabled = true;
        }

        private void loadPatches()
        {
            string[] fileEntries = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/Ressources/");

            foreach (var file in fileEntries)
            {
                string fname = Path.GetFileName(file);
                int offset;

                if (int.TryParse(fname, NumberStyles.HexNumber, CultureInfo.InvariantCulture, out offset))
                {
                    byte[] buffer = File.ReadAllBytes(file);
                    _memory.WriteMemory(offset, buffer, buffer.Length);
                }
                else if (fname.Contains('.'))
                {
                    // Treat as Regex
                    int separator = fname.LastIndexOf(".", StringComparison.Ordinal);
                    string regexPattern = fname.Substring(0, separator);
                    string address = fname.Substring(separator + 1, fname.Length - separator - 1);
                    string romname = getRomName();

                    regexPattern = regexPattern.Replace("@", "\\");
                    bool invert = false;

                    if (regexPattern[0] == '!')
                    {
                        regexPattern = regexPattern.Substring(1);
                        invert = true;
                    }

                    if (romname == null)
                        continue;

                    bool isMatch = Regex.IsMatch(romname, regexPattern,
                        RegexOptions.CultureInvariant | RegexOptions.IgnoreCase);

                    if ((isMatch && !invert) || (!isMatch && invert))
                    {
                        offset = int.Parse(address, NumberStyles.HexNumber, CultureInfo.InvariantCulture);

                        byte[] buffer = File.ReadAllBytes(file);
                        _memory.WriteMemory(offset, buffer, buffer.Length);
                    }
                }


            }
        }

        private void ConnectionOnDisconnected(object sender, DisconnectedEventArgs disconnectedEventArgs)
        {
            removeAllPlayers();
            die("You have been disconnected!");
        }

        private void NewConnectionHandler(object sender, NewConnectionEventArgs e)
        {
            try
            {
                if (_bands.Contains(e.Connection.EndPoint.ToString().Split(':')[0]))
                {
                    sendChatTo("banned", e.Connection);
                    e.Connection.Close();
                    return;
                }

                for (int i = 0; i < playerClient.Length; i++)
                {
                    if (playerClient[i] == null)
                    {
                        playerClient[i] = new Client(e.Connection);
                        playerClient[i].Id = i;
                        playerClient[i].Name = "anon";

                        e.Connection.DataReceived += DataReceivedHandler;
                        e.Connection.Disconnected += client_Disconnected;

                        int playerIDB = i + 2;
                        byte[] playerID = new byte[] { (byte)playerIDB };
                        Thread.Sleep(500);
                        playerClient[i].SendBytes(PacketType.MemoryWrite, playerID);
                        string character = "custom ";

                        if (e.HandshakeData != null && e.HandshakeData.Length > 3)
                        {
                            byte[] handshakeData = new byte[HandshakeDataLen];

                            Array.Copy(e.HandshakeData, 3, handshakeData, 0, Math.Min(e.HandshakeData.Length - 3, HandshakeDataLen));

                            if (handshakeData.Length >= 2)
                            {
                                byte verIndex = handshakeData[0];
                                byte charIndex = handshakeData[1];
                                playerClient[i].MinorVersion = verIndex;
                                playerClient[i].CharacterId = charIndex;
                                character = getCharacterName(charIndex);
                            }
                            if (e.HandshakeData.Length >= 3)
                            {
                                playerClient[i].MajorVersion = handshakeData[2];
                            }
                            if (e.HandshakeData.Length >= 4)
                            {
                                byte usernameLen = handshakeData[3];
                                string name = Program.GetASCIIString(handshakeData, 4, usernameLen);
                                playerClient[i].Name = name;
                            }

                            playerClient[i].CharacterName = character;
                        }

                        listBoxPlayers.Items.Add(playerClient[i]);

                        string msg = string.Format("{0} joined", playerClient[i].Name);
                        if (msg.Length > MaxChatLength)
                            msg = msg.Substring(0, 24);

                        sendAllChat(msg);
                        return;
                    }
                }

                // Server is full
                sendChatTo("server is full", e.Connection);
                e.Connection.Close();
            }
            finally
            {
                labelPlayersOnline.Text = "Players Online: " + playerClient.Count(c => c != null) + "/" + playerClient.Length;
            }
        }

        private void client_Disconnected(object sender, DisconnectedEventArgs e)
        {
            Connection conn = (Connection)sender;
            for (int i = 0; i < playerClient.Length; i++)
            {
                if (playerClient[i] != null && playerClient[i].Connection == conn)
                {
                    removePlayer(i);
                    break;
                }
            }
        }

        private void removePlayer(int player)
        {
            if (player == -1 || playerClient[player] == null) return;

            string msg = string.Format("{0} left", playerClient[player].Name);
            if (msg.Length > MaxChatLength)
                msg = msg.Substring(0, 24);

            listBoxPlayers.Items.Remove(playerClient[player]);

            playerClient[player].Connection.DataReceived -= DataReceivedHandler;
            playerClient[player] = null;

            labelPlayersOnline.Text = "Players Online: " + playerClient.Count(c => c != null) + "/" + playerClient.Length;

            const int playersPositionsStart = 0x36790C;
            const int playerPositionsSize = 0x100;
            // 0xc800
            byte[] buffer = new byte[] { 0x00, 0x00, 0x00, 0xFD };
            _memory.WriteMemory(playersPositionsStart + playerPositionsSize * player, buffer, buffer.Length);

            sendAllChat(msg);
        }

        private void DataReceivedHandler(object sender, Hazel.DataReceivedEventArgs e)
        {
            var conn = (Connection)sender;

            ReceivePacket(conn, e.Bytes);

            e.Recycle();
        }

        private void DataReceived(object sender, Hazel.DataReceivedEventArgs e)
        {
            if (e.Bytes.Length == 0)
                return;

            ReceivePacket((Connection)sender, e.Bytes);
            e.Recycle();
        }

        private object _listboxLock = new object();
        private void ReceivePacket(Connection sender, byte[] data)
        {
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
                case PacketType.CharacterSwitch:
                    byte newCharacter = payload[0];
                    string newCharName = getCharacterName(newCharacter);
                    int id = getClient(sender);

                    if (id != -1)
                    {
                        playerClient[id].CharacterId = newCharacter;
                        playerClient[id].CharacterName = newCharName;

                        lock (_listboxLock)
                        {
                            int oldPos = listBoxPlayers.Items.IndexOf(playerClient[id]);
                            listBoxPlayers.Items.Remove(playerClient[id]);
                            if (oldPos != -1)
                                listBoxPlayers.Items.Insert(oldPos, playerClient[id]);
                        }
                    }
                    break;
                case PacketType.RoundtripPing:
                    if (listener != null) // We're host
                    {
                        // Just send it back
                        sender.SendBytes(PacketType.RoundtripPing, payload);
                    }
                    else if (connection != null) // We're client
                    {
                        // We got our pong
                        int sendTime = BitConverter.ToInt32(payload, 0);
                        int currentTime = Environment.TickCount;

                        int elapsed = currentTime - sendTime;

                        pingLabel.Text = string.Format("Ping: {0}ms", elapsed / 2);
                    }
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
            if (connection == null) // We are the host
                for (int i = 0; i < Form1.playerClient.Length; i++)
                {
                    if (Form1.playerClient[i] != null)
                        Form1.playerClient[i].SendBytes(PacketType.ChatMessage, data);
                }

            if (!_chatEnabled) return;

            string message = "";
            string sender = "";

            int msgLen = data[0];
            message = Program.GetASCIIString(data, 1, msgLen);
            int nameLen = data[msgLen + 1];
            sender = Program.GetASCIIString(data, msgLen + 2, nameLen);

            Characters.setMessage(message, _memory);

            if (listener == null) // We're not the host
            {
                listBoxPlayers.Items.Insert(0, string.Format("{0}: {1}", sender, message));

                if (listBoxPlayers.Items.Count > 10)
                    listBoxPlayers.Items.RemoveAt(10);
            }

            if (_dynamicChatbox != null)// We're the host
            {
                _dynamicChatbox.Items.Insert(0, string.Format("{0}: {1}", sender, message));

                if (_dynamicChatbox.Items.Count > 10)
                    _dynamicChatbox.Items.RemoveAt(10);
            }
        }

        public void writeValue(byte[] buffer, int offset)
        {
            buffer = buffer.Reverse().ToArray();
            _memory.WriteMemory(offset, buffer, buffer.Length);
        }

        private void timer1_Tick()
        {
            _mainTask = Task.Run(async () =>
            {
                while (!_closing)
                {
                    try
                    {
                        sendAllBytes();
                    }
                    catch (Exception e)
                    {
                        Program.LogException(e);
                    }

                    await Task.Delay(_updateRate);
                }
            });

            _mainTask.ContinueWith((t) =>
            {
                if (t.IsFaulted || t.Exception != null)
                {
                    Program.LogException(t.Exception ?? new Exception("Exception in main loop!"));
                }
            });
        }

        // not touching this
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

            for (int i = 0; i < len; i += 12)
            {
                if ((buffer[i] | buffer[i + 1] | buffer[i + 2] | buffer[i + 3]) == 0)
                    continue;

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

                if (listener != null)
                {
                    for (int p = 0; p < playerClient.Length; p++)
                        if (playerClient[p] != null)
                            readAndSend(offsetsToReadFrom[i], offsetsToWriteTo[i + 8], offsetsToWriteToLength[i + 4], playerClient[p]);
                }
                else
                    readAndSend(offsetsToReadFrom[i], offsetsToWriteTo[i + 8], offsetsToWriteToLength[i + 4], connection);

            }
        }

        public int getRamLength(int offset)
        {
            for (int i = 0; i < 0x1024; i += 4)
            {
                byte[] buffer = new byte[4];

                _memory.ReadMemory(offset + i, buffer, buffer.Length);
                if ((buffer[0] | buffer[1] | buffer[2] | buffer[3]) == 0)
                    return i;
            }
            return 0;
        }

        public void readAndSend(int offsetToRead, int offsetToWrite, int howMany, Connection conn)
        {
            byte[] buffer = new byte[howMany];
            byte[] writeOffset = BitConverter.GetBytes(offsetToWrite);

            _memory.ReadMemory(offsetToRead, buffer, buffer.Length);

            byte[] finalOffset = new byte[howMany + 4];
            writeOffset.CopyTo(finalOffset, 0);
            buffer.CopyTo(finalOffset, 4);
            conn.SendBytes(PacketType.MemoryWrite, finalOffset);

            Debug.WriteLine("Sending packet of length " + howMany);
        }

        private void textBox5_TextChanged(object sender, EventArgs e)
        {
            if (textBoxAddress.Text != "")
            {
                buttonJoin.Enabled = true;
            }
            else
            {
                buttonJoin.Enabled = false;
            }
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {
            _updateRate = (int)numUpDownInterval.Value;
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBoxServer.Checked)
            {
                textBoxAddress.Text = "";
                usernameBox.Text = "";
                usernameBox.Enabled = false;

                buttonJoin.Enabled = true;

                buttonJoin.Text = "Create Server!";
                usernameBox.Enabled = false;
                panel2.Enabled = true;
                textBoxAddress.ReadOnly = true;
                buttonJoin.Enabled = true;

                if (_upnp.UPnPAvailable)
                    textBoxAddress.Text = _upnp.GetExternalIp();
                else textBoxAddress.Text = "";

                checkBoxLAN.Enabled = true;
            }
            else
            {
                usernameBox.Enabled = true;

                buttonJoin.Text = "Connect to server!";
                textBoxAddress.ReadOnly = false;
                textBoxAddress.Text = "";
                usernameBox.Enabled = true;
                panel2.Enabled = false;
                buttonJoin.Enabled = false;

                checkBoxLAN.Enabled = false;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            comboBoxEmulator.SelectedIndex = 0;
            comboBoxChar.SelectedIndex = 0;
            gamemodeBox.SelectedIndex = 0;

            Settings sets = Settings.Load("settings.xml");

            if (sets != null)
            {
                textBoxAddress.Text = sets.LastIp;
                numericUpDown2.Value = sets.LastPort;
                usernameBox.Text = sets.Username;

                comboBoxEmulator.SelectedIndex = sets.LastEmulator;
                comboBoxChar.SelectedIndex = sets.LastCharacter;
            }

            // Create the ToolTip and associate with the Form container.
            ToolTip toolTip1 = new ToolTip();

            // Set up the delays for the ToolTip.
            toolTip1.AutoPopDelay = 2500;
            toolTip1.InitialDelay = 500;
            toolTip1.ReshowDelay = 500;
            // Force the ToolTip text to be displayed whether or not the form is active.
            toolTip1.ShowAlways = true;

            // Set up the ToolTip text for the Buttons, Labels, Checkboxes, Lists.
            toolTip1.SetToolTip(this.labelAddress, "Input the IP Address to the host");
            toolTip1.SetToolTip(this.textBoxAddress, "Input the IP Address to the host");

            toolTip1.SetToolTip(this.labelPort, "Input the port to the host");
            toolTip1.SetToolTip(this.numericUpDown2, "Input the port to the host");

            toolTip1.SetToolTip(this.labelUsername, "Input your username");
            toolTip1.SetToolTip(this.usernameBox, "Input your username");

            toolTip1.SetToolTip(this.checkBoxChat, "Check this to disable the chat in your server");
            toolTip1.SetToolTip(this.checkBoxServer, "Check this if you want to make your own server");
            toolTip1.SetToolTip(this.checkBoxLAN, "Check this to disable UPnP and port checking service");

            toolTip1.SetToolTip(this.labelRateUpdate, "The lower the interval, the faster you request updates from other players");

            toolTip1.SetToolTip(this.labelEmulator, "Select your emulator");
            toolTip1.SetToolTip(this.comboBoxEmulator, "Select your emulator");

            toolTip1.SetToolTip(this.labelChar, "Select your playable character");
            toolTip1.SetToolTip(this.comboBoxChar, "Select your playable character");

            toolTip1.SetToolTip(this.chatBox, "Type your chat messages here");
            toolTip1.SetToolTip(this.buttonChat, "Click here to send your message");

            toolTip1.SetToolTip(this.labelMaxClients, "Max number of allowed connections to your server");
            toolTip1.SetToolTip(this.numUpDownClients, "Max number of allowed connections to your server");

            toolTip1.SetToolTip(this.labelGamemode, "Select your gamemode");
            toolTip1.SetToolTip(this.gamemodeBox, "Select your gamemode");

            toolTip1.SetToolTip(this.labelPlayersOnline, "Lists all players who are connected and their messages");
            toolTip1.SetToolTip(this.listBoxPlayers, "Lists all players who are connected and their messages");

            toolTip1.SetToolTip(this.buttonReset, "Click here to reset your game");
        }

        public void setGamemode()
        {
            byte[] buffer = new byte[1];

            switch (gamemodeBox.SelectedIndex)
            {
                case 0:
                    buffer[0] = 1;
                    break;
                case 1:
                    buffer[0] = 2;
                    break;
                case 2:
                    buffer[0] = 3;
                    break;
                case 3:
                    buffer[0] = 4;
                    break;
                case 4:
                    buffer[0] = 5;
                    break;
                case 5:
                    buffer[0] = 6;
                    break;
                case 6:
                    buffer[0] = 7;
                    break;
            }

            _memory.WriteMemory(0x365FF7, buffer, buffer.Length);

            if (playerClient != null)
                for (int p = 0; p < playerClient.Length; p++)
                {
                    if (playerClient[p] != null)
                    {
                        readAndSend(0x365FF4, 0x365FF4, 4, playerClient[p]);
                    }
                }

        }

        private void numericUpDown3_ValueChanged(object sender, EventArgs e)
        {
            playerClient = new Client[(int)numUpDownClients.Value];
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (_chatEnabled)
            {
                if (string.IsNullOrWhiteSpace(chatBox.Text)) return;
                sendAllChat(chatBox.Text);
                chatBox.Text = "";
            }
        }

        private void listBox1_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            int index = listBoxPlayers.IndexFromPoint(e.Location);
            if (index != ListBox.NoMatches)
            {
                // Who did we click on
                Client client = (Client)listBoxPlayers.Items[index];
                int indx = Array.IndexOf(playerClient, client);
                Connection conn = client.Connection;

                if (conn == null) return;

                // That player is long gone, how did this happen? I blame hazel
                if (conn.State == Hazel.ConnectionState.Disconnecting ||
                    conn.State == Hazel.ConnectionState.NotConnected)
                {
                    removePlayer(indx);
                    return;
                }

                // really ghetto
                KickBanForm form = new KickBanForm();
                form.username = listBoxPlayers.Items[index].ToString();

                if (form.ShowDialog() == DialogResult.Yes)
                {
                    sendChatTo("kicked", conn);
                    conn.Close();

                    removePlayer(indx);
                }
                else if (form.ShowDialog() == DialogResult.No)
                {
                    sendChatTo("banned", conn);
                    _bands += conn.EndPoint.ToString().Split(':')[0] + Environment.NewLine;
                    File.AppendAllText("bans.txt", conn.EndPoint.ToString().Split(':')[0] + Environment.NewLine);
                    conn.Close();

                    removePlayer(indx);
                }

                labelPlayersOnline.Text = "Players Online: " + playerClient.Count(c => c != null) + "/" +
                                     playerClient.Length;
            }
        }

        private Random _r = new Random();
        private string getRandomUsername()
        {
            string[] usernames = new[]
            {
                "TheFloorIsLava",
                "BonelessPizza",
                "WOAH",
                "MahBoi",
                "Shoutouts",
                "Sigmario",
                "HeHasNoGrace",
                "Memetopia",
                "ShrekIsLove",
                //mind if I...?
                "CoconutCreamPie", //is this too long?
            };

            return usernames[_r.Next(usernames.Length)];
        }

        private void playerCheckTimer_Tick(object sender, EventArgs e)
        {
            // We aren't host
            if (listener == null) return;

            for (int i = 0; i < playerClient.Length; i++)
            {
                if (playerClient[i] == null) continue;
                if (playerClient[i].Connection.State == Hazel.ConnectionState.Disconnecting ||
                    playerClient[i].Connection.State == Hazel.ConnectionState.NotConnected)
                {
                    removePlayer(i);
                }
                else if (DateTime.Now.Subtract(((UdpServerConnection)playerClient[i].Connection).LastMessage).TotalMilliseconds > 10000)
                {
                    Program.LogException(new Exception("Player " + playerClient[i].Name + " timed out"));
                    playerClient[i].Connection.Close();
                    removePlayer(i);
                }
            }
        }

        private void chatBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (_chatEnabled)
                {
                    if (string.IsNullOrWhiteSpace(chatBox.Text)) return;
                    sendAllChat(chatBox.Text);
                    chatBox.Text = "";
                }
            }
        }


        private void gamemodeBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            _chatEnabled = !checkBoxChat.Checked;
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (connection == null && listener == null)
                return; // We are not in a server yet

            Characters.setCharacterAll(comboBoxChar.SelectedIndex + 1, _memory);

            if (connection != null) // we are a client, notify host to update playerlist
                connection.SendBytes(PacketType.CharacterSwitch, new byte[] { (byte)(comboBoxChar.SelectedIndex) });
        }

        private void removeAllPlayers()
        {
            const int maxPlayers = 27;
            for (int i = 0; i < maxPlayers; i++)
            {
                const int playersPositionsStart = 0x36790C;
                const int playerPositionsSize = 0x100;

                // 0xc800
                byte[] buffer = new byte[] { 0x00, 0x00, 0x00, 0xFD };
                _memory.WriteMemory(playersPositionsStart + (playerPositionsSize * i), buffer, buffer.Length);
            }
        }

        private void resetGame()
        {
            if (!_memory.Attached) return;

            byte[] buffer = new byte[4];

            buffer[0] = 0x00;
            buffer[1] = 0x00;
            buffer[2] = 0x04;
            buffer[3] = 0x00;

            _memory.WriteMemory(0x33b238, buffer, buffer.Length);


            buffer[0] = 0x00;
            buffer[1] = 0x00;
            buffer[2] = 0x01;
            buffer[3] = 0x01;

            _memory.WriteMemory(0x33b248, buffer, buffer.Length);

            buffer[0] = 0x00;
            buffer[1] = 0x00;
            buffer[2] = 0x00;
            buffer[3] = 0x00;

            _memory.WriteMemory(0x38eee0, buffer, buffer.Length);
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            removeAllPlayers();
            if (listener != null)
            {
                listener.Close();
                listener.Dispose();
            }
            closePort();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            resetGame();
        }

        private string getCharacterName(int id)
        {
            string character = "custom";
            switch (id)
            {
                case 0:
                    character = "Mario";
                    break;
                case 1:
                    character = "Luigi";
                    break;
                case 2:
                    character = "Yoshi";
                    break;
                case 3:
                    character = "Wario";
                    break;
                case 4:
                    character = "Peach";
                    break;
                case 5:
                    character = "Toad";
                    break;
                case 6:
                    character = "Waluigi";
                    break;
                case 7:
                    character = "Rosalina";
                    break;
            }

            return character;
        }

        private int getClient(Connection conn)
        {
            for (int i = 0; i < playerClient.Length; i++)
            {
                if (playerClient[i] != null && playerClient[i].Connection == conn)
                    return i;
            }

            return -1;
        }

        private void insertChatBox()
        {
            // 200 / 2 + 10
            listBoxPlayers.Size = new Size(268, 95);

            _dynamicChatbox = new ListBox();

            _dynamicChatbox.Location = new Point(13, 84 + 100);
            _dynamicChatbox.Size = new Size(268, 95);
            _dynamicChatbox.Enabled = false;

            this.panel2.Controls.Add(_dynamicChatbox);
        }

        private void closePort()
        {
            if (_upnp != null)
            {
                _upnp.Available -= UpnpOnAvailable;

                _upnp.RemoveOurRules();
                _upnp.StopDiscovery();
            }
        }

        private void pingTimer_Tick(object sender, EventArgs e)
        {
            if (connection != null && connection.State == ConnectionState.Connected)
            {
                byte[] buffer = new byte[4];

                Array.Copy(BitConverter.GetBytes(Environment.TickCount), 0, buffer, 0, 4);

                connection.SendBytes(PacketType.RoundtripPing, buffer);
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            _closing = true;
        }

        private void forumToolStripMenuItem_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://sm64o.com/forumdisplay.php?fid=11");
        }

        private void discordToolStripMenuItem_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://discordapp.com/invite/k9QMFaB");
        }

        private void creditsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            string message = ("Super Mario 64 Online Team"
                + Environment.NewLine
                + "Kaze Emanuar"
                + Environment.NewLine
                + "MelonSpeedruns"
                + Environment.NewLine
                + "Guad"
                + Environment.NewLine
                + "merlish"
                + Environment.NewLine
                + Environment.NewLine
                + "Luigi 3D Model created by: "
                + Environment.NewLine
                + "Cjes"
                + Environment.NewLine
                + "GeoshiTheRed"
                + Environment.NewLine
                + Environment.NewLine
                + "Toad, Rosalina and Peach 3D Models created by: "
                + Environment.NewLine
                + "AnkleD"
                + Environment.NewLine
                + Environment.NewLine
                + "New Character 3D Models created by: "
                + Environment.NewLine
                + "Marshivolt"
                + Environment.NewLine
                + Environment.NewLine
                + "Character Head Icons created by: "
                + Environment.NewLine
                + "Quasmok");

            string caption = "Credits";
            MessageBoxButtons buttons = MessageBoxButtons.OK;
            DialogResult result;

            result = MessageBox.Show(message, caption, buttons);
        }
    }
}
