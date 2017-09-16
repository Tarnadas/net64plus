using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace PortcheckService
{
    class Program
    {
        private static UdpClient _mainSocket;
        private static readonly byte[] MagicSequence = new byte[4] { 0x43, 0x4f, 0x4e, 0x43 };
        private static readonly byte[] OurSequence = new byte[] { 0x73, 0x6d, 0x36, 0x34, 0x6f, 0x69, 0x70, 0x63, 0x30, 0x30, 0x30, 0x30 };

        static void Main(string[] args)
        {
            Console.WriteLine("portcheck service starting up...");
            int port = 6460;

            if (args.Length > 0 && int.TryParse(args[0], out port))
            {}

            Console.WriteLine("using port " + port);

            try
            {
                IPEndPoint localEP = new IPEndPoint(IPAddress.Any, port);
                _mainSocket = new UdpClient(localEP);

                Receive().GetAwaiter().GetResult();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        static async Task Receive()
        {
            while (true)
            {
                UdpReceiveResult result = await _mainSocket.ReceiveAsync();
                await HandlePacket(result);
            }
        }

        private static async Task HandlePacket(UdpReceiveResult res)
        {
            if (!ArrayCompare(OurSequence, 0, res.Buffer, 0, OurSequence.Length))
                return;

            byte[] readbackArray = new byte[MagicSequence.Length + 4];

            Array.Copy(MagicSequence, 0, readbackArray, 0, MagicSequence.Length);

            Array.Copy(res.RemoteEndPoint.Address.GetAddressBytes(), 0, readbackArray, MagicSequence.Length, 4);

            short theirPort = BitConverter.ToInt16(res.Buffer, OurSequence.Length);

            var returnEndPoint = new IPEndPoint(res.RemoteEndPoint.Address, theirPort);

            await _mainSocket.SendAsync(readbackArray, readbackArray.Length, returnEndPoint);
        }

        private static bool ArrayCompare<T>(T[] left, int leftStart, T[] right, int rightStart, int len)
        {
            for (int i = 0; i < len; i++)
                if (!EqualityComparer<T>.Default.Equals(left[i], right[i]))
                    return false;

            return true;
        }
    }
}