# Net64+ Networking Protocol

Net64+ >=2.0 will entirely use [Protocol Buffer](https://developers.google.com/protocol-buffers/docs/overview) for message serialization.

The type of compression that will be used is still WIP.
Candidates are [ZSTD](http://facebook.github.io/zstd) or GZIP. ZSTD has the advantage, that it is heavily optimized for small data compression. You need to feed it a lot of training data and it will generate an optimized dictionary, which can then be used for future compressions.

## Server to Client

A server-client-message has the following definition:

```proto
message ServerClientMessage {
  enum Compression {
    NONE = 0;
    ZSTD = 1;
    GZIP = 2;
  }
  Compression compression = 1;
  oneof message {
    bytes compressed_data = 2;
    ServerClient data = 3;
  }
}
```

Any message received from a client can potentially be compressed. The compression type can be seen in field#1. The `ServerClient` type is the uncompressed message. If any compression method was used, the compressed data can instead be decompressed and deserialized to a `ServerClient` object.

#### ServerClient Object

A `ServerClient` object has the following definition:

```proto
message ServerClient {
  enum MessageType {
    HANDSHAKE = 0;
    PING = 1;
    SERVER_MESSAGE = 2;
    PLAYER_LIST_UPDATE = 3;
    PLAYER_UPDATE = 4;
    PLAYER_DATA = 128;
    META_DATA = 129;
    META_MESSAGE = 130;
    CHAT_MESSAGE = 131;
  }
  MessageType message_type = 1;
  oneof message {
    Handshake handshake = 2;
    Ping ping = 3;
    ServerMessage server_message = 3;
    PlayerListUpdate player_list_update_message = 4;
    PlayerUpdate player_update_message = 5;
    MetaData meta_data_message = 6;
    Chat chat_message = 7;
  }
}
```

The most significant bit of the `MessageType` enum reflects whether the message contains data that is used by the emulator.

A `ServerMessage` contains data which is used by the client program to determine various client-specific tasks.

A `PlayerListUpdate` contains a list of all currently connected players.

A `PlayerUpdate` is a single player update, because it is more lightweight to only send the diff, if a player object changes.

`PlayerData` contains an array of player data from all currently connected players, which will be sent with ~30fps.

`MetaData` contains any additional data, that needs to be sent from the Emulator.

`Chat` is a chat message.
![You don't day](https://i.imgur.com/38BlfVp.png?1)