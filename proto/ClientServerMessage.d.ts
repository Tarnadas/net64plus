import * as $protobuf from "protobufjs";

/** Properties of a ClientServerMessage. */
export interface IClientServerMessage {

    /** ClientServerMessage compression */
    compression?: (Compression|null);

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
    public compression: Compression;

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

/** Properties of a ClientServer. */
export interface IClientServer {

    /** ClientServer messageType */
    messageType?: (ClientServer.MessageType|null);

    /** ClientServer handshake */
    handshake?: (IClientHandshake|null);

    /** ClientServer ping */
    ping?: (IPing|null);

    /** ClientServer player */
    player?: (IPlayer|null);

    /** ClientServer playerData */
    playerData?: (IPlayerData|null);

    /** ClientServer metaData */
    metaData?: (IMetaData|null);

    /** ClientServer chat */
    chat?: (IChat|null);
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
    public handshake?: (IClientHandshake|null);

    /** ClientServer ping. */
    public ping?: (IPing|null);

    /** ClientServer player. */
    public player?: (IPlayer|null);

    /** ClientServer playerData. */
    public playerData?: (IPlayerData|null);

    /** ClientServer metaData. */
    public metaData?: (IMetaData|null);

    /** ClientServer chat. */
    public chat?: (IChat|null);

    /** ClientServer message. */
    public message?: ("handshake"|"ping"|"player"|"playerData"|"metaData"|"chat");

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
        UNKNOWN = 0,
        HANDSHAKE = 2,
        PING = 3,
        PLAYER_UPDATE = 6,
        PLAYER_DATA = 128,
        META_DATA = 129,
        CHAT = 130
    }
}

/** Properties of a ClientHandshake. */
export interface IClientHandshake {

    /** ClientHandshake major */
    major?: (number|null);

    /** ClientHandshake minor */
    minor?: (number|null);

    /** ClientHandshake characterId */
    characterId?: (number|null);

    /** ClientHandshake username */
    username?: (string|null);
}

/** Represents a ClientHandshake. */
export class ClientHandshake implements IClientHandshake {

    /**
     * Constructs a new ClientHandshake.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientHandshake);

    /** ClientHandshake major. */
    public major: number;

    /** ClientHandshake minor. */
    public minor: number;

    /** ClientHandshake characterId. */
    public characterId: number;

    /** ClientHandshake username. */
    public username: string;

    /**
     * Creates a new ClientHandshake instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientHandshake instance
     */
    public static create(properties?: IClientHandshake): ClientHandshake;

    /**
     * Encodes the specified ClientHandshake message. Does not implicitly {@link ClientHandshake.verify|verify} messages.
     * @param message ClientHandshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientHandshake message, length delimited. Does not implicitly {@link ClientHandshake.verify|verify} messages.
     * @param message ClientHandshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientHandshake message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientHandshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientHandshake;

    /**
     * Decodes a ClientHandshake message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientHandshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientHandshake;

    /**
     * Verifies a ClientHandshake message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClientHandshake message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClientHandshake
     */
    public static fromObject(object: { [k: string]: any }): ClientHandshake;

    /**
     * Creates a plain object from a ClientHandshake message. Also converts values to other types if specified.
     * @param message ClientHandshake
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientHandshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientHandshake to JSON.
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

    /** PlayerData playerBytes */
    playerBytes?: (IPlayerBytes[]|null);
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

    /** PlayerData playerBytes. */
    public playerBytes: IPlayerBytes[];

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

/** Properties of a PlayerBytes. */
export interface IPlayerBytes {

    /** PlayerBytes playerId */
    playerId?: (number|null);

    /** PlayerBytes playerData */
    playerData?: (Uint8Array|null);
}

/** Represents a PlayerBytes. */
export class PlayerBytes implements IPlayerBytes {

    /**
     * Constructs a new PlayerBytes.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerBytes);

    /** PlayerBytes playerId. */
    public playerId: number;

