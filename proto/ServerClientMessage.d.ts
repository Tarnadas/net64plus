import * as $protobuf from "protobufjs";

/** Properties of a ServerClientMessage. */
export interface IServerClientMessage {

    /** ServerClientMessage compression */
    compression?: (Compression|null);

    /** ServerClientMessage uncompressedSize */
    uncompressedSize?: (number|null);

    /** ServerClientMessage compressedData */
    compressedData?: (Uint8Array|null);

    /** ServerClientMessage data */
    data?: (IServerClient|null);
}

/** Represents a ServerClientMessage. */
export class ServerClientMessage implements IServerClientMessage {

    /**
     * Constructs a new ServerClientMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerClientMessage);

    /** ServerClientMessage compression. */
    public compression: Compression;

    /** ServerClientMessage uncompressedSize. */
    public uncompressedSize: number;

    /** ServerClientMessage compressedData. */
    public compressedData: Uint8Array;

    /** ServerClientMessage data. */
    public data?: (IServerClient|null);

    /** ServerClientMessage message. */
    public message?: ("compressedData"|"data");

    /**
     * Creates a new ServerClientMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerClientMessage instance
     */
    public static create(properties?: IServerClientMessage): ServerClientMessage;

    /**
     * Encodes the specified ServerClientMessage message. Does not implicitly {@link ServerClientMessage.verify|verify} messages.
     * @param message ServerClientMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerClientMessage message, length delimited. Does not implicitly {@link ServerClientMessage.verify|verify} messages.
     * @param message ServerClientMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerClientMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerClientMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerClientMessage;

    /**
     * Decodes a ServerClientMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerClientMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerClientMessage;

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
    public static fromObject(object: { [k: string]: any }): ServerClientMessage;

    /**
     * Creates a plain object from a ServerClientMessage message. Also converts values to other types if specified.
     * @param message ServerClientMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerClientMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ServerClient. */
export interface IServerClient {

    /** ServerClient messageType */
    messageType?: (ServerClient.MessageType|null);

    /** ServerClient handshake */
    handshake?: (IServerHandshake|null);

    /** ServerClient ping */
    ping?: (IPing|null);

    /** ServerClient serverMessage */
    serverMessage?: (IServerMessage|null);

    /** ServerClient playerListUpdate */
    playerListUpdate?: (IPlayerListUpdate|null);

    /** ServerClient playerUpdate */
    playerUpdate?: (IPlayerUpdate|null);

    /** ServerClient playerData */
    playerData?: (IPlayerData|null);

    /** ServerClient metaData */
    metaData?: (IMetaData|null);

    /** ServerClient chat */
    chat?: (IChat|null);
}

/** Represents a ServerClient. */
export class ServerClient implements IServerClient {

    /**
     * Constructs a new ServerClient.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerClient);

    /** ServerClient messageType. */
    public messageType: ServerClient.MessageType;

    /** ServerClient handshake. */
    public handshake?: (IServerHandshake|null);

    /** ServerClient ping. */
    public ping?: (IPing|null);

    /** ServerClient serverMessage. */
    public serverMessage?: (IServerMessage|null);

    /** ServerClient playerListUpdate. */
    public playerListUpdate?: (IPlayerListUpdate|null);

    /** ServerClient playerUpdate. */
    public playerUpdate?: (IPlayerUpdate|null);

    /** ServerClient playerData. */
    public playerData?: (IPlayerData|null);

    /** ServerClient metaData. */
    public metaData?: (IMetaData|null);

    /** ServerClient chat. */
    public chat?: (IChat|null);

    /** ServerClient message. */
    public message?: ("handshake"|"ping"|"serverMessage"|"playerListUpdate"|"playerUpdate"|"playerData"|"metaData"|"chat");

    /**
     * Creates a new ServerClient instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerClient instance
     */
    public static create(properties?: IServerClient): ServerClient;

    /**
     * Encodes the specified ServerClient message. Does not implicitly {@link ServerClient.verify|verify} messages.
     * @param message ServerClient message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerClient, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerClient message, length delimited. Does not implicitly {@link ServerClient.verify|verify} messages.
     * @param message ServerClient message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerClient, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerClient message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerClient
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerClient;

    /**
     * Decodes a ServerClient message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerClient
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerClient;

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
    public static fromObject(object: { [k: string]: any }): ServerClient;

    /**
     * Creates a plain object from a ServerClient message. Also converts values to other types if specified.
     * @param message ServerClient
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerClient, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerClient to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ServerClient {

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

/** Properties of a ServerHandshake. */
export interface IServerHandshake {

