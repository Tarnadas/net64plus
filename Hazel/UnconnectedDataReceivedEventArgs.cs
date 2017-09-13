using System;
using System.Net;

namespace Hazel
{
    public class UnconnectedDataReceivedEventArgs : EventArgs, IRecyclable
    {
        static readonly ObjectPool<UnconnectedDataReceivedEventArgs> objectPool = new ObjectPool<UnconnectedDataReceivedEventArgs>(() => new UnconnectedDataReceivedEventArgs());

        internal static UnconnectedDataReceivedEventArgs GetObject()
        {
            return objectPool.GetObject();
        }

        public void Recycle()
        {
            objectPool.PutObject(this);
        }

        public byte[] Data { get; set; }
        public EndPoint Sender { get; set; }
    }
}