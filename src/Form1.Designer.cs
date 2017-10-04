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
            this.textBoxAddress = new System.Windows.Forms.TextBox();
            this.labelAddress = new System.Windows.Forms.Label();
            this.numericUpDown2 = new System.Windows.Forms.NumericUpDown();
            this.labelPort = new System.Windows.Forms.Label();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.comboBoxEmulator = new System.Windows.Forms.ComboBox();
            this.labelEmulator = new System.Windows.Forms.Label();
            this.comboBoxChar = new System.Windows.Forms.ComboBox();
            this.labelChar = new System.Windows.Forms.Label();


            this.labelChatHistory = new System.Windows.Forms.Label();
            this.listBoxChat = new System.Windows.Forms.ListBox();
            

            this.chatBox = new System.Windows.Forms.TextBox();
            this.buttonChat = new System.Windows.Forms.Button();
            this.usernameBox = new System.Windows.Forms.TextBox();
            this.labelUsername = new System.Windows.Forms.Label();
            this.playerCheckTimer = new System.Windows.Forms.Timer(this.components);
            this.settingsPanel = new System.Windows.Forms.Panel();
            this.labelConnectionConf = new System.Windows.Forms.Label();
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
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).BeginInit();
            this.settingsPanel.SuspendLayout();
            this.statusStrip1.SuspendLayout();
            this.backgroundPanel.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // buttonJoin
            // 
            this.buttonJoin.Enabled = false;
            this.buttonJoin.Location = new System.Drawing.Point(13, 100);
            this.buttonJoin.Name = "buttonJoin";
            this.buttonJoin.Size = new System.Drawing.Size(268, 49);
            this.buttonJoin.TabIndex = 0;
            this.buttonJoin.Text = "Connect to server!";
            this.buttonJoin.UseVisualStyleBackColor = true;
            this.buttonJoin.Click += new System.EventHandler(this.button1_Click);
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
            3678,
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
            // labelChatHistory
            // 
            this.labelChatHistory.AutoSize = true;
            this.labelChatHistory.Location = new System.Drawing.Point(10, 244);
            this.labelChatHistory.Name = "labelChatHistory";
            this.labelChatHistory.Size = new System.Drawing.Size(77, 13);
            this.labelChatHistory.TabIndex = 32;
            this.labelChatHistory.Text = "Chat Log:";
            // 
            // listBoxChat
            // 
            this.listBoxChat.FormattingEnabled = true;
            this.listBoxChat.Location = new System.Drawing.Point(12, 264);
            this.listBoxChat.Name = "listBoxChat";
            this.listBoxChat.Size = new System.Drawing.Size(587, 432);
            this.listBoxChat.TabIndex = 13;
            this.listBoxChat.Font = new System.Drawing.Font("Arial", 12);
            // 
            // comboBoxEmulator
            // 
            this.comboBoxEmulator.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxEmulator.FormattingEnabled = true;
            this.comboBoxEmulator.Items.AddRange(new object[] {
            "Project64",
            "Nemu64",
            "Mupen64"});
            this.comboBoxEmulator.Location = new System.Drawing.Point(420, 21);
            this.comboBoxEmulator.Name = "comboBoxEmulator";
            this.comboBoxEmulator.Size = new System.Drawing.Size(150, 21);
            this.comboBoxEmulator.TabIndex = 20;
            // 
            // labelEmulator
            // 
            this.labelEmulator.AutoSize = true;
            this.labelEmulator.Location = new System.Drawing.Point(313, 23);
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
            this.comboBoxChar.Location = new System.Drawing.Point(420, 46);
            this.comboBoxChar.Name = "comboBoxChar";
            this.comboBoxChar.Size = new System.Drawing.Size(150, 21);
            this.comboBoxChar.TabIndex = 22;
            this.comboBoxChar.SelectedIndexChanged += new System.EventHandler(this.comboBox2_SelectedIndexChanged);
            // 
            // labelChar
            // 
            this.labelChar.AutoSize = true;
            this.labelChar.Location = new System.Drawing.Point(313, 48);
            this.labelChar.Name = "labelChar";
            this.labelChar.Size = new System.Drawing.Size(95, 13);
            this.labelChar.TabIndex = 23;
            this.labelChar.Text = "Select your Player:";
            // 
            // usernameBox
            // 
            this.usernameBox.Location = new System.Drawing.Point(79, 72);
            this.usernameBox.MaxLength = 24;
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
            // 
            // settingsPanel
            // 
            this.settingsPanel.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.settingsPanel.Controls.Add(this.labelAddress);
            this.settingsPanel.Controls.Add(this.labelUsername);
            this.settingsPanel.Controls.Add(this.buttonJoin);
            this.settingsPanel.Controls.Add(this.usernameBox);
            this.settingsPanel.Controls.Add(this.textBoxAddress);
            this.settingsPanel.Controls.Add(this.numericUpDown2);
            this.settingsPanel.Controls.Add(this.labelPort);
            this.settingsPanel.Controls.Add(this.comboBoxEmulator);
            this.settingsPanel.Controls.Add(this.labelEmulator);
            this.settingsPanel.Controls.Add(this.comboBoxChar);
            this.settingsPanel.Controls.Add(this.labelChar);
            this.settingsPanel.Controls.Add(this.buttonReset);
            this.settingsPanel.Location = new System.Drawing.Point(12, 37);
            this.settingsPanel.Name = "settingsPanel";
            this.settingsPanel.Size = new System.Drawing.Size(587, 160);
            this.settingsPanel.TabIndex = 37;
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
            // buttonReset
            // 
            this.buttonReset.Enabled = false;
            this.buttonReset.Location = new System.Drawing.Point(488, 100);
            this.buttonReset.Name = "buttonReset";
            this.buttonReset.Size = new System.Drawing.Size(83, 49);
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
            this.backgroundPanel.Controls.Add(this.settingsPanel);
            this.backgroundPanel.Controls.Add(this.chatBox);
            this.backgroundPanel.Controls.Add(this.buttonChat);
            this.backgroundPanel.Controls.Add(this.labelChatHistory);
            this.backgroundPanel.Controls.Add(this.listBoxChat);
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
            this.labelChat.Location = new System.Drawing.Point(12, 207);
            this.labelChat.Name = "labelChat";
            this.labelChat.Size = new System.Drawing.Size(32, 13);
            this.labelChat.TabIndex = 38;
            this.labelChat.Text = "Chat:";
            // 
            // chatBox
            // 
            this.chatBox.Enabled = false;
            this.chatBox.Location = new System.Drawing.Point(45, 202);
            this.chatBox.MaxLength = 24;
            this.chatBox.Name = "chatBox";
            this.chatBox.Size = new System.Drawing.Size(173, 20);
            this.chatBox.TabIndex = 33;
            this.chatBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.chatBox_KeyDown);
            this.chatBox.Font = new System.Drawing.Font("Arial", 12);
            // 
            // buttonChat
            // 
            this.buttonChat.Enabled = false;
            this.buttonChat.Location = new System.Drawing.Point(230, 203);
            this.buttonChat.Name = "buttonChat";
            this.buttonChat.Size = new System.Drawing.Size(120, 24);
            this.buttonChat.TabIndex = 34;
            this.buttonChat.Text = "Send Message";
            this.buttonChat.UseVisualStyleBackColor = true;
            this.buttonChat.Click += new System.EventHandler(this.button3_Click);
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
            this.forumToolStripMenuItem.Text = "Net64 Forum";
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
            this.ClientSize = new System.Drawing.Size(610, 709);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.labelConnectionConf);
            this.Controls.Add(this.backgroundPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Form1_FormClosed);
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).EndInit();
            this.settingsPanel.ResumeLayout(false);
            this.settingsPanel.PerformLayout();
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
        private System.Windows.Forms.TextBox textBoxAddress;
        private System.Windows.Forms.Label labelAddress;
        private System.Windows.Forms.NumericUpDown numericUpDown2;
        private System.Windows.Forms.Label labelPort;
        private System.Windows.Forms.ListBox listBoxChat;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.ComboBox comboBoxEmulator;
        private System.Windows.Forms.Label labelEmulator;
        private System.Windows.Forms.ComboBox comboBoxChar;
        private System.Windows.Forms.Label labelChar;
        private System.Windows.Forms.Label labelChatHistory;
        private System.Windows.Forms.TextBox chatBox;
        private System.Windows.Forms.Button buttonChat;
        private System.Windows.Forms.TextBox usernameBox;
        private System.Windows.Forms.Label labelUsername;
        private System.Windows.Forms.Timer playerCheckTimer;
        private System.Windows.Forms.Panel settingsPanel;
        private System.Windows.Forms.Label labelConnectionConf;
        private System.Windows.Forms.Button buttonReset;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripStatusLabel toolStripStatusLabel1;
        private System.Windows.Forms.ToolStripStatusLabel pingLabel;
        private System.Windows.Forms.Timer pingTimer;
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

