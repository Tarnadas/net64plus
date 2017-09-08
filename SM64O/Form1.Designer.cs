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
            this.button1 = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.textBox5 = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.numericUpDown1 = new System.Windows.Forms.NumericUpDown();
            this.numericUpDown2 = new System.Windows.Forms.NumericUpDown();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.toadTimer = new System.Windows.Forms.Timer(this.components);
            this.button2 = new System.Windows.Forms.Button();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.comboBox2 = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.miniGame3 = new System.Windows.Forms.RadioButton();
            this.miniGame4 = new System.Windows.Forms.RadioButton();
            this.miniGame2 = new System.Windows.Forms.RadioButton();
            this.miniGame1 = new System.Windows.Forms.RadioButton();
            this.miniGame5 = new System.Windows.Forms.RadioButton();
            this.miniGame6 = new System.Windows.Forms.RadioButton();
            this.usernameBox = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).BeginInit();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Enabled = false;
            this.button1.Location = new System.Drawing.Point(15, 246);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(268, 43);
            this.button1.TabIndex = 0;
            this.button1.Text = "Connect to server!";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 298);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(75, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Base Address:";
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(92, 295);
            this.textBox1.Name = "textBox1";
            this.textBox1.ReadOnly = true;
            this.textBox1.Size = new System.Drawing.Size(190, 20);
            this.textBox1.TabIndex = 2;
            // 
            // timer1
            // 
            this.timer1.Interval = 5;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // checkBox1
            // 
            this.checkBox1.AutoSize = true;
            this.checkBox1.Location = new System.Drawing.Point(187, 63);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(97, 17);
            this.checkBox1.TabIndex = 10;
            this.checkBox1.Text = "Create Server?";
            this.checkBox1.UseVisualStyleBackColor = true;
            this.checkBox1.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // textBox5
            // 
            this.textBox5.Location = new System.Drawing.Point(79, 11);
            this.textBox5.Name = "textBox5";
            this.textBox5.Size = new System.Drawing.Size(201, 20);
            this.textBox5.TabIndex = 11;
            this.textBox5.TextChanged += new System.EventHandler(this.textBox5_TextChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 14);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(61, 13);
            this.label2.TabIndex = 12;
            this.label2.Text = "IP Address:";
            // 
            // numericUpDown1
            // 
            this.numericUpDown1.Enabled = false;
            this.numericUpDown1.Location = new System.Drawing.Point(15, 350);
            this.numericUpDown1.Name = "numericUpDown1";
            this.numericUpDown1.Size = new System.Drawing.Size(268, 20);
            this.numericUpDown1.TabIndex = 14;
            this.numericUpDown1.Value = new decimal(new int[] {
            5,
            0,
            0,
            0});
            this.numericUpDown1.ValueChanged += new System.EventHandler(this.numericUpDown1_ValueChanged);
            // 
            // numericUpDown2
            // 
            this.numericUpDown2.Location = new System.Drawing.Point(79, 37);
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
            8000,
            0,
            0,
            0});
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(44, 39);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(29, 13);
            this.label4.TabIndex = 17;
            this.label4.Text = "Port:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(12, 334);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(272, 13);
            this.label5.TabIndex = 18;
            this.label5.Text = "Reduce this number to improve the network connection.";
            // 
            // listBox1
            // 
            this.listBox1.FormattingEnabled = true;
            this.listBox1.Location = new System.Drawing.Point(15, 376);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(268, 160);
            this.listBox1.TabIndex = 13;
            // 
            // toadTimer
            // 
            this.toadTimer.Interval = 1500;
            this.toadTimer.Tick += new System.EventHandler(this.toadTimer_Tick);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(15, 542);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(267, 31);
            this.button2.TabIndex = 19;
            this.button2.Text = "Credits";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // comboBox1
            // 
            this.comboBox1.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBox1.FormattingEnabled = true;
            this.comboBox1.Items.AddRange(new object[] {
            "Project64",
            "Nemu64",
            "Mupen64"});
            this.comboBox1.Location = new System.Drawing.Point(69, 125);
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(210, 21);
            this.comboBox1.TabIndex = 20;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(12, 128);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(51, 13);
            this.label3.TabIndex = 21;
            this.label3.Text = "Emulator:";
            // 
            // comboBox2
            // 
            this.comboBox2.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBox2.FormattingEnabled = true;
            this.comboBox2.Items.AddRange(new object[] {
            "Mario",
            "Luigi",
            "Yoshi",
            "Wario",
            "Peach",
            "Toad",
            "Waluigi",
            "Birdo"});
            this.comboBox2.Location = new System.Drawing.Point(113, 152);
            this.comboBox2.Name = "comboBox2";
            this.comboBox2.Size = new System.Drawing.Size(166, 21);
            this.comboBox2.TabIndex = 22;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(12, 155);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(95, 13);
            this.label6.TabIndex = 23;
            this.label6.Text = "Select your Player:";
            // 
            // miniGame3
            // 
            this.miniGame3.AutoSize = true;
            this.miniGame3.Enabled = false;
            this.miniGame3.Location = new System.Drawing.Point(195, 191);
            this.miniGame3.Name = "miniGame3";
            this.miniGame3.Size = new System.Drawing.Size(88, 17);
            this.miniGame3.TabIndex = 24;
            this.miniGame3.Text = "Gamemode 3";
            this.miniGame3.UseVisualStyleBackColor = true;
            this.miniGame3.CheckedChanged += new System.EventHandler(this.miniGame3_CheckedChanged);
            // 
            // miniGame4
            // 
            this.miniGame4.AutoSize = true;
            this.miniGame4.Enabled = false;
            this.miniGame4.Location = new System.Drawing.Point(15, 213);
            this.miniGame4.Name = "miniGame4";
            this.miniGame4.Size = new System.Drawing.Size(88, 17);
            this.miniGame4.TabIndex = 25;
            this.miniGame4.Text = "Gamemode 4";
            this.miniGame4.UseVisualStyleBackColor = true;
            this.miniGame4.CheckedChanged += new System.EventHandler(this.miniGame4_CheckedChanged);
            // 
            // miniGame2
            // 
            this.miniGame2.AutoSize = true;
            this.miniGame2.Enabled = false;
            this.miniGame2.Location = new System.Drawing.Point(106, 191);
            this.miniGame2.Name = "miniGame2";
            this.miniGame2.Size = new System.Drawing.Size(88, 17);
            this.miniGame2.TabIndex = 27;
            this.miniGame2.Text = "Gamemode 2";
            this.miniGame2.UseVisualStyleBackColor = true;
            this.miniGame2.CheckedChanged += new System.EventHandler(this.miniGame2_CheckedChanged);
            // 
            // miniGame1
            // 
            this.miniGame1.AutoSize = true;
            this.miniGame1.Checked = true;
            this.miniGame1.Enabled = false;
            this.miniGame1.Location = new System.Drawing.Point(15, 191);
            this.miniGame1.Name = "miniGame1";
            this.miniGame1.Size = new System.Drawing.Size(88, 17);
            this.miniGame1.TabIndex = 26;
            this.miniGame1.TabStop = true;
            this.miniGame1.Text = "Gamemode 1";
            this.miniGame1.UseVisualStyleBackColor = true;
            this.miniGame1.CheckedChanged += new System.EventHandler(this.miniGame1_CheckedChanged);
            // 
            // miniGame5
            // 
            this.miniGame5.AutoSize = true;
            this.miniGame5.Enabled = false;
            this.miniGame5.Location = new System.Drawing.Point(106, 213);
            this.miniGame5.Name = "miniGame5";
            this.miniGame5.Size = new System.Drawing.Size(88, 17);
            this.miniGame5.TabIndex = 28;
            this.miniGame5.Text = "Gamemode 5";
            this.miniGame5.UseVisualStyleBackColor = true;
            this.miniGame5.CheckedChanged += new System.EventHandler(this.miniGame5_CheckedChanged);
            // 
            // miniGame6
            // 
            this.miniGame6.AutoSize = true;
            this.miniGame6.Enabled = false;
            this.miniGame6.Location = new System.Drawing.Point(195, 213);
            this.miniGame6.Name = "miniGame6";
            this.miniGame6.Size = new System.Drawing.Size(88, 17);
            this.miniGame6.TabIndex = 29;
            this.miniGame6.Text = "Gamemode 6";
            this.miniGame6.UseVisualStyleBackColor = true;
            this.miniGame6.CheckedChanged += new System.EventHandler(this.miniGame6_CheckedChanged);
            // 
            // usernameBox
            // 
            this.usernameBox.Location = new System.Drawing.Point(76, 99);
            this.usernameBox.MaxLength = 16;
            this.usernameBox.Name = "usernameBox";
            this.usernameBox.Size = new System.Drawing.Size(203, 20);
            this.usernameBox.TabIndex = 30;
            this.usernameBox.TextChanged += new System.EventHandler(this.textBox2_TextChanged);
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(12, 102);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(58, 13);
            this.label7.TabIndex = 31;
            this.label7.Text = "Username:";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(295, 586);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.usernameBox);
            this.Controls.Add(this.miniGame6);
            this.Controls.Add(this.miniGame5);
            this.Controls.Add(this.miniGame2);
            this.Controls.Add(this.miniGame1);
            this.Controls.Add(this.miniGame4);
            this.Controls.Add(this.miniGame3);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.comboBox2);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.comboBox1);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.numericUpDown2);
            this.Controls.Add(this.numericUpDown1);
            this.Controls.Add(this.listBox1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.textBox5);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.button1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "SM64 Online Tool";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDown2)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.TextBox textBox5;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.NumericUpDown numericUpDown1;
        private System.Windows.Forms.NumericUpDown numericUpDown2;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.Timer toadTimer;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox comboBox2;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.RadioButton miniGame3;
        private System.Windows.Forms.RadioButton miniGame4;
        private System.Windows.Forms.RadioButton miniGame2;
        private System.Windows.Forms.RadioButton miniGame1;
        private System.Windows.Forms.RadioButton miniGame5;
        private System.Windows.Forms.RadioButton miniGame6;
        private System.Windows.Forms.TextBox usernameBox;
        private System.Windows.Forms.Label label7;
    }
}

