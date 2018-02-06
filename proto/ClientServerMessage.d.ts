import * as $protobuf from "protobufjs";

/** Properties of a ClientServerMessage. */
export interface IClientServerMessage {

    /** ClientServerMessage compression */
    compression?: (ClientServerMessage.Compression|null);

    /** ClientServerMessage uncompressedSize */
    uncompressedSize?: (number|null);

    /** ClientServerMessage compressedData */
    compressedData?: (Uint8Array|null);

    /** ClientServerMessage data */
    data?: (IClientServer|null);
}

/** Represents a ClientServerMessage. */
export class ClientServerMessage implements IClientServerMessage {

    /**
     * Constructs a new ClientServerMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientServerMessage);

    /** ClientServerMessage compression. */
    public compression: ClientServerMessage.Compression;

    /** ClientServerMessage uncompressedSize. */
    public uncompressedSize: number;

    /** ClientServerMessage compressedData. */
    public compressedData: Uint8Array;

    /** ClientServerMessage data. */
    public data?: (IClientServer|null);

    /** ClientServerMessage message. */
    public message?: ("compressedData"|"data");

    /**
     * Creates a new ClientServerMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientServerMessage instance
     */
    public static create(properties?: IClientServerMessage): ClientServerMessage;

    /**
     * Encodes the specified ClientServerMessage message. Does not implicitly {@link ClientServerMessage.verify|verify} messages.
     * @param message ClientServerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientServerMessage message, length delimited. Does not implicitly {@link ClientServerMessage.verify|verify} messages.
     * @param message ClientServerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientServerMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientServerMessage;

    /**
     * Decodes a ClientServerMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientServerMessage;

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
    public static fromObject(object: { [k: string]: any }): ClientServerMessage;

    /**
     * Creates a plain object from a ClientServerMessage message. Also converts values to other types if specified.
     * @param message ClientServerMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientServerMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ClientServerMessage {

    /** Compression enum. */
    enum Compression {
        NONE = 0,
        ZSTD = 1
    }
}

/** Properties of a ClientServer. */
export interface IClientServer {

    /** ClientServer messageType */
    messageType?: (ClientServer.MessageType|null);

    /** ClientServer handshake */
    handshake?: (IHandshake|null);

    /** ClientServer ping */
    ping?: (IPing|null);

    /** ClientServer playerUpdate */
    playerUpdate?: (IPlayerUpdate|null);

    /** ClientServer playerData */
    playerData?: (IPlayerData|null);

    /** ClientServer metaData */
    metaData?: (IMetaData|null);

    /** ClientServer chatMessage */
    chatMessage?: (IChat|null);
}

/** Represents a ClientServer. */
export class ClientServer implements IClientServer {

    /**
     * Constructs a new ClientServer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientServer);

    /** ClientServer messageType. */
    public messageType: ClientServer.MessageType;

    /** ClientServer handshake. */
    public handshake?: (IHandshake|null);

    /** ClientServer ping. */
    public ping?: (IPing|null);

    /** ClientServer playerUpdate. */
    public playerUpdate?: (IPlayerUpdate|null);

    /** ClientServer playerData. */
    public playerData?: (IPlayerData|null);

    /** ClientServer metaData. */
    public metaData?: (IMetaData|null);

    /** ClientServer chatMessage. */
    public chatMessage?: (IChat|null);

    /** ClientServer message. */
    public message?: ("handshake"|"ping"|"playerUpdate"|"playerData"|"metaData"|"chatMessage");

    /**
     * Creates a new ClientServer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientServer instance
     */
    public static create(properties?: IClientServer): ClientServer;

    /**
     * Encodes the specified ClientServer message. Does not implicitly {@link ClientServer.verify|verify} messages.
     * @param message ClientServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientServer message, length delimited. Does not implicitly {@link ClientServer.verify|verify} messages.
     * @param message ClientServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientServer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientServer;

    /**
     * Decodes a ClientServer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientServer;

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
    public static fromObject(object: { [k: string]: any }): ClientServer;

    /**
     * Creates a plain object from a ClientServer message. Also converts values to other types if specified.
     * @param message ClientServer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientServer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ClientServer {

    /** MessageType enum. */
    enum MessageType {
        HANDSHAKE = 2,
        PING = 3,
        PLAYER_UPDATE = 6,
        PLAYER_DATA = 128,
        META_DATA = 129,
        CHAT_MESSAGE = 130
    }
}

