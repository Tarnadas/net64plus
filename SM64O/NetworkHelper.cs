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

        private const string ServiceAddress = "127.0.0.1";
        private const int ServicePort = 6460;

        private static readonly EndPoint Service = new IPEndPoint(IPAddress.Parse(ServiceAddress), ServicePort);

        private static bool _success; // this is dirty

        public static async Task<bool> RequestAssistance(int port)
        {
            if (ConfirmedOpenPort == port)
                return true;

            var server = ((UdpConnectionListener) Form1.listener);

            if (server == null) return false;

            _success = false;
            ConfirmedOpenPort = 0;
            ExternalIp = null;

            server.UnconnectedDataReceived += DataReceived;

            int tries = 0;
            byte[] packet = BuildStartPacket((short) port);

            do
            {
                server.SendUnconnectedBytes(packet, Service);

                await Task.Delay(500);

                if (_success)
                    break;
            } while (tries < 4);

            server.UnconnectedDataReceived -= DataReceived;

            return _success;
        }

        private static void DataReceived(object sender, UnconnectedDataReceivedEventArgs e)
        {
            // TODO: Read packet back

            // We only want data from the source
            if (e.Sender.GetHashCode() != Service.GetHashCode())
                return;

            byte[] ack = new byte[4];

            ((UdpConnectionListener)Form1.listener).SendUnconnectedBytes(ack, Service);

            _success = true;
        }

        private static byte[] BuildStartPacket(short port)
        {
            byte[] buffer = new byte[400];

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