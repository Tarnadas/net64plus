using System;
using System.Net;
using System.Text;
using WebSocketSharp;

namespace SM64O
{
    public class WebSocketConnection : WebSocket
    {
        public WebSocketConnection(string target) : base(target)
        {}

        public void SendPacket(PacketType type, byte[] payload)
        {
            byte[] buffer = new byte[payload.Length + 1];
            buffer[0] = (byte)type;
            Array.Copy(payload, 0, buffer, 1, payload.Length);
            Send(buffer);
        }

        private string PrintBytes(byte[] byteArray)
        {
            var sb = new StringBuilder("new byte[] { ");
            for(var i = 0; i < byteArray.Length; i++)
            {
                var b = byteArray[i];
                sb.Append(b);
                if (i < byteArray.Length -1)
                {
                    sb.Append(", ");
                }
            }
            sb.Append(" }");
            return sb.ToString();
        }
    }
}