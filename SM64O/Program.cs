using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
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

            
            LogException(e);
        }

        public static void LogException(Exception e)
        {
            // TODO: Either use logging library or write our own
            System.IO.File.AppendAllText("errors.log", string.Format("[{0}] {1}\r\n", DateTime.Now.ToString("HH:mm:ss.fff"), e));
        }

        public static IPAddress ResolveAddress(string input)
        {
            IPAddress target = null;

            string text = input;

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
                catch (SocketException)
                {
                }
            }

            return target;
        }

        public static string GetASCIIString(byte[] data, int startIndex, int count)
        {
            try
            {
                return Encoding.ASCII.GetString(data, startIndex, count);
            }
            catch (ArgumentException)
            {
                return "";
            }
        }

        public static string GetASCIIString(byte[] data)
        {
            return GetASCIIString(data, 0, data.Length);
        }
    }
}
