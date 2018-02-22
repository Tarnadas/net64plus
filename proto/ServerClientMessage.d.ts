import * as $protobuf from "protobufjs";

/** Namespace net64. */
export namespace net64 {

    /** Properties of a ServerClientMessage. */
    interface IServerClientMessage {

        /** ServerClientMessage compression */
        compression?: (net64.shared.Compression|null);

        /** ServerClientMessage uncompressedSize */
        uncompressedSize?: (number|null);

        /** ServerClientMessage compressedData */
        compressedData?: (Uint8Array|null);

        /** ServerClientMessage data */
        data?: (net64.server.IServerClient|null);
    }

    /** Represents a ServerClientMessage. */
    class ServerClientMessage implements IServerClientMessage {

        /**
         * Constructs a new ServerClientMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: net64.IServerClientMessage);

        /** ServerClientMessage compression. */
        public compression: net64.shared.Compression;

        /** ServerClientMessage uncompressedSize. */
        public uncompressedSize: number;

        /** ServerClientMessage compressedData. */
        public compressedData: Uint8Array;

        /** ServerClientMessage data. */
        public data?: (net64.server.IServerClient|null);

        /** ServerClientMessage message. */
        public message?: ("compressedData"|"data");

        /**
         * Creates a new ServerClientMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerClientMessage instance
         */
        public static create(properties?: net64.IServerClientMessage): net64.ServerClientMessage;

        /**
         * Encodes the specified ServerClientMessage message. Does not implicitly {@link net64.ServerClientMessage.verify|verify} messages.
         * @param message ServerClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: net64.IServerClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerClientMessage message, length delimited. Does not implicitly {@link net64.ServerClientMessage.verify|verify} messages.
         * @param message ServerClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: net64.IServerClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerClientMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.ServerClientMessage;

        /**
         * Decodes a ServerClientMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.ServerClientMessage;

        /**
         * Verifies a ServerClientMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerClientMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerClientMessage
         */
        public static fromObject(object: { [k: string]: any }): net64.ServerClientMessage;

        /**
         * Creates a plain object from a ServerClientMessage message. Also converts values to other types if specified.
         * @param message ServerClientMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: net64.ServerClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerClientMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Namespace server. */
    namespace server {

        /** Properties of a ServerClient. */
        interface IServerClient {

            /** ServerClient messageType */
            messageType?: (net64.server.ServerClient.MessageType|null);

            /** ServerClient handshake */
            handshake?: (net64.server.IHandshake|null);

            /** ServerClient ping */
            ping?: (net64.shared.IPing|null);

            /** ServerClient serverMessage */
            serverMessage?: (net64.server.IServerMessage|null);

            /** ServerClient playerListUpdate */
            playerListUpdate?: (net64.server.IPlayerListUpdate|null);

            /** ServerClient playerUpdate */
            playerUpdate?: (net64.server.IPlayerUpdate|null);

            /** ServerClient playerData */
            playerData?: (net64.server.IPlayerData|null);

            /** ServerClient metaData */
            metaData?: (net64.shared.IMetaData|null);

            /** ServerClient chat */
            chat?: (net64.shared.IChat|null);
        }

        /** Represents a ServerClient. */
        class ServerClient implements IServerClient {

            /**
             * Constructs a new ServerClient.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IServerClient);

            /** ServerClient messageType. */
            public messageType: net64.server.ServerClient.MessageType;

            /** ServerClient handshake. */
            public handshake?: (net64.server.IHandshake|null);

            /** ServerClient ping. */
            public ping?: (net64.shared.IPing|null);

            /** ServerClient serverMessage. */
            public serverMessage?: (net64.server.IServerMessage|null);

            /** ServerClient playerListUpdate. */
            public playerListUpdate?: (net64.server.IPlayerListUpdate|null);

            /** ServerClient playerUpdate. */
            public playerUpdate?: (net64.server.IPlayerUpdate|null);

            /** ServerClient playerData. */
            public playerData?: (net64.server.IPlayerData|null);

            /** ServerClient metaData. */
            public metaData?: (net64.shared.IMetaData|null);

            /** ServerClient chat. */
            public chat?: (net64.shared.IChat|null);

            /** ServerClient message. */
            public message?: ("handshake"|"ping"|"serverMessage"|"playerListUpdate"|"playerUpdate"|"playerData"|"metaData"|"chat");

            /**
             * Creates a new ServerClient instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerClient instance
             */
            public static create(properties?: net64.server.IServerClient): net64.server.ServerClient;

