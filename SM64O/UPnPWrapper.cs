using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Windows.Forms;
using Mono.Nat;

namespace SM64O
{
    public class UPnPWrapper
    {
        public List<INatDevice> Devices = new List<INatDevice>();
        private List<Mapping> _mappings = new List<Mapping>();
        private string _cachedIp;

        public UPnPWrapper()
        {
            NatUtility.DeviceFound += NatUtilityOnDeviceFound;
            NatUtility.DeviceLost += NatUtilityOnDeviceLost;
        }

        public bool UPnPAvailable
        {
            get { return Devices.Count > 0; }
        }

        public string GetExternalIp()
        {
            if (!string.IsNullOrEmpty(_cachedIp)) return _cachedIp;
            if (!UPnPAvailable) return null;
            
            INatDevice dev = Devices[0];

            IPAddress external = dev.GetExternalIP();

            return _cachedIp = external.ToString();
        }

        public bool AddPortRule(int port, bool tcp, string desc)
        {
            if (!UPnPAvailable) return false;

            try
            {
                Mapping map = new Mapping(tcp ? Protocol.Tcp : Protocol.Udp, port, port);
                map.Description = desc;

                Devices[0].CreatePortMap(map);
                _mappings.Add(map);
                return true;
            }
            catch (MappingException)
            {
                return false;
            }
        }

        public bool RemovePortRule(int port)
        {
            if (!UPnPAvailable) return false;

            foreach (Mapping mapping in Devices[0].GetAllMappings())
            {
                if (mapping.PrivatePort == mapping.PublicPort && mapping.PublicPort == port)
                    Devices[0].DeletePortMap(mapping);
            }
            
            return true;
        }

        public void RemoveOurRules()
        {
            if (!UPnPAvailable) return;

            foreach (var mapping in _mappings)
            {
                Devices[0].DeletePortMap(mapping);
            }

            _mappings.Clear();
        }

        public void StopDiscovery()
        {
            NatUtility.StopDiscovery();
        }

        public void Initialize()
        {
            Task.Run(() =>
            {
                try
                {
                    NatUtility.StartDiscovery();
                }
                catch { }
                // Swallow NAT exceptions
            });
        }

        private void NatUtilityOnDeviceLost(object sender, DeviceEventArgs deviceEventArgs)
        {
            Devices.Remove(deviceEventArgs.Device);
        }

        private void NatUtilityOnDeviceFound(object sender, DeviceEventArgs deviceEventArgs)
        {
            Devices.Add(deviceEventArgs.Device);
        }
    }
}