    /** ServerHandshake playerId */
    playerId?: (number|null);

    /** ServerHandshake ip */
    ip?: (string|null);

    /** ServerHandshake port */
    port?: (number|null);

    /** ServerHandshake domain */
    domain?: (string|null);

    /** ServerHandshake name */
    name?: (string|null);

    /** ServerHandshake description */
    description?: (string|null);

    /** ServerHandshake playerList */
    playerList?: (IPlayerListUpdate|null);

    /** ServerHandshake countryCode */
    countryCode?: (string|null);

    /** ServerHandshake gameMode */
    gameMode?: (GameModeType|null);
}

/** Represents a ServerHandshake. */
export class ServerHandshake implements IServerHandshake {

    /**
     * Constructs a new ServerHandshake.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerHandshake);

    /** ServerHandshake playerId. */
    public playerId: number;

    /** ServerHandshake ip. */
    public ip: string;

    /** ServerHandshake port. */
    public port: number;

    /** ServerHandshake domain. */
    public domain: string;

    /** ServerHandshake name. */
    public name: string;

    /** ServerHandshake description. */
    public description: string;

    /** ServerHandshake playerList. */
    public playerList?: (IPlayerListUpdate|null);

    /** ServerHandshake countryCode. */
    public countryCode: string;

    /** ServerHandshake gameMode. */
    public gameMode: GameModeType;

    /**
     * Creates a new ServerHandshake instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerHandshake instance
     */
    public static create(properties?: IServerHandshake): ServerHandshake;

    /**
     * Encodes the specified ServerHandshake message. Does not implicitly {@link ServerHandshake.verify|verify} messages.
     * @param message ServerHandshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerHandshake message, length delimited. Does not implicitly {@link ServerHandshake.verify|verify} messages.
     * @param message ServerHandshake message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerHandshake message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerHandshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerHandshake;

    /**
     * Decodes a ServerHandshake message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerHandshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerHandshake;

    /**
     * Verifies a ServerHandshake message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ServerHandshake message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ServerHandshake
     */
    public static fromObject(object: { [k: string]: any }): ServerHandshake;

    /**
     * Creates a plain object from a ServerHandshake message. Also converts values to other types if specified.
     * @param message ServerHandshake
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerHandshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerHandshake to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GameMode. */
export interface IGameMode {

    /** GameMode gameMode */
    gameMode?: (GameModeType|null);
}

/** Represents a GameMode. */
export class GameMode implements IGameMode {

    /**
     * Constructs a new GameMode.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameMode);

    /** GameMode gameMode. */
    public gameMode: GameModeType;

    /**
     * Creates a new GameMode instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameMode instance
     */
    public static create(properties?: IGameMode): GameMode;

    /**
     * Encodes the specified GameMode message. Does not implicitly {@link GameMode.verify|verify} messages.
     * @param message GameMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameMode, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameMode message, length delimited. Does not implicitly {@link GameMode.verify|verify} messages.
     * @param message GameMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameMode, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameMode message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameMode;

    /**
     * Decodes a GameMode message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameMode;

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
    public static fromObject(object: { [k: string]: any }): GameMode;

    /**
     * Creates a plain object from a GameMode message. Also converts values to other types if specified.
     * @param message GameMode
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameMode to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** GameModeType enum. */
export enum GameModeType {
    NONE = 0,
    DEFAULT = 1,
    THIRD_PERSON_SHOOTER = 2,
    INTERACTIONLESS = 3,
    PROP_HUNT = 4,
    BOSS_RUSH = 5,
    TAG = 6,
    WARIO_WARE = 8
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

/** Properties of a PlayerListUpdate. */
export interface IPlayerListUpdate {

    /** PlayerListUpdate playerUpdates */
    playerUpdates?: (IPlayerUpdate[]|null);
}

/** Represents a PlayerListUpdate. */
export class PlayerListUpdate implements IPlayerListUpdate {

    /**
     * Constructs a new PlayerListUpdate.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerListUpdate);

    /** PlayerListUpdate playerUpdates. */
    public playerUpdates: IPlayerUpdate[];

    /**
     * Creates a new PlayerListUpdate instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerListUpdate instance
     */
    public static create(properties?: IPlayerListUpdate): PlayerListUpdate;

