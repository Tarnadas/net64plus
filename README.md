# Net64+ Client (unofficial) (WIP)

This is a modified client for Net64 aka Sm64O, that uses the Websocket protocol.

## Download

Download the client in the [release section](https://github.com/Tarnadas/sm64o/releases).

## Why?

Because the official client uses the [Hazel protocol](https://github.com/DarkRiftNetworking/Hazel-Networking) and I want to make a dedicated server with Node.js.
The Hazel protocol is only implemented in C# and honestly, noone uses it (sorry).

With this client you won't be able to connect to any official server. You can only connect to servers, that use my [dedicated server software](https://github.com/Tarnadas/sm64o-ded). You also won't be able to create a server with this client.

If you want to get the original client, please go [here](https://github.com/Guad/sm64o). If you only want to play with friends, the official client is a better choice.

## Differences

**__Performance__**

Performance is the major goal of this. Even though it uses TCP, it will outperform the original Net64 software by far and I will explain to you why:

### Networking and Bandwidth

Player data is what makes 95% of the bandwith while hosting a Net64 server.
- Net64 sends one packet per player per player to be sent. Net64+ sends one packet that contains all player data and sends it to all players.
- Net64 does not use compression. Net64+ uses Gzip compression. This is only possible, because packets for player data are united in one large packet, otherwise Gzip header data would add additional overhead.

Here is a table to break down Networking performance with an example:

| | Net64 | Net64+ |
| --- | --- | --- |
| # of packets to send to N clients | O(N<sup>2</sup>) | O(N) |
| # of bytes to send to N clients (with a player data length of 24) | N<sup>2</sup> * (24 + 4 *(bytes used for memory offset)* + headers) | N * (N * 24 * *Gzip compression size* + headers) |
| # of bytes to send for 24 clients (assume 10 bytes for all headers and an average Gzip compression size of 60%) | 24<sup>2</sup> * (24 + 4 + 10) = 21888B = **21.375KB** | 24 * (24 * 24 * 0.6 + 10 + 10 *(Gzip header)*) = 8775B = **8.57KB** |
| # of bytes/s to send for 24 clients with an update rate of 16ms | 21.375KB / 0.016s = 1335.94KB/s = **1.3MB/s** | 8.57KB / 0.016s = 535.63KB/s = **0.52MB/s**

### CPU

Net64+ server is written in JavaScript and runs with Node.js, which uses Google's super fast V8 engine.
It is platform independent and you don't have to run an emulator for hosting a dedicated server. However Gzip compression requires CPU, but it should not affect gameplay that much.