            /**
             * Encodes the specified ServerClient message. Does not implicitly {@link net64.server.ServerClient.verify|verify} messages.
             * @param message ServerClient message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IServerClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerClient message, length delimited. Does not implicitly {@link net64.server.ServerClient.verify|verify} messages.
             * @param message ServerClient message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IServerClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerClient message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.ServerClient;

            /**
             * Decodes a ServerClient message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.ServerClient;

            /**
             * Verifies a ServerClient message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerClient message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerClient
             */
            public static fromObject(object: { [k: string]: any }): net64.server.ServerClient;

            /**
             * Creates a plain object from a ServerClient message. Also converts values to other types if specified.
             * @param message ServerClient
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.ServerClient, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerClient to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ServerClient {

            /** MessageType enum. */
            enum MessageType {
                UNKNOWN = 0,
                HANDSHAKE = 2,
                PING = 3,
                SERVER_MESSAGE = 4,
                PLAYER_LIST_UPDATE = 5,
                PLAYER_UPDATE = 6,
                PLAYER_DATA = 128,
                META_DATA = 129,
                CHAT = 130
            }
        }

        /** Properties of a Handshake. */
        interface IHandshake {

            /** Handshake playerId */
            playerId?: (number|null);

            /** Handshake gameMode */
            gameMode?: (net64.shared.IGameMode|null);

            /** Handshake playerList */
            playerList?: (net64.server.IPlayerListUpdate|null);
        }

        /** Represents a Handshake. */
        class Handshake implements IHandshake {

            /**
             * Constructs a new Handshake.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IHandshake);

            /** Handshake playerId. */
            public playerId: number;

            /** Handshake gameMode. */
            public gameMode?: (net64.shared.IGameMode|null);

            /** Handshake playerList. */
            public playerList?: (net64.server.IPlayerListUpdate|null);

            /**
             * Creates a new Handshake instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Handshake instance
             */
            public static create(properties?: net64.server.IHandshake): net64.server.Handshake;

            /**
             * Encodes the specified Handshake message. Does not implicitly {@link net64.server.Handshake.verify|verify} messages.
             * @param message Handshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Handshake message, length delimited. Does not implicitly {@link net64.server.Handshake.verify|verify} messages.
             * @param message Handshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Handshake message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.Handshake;

            /**
             * Decodes a Handshake message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.Handshake;

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
            public static fromObject(object: { [k: string]: any }): net64.server.Handshake;

            /**
             * Creates a plain object from a Handshake message. Also converts values to other types if specified.
             * @param message Handshake
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.Handshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Handshake to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PlayerUpdate. */
        interface IPlayerUpdate {

            /** PlayerUpdate playerId */
            playerId?: (number|null);

            /** PlayerUpdate player */
            player?: (net64.shared.IPlayer|null);
        }

        /** Represents a PlayerUpdate. */
        class PlayerUpdate implements IPlayerUpdate {

            /**
             * Constructs a new PlayerUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IPlayerUpdate);

            /** PlayerUpdate playerId. */
            public playerId: number;

            /** PlayerUpdate player. */
            public player?: (net64.shared.IPlayer|null);

            /**
             * Creates a new PlayerUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlayerUpdate instance
             */
            public static create(properties?: net64.server.IPlayerUpdate): net64.server.PlayerUpdate;

            /**
             * Encodes the specified PlayerUpdate message. Does not implicitly {@link net64.server.PlayerUpdate.verify|verify} messages.
             * @param message PlayerUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IPlayerUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerUpdate message, length delimited. Does not implicitly {@link net64.server.PlayerUpdate.verify|verify} messages.
             * @param message PlayerUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IPlayerUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.PlayerUpdate;

            /**
             * Decodes a PlayerUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.PlayerUpdate;

            /**
             * Verifies a PlayerUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PlayerUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PlayerUpdate
             */
            public static fromObject(object: { [k: string]: any }): net64.server.PlayerUpdate;

            /**
             * Creates a plain object from a PlayerUpdate message. Also converts values to other types if specified.
             * @param message PlayerUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.PlayerUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PlayerListUpdate. */
        interface IPlayerListUpdate {

            /** PlayerListUpdate playerUpdates */
            playerUpdates?: (net64.server.IPlayerUpdate[]|null);
        }

        /** Represents a PlayerListUpdate. */
        class PlayerListUpdate implements IPlayerListUpdate {

            /**
             * Constructs a new PlayerListUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IPlayerListUpdate);

            /** PlayerListUpdate playerUpdates. */
            public playerUpdates: net64.server.IPlayerUpdate[];

