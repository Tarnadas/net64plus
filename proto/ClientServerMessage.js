/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ClientServerMessage = (function() {

    /**
     * Properties of a ClientServerMessage.
     * @exports IClientServerMessage
     * @interface IClientServerMessage
     * @property {ClientServerMessage.Compression|null} [compression] ClientServerMessage compression
     * @property {number|null} [uncompressedSize] ClientServerMessage uncompressedSize
     * @property {Uint8Array|null} [compressedData] ClientServerMessage compressedData
     * @property {IClientServer|null} [data] ClientServerMessage data
     */

    /**
     * Constructs a new ClientServerMessage.
     * @exports ClientServerMessage
     * @classdesc Represents a ClientServerMessage.
     * @implements IClientServerMessage
     * @constructor
     * @param {IClientServerMessage=} [properties] Properties to set
     */
    function ClientServerMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientServerMessage compression.
     * @member {ClientServerMessage.Compression} compression
     * @memberof ClientServerMessage
     * @instance
     */
    ClientServerMessage.prototype.compression = 0;

    /**
     * ClientServerMessage uncompressedSize.
     * @member {number} uncompressedSize
     * @memberof ClientServerMessage
     * @instance
     */
    ClientServerMessage.prototype.uncompressedSize = 0;

    /**
     * ClientServerMessage compressedData.
     * @member {Uint8Array} compressedData
     * @memberof ClientServerMessage
     * @instance
     */
    ClientServerMessage.prototype.compressedData = $util.newBuffer([]);

    /**
     * ClientServerMessage data.
     * @member {IClientServer|null|undefined} data
     * @memberof ClientServerMessage
     * @instance
     */
    ClientServerMessage.prototype.data = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ClientServerMessage message.
     * @member {"compressedData"|"data"|undefined} message
     * @memberof ClientServerMessage
     * @instance
     */
    Object.defineProperty(ClientServerMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["compressedData", "data"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ClientServerMessage instance using the specified properties.
     * @function create
     * @memberof ClientServerMessage
     * @static
     * @param {IClientServerMessage=} [properties] Properties to set
     * @returns {ClientServerMessage} ClientServerMessage instance
     */
    ClientServerMessage.create = function create(properties) {
        return new ClientServerMessage(properties);
    };

    /**
     * Encodes the specified ClientServerMessage message. Does not implicitly {@link ClientServerMessage.verify|verify} messages.
     * @function encode
     * @memberof ClientServerMessage
     * @static
     * @param {IClientServerMessage} message ClientServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientServerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.compression != null && message.hasOwnProperty("compression"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.compression);
        if (message.uncompressedSize != null && message.hasOwnProperty("uncompressedSize"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.uncompressedSize);
        if (message.compressedData != null && message.hasOwnProperty("compressedData"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.compressedData);
        if (message.data != null && message.hasOwnProperty("data"))
            $root.ClientServer.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ClientServerMessage message, length delimited. Does not implicitly {@link ClientServerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientServerMessage
     * @static
     * @param {IClientServerMessage} message ClientServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientServerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClientServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientServerMessage} ClientServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientServerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientServerMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.compression = reader.int32();
                break;
            case 2:
                message.uncompressedSize = reader.uint32();
                break;
            case 3:
                message.compressedData = reader.bytes();
                break;
            case 4:
                message.data = $root.ClientServer.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClientServerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientServerMessage} ClientServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientServerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientServerMessage message.
     * @function verify
     * @memberof ClientServerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientServerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.compression != null && message.hasOwnProperty("compression"))
            switch (message.compression) {
            default:
                return "compression: enum value expected";
            case 0:
            case 1:
                break;
            }
        if (message.uncompressedSize != null && message.hasOwnProperty("uncompressedSize"))
            if (!$util.isInteger(message.uncompressedSize))
                return "uncompressedSize: integer expected";
        if (message.compressedData != null && message.hasOwnProperty("compressedData")) {
            properties.message = 1;
            if (!(message.compressedData && typeof message.compressedData.length === "number" || $util.isString(message.compressedData)))
                return "compressedData: buffer expected";
        }
        if (message.data != null && message.hasOwnProperty("data")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.ClientServer.verify(message.data);
                if (error)
                    return "data." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ClientServerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientServerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientServerMessage} ClientServerMessage
     */
    ClientServerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientServerMessage)
            return object;
        var message = new $root.ClientServerMessage();
        switch (object.compression) {
        case "NONE":
        case 0:
            message.compression = 0;
            break;
        case "ZSTD":
        case 1:
            message.compression = 1;
            break;
        }
        if (object.uncompressedSize != null)
            message.uncompressedSize = object.uncompressedSize >>> 0;
        if (object.compressedData != null)
            if (typeof object.compressedData === "string")
                $util.base64.decode(object.compressedData, message.compressedData = $util.newBuffer($util.base64.length(object.compressedData)), 0);
            else if (object.compressedData.length)
                message.compressedData = object.compressedData;
        if (object.data != null) {
            if (typeof object.data !== "object")
                throw TypeError(".ClientServerMessage.data: object expected");
            message.data = $root.ClientServer.fromObject(object.data);
        }
        return message;
    };

    /**
     * Creates a plain object from a ClientServerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientServerMessage
     * @static
     * @param {ClientServerMessage} message ClientServerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientServerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.compression = options.enums === String ? "NONE" : 0;
            object.uncompressedSize = 0;
        }
        if (message.compression != null && message.hasOwnProperty("compression"))
            object.compression = options.enums === String ? $root.ClientServerMessage.Compression[message.compression] : message.compression;
        if (message.uncompressedSize != null && message.hasOwnProperty("uncompressedSize"))
            object.uncompressedSize = message.uncompressedSize;
        if (message.compressedData != null && message.hasOwnProperty("compressedData")) {
            object.compressedData = options.bytes === String ? $util.base64.encode(message.compressedData, 0, message.compressedData.length) : options.bytes === Array ? Array.prototype.slice.call(message.compressedData) : message.compressedData;
            if (options.oneofs)
                object.message = "compressedData";
        }
        if (message.data != null && message.hasOwnProperty("data")) {
            object.data = $root.ClientServer.toObject(message.data, options);
            if (options.oneofs)
                object.message = "data";
        }
        return object;
    };

    /**
     * Converts this ClientServerMessage to JSON.
     * @function toJSON
     * @memberof ClientServerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientServerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Compression enum.
     * @name ClientServerMessage.Compression
     * @enum {string}
     * @property {number} NONE=0 NONE value
     * @property {number} ZSTD=1 ZSTD value
     */
    ClientServerMessage.Compression = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "ZSTD"] = 1;
        return values;
    })();

    return ClientServerMessage;
})();