    /**
     * Encodes the specified PlayerListUpdate message. Does not implicitly {@link PlayerListUpdate.verify|verify} messages.
     * @param message PlayerListUpdate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerListUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerListUpdate message, length delimited. Does not implicitly {@link PlayerListUpdate.verify|verify} messages.
     * @param message PlayerListUpdate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerListUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerListUpdate message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerListUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerListUpdate;

    /**
     * Decodes a PlayerListUpdate message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerListUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerListUpdate;

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
    public static fromObject(object: { [k: string]: any }): PlayerListUpdate;

    /**
     * Creates a plain object from a PlayerListUpdate message. Also converts values to other types if specified.
     * @param message PlayerListUpdate
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerListUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerListUpdate to JSON.
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

/** Properties of a ServerMessage. */
export interface IServerMessage {

    /** ServerMessage messageType */
    messageType?: (ServerMessage.MessageType|null);

    /** ServerMessage connectionDenied */
    connectionDenied?: (IConnectionDenied|null);

    /** ServerMessage gameMode */
    gameMode?: (IGameMode|null);

    /** ServerMessage serverToken */
    serverToken?: (IServerToken|null);

    /** ServerMessage error */
    error?: (IError|null);
}

/** Represents a ServerMessage. */
export class ServerMessage implements IServerMessage {

    /**
     * Constructs a new ServerMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerMessage);

    /** ServerMessage messageType. */
    public messageType: ServerMessage.MessageType;

    /** ServerMessage connectionDenied. */
    public connectionDenied?: (IConnectionDenied|null);

    /** ServerMessage gameMode. */
    public gameMode?: (IGameMode|null);

    /** ServerMessage serverToken. */
    public serverToken?: (IServerToken|null);

    /** ServerMessage error. */
    public error?: (IError|null);

    /** ServerMessage message. */
    public message?: ("connectionDenied"|"gameMode"|"serverToken"|"error");

    /**
     * Creates a new ServerMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerMessage instance
     */
    public static create(properties?: IServerMessage): ServerMessage;

    /**
     * Encodes the specified ServerMessage message. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @param message ServerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @param message ServerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerMessage;

    /**
     * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerMessage;

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
    public static fromObject(object: { [k: string]: any }): ServerMessage;

    /**
     * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
     * @param message ServerMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ServerMessage {

    /** MessageType enum. */
    enum MessageType {
        CONNECTION_DENIED = 0,
        GAME_MODE = 1,
        SERVER_TOKEN = 2,
        ERROR = 3
    }
}

/** Properties of a ServerToken. */
export interface IServerToken {

    /** ServerToken tokenType */
    tokenType?: (ServerToken.TokenType|null);
}

/** Represents a ServerToken. */
export class ServerToken implements IServerToken {

    /**
     * Constructs a new ServerToken.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerToken);

    /** ServerToken tokenType. */
    public tokenType: ServerToken.TokenType;

    /**
     * Creates a new ServerToken instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerToken instance
     */
    public static create(properties?: IServerToken): ServerToken;

    /**
     * Encodes the specified ServerToken message. Does not implicitly {@link ServerToken.verify|verify} messages.
     * @param message ServerToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerToken message, length delimited. Does not implicitly {@link ServerToken.verify|verify} messages.
     * @param message ServerToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerToken message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerToken;

    /**
     * Decodes a ServerToken message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerToken;

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
    public static fromObject(object: { [k: string]: any }): ServerToken;

    /**
     * Creates a plain object from a ServerToken message. Also converts values to other types if specified.
     * @param message ServerToken
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerToken to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ServerToken {

    /** TokenType enum. */
    enum TokenType {
        GRANT = 0,
        LOSE = 1
    }
}

/** Properties of an Error. */
export interface IError {

    /** Error errorType */
    errorType?: (Error.ErrorType|null);

    /** Error message */
    message?: (string|null);
}

/** Represents an Error. */
export class Error implements IError {

    /**
     * Constructs a new Error.
     * @param [properties] Properties to set
     */
    constructor(properties?: IError);

    /** Error errorType. */
    public errorType: Error.ErrorType;

    /** Error message. */
    public message: string;

