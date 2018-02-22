import * as $protobuf from "protobufjs";

/** Namespace net64. */
export namespace net64 {

    /** Properties of a ClientServerMessage. */
    interface IClientServerMessage {

        /** ClientServerMessage compression */
        compression?: (net64.shared.Compression|null);

        /** ClientServerMessage uncompressedSize */
        uncompressedSize?: (number|null);

        /** ClientServerMessage compressedData */
        compressedData?: (Uint8Array|null);

        /** ClientServerMessage data */
        data?: (net64.client.IClientServer|null);
    }

    /** Represents a ClientServerMessage. */
    class ClientServerMessage implements IClientServerMessage {

        /**
         * Constructs a new ClientServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: net64.IClientServerMessage);

        /** ClientServerMessage compression. */
        public compression: net64.shared.Compression;

        /** ClientServerMessage uncompressedSize. */
        public uncompressedSize: number;

        /** ClientServerMessage compressedData. */
        public compressedData: Uint8Array;

        /** ClientServerMessage data. */
        public data?: (net64.client.IClientServer|null);

        /** ClientServerMessage message. */
        public message?: ("compressedData"|"data");

        /**
         * Creates a new ClientServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientServerMessage instance
         */
        public static create(properties?: net64.IClientServerMessage): net64.ClientServerMessage;

        /**
         * Encodes the specified ClientServerMessage message. Does not implicitly {@link net64.ClientServerMessage.verify|verify} messages.
         * @param message ClientServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: net64.IClientServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientServerMessage message, length delimited. Does not implicitly {@link net64.ClientServerMessage.verify|verify} messages.
         * @param message ClientServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: net64.IClientServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.ClientServerMessage;

        /**
         * Decodes a ClientServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.ClientServerMessage;

        /**
         * Verifies a ClientServerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientServerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientServerMessage
         */
        public static fromObject(object: { [k: string]: any }): net64.ClientServerMessage;

        /**
         * Creates a plain object from a ClientServerMessage message. Also converts values to other types if specified.
         * @param message ClientServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: net64.ClientServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientServerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Namespace client. */
    namespace client {

        /** Properties of a ClientServer. */
        interface IClientServer {

            /** ClientServer messageType */
            messageType?: (net64.client.ClientServer.MessageType|null);

            /** ClientServer handshake */
            handshake?: (net64.client.IHandshake|null);

            /** ClientServer ping */
            ping?: (net64.shared.IPing|null);

            /** ClientServer player */
            player?: (net64.shared.IPlayer|null);

            /** ClientServer playerData */
            playerData?: (net64.client.IPlayerData|null);

            /** ClientServer metaData */
            metaData?: (net64.shared.IMetaData|null);

            /** ClientServer chat */
            chat?: (net64.shared.IChat|null);
        }

        /** Represents a ClientServer. */
        class ClientServer implements IClientServer {

            /**
             * Constructs a new ClientServer.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.client.IClientServer);

            /** ClientServer messageType. */
            public messageType: net64.client.ClientServer.MessageType;

            /** ClientServer handshake. */
            public handshake?: (net64.client.IHandshake|null);

            /** ClientServer ping. */
            public ping?: (net64.shared.IPing|null);

            /** ClientServer player. */
            public player?: (net64.shared.IPlayer|null);

            /** ClientServer playerData. */
            public playerData?: (net64.client.IPlayerData|null);

            /** ClientServer metaData. */
            public metaData?: (net64.shared.IMetaData|null);

            /** ClientServer chat. */
            public chat?: (net64.shared.IChat|null);

            /** ClientServer message. */
            public message?: ("handshake"|"ping"|"player"|"playerData"|"metaData"|"chat");

            /**
             * Creates a new ClientServer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientServer instance
             */
            public static create(properties?: net64.client.IClientServer): net64.client.ClientServer;