$root.ClientServer = (function() {

    /**
     * Properties of a ClientServer.
     * @exports IClientServer
     * @interface IClientServer
     * @property {ClientServer.MessageType|null} [messageType] ClientServer messageType
     * @property {IHandshake|null} [handshake] ClientServer handshake
     * @property {IPing|null} [ping] ClientServer ping
     * @property {IPlayerUpdate|null} [playerUpdate] ClientServer playerUpdate
     * @property {IPlayerData|null} [playerData] ClientServer playerData
     * @property {IMetaData|null} [metaData] ClientServer metaData
     * @property {IChat|null} [chatMessage] ClientServer chatMessage
     */

    /**
     * Constructs a new ClientServer.
     * @exports ClientServer
     * @classdesc Represents a ClientServer.
     * @implements IClientServer
     * @constructor
     * @param {IClientServer=} [properties] Properties to set
     */
    function ClientServer(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientServer messageType.
     * @member {ClientServer.MessageType} messageType
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.messageType = 2;

    /**
     * ClientServer handshake.
     * @member {IHandshake|null|undefined} handshake
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.handshake = null;

    /**
     * ClientServer ping.
     * @member {IPing|null|undefined} ping
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.ping = null;

    /**
     * ClientServer playerUpdate.
     * @member {IPlayerUpdate|null|undefined} playerUpdate
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.playerUpdate = null;

    /**
     * ClientServer playerData.
     * @member {IPlayerData|null|undefined} playerData
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.playerData = null;

    /**
     * ClientServer metaData.
     * @member {IMetaData|null|undefined} metaData
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.metaData = null;

    /**
     * ClientServer chatMessage.
     * @member {IChat|null|undefined} chatMessage
     * @memberof ClientServer
     * @instance
     */
    ClientServer.prototype.chatMessage = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ClientServer message.
     * @member {"handshake"|"ping"|"playerUpdate"|"playerData"|"metaData"|"chatMessage"|undefined} message
     * @memberof ClientServer
     * @instance
     */
    Object.defineProperty(ClientServer.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["handshake", "ping", "playerUpdate", "playerData", "metaData", "chatMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ClientServer instance using the specified properties.
     * @function create
     * @memberof ClientServer
     * @static
     * @param {IClientServer=} [properties] Properties to set
     * @returns {ClientServer} ClientServer instance
     */
    ClientServer.create = function create(properties) {
        return new ClientServer(properties);
    };

    /**
     * Encodes the specified ClientServer message. Does not implicitly {@link ClientServer.verify|verify} messages.
     * @function encode
     * @memberof ClientServer
     * @static
     * @param {IClientServer} message ClientServer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientServer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageType != null && message.hasOwnProperty("messageType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
        if (message.handshake != null && message.hasOwnProperty("handshake"))
            $root.Handshake.encode(message.handshake, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.ping != null && message.hasOwnProperty("ping"))
            $root.Ping.encode(message.ping, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate"))
            $root.PlayerUpdate.encode(message.playerUpdate, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.playerData != null && message.hasOwnProperty("playerData"))
            $root.PlayerData.encode(message.playerData, writer.uint32(/* id 128, wireType 2 =*/1026).fork()).ldelim();
        if (message.metaData != null && message.hasOwnProperty("metaData"))
            $root.MetaData.encode(message.metaData, writer.uint32(/* id 129, wireType 2 =*/1034).fork()).ldelim();
        if (message.chatMessage != null && message.hasOwnProperty("chatMessage"))
            $root.Chat.encode(message.chatMessage, writer.uint32(/* id 130, wireType 2 =*/1042).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ClientServer message, length delimited. Does not implicitly {@link ClientServer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientServer
     * @static
     * @param {IClientServer} message ClientServer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientServer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientServer message from the specified reader or buffer.
     * @function decode
     * @memberof ClientServer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientServer} ClientServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientServer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientServer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageType = reader.int32();
                break;
            case 2:
                message.handshake = $root.Handshake.decode(reader, reader.uint32());
                break;
            case 3:
                message.ping = $root.Ping.decode(reader, reader.uint32());
                break;
            case 6:
                message.playerUpdate = $root.PlayerUpdate.decode(reader, reader.uint32());
                break;
            case 128:
                message.playerData = $root.PlayerData.decode(reader, reader.uint32());
                break;
            case 129:
                message.metaData = $root.MetaData.decode(reader, reader.uint32());
                break;
            case 130:
                message.chatMessage = $root.Chat.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClientServer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientServer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientServer} ClientServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientServer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientServer message.
     * @function verify
     * @memberof ClientServer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientServer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.messageType != null && message.hasOwnProperty("messageType"))
            switch (message.messageType) {
            default:
                return "messageType: enum value expected";
            case 2:
            case 3:
            case 6:
            case 128:
            case 129:
            case 130:
                break;
            }
        if (message.handshake != null && message.hasOwnProperty("handshake")) {
            properties.message = 1;
            {
                var error = $root.Handshake.verify(message.handshake);
                if (error)
                    return "handshake." + error;
            }
        }
        if (message.ping != null && message.hasOwnProperty("ping")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Ping.verify(message.ping);
                if (error)
                    return "ping." + error;
            }
        }
        if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.PlayerUpdate.verify(message.playerUpdate);
                if (error)
                    return "playerUpdate." + error;
            }
        }
        if (message.playerData != null && message.hasOwnProperty("playerData")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.PlayerData.verify(message.playerData);
                if (error)
                    return "playerData." + error;
            }
        }
        if (message.metaData != null && message.hasOwnProperty("metaData")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.MetaData.verify(message.metaData);
                if (error)
                    return "metaData." + error;
            }
        }
        if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                var error = $root.Chat.verify(message.chatMessage);
                if (error)
                    return "chatMessage." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ClientServer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientServer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientServer} ClientServer
     */
    ClientServer.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientServer)
            return object;
        var message = new $root.ClientServer();
        switch (object.messageType) {
        case "HANDSHAKE":
        case 2:
            message.messageType = 2;
            break;
        case "PING":
        case 3:
            message.messageType = 3;
            break;
        case "PLAYER_UPDATE":
        case 6:
            message.messageType = 6;
            break;
        case "PLAYER_DATA":
        case 128:
            message.messageType = 128;
            break;
        case "META_DATA":
        case 129:
            message.messageType = 129;
            break;
        case "CHAT_MESSAGE":
        case 130:
            message.messageType = 130;
            break;
        }
        if (object.handshake != null) {
            if (typeof object.handshake !== "object")
                throw TypeError(".ClientServer.handshake: object expected");
            message.handshake = $root.Handshake.fromObject(object.handshake);
        }
        if (object.ping != null) {
            if (typeof object.ping !== "object")
                throw TypeError(".ClientServer.ping: object expected");
            message.ping = $root.Ping.fromObject(object.ping);
        }
        if (object.playerUpdate != null) {
            if (typeof object.playerUpdate !== "object")
                throw TypeError(".ClientServer.playerUpdate: object expected");
            message.playerUpdate = $root.PlayerUpdate.fromObject(object.playerUpdate);
        }
        if (object.playerData != null) {
            if (typeof object.playerData !== "object")
                throw TypeError(".ClientServer.playerData: object expected");
            message.playerData = $root.PlayerData.fromObject(object.playerData);
        }
        if (object.metaData != null) {
            if (typeof object.metaData !== "object")
                throw TypeError(".ClientServer.metaData: object expected");
            message.metaData = $root.MetaData.fromObject(object.metaData);
        }
        if (object.chatMessage != null) {
            if (typeof object.chatMessage !== "object")
                throw TypeError(".ClientServer.chatMessage: object expected");
            message.chatMessage = $root.Chat.fromObject(object.chatMessage);
        }
        return message;
    };

    /**
     * Creates a plain object from a ClientServer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientServer
     * @static
     * @param {ClientServer} message ClientServer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientServer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.messageType = options.enums === String ? "HANDSHAKE" : 2;
        if (message.messageType != null && message.hasOwnProperty("messageType"))
            object.messageType = options.enums === String ? $root.ClientServer.MessageType[message.messageType] : message.messageType;
        if (message.handshake != null && message.hasOwnProperty("handshake")) {
            object.handshake = $root.Handshake.toObject(message.handshake, options);
            if (options.oneofs)
                object.message = "handshake";
        }
        if (message.ping != null && message.hasOwnProperty("ping")) {
            object.ping = $root.Ping.toObject(message.ping, options);
            if (options.oneofs)
                object.message = "ping";
        }
        if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate")) {
            object.playerUpdate = $root.PlayerUpdate.toObject(message.playerUpdate, options);
            if (options.oneofs)
                object.message = "playerUpdate";
        }
        if (message.playerData != null && message.hasOwnProperty("playerData")) {
            object.playerData = $root.PlayerData.toObject(message.playerData, options);
            if (options.oneofs)
                object.message = "playerData";
        }
        if (message.metaData != null && message.hasOwnProperty("metaData")) {
            object.metaData = $root.MetaData.toObject(message.metaData, options);
            if (options.oneofs)
                object.message = "metaData";
        }
        if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
            object.chatMessage = $root.Chat.toObject(message.chatMessage, options);
            if (options.oneofs)
                object.message = "chatMessage";
        }
        return object;
    };

    /**
     * Converts this ClientServer to JSON.
     * @function toJSON
     * @memberof ClientServer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientServer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * MessageType enum.
     * @name ClientServer.MessageType
     * @enum {string}
     * @property {number} HANDSHAKE=2 HANDSHAKE value
     * @property {number} PING=3 PING value
     * @property {number} PLAYER_UPDATE=6 PLAYER_UPDATE value
     * @property {number} PLAYER_DATA=128 PLAYER_DATA value
     * @property {number} META_DATA=129 META_DATA value
     * @property {number} CHAT_MESSAGE=130 CHAT_MESSAGE value
     */
    ClientServer.MessageType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[2] = "HANDSHAKE"] = 2;
        values[valuesById[3] = "PING"] = 3;
        values[valuesById[6] = "PLAYER_UPDATE"] = 6;
        values[valuesById[128] = "PLAYER_DATA"] = 128;
        values[valuesById[129] = "META_DATA"] = 129;
        values[valuesById[130] = "CHAT_MESSAGE"] = 130;
        return values;
    })();

    return ClientServer;
})();

