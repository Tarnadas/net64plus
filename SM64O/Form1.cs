﻿using Hazel;
using Hazel.Tcp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

#pragma warning disable CS0618 // Type or member is obsolete
namespace SM64O
{
    public partial class Form1 : Form
    {

        [DllImport("kernel32.dll")]
        public static extern IntPtr OpenProcess(int dwDesiredAccess, bool bInheritHandle, int dwProcessId);

        [DllImport("kernel32.dll")]
        public static extern bool ReadProcessMemory(int hProcess, int lpBaseAddress, byte[] lpBuffer, int dwSize, ref int lpNumberOfBytesRead);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool WriteProcessMemory(int hProcess, int lpBaseAddress, byte[] lpBuffer, int dwSize, ref int lpNumberOfBytesWritten);

        const int PROCESS_WM_READ = 0x0010;

        public IntPtr processHandle;
        public int baseAddress = 0;

        public static ConnectionListener listener;
        public static Connection connection = null;
        public static Connection[] playerClient = new Connection[23];
        public static int connectedPlayers = 0;

        public Form1()
        {
            InitializeComponent();

            string[] fileEntries = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/Patches/");

            foreach (var file in fileEntries)
            {
                int offset = Convert.ToInt32(Path.GetFileName(file), 16);

                byte[] buffer = File.ReadAllBytes(file);

                //File.Copy(AppDomain.CurrentDomain.BaseDirectory + "/Patches/" + Path.GetFileName(file), AppDomain.CurrentDomain.BaseDirectory + "/Ressources/" + Path.GetFileName(file));

                if (File.Exists(AppDomain.CurrentDomain.BaseDirectory + "/Ressources/" + Path.GetFileName(file)))
                {
                    File.Delete(AppDomain.CurrentDomain.BaseDirectory + "/Ressources/" + Path.GetFileName(file));
                }

                for (int i = 0; i < buffer.Length; i += 4)
                {
                    byte[] newBuffer = buffer.Skip(i).Take(4).ToArray();
                    newBuffer = newBuffer.Reverse().ToArray();
                    using (var fs = new FileStream(AppDomain.CurrentDomain.BaseDirectory + "/Ressources/" + Path.GetFileName(file), FileMode.OpenOrCreate, FileAccess.Write))
                    {
                        fs.Seek(i, SeekOrigin.Current);
                        fs.Write(newBuffer, 0, newBuffer.Length);
                    }
                }
            }

        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (comboBox1.Text == "Project64")
            {
                Process process = Process.GetProcessesByName("Project64")[0];

                baseAddress = ReadWritingMemory.GetBaseAddress("Project64", 4096, 4);
                textBox1.Text = baseAddress.ToString("X");

                processHandle = OpenProcess(0x1F0FFF, true, process.Id);
            }

            if (comboBox1.Text == "Nemu64")
            {
                Process process = Process.GetProcessesByName("Nemu64")[0];

                baseAddress = ReadWritingMemory.GetBaseAddress("Nemu64", 4096, 4);
                textBox1.Text = baseAddress.ToString("X");

                processHandle = OpenProcess(0x1F0FFF, true, process.Id);
            }

            if (comboBox1.Text == "Mupen64")
            {
                Process process = Process.GetProcessesByName("Mupen64")[0];

                baseAddress = ReadWritingMemory.GetBaseAddress("Mupen64", 4096, 4);
                textBox1.Text = baseAddress.ToString("X");

                processHandle = OpenProcess(0x1F0FFF, true, process.Id);
            }

            if (checkBox1.Checked)
            {
                listener = new TcpConnectionListener(IPAddress.Any, (int)numericUpDown2.Value);
                listener.NewConnection += NewConnectionHandler;
                listener.Start();

                miniGame1.Enabled = true;
                miniGame3.Enabled = true;
            }
            else
            {
                NetworkEndPoint endPoint = new NetworkEndPoint(textBox5.Text, (int)numericUpDown2.Value);
                connection = new TcpConnection(endPoint);
                connection.DataReceived += DataReceived;
                connection.Connect();
            }

            checkBox1.Enabled = false;

            timer1.Enabled = true;
            button1.Enabled = false;
            textBox5.Enabled = false;
            numericUpDown1.Enabled = true;

            comboBox1.Enabled = false;
            comboBox2.Enabled = false;

            Characters.setUsername(processHandle, baseAddress);
            Characters.setCharacter(comboBox2.SelectedItem.ToString(), processHandle, baseAddress);

            string[] fileEntries = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/Ressources/");

            foreach (var file in fileEntries)
            {
                int offset = Convert.ToInt32(Path.GetFileName(file), 16);

                int bytesWritten = 0;

                byte[] buffer = File.ReadAllBytes(file);
                WriteProcessMemory((int)processHandle, baseAddress + offset, buffer, buffer.Length, ref bytesWritten);
            }

            if (checkBox1.Checked)
            {
                writeValue(new byte[] { 0x00, 0x00, 0x00, 0x01 }, 0x365FFC);
            }
        }

