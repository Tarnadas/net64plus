/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.net64 = (function() {

    /**
     * Namespace net64.
     * @exports net64
     * @namespace
     */
    var net64 = {};

    net64.ClientServerMessage = (function() {

        /**
         * Properties of a ClientServerMessage.
         * @memberof net64
         * @interface IClientServerMessage
         * @property {net64.shared.Compression|null} [compression] ClientServerMessage compression
         * @property {number|null} [uncompressedSize] ClientServerMessage uncompressedSize
         * @property {Uint8Array|null} [compressedData] ClientServerMessage compressedData
         * @property {net64.client.IClientServer|null} [data] ClientServerMessage data
         */

        /**
         * Constructs a new ClientServerMessage.
         * @memberof net64
         * @classdesc Represents a ClientServerMessage.
         * @implements IClientServerMessage
         * @constructor
         * @param {net64.IClientServerMessage=} [properties] Properties to set
         */
        function ClientServerMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientServerMessage compression.
         * @member {net64.shared.Compression} compression
         * @memberof net64.ClientServerMessage
         * @instance
         */
        ClientServerMessage.prototype.compression = 0;

        /**
         * ClientServerMessage uncompressedSize.
         * @member {number} uncompressedSize
         * @memberof net64.ClientServerMessage
         * @instance
         */
        ClientServerMessage.prototype.uncompressedSize = 0;

        /**
         * ClientServerMessage compressedData.
         * @member {Uint8Array} compressedData
         * @memberof net64.ClientServerMessage
         * @instance
         */
        ClientServerMessage.prototype.compressedData = $util.newBuffer([]);

        /**
         * ClientServerMessage data.
         * @member {net64.client.IClientServer|null|undefined} data
         * @memberof net64.ClientServerMessage
         * @instance
         */
        ClientServerMessage.prototype.data = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * ClientServerMessage message.
         * @member {"compressedData"|"data"|undefined} message
         * @memberof net64.ClientServerMessage
         * @instance
         */
        Object.defineProperty(ClientServerMessage.prototype, "message", {
            get: $util.oneOfGetter($oneOfFields = ["compressedData", "data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ClientServerMessage instance using the specified properties.
         * @function create
         * @memberof net64.ClientServerMessage
         * @static
         * @param {net64.IClientServerMessage=} [properties] Properties to set
         * @returns {net64.ClientServerMessage} ClientServerMessage instance
         */
        ClientServerMessage.create = function create(properties) {
            return new ClientServerMessage(properties);
        };

        /**
         * Encodes the specified ClientServerMessage message. Does not implicitly {@link net64.ClientServerMessage.verify|verify} messages.
         * @function encode
         * @memberof net64.ClientServerMessage
         * @static
         * @param {net64.IClientServerMessage} message ClientServerMessage message or plain object to encode
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
                $root.net64.client.ClientServer.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientServerMessage message, length delimited. Does not implicitly {@link net64.ClientServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof net64.ClientServerMessage
         * @static
         * @param {net64.IClientServerMessage} message ClientServerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof net64.ClientServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {net64.ClientServerMessage} ClientServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientServerMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.ClientServerMessage();
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
                    message.data = $root.net64.client.ClientServer.decode(reader, reader.uint32());
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
         * @memberof net64.ClientServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {net64.ClientServerMessage} ClientServerMessage
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
         * @memberof net64.ClientServerMessage
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
                case 2:
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
                    var error = $root.net64.client.ClientServer.verify(message.data);
                    if (error)
                        return "data." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClientServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof net64.ClientServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {net64.ClientServerMessage} ClientServerMessage
         */
        ClientServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.net64.ClientServerMessage)
                return object;
            var message = new $root.net64.ClientServerMessage();
            switch (object.compression) {
            case "NONE":
            case 0:
                message.compression = 0;
                break;
            case "ZSTD":
            case 1:
                message.compression = 1;
                break;
            case "GZIP":
            case 2:
                message.compression = 2;
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
                    throw TypeError(".net64.ClientServerMessage.data: object expected");
                message.data = $root.net64.client.ClientServer.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof net64.ClientServerMessage
         * @static
         * @param {net64.ClientServerMessage} message ClientServerMessage
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
                object.compression = options.enums === String ? $root.net64.shared.Compression[message.compression] : message.compression;
            if (message.uncompressedSize != null && message.hasOwnProperty("uncompressedSize"))
                object.uncompressedSize = message.uncompressedSize;
            if (message.compressedData != null && message.hasOwnProperty("compressedData")) {
                object.compressedData = options.bytes === String ? $util.base64.encode(message.compressedData, 0, message.compressedData.length) : options.bytes === Array ? Array.prototype.slice.call(message.compressedData) : message.compressedData;
                if (options.oneofs)
                    object.message = "compressedData";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data = $root.net64.client.ClientServer.toObject(message.data, options);
                if (options.oneofs)
                    object.message = "data";
            }
            return object;
        };

        /**
         * Converts this ClientServerMessage to JSON.
         * @function toJSON
         * @memberof net64.ClientServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClientServerMessage;
    })();

    net64.client = (function() {

        /**
         * Namespace client.
         * @memberof net64
         * @namespace
         */
        var client = {};

        client.ClientServer = (function() {

            /**
             * Properties of a ClientServer.
             * @memberof net64.client
             * @interface IClientServer
             * @property {net64.client.ClientServer.MessageType|null} [messageType] ClientServer messageType
             * @property {net64.client.IHandshake|null} [handshake] ClientServer handshake
             * @property {net64.shared.IPing|null} [ping] ClientServer ping
             * @property {net64.shared.IPlayer|null} [player] ClientServer player
             * @property {net64.client.IPlayerData|null} [playerData] ClientServer playerData
             * @property {net64.shared.IMetaData|null} [metaData] ClientServer metaData
             * @property {net64.shared.IChat|null} [chat] ClientServer chat
             */

            /**
             * Constructs a new ClientServer.
             * @memberof net64.client
             * @classdesc Represents a ClientServer.
             * @implements IClientServer
             * @constructor
             * @param {net64.client.IClientServer=} [properties] Properties to set
             */
            function ClientServer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClientServer messageType.
             * @member {net64.client.ClientServer.MessageType} messageType
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.messageType = 0;

            /**
             * ClientServer handshake.
             * @member {net64.client.IHandshake|null|undefined} handshake
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.handshake = null;

            /**
             * ClientServer ping.
             * @member {net64.shared.IPing|null|undefined} ping
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.ping = null;

            /**
             * ClientServer player.
             * @member {net64.shared.IPlayer|null|undefined} player
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.player = null;

            /**
             * ClientServer playerData.
             * @member {net64.client.IPlayerData|null|undefined} playerData
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.playerData = null;

            /**
             * ClientServer metaData.
             * @member {net64.shared.IMetaData|null|undefined} metaData
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.metaData = null;

            /**
             * ClientServer chat.
             * @member {net64.shared.IChat|null|undefined} chat
             * @memberof net64.client.ClientServer
             * @instance
             */
            ClientServer.prototype.chat = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ClientServer message.
             * @member {"handshake"|"ping"|"player"|"playerData"|"metaData"|"chat"|undefined} message
             * @memberof net64.client.ClientServer
             * @instance
             */
            Object.defineProperty(ClientServer.prototype, "message", {
                get: $util.oneOfGetter($oneOfFields = ["handshake", "ping", "player", "playerData", "metaData", "chat"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ClientServer instance using the specified properties.
             * @function create
             * @memberof net64.client.ClientServer
             * @static
             * @param {net64.client.IClientServer=} [properties] Properties to set
             * @returns {net64.client.ClientServer} ClientServer instance
             */
            ClientServer.create = function create(properties) {
                return new ClientServer(properties);
            };

            /**
             * Encodes the specified ClientServer message. Does not implicitly {@link net64.client.ClientServer.verify|verify} messages.
             * @function encode
             * @memberof net64.client.ClientServer
             * @static
             * @param {net64.client.IClientServer} message ClientServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientServer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
                if (message.handshake != null && message.hasOwnProperty("handshake"))
                    $root.net64.client.Handshake.encode(message.handshake, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.ping != null && message.hasOwnProperty("ping"))
                    $root.net64.shared.Ping.encode(message.ping, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.player != null && message.hasOwnProperty("player"))
                    $root.net64.shared.Player.encode(message.player, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.playerData != null && message.hasOwnProperty("playerData"))
                    $root.net64.client.PlayerData.encode(message.playerData, writer.uint32(/* id 128, wireType 2 =*/1026).fork()).ldelim();
                if (message.metaData != null && message.hasOwnProperty("metaData"))
                    $root.net64.shared.MetaData.encode(message.metaData, writer.uint32(/* id 129, wireType 2 =*/1034).fork()).ldelim();
                if (message.chat != null && message.hasOwnProperty("chat"))
                    $root.net64.shared.Chat.encode(message.chat, writer.uint32(/* id 130, wireType 2 =*/1042).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ClientServer message, length delimited. Does not implicitly {@link net64.client.ClientServer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.client.ClientServer
             * @static
             * @param {net64.client.IClientServer} message ClientServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientServer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClientServer message from the specified reader or buffer.
             * @function decode
             * @memberof net64.client.ClientServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.client.ClientServer} ClientServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientServer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.client.ClientServer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.messageType = reader.int32();
                        break;
                    case 2:
                        message.handshake = $root.net64.client.Handshake.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.ping = $root.net64.shared.Ping.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.player = $root.net64.shared.Player.decode(reader, reader.uint32());
                        break;
                    case 128:
                        message.playerData = $root.net64.client.PlayerData.decode(reader, reader.uint32());
                        break;
                    case 129:
                        message.metaData = $root.net64.shared.MetaData.decode(reader, reader.uint32());
                        break;
                    case 130:
                        message.chat = $root.net64.shared.Chat.decode(reader, reader.uint32());
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
             * @memberof net64.client.ClientServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.client.ClientServer} ClientServer
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
             * @memberof net64.client.ClientServer
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
                    case 0:
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
                        var error = $root.net64.client.Handshake.verify(message.handshake);
                        if (error)
                            return "handshake." + error;
                    }
                }
                if (message.ping != null && message.hasOwnProperty("ping")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.shared.Ping.verify(message.ping);
                        if (error)
                            return "ping." + error;
                    }
                }
                if (message.player != null && message.hasOwnProperty("player")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.shared.Player.verify(message.player);
                        if (error)
                            return "player." + error;
                    }
                }
                if (message.playerData != null && message.hasOwnProperty("playerData")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.client.PlayerData.verify(message.playerData);
                        if (error)
                            return "playerData." + error;
                    }
                }
                if (message.metaData != null && message.hasOwnProperty("metaData")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.shared.MetaData.verify(message.metaData);
                        if (error)
                            return "metaData." + error;
                    }
                }
                if (message.chat != null && message.hasOwnProperty("chat")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.shared.Chat.verify(message.chat);
                        if (error)
                            return "chat." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ClientServer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.client.ClientServer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.client.ClientServer} ClientServer
             */
            ClientServer.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.client.ClientServer)
                    return object;
                var message = new $root.net64.client.ClientServer();
                switch (object.messageType) {
                case "UNKNOWN":
                case 0:
                    message.messageType = 0;
                    break;
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
                case "CHAT":
                case 130:
                    message.messageType = 130;
                    break;
                }
                if (object.handshake != null) {
                    if (typeof object.handshake !== "object")
                        throw TypeError(".net64.client.ClientServer.handshake: object expected");
                    message.handshake = $root.net64.client.Handshake.fromObject(object.handshake);
                }
                if (object.ping != null) {
                    if (typeof object.ping !== "object")
                        throw TypeError(".net64.client.ClientServer.ping: object expected");
                    message.ping = $root.net64.shared.Ping.fromObject(object.ping);
                }
                if (object.player != null) {
                    if (typeof object.player !== "object")
                        throw TypeError(".net64.client.ClientServer.player: object expected");
                    message.player = $root.net64.shared.Player.fromObject(object.player);
                }
                if (object.playerData != null) {
                    if (typeof object.playerData !== "object")
                        throw TypeError(".net64.client.ClientServer.playerData: object expected");
                    message.playerData = $root.net64.client.PlayerData.fromObject(object.playerData);
                }
                if (object.metaData != null) {
                    if (typeof object.metaData !== "object")
                        throw TypeError(".net64.client.ClientServer.metaData: object expected");
                    message.metaData = $root.net64.shared.MetaData.fromObject(object.metaData);
                }
                if (object.chat != null) {
                    if (typeof object.chat !== "object")
                        throw TypeError(".net64.client.ClientServer.chat: object expected");
                    message.chat = $root.net64.shared.Chat.fromObject(object.chat);
                }
                return message;
            };

            /**
             * Creates a plain object from a ClientServer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.client.ClientServer
             * @static
             * @param {net64.client.ClientServer} message ClientServer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientServer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.messageType = options.enums === String ? "UNKNOWN" : 0;
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    object.messageType = options.enums === String ? $root.net64.client.ClientServer.MessageType[message.messageType] : message.messageType;
                if (message.handshake != null && message.hasOwnProperty("handshake")) {
                    object.handshake = $root.net64.client.Handshake.toObject(message.handshake, options);
                    if (options.oneofs)
                        object.message = "handshake";
                }
                if (message.ping != null && message.hasOwnProperty("ping")) {
                    object.ping = $root.net64.shared.Ping.toObject(message.ping, options);
                    if (options.oneofs)
                        object.message = "ping";
                }
                if (message.player != null && message.hasOwnProperty("player")) {
                    object.player = $root.net64.shared.Player.toObject(message.player, options);
                    if (options.oneofs)
                        object.message = "player";
                }
                if (message.playerData != null && message.hasOwnProperty("playerData")) {
                    object.playerData = $root.net64.client.PlayerData.toObject(message.playerData, options);
                    if (options.oneofs)
                        object.message = "playerData";
                }
                if (message.metaData != null && message.hasOwnProperty("metaData")) {
                    object.metaData = $root.net64.shared.MetaData.toObject(message.metaData, options);
                    if (options.oneofs)
                        object.message = "metaData";
                }
                if (message.chat != null && message.hasOwnProperty("chat")) {
                    object.chat = $root.net64.shared.Chat.toObject(message.chat, options);
                    if (options.oneofs)
                        object.message = "chat";
                }
                return object;
            };

            /**
             * Converts this ClientServer to JSON.
             * @function toJSON
             * @memberof net64.client.ClientServer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientServer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * MessageType enum.
             * @name net64.client.ClientServer.MessageType
             * @enum {string}
             * @property {number} UNKNOWN=0 UNKNOWN value
             * @property {number} HANDSHAKE=2 HANDSHAKE value
             * @property {number} PING=3 PING value
             * @property {number} PLAYER_UPDATE=6 PLAYER_UPDATE value
             * @property {number} PLAYER_DATA=128 PLAYER_DATA value
             * @property {number} META_DATA=129 META_DATA value
             * @property {number} CHAT=130 CHAT value
             */
            ClientServer.MessageType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[2] = "HANDSHAKE"] = 2;
                values[valuesById[3] = "PING"] = 3;
                values[valuesById[6] = "PLAYER_UPDATE"] = 6;
                values[valuesById[128] = "PLAYER_DATA"] = 128;
                values[valuesById[129] = "META_DATA"] = 129;
                values[valuesById[130] = "CHAT"] = 130;
                return values;
            })();

            return ClientServer;
        })();

        client.Handshake = (function() {

            /**
             * Properties of a Handshake.
             * @memberof net64.client
             * @interface IHandshake
             * @property {number|null} [major] Handshake major
             * @property {number|null} [minor] Handshake minor
             * @property {number|null} [characterId] Handshake characterId
             * @property {string|null} [username] Handshake username
             */

            /**
             * Constructs a new Handshake.
             * @memberof net64.client
             * @classdesc Represents a Handshake.
             * @implements IHandshake
             * @constructor
             * @param {net64.client.IHandshake=} [properties] Properties to set
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
             * @memberof net64.client.Handshake
             * @instance
             */
            Handshake.prototype.major = 0;

            /**
             * Handshake minor.
             * @member {number} minor
             * @memberof net64.client.Handshake
             * @instance
             */
            Handshake.prototype.minor = 0;

            /**
             * Handshake characterId.
             * @member {number} characterId
             * @memberof net64.client.Handshake
             * @instance
             */
            Handshake.prototype.characterId = 0;

            /**
             * Handshake username.
             * @member {string} username
             * @memberof net64.client.Handshake
             * @instance
             */
            Handshake.prototype.username = "";

            /**
             * Creates a new Handshake instance using the specified properties.
             * @function create
             * @memberof net64.client.Handshake
             * @static
             * @param {net64.client.IHandshake=} [properties] Properties to set
             * @returns {net64.client.Handshake} Handshake instance
             */
            Handshake.create = function create(properties) {
                return new Handshake(properties);
            };

            /**
             * Encodes the specified Handshake message. Does not implicitly {@link net64.client.Handshake.verify|verify} messages.
             * @function encode
             * @memberof net64.client.Handshake
             * @static
             * @param {net64.client.IHandshake} message Handshake message or plain object to encode
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
             * Encodes the specified Handshake message, length delimited. Does not implicitly {@link net64.client.Handshake.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.client.Handshake
             * @static
             * @param {net64.client.IHandshake} message Handshake message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Handshake.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Handshake message from the specified reader or buffer.
             * @function decode
             * @memberof net64.client.Handshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.client.Handshake} Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Handshake.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.client.Handshake();
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
             * @memberof net64.client.Handshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.client.Handshake} Handshake
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
             * @memberof net64.client.Handshake
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
             * @memberof net64.client.Handshake
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.client.Handshake} Handshake
             */
            Handshake.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.client.Handshake)
                    return object;
                var message = new $root.net64.client.Handshake();
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
             * @memberof net64.client.Handshake
             * @static
             * @param {net64.client.Handshake} message Handshake
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
             * @memberof net64.client.Handshake
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Handshake.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Handshake;
        })();

        client.PlayerData = (function() {

            /**
             * Properties of a PlayerData.
             * @memberof net64.client
             * @interface IPlayerData
             * @property {number|null} [dataLength] PlayerData dataLength
             * @property {Uint8Array|null} [playerData] PlayerData playerData
             */

            /**
             * Constructs a new PlayerData.
             * @memberof net64.client
             * @classdesc Represents a PlayerData.
             * @implements IPlayerData
             * @constructor
             * @param {net64.client.IPlayerData=} [properties] Properties to set
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
             * @memberof net64.client.PlayerData
             * @instance
             */
            PlayerData.prototype.dataLength = 0;

            /**
             * PlayerData playerData.
             * @member {Uint8Array} playerData
             * @memberof net64.client.PlayerData
             * @instance
             */
            PlayerData.prototype.playerData = $util.newBuffer([]);

            /**
             * Creates a new PlayerData instance using the specified properties.
             * @function create
             * @memberof net64.client.PlayerData
             * @static
             * @param {net64.client.IPlayerData=} [properties] Properties to set
             * @returns {net64.client.PlayerData} PlayerData instance
             */
            PlayerData.create = function create(properties) {
                return new PlayerData(properties);
            };

            /**
             * Encodes the specified PlayerData message. Does not implicitly {@link net64.client.PlayerData.verify|verify} messages.
             * @function encode
             * @memberof net64.client.PlayerData
             * @static
             * @param {net64.client.IPlayerData} message PlayerData message or plain object to encode
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
             * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link net64.client.PlayerData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.client.PlayerData
             * @static
             * @param {net64.client.IPlayerData} message PlayerData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PlayerData message from the specified reader or buffer.
             * @function decode
             * @memberof net64.client.PlayerData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.client.PlayerData} PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.client.PlayerData();
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
             * @memberof net64.client.PlayerData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.client.PlayerData} PlayerData
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
             * @memberof net64.client.PlayerData
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
             * @memberof net64.client.PlayerData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.client.PlayerData} PlayerData
             */
            PlayerData.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.client.PlayerData)
                    return object;
                var message = new $root.net64.client.PlayerData();
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
             * @memberof net64.client.PlayerData
             * @static
             * @param {net64.client.PlayerData} message PlayerData
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
             * @memberof net64.client.PlayerData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PlayerData;
        })();

        return client;
    })();

    net64.shared = (function() {

        /**
         * Namespace shared.
         * @memberof net64
         * @namespace
         */
        var shared = {};

        shared.Ping = (function() {

            /**
             * Properties of a Ping.
             * @memberof net64.shared
             * @interface IPing
             */

            /**
             * Constructs a new Ping.
             * @memberof net64.shared
             * @classdesc Represents a Ping.
             * @implements IPing
             * @constructor
             * @param {net64.shared.IPing=} [properties] Properties to set
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
             * @memberof net64.shared.Ping
             * @static
             * @param {net64.shared.IPing=} [properties] Properties to set
             * @returns {net64.shared.Ping} Ping instance
             */
            Ping.create = function create(properties) {
                return new Ping(properties);
            };

            /**
             * Encodes the specified Ping message. Does not implicitly {@link net64.shared.Ping.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.Ping
             * @static
             * @param {net64.shared.IPing} message Ping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ping.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Ping message, length delimited. Does not implicitly {@link net64.shared.Ping.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.Ping
             * @static
             * @param {net64.shared.IPing} message Ping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ping.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Ping message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.Ping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.Ping} Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ping.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.Ping();
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
             * @memberof net64.shared.Ping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.Ping} Ping
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
             * @memberof net64.shared.Ping
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
             * @memberof net64.shared.Ping
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.Ping} Ping
             */
            Ping.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.Ping)
                    return object;
                return new $root.net64.shared.Ping();
            };

            /**
             * Creates a plain object from a Ping message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.Ping
             * @static
             * @param {net64.shared.Ping} message Ping
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Ping.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Ping to JSON.
             * @function toJSON
             * @memberof net64.shared.Ping
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Ping.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Ping;
        })();

        shared.Player = (function() {

            /**
             * Properties of a Player.
             * @memberof net64.shared
             * @interface IPlayer
             * @property {string|null} [username] Player username
             * @property {number|null} [characterId] Player characterId
             */

            /**
             * Constructs a new Player.
             * @memberof net64.shared
             * @classdesc Represents a Player.
             * @implements IPlayer
             * @constructor
             * @param {net64.shared.IPlayer=} [properties] Properties to set
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
             * @memberof net64.shared.Player
             * @instance
             */
            Player.prototype.username = "";

            /**
             * Player characterId.
             * @member {number} characterId
             * @memberof net64.shared.Player
             * @instance
             */
            Player.prototype.characterId = 0;

            /**
             * Creates a new Player instance using the specified properties.
             * @function create
             * @memberof net64.shared.Player
             * @static
             * @param {net64.shared.IPlayer=} [properties] Properties to set
             * @returns {net64.shared.Player} Player instance
             */
            Player.create = function create(properties) {
                return new Player(properties);
            };

            /**
             * Encodes the specified Player message. Does not implicitly {@link net64.shared.Player.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.Player
             * @static
             * @param {net64.shared.IPlayer} message Player message or plain object to encode
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
             * Encodes the specified Player message, length delimited. Does not implicitly {@link net64.shared.Player.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.Player
             * @static
             * @param {net64.shared.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.Player();
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
             * @memberof net64.shared.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.Player} Player
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
             * @memberof net64.shared.Player
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
             * @memberof net64.shared.Player
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.Player} Player
             */
            Player.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.Player)
                    return object;
                var message = new $root.net64.shared.Player();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.characterId != null)
                    message.characterId = object.characterId >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Player message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.Player
             * @static
             * @param {net64.shared.Player} message Player
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
             * @memberof net64.shared.Player
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Player.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Player;
        })();

        shared.Meta = (function() {

            /**
             * Properties of a Meta.
             * @memberof net64.shared
             * @interface IMeta
             * @property {number|null} [length] Meta length
             * @property {number|null} [address] Meta address
             * @property {Uint8Array|null} [data] Meta data
             */

            /**
             * Constructs a new Meta.
             * @memberof net64.shared
             * @classdesc Represents a Meta.
             * @implements IMeta
             * @constructor
             * @param {net64.shared.IMeta=} [properties] Properties to set
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
             * @memberof net64.shared.Meta
             * @instance
             */
            Meta.prototype.length = 0;

            /**
             * Meta address.
             * @member {number} address
             * @memberof net64.shared.Meta
             * @instance
             */
            Meta.prototype.address = 0;

            /**
             * Meta data.
             * @member {Uint8Array} data
             * @memberof net64.shared.Meta
             * @instance
             */
            Meta.prototype.data = $util.newBuffer([]);

            /**
             * Creates a new Meta instance using the specified properties.
             * @function create
             * @memberof net64.shared.Meta
             * @static
             * @param {net64.shared.IMeta=} [properties] Properties to set
             * @returns {net64.shared.Meta} Meta instance
             */
            Meta.create = function create(properties) {
                return new Meta(properties);
            };

            /**
             * Encodes the specified Meta message. Does not implicitly {@link net64.shared.Meta.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.Meta
             * @static
             * @param {net64.shared.IMeta} message Meta message or plain object to encode
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
             * Encodes the specified Meta message, length delimited. Does not implicitly {@link net64.shared.Meta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.Meta
             * @static
             * @param {net64.shared.IMeta} message Meta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Meta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Meta message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.Meta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.Meta} Meta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Meta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.Meta();
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
             * @memberof net64.shared.Meta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.Meta} Meta
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
             * @memberof net64.shared.Meta
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
             * @memberof net64.shared.Meta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.Meta} Meta
             */
            Meta.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.Meta)
                    return object;
                var message = new $root.net64.shared.Meta();
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
             * @memberof net64.shared.Meta
             * @static
             * @param {net64.shared.Meta} message Meta
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
             * @memberof net64.shared.Meta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Meta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Meta;
        })();

        shared.MetaData = (function() {

            /**
             * Properties of a MetaData.
             * @memberof net64.shared
             * @interface IMetaData
             * @property {Array.<net64.shared.IMeta>|null} [metaData] MetaData metaData
             */

            /**
             * Constructs a new MetaData.
             * @memberof net64.shared
             * @classdesc Represents a MetaData.
             * @implements IMetaData
             * @constructor
             * @param {net64.shared.IMetaData=} [properties] Properties to set
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
             * @member {Array.<net64.shared.IMeta>} metaData
             * @memberof net64.shared.MetaData
             * @instance
             */
            MetaData.prototype.metaData = $util.emptyArray;

            /**
             * Creates a new MetaData instance using the specified properties.
             * @function create
             * @memberof net64.shared.MetaData
             * @static
             * @param {net64.shared.IMetaData=} [properties] Properties to set
             * @returns {net64.shared.MetaData} MetaData instance
             */
            MetaData.create = function create(properties) {
                return new MetaData(properties);
            };

            /**
             * Encodes the specified MetaData message. Does not implicitly {@link net64.shared.MetaData.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.MetaData
             * @static
             * @param {net64.shared.IMetaData} message MetaData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetaData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.metaData != null && message.metaData.length)
                    for (var i = 0; i < message.metaData.length; ++i)
                        $root.net64.shared.Meta.encode(message.metaData[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MetaData message, length delimited. Does not implicitly {@link net64.shared.MetaData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.MetaData
             * @static
             * @param {net64.shared.IMetaData} message MetaData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetaData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MetaData message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.MetaData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.MetaData} MetaData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetaData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.MetaData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.metaData && message.metaData.length))
                            message.metaData = [];
                        message.metaData.push($root.net64.shared.Meta.decode(reader, reader.uint32()));
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
             * @memberof net64.shared.MetaData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.MetaData} MetaData
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
             * @memberof net64.shared.MetaData
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
                        var error = $root.net64.shared.Meta.verify(message.metaData[i]);
                        if (error)
                            return "metaData." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MetaData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.shared.MetaData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.MetaData} MetaData
             */
            MetaData.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.MetaData)
                    return object;
                var message = new $root.net64.shared.MetaData();
                if (object.metaData) {
                    if (!Array.isArray(object.metaData))
                        throw TypeError(".net64.shared.MetaData.metaData: array expected");
                    message.metaData = [];
                    for (var i = 0; i < object.metaData.length; ++i) {
                        if (typeof object.metaData[i] !== "object")
                            throw TypeError(".net64.shared.MetaData.metaData: object expected");
                        message.metaData[i] = $root.net64.shared.Meta.fromObject(object.metaData[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a MetaData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.MetaData
             * @static
             * @param {net64.shared.MetaData} message MetaData
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
                        object.metaData[j] = $root.net64.shared.Meta.toObject(message.metaData[j], options);
                }
                return object;
            };

            /**
             * Converts this MetaData to JSON.
             * @function toJSON
             * @memberof net64.shared.MetaData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MetaData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MetaData;
        })();

        shared.Chat = (function() {

            /**
             * Properties of a Chat.
             * @memberof net64.shared
             * @interface IChat
             * @property {net64.shared.Chat.ChatType|null} [chatType] Chat chatType
             * @property {number|null} [senderId] Chat senderId
             * @property {string|null} [message] Chat message
             * @property {net64.shared.IChatGlobal|null} [global] Chat global
             * @property {net64.shared.IChatPrivate|null} ["private"] Chat private
             */

            /**
             * Constructs a new Chat.
             * @memberof net64.shared
             * @classdesc Represents a Chat.
             * @implements IChat
             * @constructor
             * @param {net64.shared.IChat=} [properties] Properties to set
             */
            function Chat(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Chat chatType.
             * @member {net64.shared.Chat.ChatType} chatType
             * @memberof net64.shared.Chat
             * @instance
             */
            Chat.prototype.chatType = 0;

            /**
             * Chat senderId.
             * @member {number} senderId
             * @memberof net64.shared.Chat
             * @instance
             */
            Chat.prototype.senderId = 0;

            /**
             * Chat message.
             * @member {string} message
             * @memberof net64.shared.Chat
             * @instance
             */
            Chat.prototype.message = "";

            /**
             * Chat global.
             * @member {net64.shared.IChatGlobal|null|undefined} global
             * @memberof net64.shared.Chat
             * @instance
             */
            Chat.prototype.global = null;

            /**
             * Chat private.
             * @member {net64.shared.IChatPrivate|null|undefined} private
             * @memberof net64.shared.Chat
             * @instance
             */
            Chat.prototype["private"] = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Chat messageType.
             * @member {"global"|"private"|undefined} messageType
             * @memberof net64.shared.Chat
             * @instance
             */
            Object.defineProperty(Chat.prototype, "messageType", {
                get: $util.oneOfGetter($oneOfFields = ["global", "private"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Chat instance using the specified properties.
             * @function create
             * @memberof net64.shared.Chat
             * @static
             * @param {net64.shared.IChat=} [properties] Properties to set
             * @returns {net64.shared.Chat} Chat instance
             */
            Chat.create = function create(properties) {
                return new Chat(properties);
            };

            /**
             * Encodes the specified Chat message. Does not implicitly {@link net64.shared.Chat.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.Chat
             * @static
             * @param {net64.shared.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chatType != null && message.hasOwnProperty("chatType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chatType);
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.senderId);
                if (message.message != null && message.hasOwnProperty("message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.global != null && message.hasOwnProperty("global"))
                    $root.net64.shared.ChatGlobal.encode(message.global, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message["private"] != null && message.hasOwnProperty("private"))
                    $root.net64.shared.ChatPrivate.encode(message["private"], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Chat message, length delimited. Does not implicitly {@link net64.shared.Chat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.Chat
             * @static
             * @param {net64.shared.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Chat message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.Chat} Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.Chat();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.chatType = reader.int32();
                        break;
                    case 2:
                        message.senderId = reader.uint32();
                        break;
                    case 3:
                        message.message = reader.string();
                        break;
                    case 4:
                        message.global = $root.net64.shared.ChatGlobal.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message["private"] = $root.net64.shared.ChatPrivate.decode(reader, reader.uint32());
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
             * @memberof net64.shared.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.Chat} Chat
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
             * @memberof net64.shared.Chat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Chat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.chatType != null && message.hasOwnProperty("chatType"))
                    switch (message.chatType) {
                    default:
                        return "chatType: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    if (!$util.isInteger(message.senderId))
                        return "senderId: integer expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.global != null && message.hasOwnProperty("global")) {
                    properties.messageType = 1;
                    {
                        var error = $root.net64.shared.ChatGlobal.verify(message.global);
                        if (error)
                            return "global." + error;
                    }
                }
                if (message["private"] != null && message.hasOwnProperty("private")) {
                    if (properties.messageType === 1)
                        return "messageType: multiple values";
                    properties.messageType = 1;
                    {
                        var error = $root.net64.shared.ChatPrivate.verify(message["private"]);
                        if (error)
                            return "private." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Chat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.shared.Chat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.Chat} Chat
             */
            Chat.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.Chat)
                    return object;
                var message = new $root.net64.shared.Chat();
                switch (object.chatType) {
                case "CHAT_GLOBAL":
                case 0:
                    message.chatType = 0;
                    break;
                case "CHAT_PRIVATE":
                case 1:
                    message.chatType = 1;
                    break;
                }
                if (object.senderId != null)
                    message.senderId = object.senderId >>> 0;
                if (object.message != null)
                    message.message = String(object.message);
                if (object.global != null) {
                    if (typeof object.global !== "object")
                        throw TypeError(".net64.shared.Chat.global: object expected");
                    message.global = $root.net64.shared.ChatGlobal.fromObject(object.global);
                }
                if (object["private"] != null) {
                    if (typeof object["private"] !== "object")
                        throw TypeError(".net64.shared.Chat.private: object expected");
                    message["private"] = $root.net64.shared.ChatPrivate.fromObject(object["private"]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Chat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.Chat
             * @static
             * @param {net64.shared.Chat} message Chat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Chat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.chatType = options.enums === String ? "CHAT_GLOBAL" : 0;
                    object.senderId = 0;
                    object.message = "";
                }
                if (message.chatType != null && message.hasOwnProperty("chatType"))
                    object.chatType = options.enums === String ? $root.net64.shared.Chat.ChatType[message.chatType] : message.chatType;
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    object.senderId = message.senderId;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.global != null && message.hasOwnProperty("global")) {
                    object.global = $root.net64.shared.ChatGlobal.toObject(message.global, options);
                    if (options.oneofs)
                        object.messageType = "global";
                }
                if (message["private"] != null && message.hasOwnProperty("private")) {
                    object["private"] = $root.net64.shared.ChatPrivate.toObject(message["private"], options);
                    if (options.oneofs)
                        object.messageType = "private";
                }
                return object;
            };

            /**
             * Converts this Chat to JSON.
             * @function toJSON
             * @memberof net64.shared.Chat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Chat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * ChatType enum.
             * @name net64.shared.Chat.ChatType
             * @enum {string}
             * @property {number} CHAT_GLOBAL=0 CHAT_GLOBAL value
             * @property {number} CHAT_PRIVATE=1 CHAT_PRIVATE value
             */
            Chat.ChatType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CHAT_GLOBAL"] = 0;
                values[valuesById[1] = "CHAT_PRIVATE"] = 1;
                return values;
            })();

            return Chat;
        })();

        shared.ChatGlobal = (function() {

            /**
             * Properties of a ChatGlobal.
             * @memberof net64.shared
             * @interface IChatGlobal
             */

            /**
             * Constructs a new ChatGlobal.
             * @memberof net64.shared
             * @classdesc Represents a ChatGlobal.
             * @implements IChatGlobal
             * @constructor
             * @param {net64.shared.IChatGlobal=} [properties] Properties to set
             */
            function ChatGlobal(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new ChatGlobal instance using the specified properties.
             * @function create
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {net64.shared.IChatGlobal=} [properties] Properties to set
             * @returns {net64.shared.ChatGlobal} ChatGlobal instance
             */
            ChatGlobal.create = function create(properties) {
                return new ChatGlobal(properties);
            };

            /**
             * Encodes the specified ChatGlobal message. Does not implicitly {@link net64.shared.ChatGlobal.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {net64.shared.IChatGlobal} message ChatGlobal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGlobal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified ChatGlobal message, length delimited. Does not implicitly {@link net64.shared.ChatGlobal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {net64.shared.IChatGlobal} message ChatGlobal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGlobal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChatGlobal message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.ChatGlobal} ChatGlobal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatGlobal.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.ChatGlobal();
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
             * Decodes a ChatGlobal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.ChatGlobal} ChatGlobal
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
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatGlobal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a ChatGlobal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.ChatGlobal} ChatGlobal
             */
            ChatGlobal.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.ChatGlobal)
                    return object;
                return new $root.net64.shared.ChatGlobal();
            };

            /**
             * Creates a plain object from a ChatGlobal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.ChatGlobal
             * @static
             * @param {net64.shared.ChatGlobal} message ChatGlobal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatGlobal.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ChatGlobal to JSON.
             * @function toJSON
             * @memberof net64.shared.ChatGlobal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatGlobal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChatGlobal;
        })();

        shared.ChatPrivate = (function() {

            /**
             * Properties of a ChatPrivate.
             * @memberof net64.shared
             * @interface IChatPrivate
             * @property {number|null} [receiverId] ChatPrivate receiverId
             */

            /**
             * Constructs a new ChatPrivate.
             * @memberof net64.shared
             * @classdesc Represents a ChatPrivate.
             * @implements IChatPrivate
             * @constructor
             * @param {net64.shared.IChatPrivate=} [properties] Properties to set
             */
            function ChatPrivate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChatPrivate receiverId.
             * @member {number} receiverId
             * @memberof net64.shared.ChatPrivate
             * @instance
             */
            ChatPrivate.prototype.receiverId = 0;

            /**
             * Creates a new ChatPrivate instance using the specified properties.
             * @function create
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {net64.shared.IChatPrivate=} [properties] Properties to set
             * @returns {net64.shared.ChatPrivate} ChatPrivate instance
             */
            ChatPrivate.create = function create(properties) {
                return new ChatPrivate(properties);
            };

            /**
             * Encodes the specified ChatPrivate message. Does not implicitly {@link net64.shared.ChatPrivate.verify|verify} messages.
             * @function encode
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {net64.shared.IChatPrivate} message ChatPrivate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatPrivate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.receiverId);
                return writer;
            };

            /**
             * Encodes the specified ChatPrivate message, length delimited. Does not implicitly {@link net64.shared.ChatPrivate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {net64.shared.IChatPrivate} message ChatPrivate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatPrivate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChatPrivate message from the specified reader or buffer.
             * @function decode
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.shared.ChatPrivate} ChatPrivate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatPrivate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.shared.ChatPrivate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
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
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.shared.ChatPrivate} ChatPrivate
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
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatPrivate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    if (!$util.isInteger(message.receiverId))
                        return "receiverId: integer expected";
                return null;
            };

            /**
             * Creates a ChatPrivate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.shared.ChatPrivate} ChatPrivate
             */
            ChatPrivate.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.shared.ChatPrivate)
                    return object;
                var message = new $root.net64.shared.ChatPrivate();
                if (object.receiverId != null)
                    message.receiverId = object.receiverId >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a ChatPrivate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.shared.ChatPrivate
             * @static
             * @param {net64.shared.ChatPrivate} message ChatPrivate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatPrivate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.receiverId = 0;
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    object.receiverId = message.receiverId;
                return object;
            };

            /**
             * Converts this ChatPrivate to JSON.
             * @function toJSON
             * @memberof net64.shared.ChatPrivate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatPrivate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChatPrivate;
        })();

        /**
         * Compression enum.
         * @name net64.shared.Compression
         * @enum {string}
         * @property {number} NONE=0 NONE value
         * @property {number} ZSTD=1 ZSTD value
         * @property {number} GZIP=2 GZIP value
         */
        shared.Compression = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "ZSTD"] = 1;
            values[valuesById[2] = "GZIP"] = 2;
            return values;
        })();

        return shared;
    })();

    return net64;
})();

module.exports = $root;