            /**
             * Creates a new PlayerListUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlayerListUpdate instance
             */
            public static create(properties?: net64.server.IPlayerListUpdate): net64.server.PlayerListUpdate;

            /**
             * Encodes the specified PlayerListUpdate message. Does not implicitly {@link net64.server.PlayerListUpdate.verify|verify} messages.
             * @param message PlayerListUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IPlayerListUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerListUpdate message, length delimited. Does not implicitly {@link net64.server.PlayerListUpdate.verify|verify} messages.
             * @param message PlayerListUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IPlayerListUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerListUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerListUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.PlayerListUpdate;

            /**
             * Decodes a PlayerListUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerListUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.PlayerListUpdate;

            /**
             * Verifies a PlayerListUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PlayerListUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PlayerListUpdate
             */
            public static fromObject(object: { [k: string]: any }): net64.server.PlayerListUpdate;

            /**
             * Creates a plain object from a PlayerListUpdate message. Also converts values to other types if specified.
             * @param message PlayerListUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.PlayerListUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerListUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServerMessage. */
        interface IServerMessage {

            /** ServerMessage messageType */
            messageType?: (net64.server.ServerMessage.MessageType|null);

            /** ServerMessage connectionDenied */
            connectionDenied?: (net64.server.IConnectionDenied|null);

            /** ServerMessage gameMode */
            gameMode?: (net64.shared.IGameMode|null);

            /** ServerMessage serverToken */
            serverToken?: (net64.server.IServerToken|null);

            /** ServerMessage error */
            error?: (net64.server.IError|null);
        }

        /** Represents a ServerMessage. */
        class ServerMessage implements IServerMessage {

            /**
             * Constructs a new ServerMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IServerMessage);

            /** ServerMessage messageType. */
            public messageType: net64.server.ServerMessage.MessageType;

            /** ServerMessage connectionDenied. */
            public connectionDenied?: (net64.server.IConnectionDenied|null);

            /** ServerMessage gameMode. */
            public gameMode?: (net64.shared.IGameMode|null);

            /** ServerMessage serverToken. */
            public serverToken?: (net64.server.IServerToken|null);

            /** ServerMessage error. */
            public error?: (net64.server.IError|null);

            /** ServerMessage message. */
            public message?: ("connectionDenied"|"gameMode"|"serverToken"|"error");

            /**
             * Creates a new ServerMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerMessage instance
             */
            public static create(properties?: net64.server.IServerMessage): net64.server.ServerMessage;

            /**
             * Encodes the specified ServerMessage message. Does not implicitly {@link net64.server.ServerMessage.verify|verify} messages.
             * @param message ServerMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link net64.server.ServerMessage.verify|verify} messages.
             * @param message ServerMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.ServerMessage;

            /**
             * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.ServerMessage;

            /**
             * Verifies a ServerMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerMessage
             */
            public static fromObject(object: { [k: string]: any }): net64.server.ServerMessage;

            /**
             * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
             * @param message ServerMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ServerMessage {

            /** MessageType enum. */
            enum MessageType {
                CONNECTION_DENIED = 0,
                GAME_MODE = 1,
                SERVER_TOKEN = 2,
                ERROR = 3
            }
        }

        /** Properties of a ServerToken. */
        interface IServerToken {

            /** ServerToken tokenType */
            tokenType?: (net64.server.ServerToken.TokenType|null);

            /** ServerToken signature */
            signature?: (string|null);
        }

        /** Represents a ServerToken. */
        class ServerToken implements IServerToken {

            /**
             * Constructs a new ServerToken.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IServerToken);

            /** ServerToken tokenType. */
            public tokenType: net64.server.ServerToken.TokenType;

            /** ServerToken signature. */
            public signature: string;

            /**
             * Creates a new ServerToken instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerToken instance
             */
            public static create(properties?: net64.server.IServerToken): net64.server.ServerToken;

            /**
             * Encodes the specified ServerToken message. Does not implicitly {@link net64.server.ServerToken.verify|verify} messages.
             * @param message ServerToken message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IServerToken, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerToken message, length delimited. Does not implicitly {@link net64.server.ServerToken.verify|verify} messages.
             * @param message ServerToken message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IServerToken, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerToken message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.ServerToken;

            /**
             * Decodes a ServerToken message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.ServerToken;

            /**
             * Verifies a ServerToken message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerToken message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerToken
             */
            public static fromObject(object: { [k: string]: any }): net64.server.ServerToken;

            /**
             * Creates a plain object from a ServerToken message. Also converts values to other types if specified.
             * @param message ServerToken
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.ServerToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerToken to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ServerToken {

            /** TokenType enum. */
            enum TokenType {
                GRANT = 0,
                LOSE = 1
            }
        }

