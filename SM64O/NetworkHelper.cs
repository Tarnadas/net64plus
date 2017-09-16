using System;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Hazel;
using Hazel.Udp;

namespace SM64O
{
    public static class NetworkHelper
    {
        public static string ExternalIp;
        public static int ConfirmedOpenPort;

        private const string ServiceAddress = "2.153.233.73";
        private const int ServicePort = 6460;

        private static EndPoint Service = null;

        private static bool _success; // this is dirty

        public static async Task<bool> RequestAssistance(int port)
        {
            if (ConfirmedOpenPort == port)
                return true;

            if (Service == null)
            {
                Service = new IPEndPoint(Program.ResolveAddress(ServiceAddress), ServicePort);
            }

            var server = ((UdpConnectionListener) Form1.listener);

            if (server == null) return false;

            _success = false;
            ConfirmedOpenPort = 0;
            ExternalIp = null;

            server.UnconnectedDataReceived += DataReceived;

            int tries = 1;
            byte[] packet = BuildStartPacket((short) port);

            do
            {
                await Task.Run(() => server.SendUnconnectedBytes(packet, Service));

                await Task.Delay(1000 * tries);
                tries++;
            } while (tries < 4 && !_success);

            server.UnconnectedDataReceived -= DataReceived;

            if (_success)
                ConfirmedOpenPort = port;

            return _success;
        }

        private static void DataReceived(object sender, UnconnectedDataReceivedEventArgs e)
        {
            // We only want data from the source
            if (e.Sender.GetHashCode() != Service.GetHashCode())
                return;

            // read our IP
            IPAddress add = new IPAddress(e.Data);
            ExternalIp = add.ToString();
            /*
            
            // Don't need to send back ACK

            byte[] ack = new byte[4];

            ack[0] = 0x41;
            ack[0] = 0x43;
            ack[0] = 0x4b;
            ack[0] = 0x00;

            ((UdpConnectionListener)Form1.listener).SendUnconnectedBytes(ack, Service);
            */
            _success = true;
        }

        private static byte[] BuildStartPacket(short port)
        {
            byte[] buffer = new byte[64];

            buffer[0] = 0x73;
            buffer[1] = 0x6d;
            buffer[2] = 0x36;
            buffer[3] = 0x34;
            buffer[4] = 0x6f;
            buffer[5] = 0x69;
            buffer[6] = 0x70;
            buffer[7] = 0x63;
            buffer[8] = 0x30;
            buffer[9] = 0x30;
            buffer[10] = 0x30;
            buffer[11] = 0x30;

            Array.Copy(BitConverter.GetBytes(port), 0, buffer, 12, 2);

            return buffer;
        }
    }
}