/** Properties of a Handshake. */
export interface IHandshake {

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
export class Handshake implements IHandshake {

    /**
     * Constructs a new Handshake.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHandshake);

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
    public static create(properties?: IHandshake): Handshake;

    /**
     * Encodes the specified Handshake message. Does not implicitly {@link Handshake.verify|verify} messages.
     * @param message Handshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Handshake message, length delimited. Does not implicitly {@link Handshake.verify|verify} messages.
     * @param message Handshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Handshake message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Handshake;

    /**
     * Decodes a Handshake message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Handshake;

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
    public static fromObject(object: { [k: string]: any }): Handshake;

    /**
     * Creates a plain object from a Handshake message. Also converts values to other types if specified.
     * @param message Handshake
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Handshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Handshake to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Ping. */
export interface IPing {
}

/** Represents a Ping. */
export class Ping implements IPing {

    /**
     * Constructs a new Ping.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPing);

    /**
     * Creates a new Ping instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Ping instance
     */
    public static create(properties?: IPing): Ping;

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Ping;

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Ping;

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
    public static fromObject(object: { [k: string]: any }): Ping;

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @param message Ping
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Ping to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PlayerUpdate. */
export interface IPlayerUpdate {

    /** PlayerUpdate playerId */
    playerId?: (number|null);

    /** PlayerUpdate player */
    player?: (IPlayer|null);
}

/** Represents a PlayerUpdate. */
export class PlayerUpdate implements IPlayerUpdate {

    /**
     * Constructs a new PlayerUpdate.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerUpdate);

    /** PlayerUpdate playerId. */
    public playerId: number;

    /** PlayerUpdate player. */
    public player?: (IPlayer|null);

    /**
     * Creates a new PlayerUpdate instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerUpdate instance
     */
    public static create(properties?: IPlayerUpdate): PlayerUpdate;

    /**
     * Encodes the specified PlayerUpdate message. Does not implicitly {@link PlayerUpdate.verify|verify} messages.
     * @param message PlayerUpdate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerUpdate message, length delimited. Does not implicitly {@link PlayerUpdate.verify|verify} messages.
     * @param message PlayerUpdate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerUpdate message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerUpdate;

    /**
     * Decodes a PlayerUpdate message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerUpdate;

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
    public static fromObject(object: { [k: string]: any }): PlayerUpdate;

    /**
     * Creates a plain object from a PlayerUpdate message. Also converts values to other types if specified.
     * @param message PlayerUpdate
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerUpdate to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Player. */
export interface IPlayer {

    /** Player username */
    username?: (string|null);

    /** Player characterId */
    characterId?: (number|null);
}

/** Represents a Player. */
export class Player implements IPlayer {

    /**
     * Constructs a new Player.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayer);

    /** Player username. */
    public username: string;

    /** Player characterId. */
    public characterId: number;

    /**
     * Creates a new Player instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Player instance
     */
    public static create(properties?: IPlayer): Player;

    /**
     * Encodes the specified Player message. Does not implicitly {@link Player.verify|verify} messages.
     * @param message Player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Player message, length delimited. Does not implicitly {@link Player.verify|verify} messages.
     * @param message Player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Player message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Player;

    /**
     * Decodes a Player message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Player;

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
    public static fromObject(object: { [k: string]: any }): Player;

    /**
     * Creates a plain object from a Player message. Also converts values to other types if specified.
     * @param message Player
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Player to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PlayerData. */
export interface IPlayerData {

    /** PlayerData dataLength */
    dataLength?: (number|null);

    /** PlayerData playerData */
    playerData?: (Uint8Array|null);
}

/** Represents a PlayerData. */
export class PlayerData implements IPlayerData {