    /**
     * Creates a new Error instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Error instance
     */
    public static create(properties?: IError): Error;

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @param message Error message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @param message Error message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Error;

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Error;

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
    public static fromObject(object: { [k: string]: any }): Error;

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @param message Error
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Error to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Error {

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
export interface IConnectionDenied {

    /** ConnectionDenied reason */
    reason?: (ConnectionDenied.Reason|null);

    /** ConnectionDenied serverFull */
    serverFull?: (IServerFull|null);

    /** ConnectionDenied wrongVersion */
    wrongVersion?: (IWrongVersion|null);
}

/** Represents a ConnectionDenied. */
export class ConnectionDenied implements IConnectionDenied {

    /**
     * Constructs a new ConnectionDenied.
     * @param [properties] Properties to set
     */
    constructor(properties?: IConnectionDenied);

    /** ConnectionDenied reason. */
    public reason: ConnectionDenied.Reason;

    /** ConnectionDenied serverFull. */
    public serverFull?: (IServerFull|null);

    /** ConnectionDenied wrongVersion. */
    public wrongVersion?: (IWrongVersion|null);

    /** ConnectionDenied message. */
    public message?: ("serverFull"|"wrongVersion");

    /**
     * Creates a new ConnectionDenied instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ConnectionDenied instance
     */
    public static create(properties?: IConnectionDenied): ConnectionDenied;

    /**
     * Encodes the specified ConnectionDenied message. Does not implicitly {@link ConnectionDenied.verify|verify} messages.
     * @param message ConnectionDenied message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IConnectionDenied, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ConnectionDenied message, length delimited. Does not implicitly {@link ConnectionDenied.verify|verify} messages.
     * @param message ConnectionDenied message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IConnectionDenied, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ConnectionDenied message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ConnectionDenied
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ConnectionDenied;

    /**
     * Decodes a ConnectionDenied message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ConnectionDenied
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ConnectionDenied;

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
    public static fromObject(object: { [k: string]: any }): ConnectionDenied;

    /**
     * Creates a plain object from a ConnectionDenied message. Also converts values to other types if specified.
     * @param message ConnectionDenied
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ConnectionDenied, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ConnectionDenied to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ConnectionDenied {

    /** Reason enum. */
    enum Reason {
        SERVER_FULL = 0,
        WRONG_VERSION = 1
    }
}

/** Properties of a ServerFull. */
export interface IServerFull {

    /** ServerFull maxPlayers */
    maxPlayers?: (number|null);
}

/** Represents a ServerFull. */
export class ServerFull implements IServerFull {

    /**
     * Constructs a new ServerFull.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerFull);

    /** ServerFull maxPlayers. */
    public maxPlayers: number;

    /**
     * Creates a new ServerFull instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerFull instance
     */
    public static create(properties?: IServerFull): ServerFull;

    /**
     * Encodes the specified ServerFull message. Does not implicitly {@link ServerFull.verify|verify} messages.
     * @param message ServerFull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerFull, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerFull message, length delimited. Does not implicitly {@link ServerFull.verify|verify} messages.
     * @param message ServerFull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerFull, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerFull message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerFull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerFull;

    /**
     * Decodes a ServerFull message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerFull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerFull;

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
    public static fromObject(object: { [k: string]: any }): ServerFull;

    /**
     * Creates a plain object from a ServerFull message. Also converts values to other types if specified.
     * @param message ServerFull
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerFull, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerFull to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WrongVersion. */
export interface IWrongVersion {

    /** WrongVersion majorVersion */
    majorVersion?: (number|null);

    /** WrongVersion minorVersion */
    minorVersion?: (number|null);
}

/** Represents a WrongVersion. */
export class WrongVersion implements IWrongVersion {

    /**
     * Constructs a new WrongVersion.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWrongVersion);

    /** WrongVersion majorVersion. */
    public majorVersion: number;

    /** WrongVersion minorVersion. */
    public minorVersion: number;

    /**
     * Creates a new WrongVersion instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WrongVersion instance
     */
    public static create(properties?: IWrongVersion): WrongVersion;

    /**
     * Encodes the specified WrongVersion message. Does not implicitly {@link WrongVersion.verify|verify} messages.
     * @param message WrongVersion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWrongVersion, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WrongVersion message, length delimited. Does not implicitly {@link WrongVersion.verify|verify} messages.
     * @param message WrongVersion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWrongVersion, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WrongVersion message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WrongVersion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WrongVersion;

    /**
     * Decodes a WrongVersion message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WrongVersion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WrongVersion;

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
    public static fromObject(object: { [k: string]: any }): WrongVersion;

    /**
     * Creates a plain object from a WrongVersion message. Also converts values to other types if specified.
     * @param message WrongVersion
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WrongVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WrongVersion to JSON.
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