            /**
             * Encodes the specified ClientServer message. Does not implicitly {@link net64.client.ClientServer.verify|verify} messages.
             * @param message ClientServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.client.IClientServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientServer message, length delimited. Does not implicitly {@link net64.client.ClientServer.verify|verify} messages.
             * @param message ClientServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.client.IClientServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientServer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.client.ClientServer;

            /**
             * Decodes a ClientServer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.client.ClientServer;

            /**
             * Verifies a ClientServer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientServer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientServer
             */
            public static fromObject(object: { [k: string]: any }): net64.client.ClientServer;

            /**
             * Creates a plain object from a ClientServer message. Also converts values to other types if specified.
             * @param message ClientServer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.client.ClientServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientServer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ClientServer {

            /** MessageType enum. */
            enum MessageType {
                UNKNOWN = 0,
                HANDSHAKE = 2,
                PING = 3,
                PLAYER_UPDATE = 6,
                PLAYER_DATA = 128,
                META_DATA = 129,
                CHAT = 130
            }
        }

        /** Properties of a Handshake. */
        interface IHandshake {

            /** Handshake major */
            major?: (number|null);

            /** Handshake minor */
            minor?: (number|null);

            /** Handshake characterId */
            characterId?: (number|null);

            /** Handshake username */
            username?: (string|null);
        }

        /** Represents a Handshake. */
        class Handshake implements IHandshake {

            /**
             * Constructs a new Handshake.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.client.IHandshake);

            /** Handshake major. */
            public major: number;

            /** Handshake minor. */
            public minor: number;

            /** Handshake characterId. */
            public characterId: number;

            /** Handshake username. */
            public username: string;

            /**
             * Creates a new Handshake instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Handshake instance
             */
            public static create(properties?: net64.client.IHandshake): net64.client.Handshake;

            /**
             * Encodes the specified Handshake message. Does not implicitly {@link net64.client.Handshake.verify|verify} messages.
             * @param message Handshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.client.IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Handshake message, length delimited. Does not implicitly {@link net64.client.Handshake.verify|verify} messages.
             * @param message Handshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.client.IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Handshake message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.client.Handshake;

            /**
             * Decodes a Handshake message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.client.Handshake;

            /**
             * Verifies a Handshake message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Handshake message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Handshake
             */
            public static fromObject(object: { [k: string]: any }): net64.client.Handshake;

            /**
             * Creates a plain object from a Handshake message. Also converts values to other types if specified.
             * @param message Handshake
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.client.Handshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Handshake to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PlayerData. */
        interface IPlayerData {

            /** PlayerData dataLength */
            dataLength?: (number|null);

            /** PlayerData playerData */
            playerData?: (Uint8Array|null);
        }

        /** Represents a PlayerData. */
        class PlayerData implements IPlayerData {

            /**
             * Constructs a new PlayerData.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.client.IPlayerData);

            /** PlayerData dataLength. */
            public dataLength: number;

            /** PlayerData playerData. */
            public playerData: Uint8Array;

            /**
             * Creates a new PlayerData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlayerData instance
             */
            public static create(properties?: net64.client.IPlayerData): net64.client.PlayerData;

            /**
             * Encodes the specified PlayerData message. Does not implicitly {@link net64.client.PlayerData.verify|verify} messages.
             * @param message PlayerData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.client.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link net64.client.PlayerData.verify|verify} messages.
             * @param message PlayerData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.client.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.client.PlayerData;

            /**
             * Decodes a PlayerData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.client.PlayerData;

            /**
             * Verifies a PlayerData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PlayerData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PlayerData
             */
            public static fromObject(object: { [k: string]: any }): net64.client.PlayerData;

            /**
             * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
             * @param message PlayerData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.client.PlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace shared. */
    namespace shared {

        /** Properties of a Ping. */
        interface IPing {
        }

        /** Represents a Ping. */
        class Ping implements IPing {

            /**
             * Constructs a new Ping.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IPing);

            /**
             * Creates a new Ping instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Ping instance
             */
            public static create(properties?: net64.shared.IPing): net64.shared.Ping;