        private void NewConnectionHandler(object sender, NewConnectionEventArgs e)
        {
            for (int i = 0; i < playerClient.Length; i++) {
                if (i > 23)
                {
                    e.Connection.Close();
                    break;
                }
                if (playerClient[i] == null)
                {
                    Console.WriteLine("player connected!");
                    playerClient[i] = e.Connection;
                    e.Connection.DataReceived += DataReceivedHandler;
                    e.Connection.Disconnected += client_Disconnected;

                    int playerIDB = i + 2;
                    byte[] playerID = new byte[] { (byte)playerIDB };
                    Thread.Sleep(500);
                    playerClient[i].SendBytes(playerID);
                    break;
                }
            }
        }

        private void client_Disconnected(object sender, DisconnectedEventArgs e)
        {
            Connection conn = (Connection)sender;
            for (int i = 0; i < playerClient.Length; i++)
            {
                if (playerClient[i] == conn)
                {
                    Console.WriteLine("player disconnected!");
                    playerClient[i] = null;
                    conn.DataReceived -= DataReceivedHandler;
                    break;
                }
            }
        }

        private void DataReceivedHandler(object sender, Hazel.DataReceivedEventArgs e)
        {
            Connection conn = (Connection)sender;

            byte[] offsetByte = e.Bytes.Take(4).ToArray();
            int offset = BitConverter.ToInt32(e.Bytes, 0);

            int bytesWritten = 0;
            byte[] buffer = new byte[e.Bytes.Length - 4];
            e.Bytes.Skip(4).ToArray().CopyTo(buffer, 0);

            buffer.Reverse().ToArray();

            WriteProcessMemory((int)processHandle, baseAddress + offset, buffer, buffer.Length, ref bytesWritten);

            e.Recycle();
        }

        private void DataReceived(object sender, Hazel.DataReceivedEventArgs e)
        {
            if (e.Bytes.Length == 1)
            {
                int bytesWritten = 0;
                WriteProcessMemory((int)processHandle, baseAddress + 0x367703, e.Bytes, e.Bytes.Length, ref bytesWritten);
            }
            else
            {
                byte[] offsetByte = e.Bytes.Take(4).ToArray();
                int offset = BitConverter.ToInt32(e.Bytes, 0);

                int bytesWritten = 0;
                byte[] buffer = new byte[e.Bytes.Length - 4];
                e.Bytes.Skip(4).ToArray().CopyTo(buffer, 0);

                buffer.Reverse().ToArray();
                WriteProcessMemory((int)processHandle, baseAddress + offset, buffer, buffer.Length, ref bytesWritten);

                e.Recycle();
            }
        }

        public void writeValue(byte[] buffer, int offset)
        {
            buffer = buffer.Reverse().ToArray();
            int bytesWritten = 0;
            WriteProcessMemory((int)processHandle, baseAddress + offset, buffer, buffer.Length, ref bytesWritten);
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            try
            {
                sendAllBytes(null);
            }
            catch
            {

            }
        }

        public void sendAllBytes(Connection conn)
        {
            listBox1.Items.Clear();

            int freeRamLength = getRamLength(0x367400);

            int[] offsetsToReadFrom = new int[freeRamLength];
            int[] offsetsToWriteToLength = new int[freeRamLength];
            int[] offsetsToWriteTo = new int[freeRamLength];

            int bytesRead = 0;
            byte[] originalBuffer = new byte[freeRamLength];
            ReadProcessMemory((int)processHandle, baseAddress + 0x367400, originalBuffer, originalBuffer.Length, ref bytesRead);

            byte[] buffer = originalBuffer;

            for (int i = 0; i < freeRamLength; i += 12)
            {
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

                listBox1.Items.Add(offsetsToReadFrom[i].ToString("X") + " | " + offsetsToWriteToLength[i + 4].ToString("X") + " | " + offsetsToWriteTo[i + 8].ToString("X"));

                if (playerClient != null)
                {
                    if (checkBox1.Checked)
                    {
                        for (int p = 0; p < playerClient.Length; p++)
                        {
                            if (playerClient[p] != null)
                            {
                                readAndSend(offsetsToReadFrom[i], offsetsToWriteTo[i + 8], offsetsToWriteToLength[i + 4], playerClient[p]);
                            }
                        }
                    }
                    else
                    {
                        readAndSend(offsetsToReadFrom[i], offsetsToWriteTo[i + 8], offsetsToWriteToLength[i + 4], connection);
                    }
                }

            }
        }

        public int getRamLength(int offset)
        {
            for (int i = 0; i < 0x1024; i += 4)
            {
                int bytesRead = 0;
                byte[] buffer = new byte[4];

                ReadProcessMemory((int)processHandle, baseAddress + offset + i, buffer, buffer.Length, ref bytesRead);
                buffer = buffer.Reverse().ToArray();

                if (BitConverter.ToString(buffer) == "00-00-00-00")
                {
                    return i;
                }
            }
            return 0;
        }

