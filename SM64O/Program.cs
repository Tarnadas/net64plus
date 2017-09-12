using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SM64O
{
    static class Program
    {
        public static int UPnPPort;
        public static bool UPnPAvailable;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Thread upnpThread = new Thread(() =>
            {
                try
                {
                    UPnPAvailable = UPnP.NAT.Discover();
                }
                catch { }
                // Swallow UPnP exceptions. A lot of routers dont support it
            });
            upnpThread.IsBackground = true;
            upnpThread.Start();

            System.AppDomain.CurrentDomain.UnhandledException += UnhandledException;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());

            try
            {
                if (UPnPPort != 0)
                    UPnP.NAT.DeleteForwardingRule(UPnPPort, ProtocolType.Udp);
            }
            catch {}
        }

        static void UnhandledException(object sender, UnhandledExceptionEventArgs args)
        {
            // DO NOT swallow the exception
            // Instead log it and display it to the user
            Exception e = (Exception) args.ExceptionObject;

            // TODO: Either use logging library or write our own
            System.IO.File.AppendAllText("errors.log", e.ToString());
        }
    }
}