    /**
     * Constructs a new PlayerData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerData);

    /** PlayerData dataLength. */
    public dataLength: number;

    /** PlayerData playerData. */
    public playerData: Uint8Array;

    /**
     * Creates a new PlayerData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerData instance
     */
    public static create(properties?: IPlayerData): PlayerData;

    /**
     * Encodes the specified PlayerData message. Does not implicitly {@link PlayerData.verify|verify} messages.
     * @param message PlayerData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link PlayerData.verify|verify} messages.
     * @param message PlayerData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerData;

    /**
     * Decodes a PlayerData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerData;

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
    public static fromObject(object: { [k: string]: any }): PlayerData;

    /**
     * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
     * @param message PlayerData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MetaData. */
export interface IMetaData {

    /** MetaData metaData */
    metaData?: (IMeta[]|null);
}

/** Represents a MetaData. */
export class MetaData implements IMetaData {

    /**
     * Constructs a new MetaData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMetaData);

    /** MetaData metaData. */
    public metaData: IMeta[];

    /**
     * Creates a new MetaData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MetaData instance
     */
    public static create(properties?: IMetaData): MetaData;

    /**
     * Encodes the specified MetaData message. Does not implicitly {@link MetaData.verify|verify} messages.
     * @param message MetaData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMetaData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MetaData message, length delimited. Does not implicitly {@link MetaData.verify|verify} messages.
     * @param message MetaData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMetaData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MetaData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MetaData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MetaData;

    /**
     * Decodes a MetaData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MetaData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MetaData;

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
    public static fromObject(object: { [k: string]: any }): MetaData;

    /**
     * Creates a plain object from a MetaData message. Also converts values to other types if specified.
     * @param message MetaData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MetaData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MetaData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Meta. */
export interface IMeta {

    /** Meta length */
    length?: (number|null);

    /** Meta address */
    address?: (number|null);

    /** Meta data */
    data?: (Uint8Array|null);
}

/** Represents a Meta. */
export class Meta implements IMeta {

    /**
     * Constructs a new Meta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMeta);

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
    public static create(properties?: IMeta): Meta;

    /**
     * Encodes the specified Meta message. Does not implicitly {@link Meta.verify|verify} messages.
     * @param message Meta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Meta message, length delimited. Does not implicitly {@link Meta.verify|verify} messages.
     * @param message Meta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Meta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Meta;

    /**
     * Decodes a Meta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Meta;

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
    public static fromObject(object: { [k: string]: any }): Meta;

    /**
     * Creates a plain object from a Meta message. Also converts values to other types if specified.
     * @param message Meta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Meta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Meta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Chat. */
export interface IChat {

    /** Chat global */
    global?: (IChatGlobal|null);

    /** Chat team */
    team?: (IChatTeam|null);

    /** Chat private */
    "private"?: (IChatPrivate|null);
}

/** Represents a Chat. */
export class Chat implements IChat {

    /**
     * Constructs a new Chat.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChat);

    /** Chat global. */
    public global?: (IChatGlobal|null);

    /** Chat team. */
    public team?: (IChatTeam|null);

    /** Chat private. */
    public private?: (IChatPrivate|null);

    /** Chat messageType. */
    public messageType?: ("global"|"team"|"private");

    /**
     * Creates a new Chat instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Chat instance
     */
    public static create(properties?: IChat): Chat;

    /**
     * Encodes the specified Chat message. Does not implicitly {@link Chat.verify|verify} messages.
     * @param message Chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Chat message, length delimited. Does not implicitly {@link Chat.verify|verify} messages.
     * @param message Chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Chat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Chat;

    /**
     * Decodes a Chat message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Chat;

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
    public static fromObject(object: { [k: string]: any }): Chat;

    /**
     * Creates a plain object from a Chat message. Also converts values to other types if specified.
     * @param message Chat
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Chat to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChatGlobal. */
export interface IChatGlobal {

    /** ChatGlobal senderId */
    senderId?: (number|null);

    /** ChatGlobal message */
    message?: (string|null);
}

/** Represents a ChatGlobal. */
export class ChatGlobal implements IChatGlobal {