        /** Properties of an Error. */
        interface IError {

            /** Error errorType */
            errorType?: (net64.server.Error.ErrorType|null);

            /** Error message */
            message?: (string|null);
        }

        /** Represents an Error. */
        class Error implements IError {

            /**
             * Constructs a new Error.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IError);

            /** Error errorType. */
            public errorType: net64.server.Error.ErrorType;

            /** Error message. */
            public message: string;

            /**
             * Creates a new Error instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Error instance
             */
            public static create(properties?: net64.server.IError): net64.server.Error;

            /**
             * Encodes the specified Error message. Does not implicitly {@link net64.server.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link net64.server.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.Error;

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.Error;

            /**
             * Verifies an Error message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Error
             */
            public static fromObject(object: { [k: string]: any }): net64.server.Error;

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @param message Error
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Error to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Error {

            /** ErrorType enum. */
            enum ErrorType {
                UNKNOWN = 0,
                BAD_REQUEST = 400,
                UNAUTHORIZED = 401,
                TOO_MANY_REQUESTS = 429,
                INTERNAL_SERVER_ERROR = 500
            }
        }

        /** Properties of a ConnectionDenied. */
        interface IConnectionDenied {

            /** ConnectionDenied reason */
            reason?: (net64.server.ConnectionDenied.Reason|null);

            /** ConnectionDenied serverFull */
            serverFull?: (net64.server.IServerFull|null);

            /** ConnectionDenied wrongVersion */
            wrongVersion?: (net64.server.IWrongVersion|null);
        }

        /** Represents a ConnectionDenied. */
        class ConnectionDenied implements IConnectionDenied {

            /**
             * Constructs a new ConnectionDenied.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IConnectionDenied);

            /** ConnectionDenied reason. */
            public reason: net64.server.ConnectionDenied.Reason;

            /** ConnectionDenied serverFull. */
            public serverFull?: (net64.server.IServerFull|null);

            /** ConnectionDenied wrongVersion. */
            public wrongVersion?: (net64.server.IWrongVersion|null);

            /** ConnectionDenied message. */
            public message?: ("serverFull"|"wrongVersion");

            /**
             * Creates a new ConnectionDenied instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectionDenied instance
             */
            public static create(properties?: net64.server.IConnectionDenied): net64.server.ConnectionDenied;

            /**
             * Encodes the specified ConnectionDenied message. Does not implicitly {@link net64.server.ConnectionDenied.verify|verify} messages.
             * @param message ConnectionDenied message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IConnectionDenied, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectionDenied message, length delimited. Does not implicitly {@link net64.server.ConnectionDenied.verify|verify} messages.
             * @param message ConnectionDenied message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IConnectionDenied, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectionDenied message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectionDenied
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.ConnectionDenied;

            /**
             * Decodes a ConnectionDenied message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectionDenied
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.ConnectionDenied;

            /**
             * Verifies a ConnectionDenied message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectionDenied message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectionDenied
             */
            public static fromObject(object: { [k: string]: any }): net64.server.ConnectionDenied;

            /**
             * Creates a plain object from a ConnectionDenied message. Also converts values to other types if specified.
             * @param message ConnectionDenied
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.ConnectionDenied, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectionDenied to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ConnectionDenied {

            /** Reason enum. */
            enum Reason {
                SERVER_FULL = 0,
                WRONG_VERSION = 1
            }
        }

        /** Properties of a ServerFull. */
        interface IServerFull {

            /** ServerFull maxPlayers */
            maxPlayers?: (number|null);
        }

        /** Represents a ServerFull. */
        class ServerFull implements IServerFull {

            /**
             * Constructs a new ServerFull.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IServerFull);

            /** ServerFull maxPlayers. */
            public maxPlayers: number;

            /**
             * Creates a new ServerFull instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerFull instance
             */
            public static create(properties?: net64.server.IServerFull): net64.server.ServerFull;

            /**
             * Encodes the specified ServerFull message. Does not implicitly {@link net64.server.ServerFull.verify|verify} messages.
             * @param message ServerFull message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IServerFull, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerFull message, length delimited. Does not implicitly {@link net64.server.ServerFull.verify|verify} messages.
             * @param message ServerFull message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IServerFull, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerFull message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerFull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.ServerFull;

            /**
             * Decodes a ServerFull message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerFull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.ServerFull;

            /**
             * Verifies a ServerFull message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerFull message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerFull
             */
            public static fromObject(object: { [k: string]: any }): net64.server.ServerFull;