        public void readAndSend(int offsetToRead, int offsetToWrite, int howMany, Connection conn)
        {
            int bytesRead = 0;
            byte[] buffer = new byte[howMany];
            byte[] writeOffset = BitConverter.GetBytes(offsetToWrite);

            ReadProcessMemory((int)processHandle, baseAddress + offsetToRead, buffer, buffer.Length, ref bytesRead);

            byte[] finalOffset = new byte[howMany + 4];
            writeOffset.CopyTo(finalOffset, 0);
            buffer.CopyTo(finalOffset, 4);
            conn.SendBytes(finalOffset);
        }

        private void textBox5_TextChanged(object sender, EventArgs e)
        {
            if (textBox5.Text != "" && !textBox5.Text.Contains(" "))
            {
                button1.Enabled = true;
            }
            else
            {
                button1.Enabled = false;
            }
            if (textBox5.Text == "toad")
            {
                toadTimer.Enabled = true;
                PictureBox box = new PictureBox();
                box.Image = SM64O.Properties.Resources.toad;
                box.SizeMode = PictureBoxSizeMode.StretchImage;
                box.Size = new Size(this.Size.Width, this.Size.Height);

                foreach (Control control in this.Controls)
                {
                    control.Text = "toad";
                    control.Enabled = false;
                    control.Visible = false;
                }

                this.Controls.Add(box);

                IntPtr Hicon = SM64O.Properties.Resources.toad.GetHicon();
                Icon newIcon = Icon.FromHandle(Hicon);

                this.Icon = newIcon;
                this.Text = "toad";

                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.herewego);
                player.Play();
            }
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {
            timer1.Interval = (int)numericUpDown1.Value;
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox1.Checked)
            {
                button1.Text = "Create Server!";
            } else
            {
                button1.Text = "Connect to server!";
            }
        }

        public void playRandomToadNoise(int random)
        {
            if (random == 1)
            {
                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.imthebest);
                player.Play();
            }
            if (random == 2)
            {
                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.aaaaah);
                player.Play();
            }
            if (random == 3)
            {
                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.okay);
                player.Play();
            }
            if (random == 4)
            {
                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.yahoo);
                player.Play();
            }
            if (random == 5)
            {
                System.Media.SoundPlayer player = new System.Media.SoundPlayer(SM64O.Properties.Resources.woo);
            }
        }

        private void toadTimer_Tick(object sender, EventArgs e)
        {
            Random rnd = new Random();
            int sound = rnd.Next(1, 5);
            playRandomToadNoise(sound);

            Form form = new Form();
            PictureBox box = new PictureBox();

            IntPtr Hicon = SM64O.Properties.Resources.toad.GetHicon();
            Icon newIcon = Icon.FromHandle(Hicon);
            form.Icon = newIcon;
            form.Text = "toad";

            box.Image = SM64O.Properties.Resources.toad;
            box.SizeMode = PictureBoxSizeMode.StretchImage;
            box.Size = new Size(form.Size.Width, form.Size.Height);

            int randomX = rnd.Next(0, Screen.PrimaryScreen.Bounds.Size.Width - 300);
            int randomY = rnd.Next(0, Screen.PrimaryScreen.Bounds.Size.Height - 400);

            form.StartPosition = FormStartPosition.Manual;
            form.Location = new Point(randomX, randomY);
            form.Controls.Add(box);

            form.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Super Mario 64 Online made by Kaze Emanuar and MelonSpeedruns!"
                + Environment.NewLine
                + Environment.NewLine
                + "Luigi 3D Model created by: "
                + Environment.NewLine
                + "Cjes"
                + Environment.NewLine
                + "GeoshiTheRed"
                + Environment.NewLine
                + Environment.NewLine
                + "Rosalina and Peach 3D Models created by: "
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
                + "Try finding the secret Easter Egg!");
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            comboBox1.SelectedIndex = 0;
            comboBox2.SelectedIndex = 0;
        }

        public void setGamemode()
        {
            byte[] buffer = new byte[0];

            if (miniGame1.Checked)
            {
                buffer = new byte[] { 0x01 };
            }

            if (miniGame2.Checked)
            {
                buffer = new byte[] { 0x02 };
            }

            if (miniGame3.Checked)
            {
                buffer = new byte[] { 0x03 };
            }

            if (miniGame4.Checked)
            {
                buffer = new byte[] { 0x04 };
            }

            if (miniGame5.Checked)
            {
                buffer = new byte[] { 0x05 };
            }

            if (miniGame6.Checked)
            {
                buffer = new byte[] { 0x06 };
            }

            int bytesWritten = 0;
            WriteProcessMemory((int)processHandle, baseAddress + 0x365FF7, buffer, buffer.Length, ref bytesWritten);

            if (playerClient != null)
            {
                for (int p = 0; p < playerClient.Length; p++)
                {
                    if (playerClient[p] != null)
                    {
                        readAndSend(baseAddress + 0x365FF4, baseAddress + 0x365FF4, 4, playerClient[p]);
                    }
                }
            }

        }

        private void miniGame1_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void miniGame2_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void miniGame3_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void miniGame4_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void miniGame5_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

        private void miniGame6_CheckedChanged(object sender, EventArgs e)
        {
            setGamemode();
        }

    }
}
 