            /**
             * Encodes the specified Ping message. Does not implicitly {@link net64.shared.Ping.verify|verify} messages.
             * @param message Ping message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Ping message, length delimited. Does not implicitly {@link net64.shared.Ping.verify|verify} messages.
             * @param message Ping message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Ping message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.Ping;

            /**
             * Decodes a Ping message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.Ping;

            /**
             * Verifies a Ping message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Ping message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Ping
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.Ping;

            /**
             * Creates a plain object from a Ping message. Also converts values to other types if specified.
             * @param message Ping
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Ping to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Player. */
        interface IPlayer {

            /** Player username */
            username?: (string|null);

            /** Player characterId */
            characterId?: (number|null);
        }

        /** Represents a Player. */
        class Player implements IPlayer {

            /**
             * Constructs a new Player.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IPlayer);

            /** Player username. */
            public username: string;

            /** Player characterId. */
            public characterId: number;

            /**
             * Creates a new Player instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Player instance
             */
            public static create(properties?: net64.shared.IPlayer): net64.shared.Player;

            /**
             * Encodes the specified Player message. Does not implicitly {@link net64.shared.Player.verify|verify} messages.
             * @param message Player message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link net64.shared.Player.verify|verify} messages.
             * @param message Player message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.Player;

            /**
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.Player;

            /**
             * Verifies a Player message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Player message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Player
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.Player;

            /**
             * Creates a plain object from a Player message. Also converts values to other types if specified.
             * @param message Player
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Player to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Meta. */
        interface IMeta {

            /** Meta length */
            length?: (number|null);

            /** Meta address */
            address?: (number|null);

            /** Meta data */
            data?: (Uint8Array|null);
        }

        /** Represents a Meta. */
        class Meta implements IMeta {

            /**
             * Constructs a new Meta.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IMeta);

            /** Meta length. */
            public length: number;

            /** Meta address. */
            public address: number;

            /** Meta data. */
            public data: Uint8Array;

            /**
             * Creates a new Meta instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Meta instance
             */
            public static create(properties?: net64.shared.IMeta): net64.shared.Meta;

            /**
             * Encodes the specified Meta message. Does not implicitly {@link net64.shared.Meta.verify|verify} messages.
             * @param message Meta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Meta message, length delimited. Does not implicitly {@link net64.shared.Meta.verify|verify} messages.
             * @param message Meta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Meta message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Meta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.Meta;

            /**
             * Decodes a Meta message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Meta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.Meta;

            /**
             * Verifies a Meta message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Meta message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Meta
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.Meta;

            /**
             * Creates a plain object from a Meta message. Also converts values to other types if specified.
             * @param message Meta
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.Meta, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Meta to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MetaData. */
        interface IMetaData {

            /** MetaData metaData */
            metaData?: (net64.shared.IMeta[]|null);
        }

        /** Represents a MetaData. */
        class MetaData implements IMetaData {

            /**
             * Constructs a new MetaData.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IMetaData);

            /** MetaData metaData. */
            public metaData: net64.shared.IMeta[];

            /**
             * Creates a new MetaData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MetaData instance
             */
            public static create(properties?: net64.shared.IMetaData): net64.shared.MetaData;

            /**
             * Encodes the specified MetaData message. Does not implicitly {@link net64.shared.MetaData.verify|verify} messages.
             * @param message MetaData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IMetaData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MetaData message, length delimited. Does not implicitly {@link net64.shared.MetaData.verify|verify} messages.
             * @param message MetaData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IMetaData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MetaData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MetaData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.MetaData;

            /**
             * Decodes a MetaData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MetaData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.MetaData;

            /**
             * Verifies a MetaData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MetaData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MetaData
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.MetaData;

            /**
             * Creates a plain object from a MetaData message. Also converts values to other types if specified.
             * @param message MetaData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.MetaData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MetaData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Chat. */
        interface IChat {

            /** Chat chatType */
            chatType?: (net64.shared.Chat.ChatType|null);

            /** Chat senderId */
            senderId?: (number|null);

            /** Chat message */
            message?: (string|null);

            /** Chat global */
            global?: (net64.shared.IChatGlobal|null);

            /** Chat private */
            "private"?: (net64.shared.IChatPrivate|null);
        }