    /**
     * Constructs a new ChatGlobal.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatGlobal);

    /** ChatGlobal senderId. */
    public senderId: number;

    /** ChatGlobal message. */
    public message: string;

    /**
     * Creates a new ChatGlobal instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChatGlobal instance
     */
    public static create(properties?: IChatGlobal): ChatGlobal;

    /**
     * Encodes the specified ChatGlobal message. Does not implicitly {@link ChatGlobal.verify|verify} messages.
     * @param message ChatGlobal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChatGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChatGlobal message, length delimited. Does not implicitly {@link ChatGlobal.verify|verify} messages.
     * @param message ChatGlobal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChatGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChatGlobal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChatGlobal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatGlobal;

    /**
     * Decodes a ChatGlobal message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChatGlobal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatGlobal;

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
    public static fromObject(object: { [k: string]: any }): ChatGlobal;

    /**
     * Creates a plain object from a ChatGlobal message. Also converts values to other types if specified.
     * @param message ChatGlobal
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChatGlobal, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChatGlobal to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChatTeam. */
export interface IChatTeam {

    /** ChatTeam senderId */
    senderId?: (number|null);

    /** ChatTeam message */
    message?: (string|null);

    /** ChatTeam teamId */
    teamId?: (number|null);
}

/** Represents a ChatTeam. */
export class ChatTeam implements IChatTeam {

    /**
     * Constructs a new ChatTeam.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatTeam);

    /** ChatTeam senderId. */
    public senderId: number;

    /** ChatTeam message. */
    public message: string;

    /** ChatTeam teamId. */
    public teamId: number;

    /**
     * Creates a new ChatTeam instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChatTeam instance
     */
    public static create(properties?: IChatTeam): ChatTeam;

    /**
     * Encodes the specified ChatTeam message. Does not implicitly {@link ChatTeam.verify|verify} messages.
     * @param message ChatTeam message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChatTeam, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChatTeam message, length delimited. Does not implicitly {@link ChatTeam.verify|verify} messages.
     * @param message ChatTeam message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChatTeam, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChatTeam message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChatTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatTeam;

    /**
     * Decodes a ChatTeam message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChatTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatTeam;

    /**
     * Verifies a ChatTeam message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChatTeam message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChatTeam
     */
    public static fromObject(object: { [k: string]: any }): ChatTeam;

    /**
     * Creates a plain object from a ChatTeam message. Also converts values to other types if specified.
     * @param message ChatTeam
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChatTeam, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChatTeam to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChatPrivate. */
export interface IChatPrivate {

    /** ChatPrivate senderId */
    senderId?: (number|null);

    /** ChatPrivate message */
    message?: (string|null);

    /** ChatPrivate receiverId */
    receiverId?: (number|null);
}

/** Represents a ChatPrivate. */
export class ChatPrivate implements IChatPrivate {

    /**
     * Constructs a new ChatPrivate.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatPrivate);

    /** ChatPrivate senderId. */
    public senderId: number;

    /** ChatPrivate message. */
    public message: string;

    /** ChatPrivate receiverId. */
    public receiverId: number;

    /**
     * Creates a new ChatPrivate instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChatPrivate instance
     */
    public static create(properties?: IChatPrivate): ChatPrivate;

    /**
     * Encodes the specified ChatPrivate message. Does not implicitly {@link ChatPrivate.verify|verify} messages.
     * @param message ChatPrivate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChatPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChatPrivate message, length delimited. Does not implicitly {@link ChatPrivate.verify|verify} messages.
     * @param message ChatPrivate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChatPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChatPrivate message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChatPrivate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatPrivate;

    /**
     * Decodes a ChatPrivate message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChatPrivate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatPrivate;

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
    public static fromObject(object: { [k: string]: any }): ChatPrivate;

    /**
     * Creates a plain object from a ChatPrivate message. Also converts values to other types if specified.
     * @param message ChatPrivate
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChatPrivate, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChatPrivate to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
