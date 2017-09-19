namespace SM64O
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.buttonJoin = new System.Windows.Forms.Button();
            this.checkBoxServer = new System.Windows.Forms.CheckBox();
            this.textBoxAddress = new System.Windows.Forms.TextBox();
            this.labelAddress = new System.Windows.Forms.Label();
            this.numUpDownInterval = new System.Windows.Forms.NumericUpDown();
            this.numericUpDown2 = new System.Windows.Forms.NumericUpDown();
            this.labelPort = new System.Windows.Forms.Label();
            this.labelRateUpdate = new System.Windows.Forms.Label();
            this.listBoxPlayers = new System.Windows.Forms.ListBox();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.comboBoxEmulator = new System.Windows.Forms.ComboBox();
            this.labelEmulator = new System.Windows.Forms.Label();
            this.comboBoxChar = new System.Windows.Forms.ComboBox();
            this.labelChar = new System.Windows.Forms.Label();
            this.labelMaxClients = new System.Windows.Forms.Label();
            this.numUpDownClients = new System.Windows.Forms.NumericUpDown();
            this.labelPlayersOnline = new System.Windows.Forms.Label();
            this.chatBox = new System.Windows.Forms.TextBox();
            this.buttonChat = new System.Windows.Forms.Button();
            this.usernameBox = new System.Windows.Forms.TextBox();
            this.labelUsername = new System.Windows.Forms.Label();
            this.playerCheckTimer = new System.Windows.Forms.Timer(this.components);
            this.panel1 = new System.Windows.Forms.Panel();
            this.checkBoxLAN = new System.Windows.Forms.CheckBox();
            this.checkBoxChat = new System.Windows.Forms.CheckBox();
            this.labelConnectionConf = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.labelGamemode = new System.Windows.Forms.Label();
            this.gamemodeBox = new System.Windows.Forms.ComboBox();
            this.labelServerConf = new System.Windows.Forms.Label();
            this.buttonReset = new System.Windows.Forms.Button();
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.toolStripStatusLabel1 = new System.Windows.Forms.ToolStripStatusLabel();
            this.pingLabel = new System.Windows.Forms.ToolStripStatusLabel();
            this.pingTimer = new System.Windows.Forms.Timer(this.components);
            this.backgroundPanel = new System.Windows.Forms.Panel();
            this.labelChat = new System.Windows.Forms.Label();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.helpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.forumToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.discordToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.creditsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            ((System.ComponentModel.ISupportInitialize)(this.numUpDownInterval)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numUpDownClients)).BeginInit();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.statusStrip1.SuspendLayout();
            this.backgroundPanel.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // buttonJoin
            // 
            this.buttonJoin.Enabled = false;
            this.buttonJoin.Location = new System.Drawing.Point(13, 212);
            this.buttonJoin.Name = "buttonJoin";
            this.buttonJoin.Size = new System.Drawing.Size(268, 49);
            this.buttonJoin.TabIndex = 0;
            this.buttonJoin.Text = "Connect to server!";
            this.buttonJoin.UseVisualStyleBackColor = true;
            this.buttonJoin.Click += new System.EventHandler(this.button1_Click);
            // 
            // checkBoxServer
            // 
            this.checkBoxServer.AutoSize = true;
            this.checkBoxServer.Location = new System.Drawing.Point(108, 98);
            this.checkBoxServer.Name = "checkBoxServer";
            this.checkBoxServer.Size = new System.Drawing.Size(97, 17);
            this.checkBoxServer.TabIndex = 10;
            this.checkBoxServer.Text = "Create Server?";
            this.checkBoxServer.UseVisualStyleBackColor = true;
            this.checkBoxServer.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // textBoxAddress
            // 
            this.textBoxAddress.Location = new System.Drawing.Point(79, 20);
            this.textBoxAddress.Name = "textBoxAddress";
            this.textBoxAddress.Size = new System.Drawing.Size(201, 20);
            this.textBoxAddress.TabIndex = 11;
            this.textBoxAddress.TextChanged += new System.EventHandler(this.textBox5_TextChanged);
            // 
            // labelAddress
            // 
            this.labelAddress.AutoSize = true;
            this.labelAddress.Location = new System.Drawing.Point(12, 23);
            this.labelAddress.Name = "labelAddress";
            this.labelAddress.Size = new System.Drawing.Size(61, 13);
            this.labelAddress.TabIndex = 12;
            this.labelAddress.Text = "IP Address:";
            // 
            // numUpDownInterval
            // 
            this.numUpDownInterval.Enabled = false;
            this.numUpDownInterval.Location = new System.Drawing.Point(227, 122);
            this.numUpDownInterval.Name = "numUpDownInterval";
            this.numUpDownInterval.Size = new System.Drawing.Size(53, 20);
            this.numUpDownInterval.TabIndex = 14;
            this.numUpDownInterval.Value = new decimal(new int[] {
            16,
            0,
            0,
            0});
            this.numUpDownInterval.ValueChanged += new System.EventHandler(this.numericUpDown1_ValueChanged);
            // 
            // numericUpDown2
            // 
            this.numericUpDown2.Location = new System.Drawing.Point(79, 46);
            this.numericUpDown2.Maximum = new decimal(new int[] {
            65536,
            0,
            0,
            0});
            this.numericUpDown2.Minimum = new decimal(new int[] {
            1025,
            0,
            0,
            0});
            this.numericUpDown2.Name = "numericUpDown2";
            this.numericUpDown2.Size = new System.Drawing.Size(201, 20);
            this.numericUpDown2.TabIndex = 16;
            this.numericUpDown2.Value = new decimal(new int[] {
            8080,
            0,
            0,
            0});
            // 
            // labelPort
            // 
            this.labelPort.AutoSize = true;
            this.labelPort.Location = new System.Drawing.Point(44, 48);
            this.labelPort.Name = "labelPort";
            this.labelPort.Size = new System.Drawing.Size(29, 13);
            this.labelPort.TabIndex = 17;
            this.labelPort.Text = "Port:";
            // 
            // labelRateUpdate
            // 
            this.labelRateUpdate.AutoSize = true;
            this.labelRateUpdate.Location = new System.Drawing.Point(95, 124);
            this.labelRateUpdate.Name = "labelRateUpdate";
            this.labelRateUpdate.Size = new System.Drawing.Size(126, 13);
            this.labelRateUpdate.TabIndex = 18;
            this.labelRateUpdate.Text = "Network Update Interval:";
            // 
            // listBoxPlayers
            // 
            this.listBoxPlayers.FormattingEnabled = true;
            this.listBoxPlayers.Location = new System.Drawing.Point(13, 84);
            this.listBoxPlayers.Name = "listBoxPlayers";
            this.listBoxPlayers.Size = new System.Drawing.Size(268, 238);
            this.listBoxPlayers.TabIndex = 13;
            this.listBoxPlayers.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.listBox1_MouseDoubleClick);
            // 
            // comboBoxEmulator
            // 
            this.comboBoxEmulator.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxEmulator.FormattingEnabled = true;
            this.comboBoxEmulator.Items.AddRange(new object[] {
            "Project64",
            "Nemu64",
            "Mupen64"});
            this.comboBoxEmulator.Location = new System.Drawing.Point(71, 152);
            this.comboBoxEmulator.Name = "comboBoxEmulator";
            this.comboBoxEmulator.Size = new System.Drawing.Size(210, 21);
            this.comboBoxEmulator.TabIndex = 20;
            // 
            // labelEmulator
            // 
            this.labelEmulator.AutoSize = true;
            this.labelEmulator.Location = new System.Drawing.Point(13, 155);
            this.labelEmulator.Name = "labelEmulator";
            this.labelEmulator.Size = new System.Drawing.Size(51, 13);
            this.labelEmulator.TabIndex = 21;
            this.labelEmulator.Text = "Emulator:";
            // 
            // comboBoxChar
            // 
            this.comboBoxChar.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxChar.FormattingEnabled = true;
            this.comboBoxChar.Items.AddRange(new object[] {
            "Mario",
            "Luigi",
            "Yoshi",
            "Wario",
            "Peach",
            "Toad",
            "Waluigi",
            "Rosalina"});
            this.comboBoxChar.Location = new System.Drawing.Point(115, 179);
            this.comboBoxChar.Name = "comboBoxChar";
            this.comboBoxChar.Size = new System.Drawing.Size(166, 21);
            this.comboBoxChar.TabIndex = 22;
            this.comboBoxChar.SelectedIndexChanged += new System.EventHandler(this.comboBox2_SelectedIndexChanged);
            // 
            // labelChar
            // 
            this.labelChar.AutoSize = true;
            this.labelChar.Location = new System.Drawing.Point(13, 182);
            this.labelChar.Name = "labelChar";
            this.labelChar.Size = new System.Drawing.Size(95, 13);
            this.labelChar.TabIndex = 23;
            this.labelChar.Text = "Select your Player:";
            // 
            // labelMaxClients
            // 
            this.labelMaxClients.AutoSize = true;
            this.labelMaxClients.Location = new System.Drawing.Point(21, 17);
            this.labelMaxClients.Name = "labelMaxClients";
            this.labelMaxClients.Size = new System.Drawing.Size(92, 13);
            this.labelMaxClients.TabIndex = 30;
            this.labelMaxClients.Text = "Max Connections:";
            // 
            // numUpDownClients
            // 
            this.numUpDownClients.Location = new System.Drawing.Point(119, 15);
            this.numUpDownClients.Maximum = new decimal(new int[] {
            64,
            0,
            0,
            0});
            this.numUpDownClients.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.numUpDownClients.Name = "numUpDownClients";
            this.numUpDownClients.Size = new System.Drawing.Size(163, 20);
            this.numUpDownClients.TabIndex = 31;
            this.numUpDownClients.Value = new decimal(new int[] {
            23,
            0,
            0,
            0});
            this.numUpDownClients.ValueChanged += new System.EventHandler(this.numericUpDown3_ValueChanged);
            // 
            // labelPlayersOnline
            // 
            this.labelPlayersOnline.AutoSize = true;
            this.labelPlayersOnline.Location = new System.Drawing.Point(10, 68);
            this.labelPlayersOnline.Name = "labelPlayersOnline";
            this.labelPlayersOnline.Size = new System.Drawing.Size(77, 13);
            this.labelPlayersOnline.TabIndex = 32;
            this.labelPlayersOnline.Text = "Players Online:";
            // 
            // chatBox
            // 
            this.chatBox.Enabled = false;
            this.chatBox.Location = new System.Drawing.Point(45, 314);
            this.chatBox.MaxLength = 24;
            this.chatBox.Name = "chatBox";
            this.chatBox.Size = new System.Drawing.Size(173, 20);
            this.chatBox.TabIndex = 33;
            this.chatBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.chatBox_KeyDown);
            // 
            // buttonChat
            // 
            this.buttonChat.Enabled = false;
            this.buttonChat.Location = new System.Drawing.Point(45, 340);
            this.buttonChat.Name = "buttonChat";
            this.buttonChat.Size = new System.Drawing.Size(173, 37);
            this.buttonChat.TabIndex = 34;
            this.buttonChat.Text = "Send Message";
            this.buttonChat.UseVisualStyleBackColor = true;
            this.buttonChat.Click += new System.EventHandler(this.button3_Click);
            // 
            // usernameBox
            // 
            this.usernameBox.Location = new System.Drawing.Point(79, 72);
            this.usernameBox.Name = "usernameBox";
            this.usernameBox.Size = new System.Drawing.Size(201, 20);
            this.usernameBox.TabIndex = 35;
            // 
            // labelUsername
            // 
            this.labelUsername.AutoSize = true;
            this.labelUsername.Location = new System.Drawing.Point(15, 75);
            this.labelUsername.Name = "labelUsername";
            this.labelUsername.Size = new System.Drawing.Size(58, 13);
            this.labelUsername.TabIndex = 36;
            this.labelUsername.Text = "Username:";
            // 
            // playerCheckTimer
            // 
            this.playerCheckTimer.Interval = 1000;
            this.playerCheckTimer.Tick += new System.EventHandler(this.playerCheckTimer_Tick);
            // 
            // panel1
            // 
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.checkBoxLAN);
            this.panel1.Controls.Add(this.labelAddress);
            this.panel1.Controls.Add(this.labelUsername);
            this.panel1.Controls.Add(this.checkBoxChat);
            this.panel1.Controls.Add(this.buttonJoin);
            this.panel1.Controls.Add(this.usernameBox);
            this.panel1.Controls.Add(this.checkBoxServer);
            this.panel1.Controls.Add(this.textBoxAddress);
            this.panel1.Controls.Add(this.numUpDownInterval);
            this.panel1.Controls.Add(this.labelRateUpdate);
            this.panel1.Controls.Add(this.numericUpDown2);
            this.panel1.Controls.Add(this.labelPort);
            this.panel1.Controls.Add(this.comboBoxEmulator);
            this.panel1.Controls.Add(this.labelEmulator);
            this.panel1.Controls.Add(this.comboBoxChar);
            this.panel1.Controls.Add(this.labelChar);
            this.panel1.Location = new System.Drawing.Point(12, 37);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(295, 271);
            this.panel1.TabIndex = 37;
            // 
            // checkBoxLAN
            // 
            this.checkBoxLAN.AutoSize = true;
            this.checkBoxLAN.Enabled = false;
            this.checkBoxLAN.Location = new System.Drawing.Point(211, 98);
            this.checkBoxLAN.Name = "checkBoxLAN";
            this.checkBoxLAN.Size = new System.Drawing.Size(71, 17);
            this.checkBoxLAN.TabIndex = 37;
            this.checkBoxLAN.Text = "LAN Only";
            this.checkBoxLAN.UseVisualStyleBackColor = true;
            // 
            // checkBoxChat
            // 
            this.checkBoxChat.AutoSize = true;
            this.checkBoxChat.Enabled = false;
            this.checkBoxChat.Location = new System.Drawing.Point(13, 98);
            this.checkBoxChat.Name = "checkBoxChat";
            this.checkBoxChat.Size = new System.Drawing.Size(92, 17);
            this.checkBoxChat.TabIndex = 33;
            this.checkBoxChat.Text = "Disable Chat?";
            this.checkBoxChat.UseVisualStyleBackColor = true;
            this.checkBoxChat.CheckedChanged += new System.EventHandler(this.checkBox2_CheckedChanged);
            // 
            // labelConnectionConf
            // 
            this.labelConnectionConf.AutoSize = true;
            this.labelConnectionConf.Location = new System.Drawing.Point(27, 31);
            this.labelConnectionConf.Name = "labelConnectionConf";
            this.labelConnectionConf.Size = new System.Drawing.Size(105, 13);
            this.labelConnectionConf.TabIndex = 38;
            this.labelConnectionConf.Text = "Connection Settings:";
            // 
            // panel2
            // 
            this.panel2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel2.Controls.Add(this.labelGamemode);
            this.panel2.Controls.Add(this.gamemodeBox);
            this.panel2.Controls.Add(this.labelPlayersOnline);
            this.panel2.Controls.Add(this.labelMaxClients);
            this.panel2.Controls.Add(this.listBoxPlayers);
            this.panel2.Controls.Add(this.numUpDownClients);
            this.panel2.Enabled = false;
            this.panel2.Location = new System.Drawing.Point(313, 37);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(295, 340);
            this.panel2.TabIndex = 39;
            // 
            // labelGamemode
            // 
            this.labelGamemode.AutoSize = true;
            this.labelGamemode.Location = new System.Drawing.Point(12, 43);
            this.labelGamemode.Name = "labelGamemode";
            this.labelGamemode.Size = new System.Drawing.Size(101, 13);
            this.labelGamemode.TabIndex = 35;
            this.labelGamemode.Text = "Current Gamemode:";
            // 
            // gamemodeBox
            // 
            this.gamemodeBox.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.gamemodeBox.FormattingEnabled = true;
            this.gamemodeBox.Items.AddRange(new object[] {
            "Normal Mode",
            "3rd Person Shooter",
            "No Interactions",
            "Prop Hunt",
            "Boss Rush",
            "Tag",
            "Hide & Seek"});
            this.gamemodeBox.Location = new System.Drawing.Point(119, 40);
            this.gamemodeBox.Name = "gamemodeBox";
            this.gamemodeBox.Size = new System.Drawing.Size(163, 21);
            this.gamemodeBox.TabIndex = 34;
            this.gamemodeBox.SelectedIndexChanged += new System.EventHandler(this.gamemodeBox_SelectedIndexChanged);
            // 
            // labelServerConf
            // 
            this.labelServerConf.AutoSize = true;
            this.labelServerConf.Location = new System.Drawing.Point(330, 31);
            this.labelServerConf.Name = "labelServerConf";
            this.labelServerConf.Size = new System.Drawing.Size(82, 13);
            this.labelServerConf.TabIndex = 40;
            this.labelServerConf.Text = "Server Settings:";
            // 
            // buttonReset
            // 
            this.buttonReset.Enabled = false;
            this.buttonReset.Location = new System.Drawing.Point(224, 314);
            this.buttonReset.Name = "buttonReset";
            this.buttonReset.Size = new System.Drawing.Size(83, 63);
            this.buttonReset.TabIndex = 41;
            this.buttonReset.Text = "Reset Game";
            this.buttonReset.UseVisualStyleBackColor = true;
            this.buttonReset.Click += new System.EventHandler(this.button4_Click);
            // 
            // statusStrip1
            // 
            this.statusStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripStatusLabel1,
            this.pingLabel});
            this.statusStrip1.Location = new System.Drawing.Point(0, 387);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(618, 22);
            this.statusStrip1.SizingGrip = false;
            this.statusStrip1.TabIndex = 42;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // toolStripStatusLabel1
            // 
            this.toolStripStatusLabel1.Name = "toolStripStatusLabel1";
            this.toolStripStatusLabel1.Size = new System.Drawing.Size(42, 17);
            this.toolStripStatusLabel1.Text = "Ready!";
            // 
            // pingLabel
            // 
            this.pingLabel.Name = "pingLabel";
            this.pingLabel.Size = new System.Drawing.Size(0, 17);
            // 
            // pingTimer
            // 
            this.pingTimer.Interval = 10000;
            this.pingTimer.Tick += new System.EventHandler(this.pingTimer_Tick);
            // 
            // backgroundPanel
            // 
            this.backgroundPanel.Controls.Add(this.labelChat);
            this.backgroundPanel.Controls.Add(this.panel1);
            this.backgroundPanel.Controls.Add(this.buttonReset);
            this.backgroundPanel.Controls.Add(this.panel2);
            this.backgroundPanel.Controls.Add(this.chatBox);
            this.backgroundPanel.Controls.Add(this.buttonChat);
            this.backgroundPanel.Controls.Add(this.menuStrip1);
            this.backgroundPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.backgroundPanel.Location = new System.Drawing.Point(0, 0);
            this.backgroundPanel.Name = "backgroundPanel";
            this.backgroundPanel.Size = new System.Drawing.Size(618, 409);
            this.backgroundPanel.TabIndex = 43;
            // 
            // labelChat
            // 
            this.labelChat.AutoSize = true;
            this.labelChat.Location = new System.Drawing.Point(12, 317);
            this.labelChat.Name = "labelChat";
            this.labelChat.Size = new System.Drawing.Size(32, 13);
            this.labelChat.TabIndex = 38;
            this.labelChat.Text = "Chat:";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.helpToolStripMenuItem,
            this.aboutToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(618, 24);
            this.menuStrip1.TabIndex = 43;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // helpToolStripMenuItem
            // 
            this.helpToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.forumToolStripMenuItem,
            this.discordToolStripMenuItem});
            this.helpToolStripMenuItem.Name = "helpToolStripMenuItem";
            this.helpToolStripMenuItem.Size = new System.Drawing.Size(44, 20);
            this.helpToolStripMenuItem.Text = "Help";
            // 
            // forumToolStripMenuItem
            // 
            this.forumToolStripMenuItem.Name = "forumToolStripMenuItem";
            this.forumToolStripMenuItem.Size = new System.Drawing.Size(190, 22);
            this.forumToolStripMenuItem.Text = "SM64O Forum";
            this.forumToolStripMenuItem.Click += new System.EventHandler(this.forumToolStripMenuItem_Click);
            // 
            // discordToolStripMenuItem
            // 
            this.discordToolStripMenuItem.Name = "discordToolStripMenuItem";
            this.discordToolStripMenuItem.Size = new System.Drawing.Size(190, 22);
            this.discordToolStripMenuItem.Text = "Official Discord Server";
            this.discordToolStripMenuItem.Click += new System.EventHandler(this.discordToolStripMenuItem_Click);
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.creditsToolStripMenuItem});
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(52, 20);
            this.aboutToolStripMenuItem.Text = "About";
            // 
            // creditsToolStripMenuItem
            // 
            this.creditsToolStripMenuItem.Name = "creditsToolStripMenuItem";
            this.creditsToolStripMenuItem.Size = new System.Drawing.Size(152, 22);
            this.creditsToolStripMenuItem.Text = "Credits";
            this.creditsToolStripMenuItem.Click += new System.EventHandler(this.creditsToolStripMenuItem_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(618, 409);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.labelServerConf);
            this.Controls.Add(this.labelConnectionConf);
            this.Controls.Add(this.backgroundPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "SM64 Online Tool v1.3.1 Hotfix";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Form1_FormClosed);
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.numUpDownInterval)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numUpDownClients)).EndInit();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.statusStrip1.ResumeLayout(false);
            this.statusStrip1.PerformLayout();
            this.backgroundPanel.ResumeLayout(false);
            this.backgroundPanel.PerformLayout();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonJoin;
        private System.Windows.Forms.CheckBox checkBoxServer;
        private System.Windows.Forms.TextBox textBoxAddress;
        private System.Windows.Forms.Label labelAddress;
        private System.Windows.Forms.NumericUpDown numUpDownInterval;
        private System.Windows.Forms.NumericUpDown numericUpDown2;
        private System.Windows.Forms.Label labelPort;
        private System.Windows.Forms.Label labelRateUpdate;
        private System.Windows.Forms.ListBox listBoxPlayers;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.ComboBox comboBoxEmulator;
        private System.Windows.Forms.Label labelEmulator;
        private System.Windows.Forms.ComboBox comboBoxChar;
        private System.Windows.Forms.Label labelChar;
        private System.Windows.Forms.Label labelMaxClients;
        private System.Windows.Forms.NumericUpDown numUpDownClients;
        private System.Windows.Forms.Label labelPlayersOnline;
        private System.Windows.Forms.TextBox chatBox;
        private System.Windows.Forms.Button buttonChat;
        private System.Windows.Forms.TextBox usernameBox;
        private System.Windows.Forms.Label labelUsername;
        private System.Windows.Forms.Timer playerCheckTimer;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label labelConnectionConf;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label labelServerConf;
        private System.Windows.Forms.CheckBox checkBoxChat;
        private System.Windows.Forms.Label labelGamemode;
        private System.Windows.Forms.ComboBox gamemodeBox;
        private System.Windows.Forms.Button buttonReset;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripStatusLabel toolStripStatusLabel1;
        private System.Windows.Forms.ToolStripStatusLabel pingLabel;
        private System.Windows.Forms.Timer pingTimer;
        private System.Windows.Forms.CheckBox checkBoxLAN;
        private System.Windows.Forms.Panel backgroundPanel;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem helpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem forumToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem creditsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem discordToolStripMenuItem;
        private System.Windows.Forms.Label labelChat;
    }
}