    /** PlayerBytes playerData. */
    public playerData: Uint8Array;

    /**
     * Creates a new PlayerBytes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerBytes instance
     */
    public static create(properties?: IPlayerBytes): PlayerBytes;

    /**
     * Encodes the specified PlayerBytes message. Does not implicitly {@link PlayerBytes.verify|verify} messages.
     * @param message PlayerBytes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerBytes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerBytes message, length delimited. Does not implicitly {@link PlayerBytes.verify|verify} messages.
     * @param message PlayerBytes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerBytes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerBytes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerBytes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerBytes;

    /**
     * Decodes a PlayerBytes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerBytes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerBytes;

    /**
     * Verifies a PlayerBytes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerBytes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerBytes
     */
    public static fromObject(object: { [k: string]: any }): PlayerBytes;

    /**
     * Creates a plain object from a PlayerBytes message. Also converts values to other types if specified.
     * @param message PlayerBytes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerBytes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerBytes to JSON.
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

/** Properties of a Chat. */
export interface IChat {

    /** Chat chatType */
    chatType?: (Chat.ChatType|null);

    /** Chat senderId */
    senderId?: (number|null);

    /** Chat message */
    message?: (string|null);

    /** Chat global */
    global?: (IChatGlobal|null);

    /** Chat private */
    "private"?: (IChatPrivate|null);

    /** Chat command */
    command?: (IChatCommand|null);
}

/** Represents a Chat. */
export class Chat implements IChat {

    /**
     * Constructs a new Chat.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChat);

    /** Chat chatType. */
    public chatType: Chat.ChatType;

    /** Chat senderId. */
    public senderId: number;

    /** Chat message. */
    public message: string;

    /** Chat global. */
    public global?: (IChatGlobal|null);

    /** Chat private. */
    public private?: (IChatPrivate|null);

    /** Chat command. */
    public command?: (IChatCommand|null);

    /** Chat messageType. */
    public messageType?: ("global"|"private"|"command");

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

export namespace Chat {

    /** ChatType enum. */
    enum ChatType {
        GLOBAL = 0,
        PRIVATE = 1,
        COMMAND = 255
    }
}

/** Properties of a ChatGlobal. */
export interface IChatGlobal {
}

/** Represents a ChatGlobal. */
export class ChatGlobal implements IChatGlobal {

    /**
     * Constructs a new ChatGlobal.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatGlobal);

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

/** Properties of a ChatPrivate. */
export interface IChatPrivate {

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

/** Properties of a ChatCommand. */
export interface IChatCommand {

    /** ChatCommand arguments */
    "arguments"?: (string[]|null);
}

/** Represents a ChatCommand. */
export class ChatCommand implements IChatCommand {

    /**
     * Constructs a new ChatCommand.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatCommand);

    /** ChatCommand arguments. */
    public arguments: string[];

    /**
     * Creates a new ChatCommand instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChatCommand instance
     */
    public static create(properties?: IChatCommand): ChatCommand;

    /**
     * Encodes the specified ChatCommand message. Does not implicitly {@link ChatCommand.verify|verify} messages.
     * @param message ChatCommand message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChatCommand, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChatCommand message, length delimited. Does not implicitly {@link ChatCommand.verify|verify} messages.
     * @param message ChatCommand message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChatCommand, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChatCommand message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChatCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatCommand;

    /**
     * Decodes a ChatCommand message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChatCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatCommand;

    /**
     * Verifies a ChatCommand message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChatCommand message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChatCommand
     */
    public static fromObject(object: { [k: string]: any }): ChatCommand;

    /**
     * Creates a plain object from a ChatCommand message. Also converts values to other types if specified.
     * @param message ChatCommand
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChatCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChatCommand to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Compression enum. */
export enum Compression {
    NONE = 0,
    ZSTD = 1,
    GZIP = 2
}