            /**
             * Creates a plain object from a ServerFull message. Also converts values to other types if specified.
             * @param message ServerFull
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.ServerFull, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerFull to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a WrongVersion. */
        interface IWrongVersion {

            /** WrongVersion majorVersion */
            majorVersion?: (number|null);

            /** WrongVersion minorVersion */
            minorVersion?: (number|null);
        }

        /** Represents a WrongVersion. */
        class WrongVersion implements IWrongVersion {

            /**
             * Constructs a new WrongVersion.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.server.IWrongVersion);

            /** WrongVersion majorVersion. */
            public majorVersion: number;

            /** WrongVersion minorVersion. */
            public minorVersion: number;

            /**
             * Creates a new WrongVersion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WrongVersion instance
             */
            public static create(properties?: net64.server.IWrongVersion): net64.server.WrongVersion;

            /**
             * Encodes the specified WrongVersion message. Does not implicitly {@link net64.server.WrongVersion.verify|verify} messages.
             * @param message WrongVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IWrongVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WrongVersion message, length delimited. Does not implicitly {@link net64.server.WrongVersion.verify|verify} messages.
             * @param message WrongVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IWrongVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WrongVersion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WrongVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.WrongVersion;

            /**
             * Decodes a WrongVersion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WrongVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.WrongVersion;

            /**
             * Verifies a WrongVersion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WrongVersion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WrongVersion
             */
            public static fromObject(object: { [k: string]: any }): net64.server.WrongVersion;

            /**
             * Creates a plain object from a WrongVersion message. Also converts values to other types if specified.
             * @param message WrongVersion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.WrongVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WrongVersion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PlayerData. */
        interface IPlayerData {

            /** PlayerData playerLength */
            playerLength?: (number|null);

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
            constructor(properties?: net64.server.IPlayerData);

            /** PlayerData playerLength. */
            public playerLength: number;

            /** PlayerData dataLength. */
            public dataLength: number;

            /** PlayerData playerData. */
            public playerData: Uint8Array;

            /**
             * Creates a new PlayerData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlayerData instance
             */
            public static create(properties?: net64.server.IPlayerData): net64.server.PlayerData;

            /**
             * Encodes the specified PlayerData message. Does not implicitly {@link net64.server.PlayerData.verify|verify} messages.
             * @param message PlayerData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.server.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link net64.server.PlayerData.verify|verify} messages.
             * @param message PlayerData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.server.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.server.PlayerData;

            /**
             * Decodes a PlayerData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.server.PlayerData;

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
            public static fromObject(object: { [k: string]: any }): net64.server.PlayerData;

            /**
             * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
             * @param message PlayerData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.server.PlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace shared. */
    namespace shared {

        /** Properties of a GameMode. */
        interface IGameMode {

            /** GameMode gameMode */
            gameMode?: (net64.shared.GameMode.GameModeType|null);
        }

        /** Represents a GameMode. */
        class GameMode implements IGameMode {

            /**
             * Constructs a new GameMode.
             * @param [properties] Properties to set
             */
            constructor(properties?: net64.shared.IGameMode);

            /** GameMode gameMode. */
            public gameMode: net64.shared.GameMode.GameModeType;

            /**
             * Creates a new GameMode instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GameMode instance
             */
            public static create(properties?: net64.shared.IGameMode): net64.shared.GameMode;

            /**
             * Encodes the specified GameMode message. Does not implicitly {@link net64.shared.GameMode.verify|verify} messages.
             * @param message GameMode message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: net64.shared.IGameMode, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GameMode message, length delimited. Does not implicitly {@link net64.shared.GameMode.verify|verify} messages.
             * @param message GameMode message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: net64.shared.IGameMode, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GameMode message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GameMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): net64.shared.GameMode;

            /**
             * Decodes a GameMode message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GameMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): net64.shared.GameMode;

            /**
             * Verifies a GameMode message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GameMode message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GameMode
             */
            public static fromObject(object: { [k: string]: any }): net64.shared.GameMode;

            /**
             * Creates a plain object from a GameMode message. Also converts values to other types if specified.
             * @param message GameMode
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: net64.shared.GameMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GameMode to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GameMode {

            /** GameModeType enum. */
            enum GameModeType {
                NONE = 0,
                DEFAULT = 1,
                THIRD_PERSON_SHOOTER = 2,
                INTERACTIONLESS = 3,
                PROP_HUNT = 4,
                BOSS_RUSH = 5,
                TAG = 6,
                WARIO_WARE = 8
            }
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