        /** Represents a Chat. */
        class Chat implements IChat {

            /**
             * Constructs a new Chat.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IChat);

            /** Chat chatType. */
            public chatType: net64.shared.Chat.ChatType;

            /** Chat senderId. */
            public senderId: number;

            /** Chat message. */
            public message: string;

            /** Chat global. */
            public global?: (net64.shared.IChatGlobal|null);

            /** Chat private. */
            public private?: (net64.shared.IChatPrivate|null);

            /** Chat messageType. */
            public messageType?: ("global"|"private");

            /**
             * Creates a new Chat instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Chat instance
             */
            public static create(properties?: net64.shared.IChat): net64.shared.Chat;

            /**
             * Encodes the specified Chat message. Does not implicitly {@link net64.shared.Chat.verify|verify} messages.
             * @param message Chat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Chat message, length delimited. Does not implicitly {@link net64.shared.Chat.verify|verify} messages.
             * @param message Chat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Chat message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.Chat;

            /**
             * Decodes a Chat message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.Chat;

            /**
             * Verifies a Chat message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Chat message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Chat
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.Chat;

            /**
             * Creates a plain object from a Chat message. Also converts values to other types if specified.
             * @param message Chat
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.Chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Chat to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Chat {

            /** ChatType enum. */
            enum ChatType {
                GLOBAL = 0,
                PRIVATE = 1
            }
        }

        /** Properties of a ChatGlobal. */
        interface IChatGlobal {
        }

        /** Represents a ChatGlobal. */
        class ChatGlobal implements IChatGlobal {

            /**
             * Constructs a new ChatGlobal.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IChatGlobal);

            /**
             * Creates a new ChatGlobal instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChatGlobal instance
             */
            public static create(properties?: net64.shared.IChatGlobal): net64.shared.ChatGlobal;

            /**
             * Encodes the specified ChatGlobal message. Does not implicitly {@link net64.shared.ChatGlobal.verify|verify} messages.
             * @param message ChatGlobal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IChatGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChatGlobal message, length delimited. Does not implicitly {@link net64.shared.ChatGlobal.verify|verify} messages.
             * @param message ChatGlobal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IChatGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChatGlobal message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChatGlobal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.ChatGlobal;

            /**
             * Decodes a ChatGlobal message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChatGlobal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.ChatGlobal;

            /**
             * Verifies a ChatGlobal message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChatGlobal message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChatGlobal
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.ChatGlobal;

            /**
             * Creates a plain object from a ChatGlobal message. Also converts values to other types if specified.
             * @param message ChatGlobal
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.ChatGlobal, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChatGlobal to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ChatPrivate. */
        interface IChatPrivate {

            /** ChatPrivate receiverId */
            receiverId?: (number|null);
        }

        /** Represents a ChatPrivate. */
        class ChatPrivate implements IChatPrivate {

            /**
             * Constructs a new ChatPrivate.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IChatPrivate);

            /** ChatPrivate receiverId. */
            public receiverId: number;

            /**
             * Creates a new ChatPrivate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChatPrivate instance
             */
            public static create(properties?: net64.shared.IChatPrivate): net64.shared.ChatPrivate;

            /**
             * Encodes the specified ChatPrivate message. Does not implicitly {@link net64.shared.ChatPrivate.verify|verify} messages.
             * @param message ChatPrivate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IChatPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChatPrivate message, length delimited. Does not implicitly {@link net64.shared.ChatPrivate.verify|verify} messages.
             * @param message ChatPrivate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IChatPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChatPrivate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChatPrivate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.ChatPrivate;

            /**
             * Decodes a ChatPrivate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChatPrivate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.ChatPrivate;

            /**
             * Verifies a ChatPrivate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChatPrivate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChatPrivate
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.ChatPrivate;

            /**
             * Creates a plain object from a ChatPrivate message. Also converts values to other types if specified.
             * @param message ChatPrivate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.ChatPrivate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChatPrivate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Compression enum. */
        enum Compression {
            NONE = 0,
            ZSTD = 1,
            GZIP = 2
        }
    }
}
