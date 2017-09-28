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
using WebSocketSharp;

namespace SM64O
{
    public partial class Form1 : Form
    {
        private const int MAJOR_VERSION = 0;
        private const int MINOR_VERSION = 3;
        private const int UPDATE_RATE = 16;
        public  const int MAX_CHAT_LENGTH = 24;
        private const int HANDSHAKE_LENGTH = MAX_CHAT_LENGTH + 5;

        public static readonly string BASE_DIR = AppDomain.CurrentDomain.BaseDirectory;
        public static readonly string PATCHES_DIR = BASE_DIR + "/Patches/";
        public static readonly string RESSOURCES_DIR = BASE_DIR + "/Ressources/";

        private Client _client = null;
        private IEmulatorAccessor _memory;
        private Task _mainTask;
        private bool _closing;

        public bool ChatEnabled = true;

        public Form1()
        {
            _client = null;

            InitializeComponent();

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

            // TODO: Change this according to OS
            _memory = new WindowsEmulatorAccessor();

            this.Text = "Net64+ v" + MAJOR_VERSION + "." + MINOR_VERSION;
        }

        private void die(string msg)
        {
            MessageBox.Show(null, msg, "Critical Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Application.Exit();
        }

        public void SetPing(int ping)
        {
            pingLabel.Text = string.Format("Ping: {0}ms", ping);
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
                        memoryRead = System.Threading.Tasks.Task.Run(() => _memory.Open("Project64"));
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
                toolStripStatusLabel1.Text = "Connecting to server...";

                byte[] payload = new byte[HANDSHAKE_LENGTH];
                payload[0] = (byte)PacketType.Handshake;
                payload[1] = (byte)MAJOR_VERSION;
                payload[2] = (byte)MINOR_VERSION;
                payload[3] = (byte)comboBoxChar.SelectedIndex;

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

                payload[4] = (byte)len;
                Array.Copy(usernameBytes, 0, payload, 5, len);

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
                        MessageBox.Show(this, "Could not connect to server:\n" + ex.Message);
                        Application.Exit();
                        return;
                    }
                }

                try
                {
                    _client = new Client(this, (int)numericUpDown2.Value, _memory, target, payload);
                }
                catch (WebSocketException ex) {
                    MessageBox.Show(this, "Could not connect to server:\n" + ex.Message);
                    Application.Exit();
                    return;
                }

                labelPlayersOnline.Text = "Chat Log:";

                pingTimer.Start();
            }
            catch (Exception ex)
            {
                // TODO: add logging 
                die("Could not connect to server:\n" + ex.Message + "\n\nMore info:\n" + ex);
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

            _client.SetCharacter(comboBoxChar.SelectedIndex);

            loadPatches();

            toolStripStatusLabel1.Text = "Loaded ROM " + getRomName();

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

        private void ConnectionOnDisconnected()
        {
            // TODO
            removeAllPlayers();
            die("You have been disconnected!");
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
                        if (_client.PlayerID != -1) _client.SendPlayerData();
                    }
                    catch (Exception e)
                    {
                        Program.LogException(e);
                    }

                    await Task.Delay(UPDATE_RATE);
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
            // _updateRate = (int)numUpDownInterval.Value;
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
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

        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (ChatEnabled)
            {
                if (string.IsNullOrWhiteSpace(chatBox.Text)) return;
                _client.SendAllChat(usernameBox.Text, chatBox.Text);
                chatBox.Text = "";
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

        private void chatBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (ChatEnabled)
                {
                    if (string.IsNullOrWhiteSpace(chatBox.Text)) return;
                    _client.SendAllChat(usernameBox.Text, chatBox.Text);
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
            ChatEnabled = !checkBoxChat.Checked;
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (_client == null) return; // We are not in a server yet
            _client.SetCharacter(comboBoxChar.SelectedIndex);
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

        public void AddChatMessage(string sender, string message)
        {
            listBoxPlayers.Items.Insert(0, string.Format("{0}: {1}", sender, message));
            if (listBoxPlayers.Items.Count > 10)
            {
                listBoxPlayers.Items.RemoveAt(10);
            }
        }

        private void pingTimer_Tick(object sender, EventArgs e)
        {
            if (_client != null)
            {
                _client.Ping();
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            _closing = true;
        }

        private void forumToolStripMenuItem_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://sm64o.com/");
        }

        private void discordToolStripMenuItem_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("https://discordapp.com/invite/k9QMFaB");
        }

        private void creditsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            string message = ("Net64 Online Team"
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
                + "Net64+ by:"
                + Environment.NewLine
                + "Tarnadas"
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
                + "Quasmok"
                + Environment.NewLine
                + Environment.NewLine
                + "Net64+ Beta Testers:"
                + Environment.NewLine
                + "Retrosol"
                + "TheNawab"
                + "Samariz");

            string caption = "Credits";
            MessageBoxButtons buttons = MessageBoxButtons.OK;
            DialogResult result;

            result = MessageBox.Show(message, caption, buttons);
        }
    }
}
