//
// Authors:
//   Ben Motmans <ben.motmans@gmail.com>
//
// Copyright (C) 2007 Ben Motmans
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Collections.Generic;
using System.IO;
using System.Net.NetworkInformation;

namespace Mono.Nat
{
	public static class NatUtility
	{
        private static ManualResetEvent searching;
		public static event EventHandler<DeviceEventArgs> DeviceFound;
		public static event EventHandler<DeviceEventArgs> DeviceLost;
        
        public static event EventHandler<UnhandledExceptionEventArgs> UnhandledException;

		private static TextWriter logger;
		private static List<ISearcher> controllers;
		private static bool verbose;

		public static TextWriter Logger
		{
			get { return logger; }
			set { logger = value; }
		}

		public static bool Verbose
		{
			get { return verbose; }
			set { verbose = value; }
		}
		
        static NatUtility()
        {
            searching = new ManualResetEvent(false);

            controllers = new List<ISearcher>();
            controllers.Add(UpnpSearcher.Instance);
            controllers.Add(PmpSearcher.Instance);

            foreach (ISearcher searcher in controllers)
            {
                searcher.DeviceFound += delegate(object sender, DeviceEventArgs args)
                {
                    if (DeviceFound != null)
                        DeviceFound(sender, args);
                };
                searcher.DeviceLost += delegate(object sender, DeviceEventArgs args)
                {
                    if (DeviceLost != null)
                        DeviceLost(sender, args);
                };
            }
            Thread t = new Thread((ThreadStart)delegate { SearchAndListen(); });
            t.IsBackground = true;
            t.Start();
        }

		internal static void Log(string format, params object[] args)
		{
			TextWriter logger = Logger;
			if (logger != null)
				logger.WriteLine(format, args);
		}

        private static void SearchAndListen()
        {
            while (true)
            {
                searching.WaitOne();

                try
                {
					Receive(UpnpSearcher.Instance, UpnpSearcher.sockets);
					Receive(PmpSearcher.Instance, PmpSearcher.sockets);

                    foreach (ISearcher s in controllers)
                        if (s.NextSearch < DateTime.Now)
                        {
                            Log("Searching for: {0}", s.GetType().Name);
							s.Search();
                        }
                }
                catch (Exception e)
                {
                    if (UnhandledException != null)
                        UnhandledException(typeof(NatUtility), new UnhandledExceptionEventArgs(e, false));
                }
				System.Threading.Thread.Sleep(10);
            }
		}

		static void Receive (ISearcher searcher, List<UdpClient> clients)
		{
			IPEndPoint received = new IPEndPoint(IPAddress.Parse("192.168.0.1"), 5351);
			foreach (UdpClient client in clients)
			{
				if (client.Available > 0)
				{
				    IPAddress localAddress = ((IPEndPoint)client.Client.LocalEndPoint).Address;
					byte[] data = client.Receive(ref received);
					searcher.Handle(localAddress, data, received);
				}
            }
        }
		
		public static void StartDiscovery ()
		{
            searching.Set();
		}

		public static void StopDiscovery ()
		{
            searching.Reset();
		}

		[Obsolete ("This method serves no purpose and shouldn't be used")]
		public static IPAddress[] GetLocalAddresses (bool includeIPv6)
		{
			List<IPAddress> addresses = new List<IPAddress> ();

			IPHostEntry hostInfo = Dns.GetHostEntry (Dns.GetHostName ());
			foreach (IPAddress address in hostInfo.AddressList) {
				if (address.AddressFamily == AddressFamily.InterNetwork ||
					(includeIPv6 && address.AddressFamily == AddressFamily.InterNetworkV6)) {
					addresses.Add (address);
				}
			}
			
			return addresses.ToArray ();
		}
		
		//checks if an IP address is a private address space as defined by RFC 1918
		public static bool IsPrivateAddressSpace (IPAddress address)
		{
			byte[] ba = address.GetAddressBytes ();

			switch ((int)ba[0]) {
			case 10:
				return true; //10.x.x.x
			case 172:
				return ((int)ba[1] & 16) != 0; //172.16-31.x.x
			case 192:
				return (int)ba[1] == 168; //192.168.x.x
			default:
				return false;
			}
		}
	}
}
