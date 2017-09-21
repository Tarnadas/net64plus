using System.IO;
using System.Xml.Serialization;

namespace SM64O
{
    public class Settings
    {
        public string LastIp;
        public int LastPort;
        public string Username;
        public int LastCharacter;
        public int LastEmulator;

        public static Settings Load(string path)
        {
            if (!File.Exists(path))
                return null;

            using (var file = File.OpenRead(path))
            {
                var ser = new XmlSerializer(typeof(Settings));

                Settings set = (Settings) ser.Deserialize(file);
                return set;
            }
        }

        public static void Save(Settings set, string path)
        {
            try
            {
                using (var file = File.OpenWrite(path))
                {
                    var ser = new XmlSerializer(typeof(Settings));

                    ser.Serialize(file, set);

                    file.SetLength(file.Position);
                }
            }
            catch(IOException)
            { } // Swallow IO exceptions
        }
    }
}