using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Mono.Nat;

namespace SM64O
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            System.AppDomain.CurrentDomain.UnhandledException += UnhandledException;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            do
            {
                ResetMe = false;
                Application.Run(new Form1());
            } while (ResetMe);
        }

        public static bool ResetMe = false;

        static void UnhandledException(object sender, UnhandledExceptionEventArgs args)
        {
            // DO NOT swallow the exception
            // Instead log it and display it to the user
            Exception e = (Exception) args.ExceptionObject;

            // TODO: Either use logging library or write our own
            System.IO.File.AppendAllText("errors.log", string.Format("[{0}] {1}\n", DateTime.Now, e));
        }
    }
}