$root.Handshake = (function() {

    /**
     * Properties of a Handshake.
     * @exports IHandshake
     * @interface IHandshake
     * @property {number|null} [major] Handshake major
     * @property {number|null} [minor] Handshake minor
     * @property {number|null} [characterId] Handshake characterId
     * @property {string|null} [username] Handshake username
     */

    /**
     * Constructs a new Handshake.
     * @exports Handshake
     * @classdesc Represents a Handshake.
     * @implements IHandshake
     * @constructor
     * @param {IHandshake=} [properties] Properties to set
     */
    function Handshake(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Handshake major.
     * @member {number} major
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.major = 0;

    /**
     * Handshake minor.
     * @member {number} minor
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.minor = 0;

    /**
     * Handshake characterId.
     * @member {number} characterId
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.characterId = 0;

    /**
     * Handshake username.
     * @member {string} username
     * @memberof Handshake
     * @instance
     */
    Handshake.prototype.username = "";

    /**
     * Creates a new Handshake instance using the specified properties.
     * @function create
     * @memberof Handshake
     * @static
     * @param {IHandshake=} [properties] Properties to set
     * @returns {Handshake} Handshake instance
     */
    Handshake.create = function create(properties) {
        return new Handshake(properties);
    };

    /**
     * Encodes the specified Handshake message. Does not implicitly {@link Handshake.verify|verify} messages.
     * @function encode
     * @memberof Handshake
     * @static
     * @param {IHandshake} message Handshake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Handshake.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.major != null && message.hasOwnProperty("major"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.major);
        if (message.minor != null && message.hasOwnProperty("minor"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.minor);
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.characterId);
        if (message.username != null && message.hasOwnProperty("username"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.username);
        return writer;
    };

    /**
     * Encodes the specified Handshake message, length delimited. Does not implicitly {@link Handshake.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Handshake
     * @static
     * @param {IHandshake} message Handshake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Handshake.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Handshake message from the specified reader or buffer.
     * @function decode
     * @memberof Handshake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Handshake} Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Handshake.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Handshake();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.major = reader.uint32();
                break;
            case 2:
                message.minor = reader.uint32();
                break;
            case 3:
                message.characterId = reader.uint32();
                break;
            case 4:
                message.username = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Handshake message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Handshake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Handshake} Handshake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Handshake.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Handshake message.
     * @function verify
     * @memberof Handshake
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Handshake.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.major != null && message.hasOwnProperty("major"))
            if (!$util.isInteger(message.major))
                return "major: integer expected";
        if (message.minor != null && message.hasOwnProperty("minor"))
            if (!$util.isInteger(message.minor))
                return "minor: integer expected";
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            if (!$util.isInteger(message.characterId))
                return "characterId: integer expected";
        if (message.username != null && message.hasOwnProperty("username"))
            if (!$util.isString(message.username))
                return "username: string expected";
        return null;
    };

    /**
     * Creates a Handshake message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Handshake
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Handshake} Handshake
     */
    Handshake.fromObject = function fromObject(object) {
        if (object instanceof $root.Handshake)
            return object;
        var message = new $root.Handshake();
        if (object.major != null)
            message.major = object.major >>> 0;
        if (object.minor != null)
            message.minor = object.minor >>> 0;
        if (object.characterId != null)
            message.characterId = object.characterId >>> 0;
        if (object.username != null)
            message.username = String(object.username);
        return message;
    };

    /**
     * Creates a plain object from a Handshake message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Handshake
     * @static
     * @param {Handshake} message Handshake
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Handshake.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.major = 0;
            object.minor = 0;
            object.characterId = 0;
            object.username = "";
        }
        if (message.major != null && message.hasOwnProperty("major"))
            object.major = message.major;
        if (message.minor != null && message.hasOwnProperty("minor"))
            object.minor = message.minor;
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            object.characterId = message.characterId;
        if (message.username != null && message.hasOwnProperty("username"))
            object.username = message.username;
        return object;
    };

    /**
     * Converts this Handshake to JSON.
     * @function toJSON
     * @memberof Handshake
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Handshake.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Handshake;
})();

$root.Ping = (function() {

    /**
     * Properties of a Ping.
     * @exports IPing
     * @interface IPing
     */

    /**
     * Constructs a new Ping.
     * @exports Ping
     * @classdesc Represents a Ping.
     * @implements IPing
     * @constructor
     * @param {IPing=} [properties] Properties to set
     */
    function Ping(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Ping instance using the specified properties.
     * @function create
     * @memberof Ping
     * @static
     * @param {IPing=} [properties] Properties to set
     * @returns {Ping} Ping instance
     */
    Ping.create = function create(properties) {
        return new Ping(properties);
    };

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encode
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @function decode
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ping();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ping message.
     * @function verify
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ping} Ping
     */
    Ping.fromObject = function fromObject(object) {
        if (object instanceof $root.Ping)
            return object;
        return new $root.Ping();
    };

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ping
     * @static
     * @param {Ping} message Ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ping.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Ping to JSON.
     * @function toJSON
     * @memberof Ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ping;
})();

$root.PlayerUpdate = (function() {

    /**
     * Properties of a PlayerUpdate.
     * @exports IPlayerUpdate
     * @interface IPlayerUpdate
     * @property {number|null} [playerId] PlayerUpdate playerId
     * @property {IPlayer|null} [player] PlayerUpdate player
     */

    /**
     * Constructs a new PlayerUpdate.
     * @exports PlayerUpdate
     * @classdesc Represents a PlayerUpdate.
     * @implements IPlayerUpdate
     * @constructor
     * @param {IPlayerUpdate=} [properties] Properties to set
     */
    function PlayerUpdate(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerUpdate playerId.
     * @member {number} playerId
     * @memberof PlayerUpdate
     * @instance
     */
    PlayerUpdate.prototype.playerId = 0;

    /**
     * PlayerUpdate player.
     * @member {IPlayer|null|undefined} player
     * @memberof PlayerUpdate
     * @instance
     */
    PlayerUpdate.prototype.player = null;

    /**
     * Creates a new PlayerUpdate instance using the specified properties.
     * @function create
     * @memberof PlayerUpdate
     * @static
     * @param {IPlayerUpdate=} [properties] Properties to set
     * @returns {PlayerUpdate} PlayerUpdate instance
     */
    PlayerUpdate.create = function create(properties) {
        return new PlayerUpdate(properties);
    };

    /**
     * Encodes the specified PlayerUpdate message. Does not implicitly {@link PlayerUpdate.verify|verify} messages.
     * @function encode
     * @memberof PlayerUpdate
     * @static
     * @param {IPlayerUpdate} message PlayerUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerUpdate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerId);
        if (message.player != null && message.hasOwnProperty("player"))
            $root.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PlayerUpdate message, length delimited. Does not implicitly {@link PlayerUpdate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerUpdate
     * @static
     * @param {IPlayerUpdate} message PlayerUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerUpdate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerUpdate message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerUpdate} PlayerUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerUpdate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerUpdate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.playerId = reader.uint32();
                break;
            case 2:
                message.player = $root.Player.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerUpdate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerUpdate} PlayerUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerUpdate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerUpdate message.
     * @function verify
     * @memberof PlayerUpdate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerUpdate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            if (!$util.isInteger(message.playerId))
                return "playerId: integer expected";
        if (message.player != null && message.hasOwnProperty("player")) {
            var error = $root.Player.verify(message.player);
            if (error)
                return "player." + error;
        }
        return null;
    };

    /**
     * Creates a PlayerUpdate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerUpdate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerUpdate} PlayerUpdate
     */
    PlayerUpdate.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerUpdate)
            return object;
        var message = new $root.PlayerUpdate();
        if (object.playerId != null)
            message.playerId = object.playerId >>> 0;
        if (object.player != null) {
            if (typeof object.player !== "object")
                throw TypeError(".PlayerUpdate.player: object expected");
            message.player = $root.Player.fromObject(object.player);
        }
        return message;
    };

    /**
     * Creates a plain object from a PlayerUpdate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerUpdate
     * @static
     * @param {PlayerUpdate} message PlayerUpdate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerUpdate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.playerId = 0;
            object.player = null;
        }
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            object.playerId = message.playerId;
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = $root.Player.toObject(message.player, options);
        return object;
    };

    /**
     * Converts this PlayerUpdate to JSON.
     * @function toJSON
     * @memberof PlayerUpdate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerUpdate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerUpdate;
})();

$root.Player = (function() {

    /**
     * Properties of a Player.
     * @exports IPlayer
     * @interface IPlayer
     * @property {string|null} [username] Player username
     * @property {number|null} [characterId] Player characterId
     */

    /**
     * Constructs a new Player.
     * @exports Player
     * @classdesc Represents a Player.
     * @implements IPlayer
     * @constructor
     * @param {IPlayer=} [properties] Properties to set
     */
    function Player(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Player username.
     * @member {string} username
     * @memberof Player
     * @instance
     */
    Player.prototype.username = "";

    /**
     * Player characterId.
     * @member {number} characterId
     * @memberof Player
     * @instance
     */
    Player.prototype.characterId = 0;

    /**
     * Creates a new Player instance using the specified properties.
     * @function create
     * @memberof Player
     * @static
     * @param {IPlayer=} [properties] Properties to set
     * @returns {Player} Player instance
     */
    Player.create = function create(properties) {
        return new Player(properties);
    };

    /**
     * Encodes the specified Player message. Does not implicitly {@link Player.verify|verify} messages.
     * @function encode
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.username != null && message.hasOwnProperty("username"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.characterId);
        return writer;
    };

    /**
     * Encodes the specified Player message, length delimited. Does not implicitly {@link Player.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Player message from the specified reader or buffer.
     * @function decode
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Player();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.username = reader.string();
                break;
            case 2:
                message.characterId = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Player message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Player message.
     * @function verify
     * @memberof Player
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Player.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.username != null && message.hasOwnProperty("username"))
            if (!$util.isString(message.username))
                return "username: string expected";
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            if (!$util.isInteger(message.characterId))
                return "characterId: integer expected";
        return null;
    };

    /**
     * Creates a Player message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Player
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Player} Player
     */
    Player.fromObject = function fromObject(object) {
        if (object instanceof $root.Player)
            return object;
        var message = new $root.Player();
        if (object.username != null)
            message.username = String(object.username);
        if (object.characterId != null)
            message.characterId = object.characterId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Player message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Player
     * @static
     * @param {Player} message Player
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Player.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.username = "";
            object.characterId = 0;
        }
        if (message.username != null && message.hasOwnProperty("username"))
            object.username = message.username;
        if (message.characterId != null && message.hasOwnProperty("characterId"))
            object.characterId = message.characterId;
        return object;
    };

    /**
     * Converts this Player to JSON.
     * @function toJSON
     * @memberof Player
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Player.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Player;
})();

$root.PlayerData = (function() {

    /**
     * Properties of a PlayerData.
     * @exports IPlayerData
     * @interface IPlayerData
     * @property {number|null} [dataLength] PlayerData dataLength
     * @property {Uint8Array|null} [playerData] PlayerData playerData
     */

    /**
     * Constructs a new PlayerData.
     * @exports PlayerData
     * @classdesc Represents a PlayerData.
     * @implements IPlayerData
     * @constructor
     * @param {IPlayerData=} [properties] Properties to set
     */
    function PlayerData(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerData dataLength.
     * @member {number} dataLength
     * @memberof PlayerData
     * @instance
     */
    PlayerData.prototype.dataLength = 0;

    /**
     * PlayerData playerData.
     * @member {Uint8Array} playerData
     * @memberof PlayerData
     * @instance
     */
    PlayerData.prototype.playerData = $util.newBuffer([]);

    /**
     * Creates a new PlayerData instance using the specified properties.
     * @function create
     * @memberof PlayerData
     * @static
     * @param {IPlayerData=} [properties] Properties to set
     * @returns {PlayerData} PlayerData instance
     */
    PlayerData.create = function create(properties) {
        return new PlayerData(properties);
    };

    /**
     * Encodes the specified PlayerData message. Does not implicitly {@link PlayerData.verify|verify} messages.
     * @function encode
     * @memberof PlayerData
     * @static
     * @param {IPlayerData} message PlayerData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.dataLength != null && message.hasOwnProperty("dataLength"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.dataLength);
        if (message.playerData != null && message.hasOwnProperty("playerData"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.playerData);
        return writer;
    };

    /**
     * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link PlayerData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerData
     * @static
     * @param {IPlayerData} message PlayerData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerData message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerData} PlayerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 2:
                message.dataLength = reader.uint32();
                break;
            case 3:
                message.playerData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerData} PlayerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerData message.
     * @function verify
     * @memberof PlayerData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.dataLength != null && message.hasOwnProperty("dataLength"))
            if (!$util.isInteger(message.dataLength))
                return "dataLength: integer expected";
        if (message.playerData != null && message.hasOwnProperty("playerData"))
            if (!(message.playerData && typeof message.playerData.length === "number" || $util.isString(message.playerData)))
                return "playerData: buffer expected";
        return null;
    };

    /**
     * Creates a PlayerData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerData} PlayerData
     */
    PlayerData.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerData)
            return object;
        var message = new $root.PlayerData();
        if (object.dataLength != null)
            message.dataLength = object.dataLength >>> 0;
        if (object.playerData != null)
            if (typeof object.playerData === "string")
                $util.base64.decode(object.playerData, message.playerData = $util.newBuffer($util.base64.length(object.playerData)), 0);
            else if (object.playerData.length)
                message.playerData = object.playerData;
        return message;
    };

    /**
     * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerData
     * @static
     * @param {PlayerData} message PlayerData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.dataLength = 0;
            object.playerData = options.bytes === String ? "" : [];
        }
        if (message.dataLength != null && message.hasOwnProperty("dataLength"))
            object.dataLength = message.dataLength;
        if (message.playerData != null && message.hasOwnProperty("playerData"))
            object.playerData = options.bytes === String ? $util.base64.encode(message.playerData, 0, message.playerData.length) : options.bytes === Array ? Array.prototype.slice.call(message.playerData) : message.playerData;
        return object;
    };

    /**
     * Converts this PlayerData to JSON.
     * @function toJSON
     * @memberof PlayerData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerData;
})();

$root.MetaData = (function() {

    /**
     * Properties of a MetaData.
     * @exports IMetaData
     * @interface IMetaData
     * @property {Array.<IMeta>|null} [metaData] MetaData metaData
     */

    /**
     * Constructs a new MetaData.
     * @exports MetaData
     * @classdesc Represents a MetaData.
     * @implements IMetaData
     * @constructor
     * @param {IMetaData=} [properties] Properties to set
     */
    function MetaData(properties) {
        this.metaData = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MetaData metaData.
     * @member {Array.<IMeta>} metaData
     * @memberof MetaData
     * @instance
     */
    MetaData.prototype.metaData = $util.emptyArray;

    /**
     * Creates a new MetaData instance using the specified properties.
     * @function create
     * @memberof MetaData
     * @static
     * @param {IMetaData=} [properties] Properties to set
     * @returns {MetaData} MetaData instance
     */
    MetaData.create = function create(properties) {
        return new MetaData(properties);
    };

    /**
     * Encodes the specified MetaData message. Does not implicitly {@link MetaData.verify|verify} messages.
     * @function encode
     * @memberof MetaData
     * @static
     * @param {IMetaData} message MetaData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MetaData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.metaData != null && message.metaData.length)
            for (var i = 0; i < message.metaData.length; ++i)
                $root.Meta.encode(message.metaData[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MetaData message, length delimited. Does not implicitly {@link MetaData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MetaData
     * @static
     * @param {IMetaData} message MetaData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MetaData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MetaData message from the specified reader or buffer.
     * @function decode
     * @memberof MetaData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MetaData} MetaData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MetaData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MetaData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.metaData && message.metaData.length))
                    message.metaData = [];
                message.metaData.push($root.Meta.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MetaData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MetaData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MetaData} MetaData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MetaData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MetaData message.
     * @function verify
     * @memberof MetaData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MetaData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.metaData != null && message.hasOwnProperty("metaData")) {
            if (!Array.isArray(message.metaData))
                return "metaData: array expected";
            for (var i = 0; i < message.metaData.length; ++i) {
                var error = $root.Meta.verify(message.metaData[i]);
                if (error)
                    return "metaData." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MetaData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MetaData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MetaData} MetaData
     */
    MetaData.fromObject = function fromObject(object) {
        if (object instanceof $root.MetaData)
            return object;
        var message = new $root.MetaData();
        if (object.metaData) {
            if (!Array.isArray(object.metaData))
                throw TypeError(".MetaData.metaData: array expected");
            message.metaData = [];
            for (var i = 0; i < object.metaData.length; ++i) {
                if (typeof object.metaData[i] !== "object")
                    throw TypeError(".MetaData.metaData: object expected");
                message.metaData[i] = $root.Meta.fromObject(object.metaData[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MetaData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MetaData
     * @static
     * @param {MetaData} message MetaData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MetaData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.metaData = [];
        if (message.metaData && message.metaData.length) {
            object.metaData = [];
            for (var j = 0; j < message.metaData.length; ++j)
                object.metaData[j] = $root.Meta.toObject(message.metaData[j], options);
        }
        return object;
    };

    /**
     * Converts this MetaData to JSON.
     * @function toJSON
     * @memberof MetaData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MetaData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MetaData;
})();

$root.Meta = (function() {

    /**
     * Properties of a Meta.
     * @exports IMeta
     * @interface IMeta
     * @property {number|null} [length] Meta length
     * @property {number|null} [address] Meta address
     * @property {Uint8Array|null} [data] Meta data
     */

    /**
     * Constructs a new Meta.
     * @exports Meta
     * @classdesc Represents a Meta.
     * @implements IMeta
     * @constructor
     * @param {IMeta=} [properties] Properties to set
     */
    function Meta(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Meta length.
     * @member {number} length
     * @memberof Meta
     * @instance
     */
    Meta.prototype.length = 0;

    /**
     * Meta address.
     * @member {number} address
     * @memberof Meta
     * @instance
     */
    Meta.prototype.address = 0;

    /**
     * Meta data.
     * @member {Uint8Array} data
     * @memberof Meta
     * @instance
     */
    Meta.prototype.data = $util.newBuffer([]);

    /**
     * Creates a new Meta instance using the specified properties.
     * @function create
     * @memberof Meta
     * @static
     * @param {IMeta=} [properties] Properties to set
     * @returns {Meta} Meta instance
     */
    Meta.create = function create(properties) {
        return new Meta(properties);
    };

    /**
     * Encodes the specified Meta message. Does not implicitly {@link Meta.verify|verify} messages.
     * @function encode
     * @memberof Meta
     * @static
     * @param {IMeta} message Meta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.length != null && message.hasOwnProperty("length"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.length);
        if (message.address != null && message.hasOwnProperty("address"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.address);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
        return writer;
    };

    /**
     * Encodes the specified Meta message, length delimited. Does not implicitly {@link Meta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Meta
     * @static
     * @param {IMeta} message Meta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Meta message from the specified reader or buffer.
     * @function decode
     * @memberof Meta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Meta} Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Meta();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.length = reader.uint32();
                break;
            case 2:
                message.address = reader.uint32();
                break;
            case 3:
                message.data = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Meta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Meta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Meta} Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Meta message.
     * @function verify
     * @memberof Meta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Meta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.length != null && message.hasOwnProperty("length"))
            if (!$util.isInteger(message.length))
                return "length: integer expected";
        if (message.address != null && message.hasOwnProperty("address"))
            if (!$util.isInteger(message.address))
                return "address: integer expected";
        if (message.data != null && message.hasOwnProperty("data"))
            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
        return null;
    };

    /**
     * Creates a Meta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Meta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Meta} Meta
     */
    Meta.fromObject = function fromObject(object) {
        if (object instanceof $root.Meta)
            return object;
        var message = new $root.Meta();
        if (object.length != null)
            message.length = object.length >>> 0;
        if (object.address != null)
            message.address = object.address >>> 0;
        if (object.data != null)
            if (typeof object.data === "string")
                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
            else if (object.data.length)
                message.data = object.data;
        return message;
    };

    /**
     * Creates a plain object from a Meta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Meta
     * @static
     * @param {Meta} message Meta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Meta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.length = 0;
            object.address = 0;
            object.data = options.bytes === String ? "" : [];
        }
        if (message.length != null && message.hasOwnProperty("length"))
            object.length = message.length;
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = message.address;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
        return object;
    };

    /**
     * Converts this Meta to JSON.
     * @function toJSON
     * @memberof Meta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Meta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Meta;
})();

$root.Chat = (function() {

    /**
     * Properties of a Chat.
     * @exports IChat
     * @interface IChat
     * @property {IChatGlobal|null} [global] Chat global
     * @property {IChatTeam|null} [team] Chat team
     * @property {IChatPrivate|null} ["private"] Chat private
     */

    /**
     * Constructs a new Chat.
     * @exports Chat
     * @classdesc Represents a Chat.
     * @implements IChat
     * @constructor
     * @param {IChat=} [properties] Properties to set
     */
    function Chat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Chat global.
     * @member {IChatGlobal|null|undefined} global
     * @memberof Chat
     * @instance
     */
    Chat.prototype.global = null;

    /**
     * Chat team.
     * @member {IChatTeam|null|undefined} team
     * @memberof Chat
     * @instance
     */
    Chat.prototype.team = null;

    /**
     * Chat private.
     * @member {IChatPrivate|null|undefined} private
     * @memberof Chat
     * @instance
     */
    Chat.prototype["private"] = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Chat messageType.
     * @member {"global"|"team"|"private"|undefined} messageType
     * @memberof Chat
     * @instance
     */
    Object.defineProperty(Chat.prototype, "messageType", {
        get: $util.oneOfGetter($oneOfFields = ["global", "team", "private"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Chat instance using the specified properties.
     * @function create
     * @memberof Chat
     * @static
     * @param {IChat=} [properties] Properties to set
     * @returns {Chat} Chat instance
     */
    Chat.create = function create(properties) {
        return new Chat(properties);
    };

    /**
     * Encodes the specified Chat message. Does not implicitly {@link Chat.verify|verify} messages.
     * @function encode
     * @memberof Chat
     * @static
     * @param {IChat} message Chat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Chat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.global != null && message.hasOwnProperty("global"))
            $root.ChatGlobal.encode(message.global, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.team != null && message.hasOwnProperty("team"))
            $root.ChatTeam.encode(message.team, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message["private"] != null && message.hasOwnProperty("private"))
            $root.ChatPrivate.encode(message["private"], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Chat message, length delimited. Does not implicitly {@link Chat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Chat
     * @static
     * @param {IChat} message Chat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Chat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Chat message from the specified reader or buffer.
     * @function decode
     * @memberof Chat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Chat} Chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Chat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Chat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.global = $root.ChatGlobal.decode(reader, reader.uint32());
                break;
            case 2:
                message.team = $root.ChatTeam.decode(reader, reader.uint32());
                break;
            case 3:
                message["private"] = $root.ChatPrivate.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Chat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Chat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Chat} Chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Chat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Chat message.
     * @function verify
     * @memberof Chat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Chat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.global != null && message.hasOwnProperty("global")) {
            properties.messageType = 1;
            {
                var error = $root.ChatGlobal.verify(message.global);
                if (error)
                    return "global." + error;
            }
        }
        if (message.team != null && message.hasOwnProperty("team")) {
            if (properties.messageType === 1)
                return "messageType: multiple values";
            properties.messageType = 1;
            {
                var error = $root.ChatTeam.verify(message.team);
                if (error)
                    return "team." + error;
            }
        }
        if (message["private"] != null && message.hasOwnProperty("private")) {
            if (properties.messageType === 1)
                return "messageType: multiple values";
            properties.messageType = 1;
            {
                var error = $root.ChatPrivate.verify(message["private"]);
                if (error)
                    return "private." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Chat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Chat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Chat} Chat
     */
    Chat.fromObject = function fromObject(object) {
        if (object instanceof $root.Chat)
            return object;
        var message = new $root.Chat();
        if (object.global != null) {
            if (typeof object.global !== "object")
                throw TypeError(".Chat.global: object expected");
            message.global = $root.ChatGlobal.fromObject(object.global);
        }
        if (object.team != null) {
            if (typeof object.team !== "object")
                throw TypeError(".Chat.team: object expected");
            message.team = $root.ChatTeam.fromObject(object.team);
        }
        if (object["private"] != null) {
            if (typeof object["private"] !== "object")
                throw TypeError(".Chat.private: object expected");
            message["private"] = $root.ChatPrivate.fromObject(object["private"]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Chat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Chat
     * @static
     * @param {Chat} message Chat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Chat.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.global != null && message.hasOwnProperty("global")) {
            object.global = $root.ChatGlobal.toObject(message.global, options);
            if (options.oneofs)
                object.messageType = "global";
        }
        if (message.team != null && message.hasOwnProperty("team")) {
            object.team = $root.ChatTeam.toObject(message.team, options);
            if (options.oneofs)
                object.messageType = "team";
        }
        if (message["private"] != null && message.hasOwnProperty("private")) {
            object["private"] = $root.ChatPrivate.toObject(message["private"], options);
            if (options.oneofs)
                object.messageType = "private";
        }
        return object;
    };

    /**
     * Converts this Chat to JSON.
     * @function toJSON
     * @memberof Chat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Chat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Chat;
})();

$root.ChatGlobal = (function() {

    /**
     * Properties of a ChatGlobal.
     * @exports IChatGlobal
     * @interface IChatGlobal
     * @property {number|null} [senderId] ChatGlobal senderId
     * @property {string|null} [message] ChatGlobal message
     */

    /**
     * Constructs a new ChatGlobal.
     * @exports ChatGlobal
     * @classdesc Represents a ChatGlobal.
     * @implements IChatGlobal
     * @constructor
     * @param {IChatGlobal=} [properties] Properties to set
     */
    function ChatGlobal(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatGlobal senderId.
     * @member {number} senderId
     * @memberof ChatGlobal
     * @instance
     */
    ChatGlobal.prototype.senderId = 0;

    /**
     * ChatGlobal message.
     * @member {string} message
     * @memberof ChatGlobal
     * @instance
     */
    ChatGlobal.prototype.message = "";

    /**
     * Creates a new ChatGlobal instance using the specified properties.
     * @function create
     * @memberof ChatGlobal
     * @static
     * @param {IChatGlobal=} [properties] Properties to set
     * @returns {ChatGlobal} ChatGlobal instance
     */
    ChatGlobal.create = function create(properties) {
        return new ChatGlobal(properties);
    };

    /**
     * Encodes the specified ChatGlobal message. Does not implicitly {@link ChatGlobal.verify|verify} messages.
     * @function encode
     * @memberof ChatGlobal
     * @static
     * @param {IChatGlobal} message ChatGlobal message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatGlobal.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.senderId);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified ChatGlobal message, length delimited. Does not implicitly {@link ChatGlobal.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatGlobal
     * @static
     * @param {IChatGlobal} message ChatGlobal message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatGlobal.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatGlobal message from the specified reader or buffer.
     * @function decode
     * @memberof ChatGlobal
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatGlobal} ChatGlobal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatGlobal.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatGlobal();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.senderId = reader.uint32();
                break;
            case 2:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatGlobal message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatGlobal
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatGlobal} ChatGlobal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatGlobal.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatGlobal message.
     * @function verify
     * @memberof ChatGlobal
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatGlobal.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            if (!$util.isInteger(message.senderId))
                return "senderId: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates a ChatGlobal message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatGlobal
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatGlobal} ChatGlobal
     */
    ChatGlobal.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatGlobal)
            return object;
        var message = new $root.ChatGlobal();
        if (object.senderId != null)
            message.senderId = object.senderId >>> 0;
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a ChatGlobal message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatGlobal
     * @static
     * @param {ChatGlobal} message ChatGlobal
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatGlobal.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.senderId = 0;
            object.message = "";
        }
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            object.senderId = message.senderId;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this ChatGlobal to JSON.
     * @function toJSON
     * @memberof ChatGlobal
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatGlobal.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatGlobal;
})();

$root.ChatTeam = (function() {

    /**
     * Properties of a ChatTeam.
     * @exports IChatTeam
     * @interface IChatTeam
     * @property {number|null} [senderId] ChatTeam senderId
     * @property {string|null} [message] ChatTeam message
     * @property {number|null} [teamId] ChatTeam teamId
     */

    /**
     * Constructs a new ChatTeam.
     * @exports ChatTeam
     * @classdesc Represents a ChatTeam.
     * @implements IChatTeam
     * @constructor
     * @param {IChatTeam=} [properties] Properties to set
     */
    function ChatTeam(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatTeam senderId.
     * @member {number} senderId
     * @memberof ChatTeam
     * @instance
     */
    ChatTeam.prototype.senderId = 0;

    /**
     * ChatTeam message.
     * @member {string} message
     * @memberof ChatTeam
     * @instance
     */
    ChatTeam.prototype.message = "";

    /**
     * ChatTeam teamId.
     * @member {number} teamId
     * @memberof ChatTeam
     * @instance
     */
    ChatTeam.prototype.teamId = 0;

    /**
     * Creates a new ChatTeam instance using the specified properties.
     * @function create
     * @memberof ChatTeam
     * @static
     * @param {IChatTeam=} [properties] Properties to set
     * @returns {ChatTeam} ChatTeam instance
     */
    ChatTeam.create = function create(properties) {
        return new ChatTeam(properties);
    };

    /**
     * Encodes the specified ChatTeam message. Does not implicitly {@link ChatTeam.verify|verify} messages.
     * @function encode
     * @memberof ChatTeam
     * @static
     * @param {IChatTeam} message ChatTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatTeam.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.senderId);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.teamId != null && message.hasOwnProperty("teamId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.teamId);
        return writer;
    };

    /**
     * Encodes the specified ChatTeam message, length delimited. Does not implicitly {@link ChatTeam.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatTeam
     * @static
     * @param {IChatTeam} message ChatTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatTeam.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatTeam message from the specified reader or buffer.
     * @function decode
     * @memberof ChatTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatTeam} ChatTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatTeam.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatTeam();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.senderId = reader.uint32();
                break;
            case 2:
                message.message = reader.string();
                break;
            case 3:
                message.teamId = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatTeam message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatTeam} ChatTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatTeam.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatTeam message.
     * @function verify
     * @memberof ChatTeam
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatTeam.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            if (!$util.isInteger(message.senderId))
                return "senderId: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.teamId != null && message.hasOwnProperty("teamId"))
            if (!$util.isInteger(message.teamId))
                return "teamId: integer expected";
        return null;
    };

    /**
     * Creates a ChatTeam message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatTeam
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatTeam} ChatTeam
     */
    ChatTeam.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatTeam)
            return object;
        var message = new $root.ChatTeam();
        if (object.senderId != null)
            message.senderId = object.senderId >>> 0;
        if (object.message != null)
            message.message = String(object.message);
        if (object.teamId != null)
            message.teamId = object.teamId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ChatTeam message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatTeam
     * @static
     * @param {ChatTeam} message ChatTeam
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatTeam.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.senderId = 0;
            object.message = "";
            object.teamId = 0;
        }
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            object.senderId = message.senderId;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.teamId != null && message.hasOwnProperty("teamId"))
            object.teamId = message.teamId;
        return object;
    };

    /**
     * Converts this ChatTeam to JSON.
     * @function toJSON
     * @memberof ChatTeam
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatTeam.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatTeam;
})();

$root.ChatPrivate = (function() {

    /**
     * Properties of a ChatPrivate.
     * @exports IChatPrivate
     * @interface IChatPrivate
     * @property {number|null} [senderId] ChatPrivate senderId
     * @property {string|null} [message] ChatPrivate message
     * @property {number|null} [receiverId] ChatPrivate receiverId
     */

    /**
     * Constructs a new ChatPrivate.
     * @exports ChatPrivate
     * @classdesc Represents a ChatPrivate.
     * @implements IChatPrivate
     * @constructor
     * @param {IChatPrivate=} [properties] Properties to set
     */
    function ChatPrivate(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatPrivate senderId.
     * @member {number} senderId
     * @memberof ChatPrivate
     * @instance
     */
    ChatPrivate.prototype.senderId = 0;

    /**
     * ChatPrivate message.
     * @member {string} message
     * @memberof ChatPrivate
     * @instance
     */
    ChatPrivate.prototype.message = "";

    /**
     * ChatPrivate receiverId.
     * @member {number} receiverId
     * @memberof ChatPrivate
     * @instance
     */
    ChatPrivate.prototype.receiverId = 0;

    /**
     * Creates a new ChatPrivate instance using the specified properties.
     * @function create
     * @memberof ChatPrivate
     * @static
     * @param {IChatPrivate=} [properties] Properties to set
     * @returns {ChatPrivate} ChatPrivate instance
     */
    ChatPrivate.create = function create(properties) {
        return new ChatPrivate(properties);
    };

    /**
     * Encodes the specified ChatPrivate message. Does not implicitly {@link ChatPrivate.verify|verify} messages.
     * @function encode
     * @memberof ChatPrivate
     * @static
     * @param {IChatPrivate} message ChatPrivate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatPrivate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.senderId);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.receiverId != null && message.hasOwnProperty("receiverId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.receiverId);
        return writer;
    };

    /**
     * Encodes the specified ChatPrivate message, length delimited. Does not implicitly {@link ChatPrivate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatPrivate
     * @static
     * @param {IChatPrivate} message ChatPrivate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatPrivate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatPrivate message from the specified reader or buffer.
     * @function decode
     * @memberof ChatPrivate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatPrivate} ChatPrivate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatPrivate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatPrivate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.senderId = reader.uint32();
                break;
            case 2:
                message.message = reader.string();
                break;
            case 3:
                message.receiverId = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatPrivate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatPrivate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatPrivate} ChatPrivate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatPrivate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatPrivate message.
     * @function verify
     * @memberof ChatPrivate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatPrivate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            if (!$util.isInteger(message.senderId))
                return "senderId: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.receiverId != null && message.hasOwnProperty("receiverId"))
            if (!$util.isInteger(message.receiverId))
                return "receiverId: integer expected";
        return null;
    };

    /**
     * Creates a ChatPrivate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatPrivate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatPrivate} ChatPrivate
     */
    ChatPrivate.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatPrivate)
            return object;
        var message = new $root.ChatPrivate();
        if (object.senderId != null)
            message.senderId = object.senderId >>> 0;
        if (object.message != null)
            message.message = String(object.message);
        if (object.receiverId != null)
            message.receiverId = object.receiverId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ChatPrivate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatPrivate
     * @static
     * @param {ChatPrivate} message ChatPrivate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatPrivate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.senderId = 0;
            object.message = "";
            object.receiverId = 0;
        }
        if (message.senderId != null && message.hasOwnProperty("senderId"))
            object.senderId = message.senderId;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.receiverId != null && message.hasOwnProperty("receiverId"))
            object.receiverId = message.receiverId;
        return object;
    };

    /**
     * Converts this ChatPrivate to JSON.
     * @function toJSON
     * @memberof ChatPrivate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatPrivate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatPrivate;
})();

module.exports = $root;
