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

    net64.ServerClientMessage = (function() {

        /**
         * Properties of a ServerClientMessage.
         * @memberof net64
         * @interface IServerClientMessage
         * @property {net64.shared.Compression|null} [compression] ServerClientMessage compression
         * @property {number|null} [uncompressedSize] ServerClientMessage uncompressedSize
         * @property {Uint8Array|null} [compressedData] ServerClientMessage compressedData
         * @property {net64.server.IServerClient|null} [data] ServerClientMessage data
         */

        /**
         * Constructs a new ServerClientMessage.
         * @memberof net64
         * @classdesc Represents a ServerClientMessage.
         * @implements IServerClientMessage
         * @constructor
         * @param {net64.IServerClientMessage=} [properties] Properties to set
         */
        function ServerClientMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerClientMessage compression.
         * @member {net64.shared.Compression} compression
         * @memberof net64.ServerClientMessage
         * @instance
         */
        ServerClientMessage.prototype.compression = 0;

        /**
         * ServerClientMessage uncompressedSize.
         * @member {number} uncompressedSize
         * @memberof net64.ServerClientMessage
         * @instance
         */
        ServerClientMessage.prototype.uncompressedSize = 0;

        /**
         * ServerClientMessage compressedData.
         * @member {Uint8Array} compressedData
         * @memberof net64.ServerClientMessage
         * @instance
         */
        ServerClientMessage.prototype.compressedData = $util.newBuffer([]);

        /**
         * ServerClientMessage data.
         * @member {net64.server.IServerClient|null|undefined} data
         * @memberof net64.ServerClientMessage
         * @instance
         */
        ServerClientMessage.prototype.data = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * ServerClientMessage message.
         * @member {"compressedData"|"data"|undefined} message
         * @memberof net64.ServerClientMessage
         * @instance
         */
        Object.defineProperty(ServerClientMessage.prototype, "message", {
            get: $util.oneOfGetter($oneOfFields = ["compressedData", "data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ServerClientMessage instance using the specified properties.
         * @function create
         * @memberof net64.ServerClientMessage
         * @static
         * @param {net64.IServerClientMessage=} [properties] Properties to set
         * @returns {net64.ServerClientMessage} ServerClientMessage instance
         */
        ServerClientMessage.create = function create(properties) {
            return new ServerClientMessage(properties);
        };

        /**
         * Encodes the specified ServerClientMessage message. Does not implicitly {@link net64.ServerClientMessage.verify|verify} messages.
         * @function encode
         * @memberof net64.ServerClientMessage
         * @static
         * @param {net64.IServerClientMessage} message ServerClientMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerClientMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.compression != null && message.hasOwnProperty("compression"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.compression);
            if (message.uncompressedSize != null && message.hasOwnProperty("uncompressedSize"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.uncompressedSize);
            if (message.compressedData != null && message.hasOwnProperty("compressedData"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.compressedData);
            if (message.data != null && message.hasOwnProperty("data"))
                $root.net64.server.ServerClient.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServerClientMessage message, length delimited. Does not implicitly {@link net64.ServerClientMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof net64.ServerClientMessage
         * @static
         * @param {net64.IServerClientMessage} message ServerClientMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerClientMessage message from the specified reader or buffer.
         * @function decode
         * @memberof net64.ServerClientMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {net64.ServerClientMessage} ServerClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerClientMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.ServerClientMessage();
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
                    message.data = $root.net64.server.ServerClient.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerClientMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof net64.ServerClientMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {net64.ServerClientMessage} ServerClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerClientMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerClientMessage message.
         * @function verify
         * @memberof net64.ServerClientMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerClientMessage.verify = function verify(message) {
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
                    var error = $root.net64.server.ServerClient.verify(message.data);
                    if (error)
                        return "data." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServerClientMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof net64.ServerClientMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {net64.ServerClientMessage} ServerClientMessage
         */
        ServerClientMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.net64.ServerClientMessage)
                return object;
            var message = new $root.net64.ServerClientMessage();
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
                    throw TypeError(".net64.ServerClientMessage.data: object expected");
                message.data = $root.net64.server.ServerClient.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerClientMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof net64.ServerClientMessage
         * @static
         * @param {net64.ServerClientMessage} message ServerClientMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerClientMessage.toObject = function toObject(message, options) {
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
                object.data = $root.net64.server.ServerClient.toObject(message.data, options);
                if (options.oneofs)
                    object.message = "data";
            }
            return object;
        };

        /**
         * Converts this ServerClientMessage to JSON.
         * @function toJSON
         * @memberof net64.ServerClientMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerClientMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerClientMessage;
    })();

    net64.server = (function() {

        /**
         * Namespace server.
         * @memberof net64
         * @namespace
         */
        var server = {};

        server.ServerClient = (function() {

            /**
             * Properties of a ServerClient.
             * @memberof net64.server
             * @interface IServerClient
             * @property {net64.server.ServerClient.MessageType|null} [messageType] ServerClient messageType
             * @property {net64.server.IHandshake|null} [handshake] ServerClient handshake
             * @property {net64.shared.IPing|null} [ping] ServerClient ping
             * @property {net64.server.IServerMessage|null} [serverMessage] ServerClient serverMessage
             * @property {net64.server.IPlayerListUpdate|null} [playerListUpdate] ServerClient playerListUpdate
             * @property {net64.server.IPlayerUpdate|null} [playerUpdate] ServerClient playerUpdate
             * @property {net64.server.IPlayerData|null} [playerData] ServerClient playerData
             * @property {net64.shared.IMetaData|null} [metaData] ServerClient metaData
             * @property {net64.shared.IChat|null} [chat] ServerClient chat
             */

            /**
             * Constructs a new ServerClient.
             * @memberof net64.server
             * @classdesc Represents a ServerClient.
             * @implements IServerClient
             * @constructor
             * @param {net64.server.IServerClient=} [properties] Properties to set
             */
            function ServerClient(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerClient messageType.
             * @member {net64.server.ServerClient.MessageType} messageType
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.messageType = 0;

            /**
             * ServerClient handshake.
             * @member {net64.server.IHandshake|null|undefined} handshake
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.handshake = null;

            /**
             * ServerClient ping.
             * @member {net64.shared.IPing|null|undefined} ping
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.ping = null;

            /**
             * ServerClient serverMessage.
             * @member {net64.server.IServerMessage|null|undefined} serverMessage
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.serverMessage = null;

            /**
             * ServerClient playerListUpdate.
             * @member {net64.server.IPlayerListUpdate|null|undefined} playerListUpdate
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.playerListUpdate = null;

            /**
             * ServerClient playerUpdate.
             * @member {net64.server.IPlayerUpdate|null|undefined} playerUpdate
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.playerUpdate = null;

            /**
             * ServerClient playerData.
             * @member {net64.server.IPlayerData|null|undefined} playerData
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.playerData = null;

            /**
             * ServerClient metaData.
             * @member {net64.shared.IMetaData|null|undefined} metaData
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.metaData = null;

            /**
             * ServerClient chat.
             * @member {net64.shared.IChat|null|undefined} chat
             * @memberof net64.server.ServerClient
             * @instance
             */
            ServerClient.prototype.chat = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ServerClient message.
             * @member {"handshake"|"ping"|"serverMessage"|"playerListUpdate"|"playerUpdate"|"playerData"|"metaData"|"chat"|undefined} message
             * @memberof net64.server.ServerClient
             * @instance
             */
            Object.defineProperty(ServerClient.prototype, "message", {
                get: $util.oneOfGetter($oneOfFields = ["handshake", "ping", "serverMessage", "playerListUpdate", "playerUpdate", "playerData", "metaData", "chat"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ServerClient instance using the specified properties.
             * @function create
             * @memberof net64.server.ServerClient
             * @static
             * @param {net64.server.IServerClient=} [properties] Properties to set
             * @returns {net64.server.ServerClient} ServerClient instance
             */
            ServerClient.create = function create(properties) {
                return new ServerClient(properties);
            };

            /**
             * Encodes the specified ServerClient message. Does not implicitly {@link net64.server.ServerClient.verify|verify} messages.
             * @function encode
             * @memberof net64.server.ServerClient
             * @static
             * @param {net64.server.IServerClient} message ServerClient message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerClient.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
                if (message.handshake != null && message.hasOwnProperty("handshake"))
                    $root.net64.server.Handshake.encode(message.handshake, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.ping != null && message.hasOwnProperty("ping"))
                    $root.net64.shared.Ping.encode(message.ping, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.serverMessage != null && message.hasOwnProperty("serverMessage"))
                    $root.net64.server.ServerMessage.encode(message.serverMessage, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.playerListUpdate != null && message.hasOwnProperty("playerListUpdate"))
                    $root.net64.server.PlayerListUpdate.encode(message.playerListUpdate, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate"))
                    $root.net64.server.PlayerUpdate.encode(message.playerUpdate, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.playerData != null && message.hasOwnProperty("playerData"))
                    $root.net64.server.PlayerData.encode(message.playerData, writer.uint32(/* id 128, wireType 2 =*/1026).fork()).ldelim();
                if (message.metaData != null && message.hasOwnProperty("metaData"))
                    $root.net64.shared.MetaData.encode(message.metaData, writer.uint32(/* id 129, wireType 2 =*/1034).fork()).ldelim();
                if (message.chat != null && message.hasOwnProperty("chat"))
                    $root.net64.shared.Chat.encode(message.chat, writer.uint32(/* id 130, wireType 2 =*/1042).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServerClient message, length delimited. Does not implicitly {@link net64.server.ServerClient.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.ServerClient
             * @static
             * @param {net64.server.IServerClient} message ServerClient message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerClient.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerClient message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.ServerClient
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.ServerClient} ServerClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerClient.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.ServerClient();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.messageType = reader.int32();
                        break;
                    case 2:
                        message.handshake = $root.net64.server.Handshake.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.ping = $root.net64.shared.Ping.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.serverMessage = $root.net64.server.ServerMessage.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.playerListUpdate = $root.net64.server.PlayerListUpdate.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.playerUpdate = $root.net64.server.PlayerUpdate.decode(reader, reader.uint32());
                        break;
                    case 128:
                        message.playerData = $root.net64.server.PlayerData.decode(reader, reader.uint32());
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
             * Decodes a ServerClient message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.ServerClient
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.ServerClient} ServerClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerClient.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerClient message.
             * @function verify
             * @memberof net64.server.ServerClient
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerClient.verify = function verify(message) {
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
                    case 4:
                    case 5:
                    case 6:
                    case 128:
                    case 129:
                    case 130:
                        break;
                    }
                if (message.handshake != null && message.hasOwnProperty("handshake")) {
                    properties.message = 1;
                    {
                        var error = $root.net64.server.Handshake.verify(message.handshake);
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
                if (message.serverMessage != null && message.hasOwnProperty("serverMessage")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.ServerMessage.verify(message.serverMessage);
                        if (error)
                            return "serverMessage." + error;
                    }
                }
                if (message.playerListUpdate != null && message.hasOwnProperty("playerListUpdate")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.PlayerListUpdate.verify(message.playerListUpdate);
                        if (error)
                            return "playerListUpdate." + error;
                    }
                }
                if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.PlayerUpdate.verify(message.playerUpdate);
                        if (error)
                            return "playerUpdate." + error;
                    }
                }
                if (message.playerData != null && message.hasOwnProperty("playerData")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.PlayerData.verify(message.playerData);
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
             * Creates a ServerClient message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.ServerClient
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.ServerClient} ServerClient
             */
            ServerClient.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.ServerClient)
                    return object;
                var message = new $root.net64.server.ServerClient();
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
                case "SERVER_MESSAGE":
                case 4:
                    message.messageType = 4;
                    break;
                case "PLAYER_LIST_UPDATE":
                case 5:
                    message.messageType = 5;
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
                        throw TypeError(".net64.server.ServerClient.handshake: object expected");
                    message.handshake = $root.net64.server.Handshake.fromObject(object.handshake);
                }
                if (object.ping != null) {
                    if (typeof object.ping !== "object")
                        throw TypeError(".net64.server.ServerClient.ping: object expected");
                    message.ping = $root.net64.shared.Ping.fromObject(object.ping);
                }
                if (object.serverMessage != null) {
                    if (typeof object.serverMessage !== "object")
                        throw TypeError(".net64.server.ServerClient.serverMessage: object expected");
                    message.serverMessage = $root.net64.server.ServerMessage.fromObject(object.serverMessage);
                }
                if (object.playerListUpdate != null) {
                    if (typeof object.playerListUpdate !== "object")
                        throw TypeError(".net64.server.ServerClient.playerListUpdate: object expected");
                    message.playerListUpdate = $root.net64.server.PlayerListUpdate.fromObject(object.playerListUpdate);
                }
                if (object.playerUpdate != null) {
                    if (typeof object.playerUpdate !== "object")
                        throw TypeError(".net64.server.ServerClient.playerUpdate: object expected");
                    message.playerUpdate = $root.net64.server.PlayerUpdate.fromObject(object.playerUpdate);
                }
                if (object.playerData != null) {
                    if (typeof object.playerData !== "object")
                        throw TypeError(".net64.server.ServerClient.playerData: object expected");
                    message.playerData = $root.net64.server.PlayerData.fromObject(object.playerData);
                }
                if (object.metaData != null) {
                    if (typeof object.metaData !== "object")
                        throw TypeError(".net64.server.ServerClient.metaData: object expected");
                    message.metaData = $root.net64.shared.MetaData.fromObject(object.metaData);
                }
                if (object.chat != null) {
                    if (typeof object.chat !== "object")
                        throw TypeError(".net64.server.ServerClient.chat: object expected");
                    message.chat = $root.net64.shared.Chat.fromObject(object.chat);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServerClient message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.ServerClient
             * @static
             * @param {net64.server.ServerClient} message ServerClient
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerClient.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.messageType = options.enums === String ? "UNKNOWN" : 0;
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    object.messageType = options.enums === String ? $root.net64.server.ServerClient.MessageType[message.messageType] : message.messageType;
                if (message.handshake != null && message.hasOwnProperty("handshake")) {
                    object.handshake = $root.net64.server.Handshake.toObject(message.handshake, options);
                    if (options.oneofs)
                        object.message = "handshake";
                }
                if (message.ping != null && message.hasOwnProperty("ping")) {
                    object.ping = $root.net64.shared.Ping.toObject(message.ping, options);
                    if (options.oneofs)
                        object.message = "ping";
                }
                if (message.serverMessage != null && message.hasOwnProperty("serverMessage")) {
                    object.serverMessage = $root.net64.server.ServerMessage.toObject(message.serverMessage, options);
                    if (options.oneofs)
                        object.message = "serverMessage";
                }
                if (message.playerListUpdate != null && message.hasOwnProperty("playerListUpdate")) {
                    object.playerListUpdate = $root.net64.server.PlayerListUpdate.toObject(message.playerListUpdate, options);
                    if (options.oneofs)
                        object.message = "playerListUpdate";
                }
                if (message.playerUpdate != null && message.hasOwnProperty("playerUpdate")) {
                    object.playerUpdate = $root.net64.server.PlayerUpdate.toObject(message.playerUpdate, options);
                    if (options.oneofs)
                        object.message = "playerUpdate";
                }
                if (message.playerData != null && message.hasOwnProperty("playerData")) {
                    object.playerData = $root.net64.server.PlayerData.toObject(message.playerData, options);
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
             * Converts this ServerClient to JSON.
             * @function toJSON
             * @memberof net64.server.ServerClient
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerClient.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * MessageType enum.
             * @name net64.server.ServerClient.MessageType
             * @enum {string}
             * @property {number} UNKNOWN=0 UNKNOWN value
             * @property {number} HANDSHAKE=2 HANDSHAKE value
             * @property {number} PING=3 PING value
             * @property {number} SERVER_MESSAGE=4 SERVER_MESSAGE value
             * @property {number} PLAYER_LIST_UPDATE=5 PLAYER_LIST_UPDATE value
             * @property {number} PLAYER_UPDATE=6 PLAYER_UPDATE value
             * @property {number} PLAYER_DATA=128 PLAYER_DATA value
             * @property {number} META_DATA=129 META_DATA value
             * @property {number} CHAT=130 CHAT value
             */
            ServerClient.MessageType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[2] = "HANDSHAKE"] = 2;
                values[valuesById[3] = "PING"] = 3;
                values[valuesById[4] = "SERVER_MESSAGE"] = 4;
                values[valuesById[5] = "PLAYER_LIST_UPDATE"] = 5;
                values[valuesById[6] = "PLAYER_UPDATE"] = 6;
                values[valuesById[128] = "PLAYER_DATA"] = 128;
                values[valuesById[129] = "META_DATA"] = 129;
                values[valuesById[130] = "CHAT"] = 130;
                return values;
            })();

            return ServerClient;
        })();

        server.Handshake = (function() {

            /**
             * Properties of a Handshake.
             * @memberof net64.server
             * @interface IHandshake
             * @property {number|null} [playerId] Handshake playerId
             * @property {net64.server.IPlayerListUpdate|null} [playerList] Handshake playerList
             */

            /**
             * Constructs a new Handshake.
             * @memberof net64.server
             * @classdesc Represents a Handshake.
             * @implements IHandshake
             * @constructor
             * @param {net64.server.IHandshake=} [properties] Properties to set
             */
            function Handshake(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Handshake playerId.
             * @member {number} playerId
             * @memberof net64.server.Handshake
             * @instance
             */
            Handshake.prototype.playerId = 0;

            /**
             * Handshake playerList.
             * @member {net64.server.IPlayerListUpdate|null|undefined} playerList
             * @memberof net64.server.Handshake
             * @instance
             */
            Handshake.prototype.playerList = null;

            /**
             * Creates a new Handshake instance using the specified properties.
             * @function create
             * @memberof net64.server.Handshake
             * @static
             * @param {net64.server.IHandshake=} [properties] Properties to set
             * @returns {net64.server.Handshake} Handshake instance
             */
            Handshake.create = function create(properties) {
                return new Handshake(properties);
            };

            /**
             * Encodes the specified Handshake message. Does not implicitly {@link net64.server.Handshake.verify|verify} messages.
             * @function encode
             * @memberof net64.server.Handshake
             * @static
             * @param {net64.server.IHandshake} message Handshake message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Handshake.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerId);
                if (message.playerList != null && message.hasOwnProperty("playerList"))
                    $root.net64.server.PlayerListUpdate.encode(message.playerList, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Handshake message, length delimited. Does not implicitly {@link net64.server.Handshake.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.Handshake
             * @static
             * @param {net64.server.IHandshake} message Handshake message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Handshake.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Handshake message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.Handshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.Handshake} Handshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Handshake.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.Handshake();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.playerId = reader.uint32();
                        break;
                    case 2:
                        message.playerList = $root.net64.server.PlayerListUpdate.decode(reader, reader.uint32());
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
             * @memberof net64.server.Handshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.Handshake} Handshake
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
             * @memberof net64.server.Handshake
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Handshake.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    if (!$util.isInteger(message.playerId))
                        return "playerId: integer expected";
                if (message.playerList != null && message.hasOwnProperty("playerList")) {
                    var error = $root.net64.server.PlayerListUpdate.verify(message.playerList);
                    if (error)
                        return "playerList." + error;
                }
                return null;
            };

            /**
             * Creates a Handshake message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.Handshake
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.Handshake} Handshake
             */
            Handshake.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.Handshake)
                    return object;
                var message = new $root.net64.server.Handshake();
                if (object.playerId != null)
                    message.playerId = object.playerId >>> 0;
                if (object.playerList != null) {
                    if (typeof object.playerList !== "object")
                        throw TypeError(".net64.server.Handshake.playerList: object expected");
                    message.playerList = $root.net64.server.PlayerListUpdate.fromObject(object.playerList);
                }
                return message;
            };

            /**
             * Creates a plain object from a Handshake message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.Handshake
             * @static
             * @param {net64.server.Handshake} message Handshake
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Handshake.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.playerId = 0;
                    object.playerList = null;
                }
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    object.playerId = message.playerId;
                if (message.playerList != null && message.hasOwnProperty("playerList"))
                    object.playerList = $root.net64.server.PlayerListUpdate.toObject(message.playerList, options);
                return object;
            };

            /**
             * Converts this Handshake to JSON.
             * @function toJSON
             * @memberof net64.server.Handshake
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Handshake.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Handshake;
        })();

        server.PlayerUpdate = (function() {

            /**
             * Properties of a PlayerUpdate.
             * @memberof net64.server
             * @interface IPlayerUpdate
             * @property {number|null} [playerId] PlayerUpdate playerId
             * @property {net64.shared.IPlayer|null} [player] PlayerUpdate player
             */

            /**
             * Constructs a new PlayerUpdate.
             * @memberof net64.server
             * @classdesc Represents a PlayerUpdate.
             * @implements IPlayerUpdate
             * @constructor
             * @param {net64.server.IPlayerUpdate=} [properties] Properties to set
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
             * @memberof net64.server.PlayerUpdate
             * @instance
             */
            PlayerUpdate.prototype.playerId = 0;

            /**
             * PlayerUpdate player.
             * @member {net64.shared.IPlayer|null|undefined} player
             * @memberof net64.server.PlayerUpdate
             * @instance
             */
            PlayerUpdate.prototype.player = null;

            /**
             * Creates a new PlayerUpdate instance using the specified properties.
             * @function create
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {net64.server.IPlayerUpdate=} [properties] Properties to set
             * @returns {net64.server.PlayerUpdate} PlayerUpdate instance
             */
            PlayerUpdate.create = function create(properties) {
                return new PlayerUpdate(properties);
            };

            /**
             * Encodes the specified PlayerUpdate message. Does not implicitly {@link net64.server.PlayerUpdate.verify|verify} messages.
             * @function encode
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {net64.server.IPlayerUpdate} message PlayerUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerUpdate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerId);
                if (message.player != null && message.hasOwnProperty("player"))
                    $root.net64.shared.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PlayerUpdate message, length delimited. Does not implicitly {@link net64.server.PlayerUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {net64.server.IPlayerUpdate} message PlayerUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PlayerUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.PlayerUpdate} PlayerUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerUpdate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.PlayerUpdate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.playerId = reader.uint32();
                        break;
                    case 2:
                        message.player = $root.net64.shared.Player.decode(reader, reader.uint32());
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
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.PlayerUpdate} PlayerUpdate
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
             * @memberof net64.server.PlayerUpdate
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
                    var error = $root.net64.shared.Player.verify(message.player);
                    if (error)
                        return "player." + error;
                }
                return null;
            };

            /**
             * Creates a PlayerUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.PlayerUpdate} PlayerUpdate
             */
            PlayerUpdate.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.PlayerUpdate)
                    return object;
                var message = new $root.net64.server.PlayerUpdate();
                if (object.playerId != null)
                    message.playerId = object.playerId >>> 0;
                if (object.player != null) {
                    if (typeof object.player !== "object")
                        throw TypeError(".net64.server.PlayerUpdate.player: object expected");
                    message.player = $root.net64.shared.Player.fromObject(object.player);
                }
                return message;
            };

            /**
             * Creates a plain object from a PlayerUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.PlayerUpdate
             * @static
             * @param {net64.server.PlayerUpdate} message PlayerUpdate
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
                    object.player = $root.net64.shared.Player.toObject(message.player, options);
                return object;
            };

            /**
             * Converts this PlayerUpdate to JSON.
             * @function toJSON
             * @memberof net64.server.PlayerUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PlayerUpdate;
        })();

        server.PlayerListUpdate = (function() {

            /**
             * Properties of a PlayerListUpdate.
             * @memberof net64.server
             * @interface IPlayerListUpdate
             * @property {Array.<net64.server.IPlayerUpdate>|null} [playerUpdates] PlayerListUpdate playerUpdates
             */

            /**
             * Constructs a new PlayerListUpdate.
             * @memberof net64.server
             * @classdesc Represents a PlayerListUpdate.
             * @implements IPlayerListUpdate
             * @constructor
             * @param {net64.server.IPlayerListUpdate=} [properties] Properties to set
             */
            function PlayerListUpdate(properties) {
                this.playerUpdates = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PlayerListUpdate playerUpdates.
             * @member {Array.<net64.server.IPlayerUpdate>} playerUpdates
             * @memberof net64.server.PlayerListUpdate
             * @instance
             */
            PlayerListUpdate.prototype.playerUpdates = $util.emptyArray;

            /**
             * Creates a new PlayerListUpdate instance using the specified properties.
             * @function create
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {net64.server.IPlayerListUpdate=} [properties] Properties to set
             * @returns {net64.server.PlayerListUpdate} PlayerListUpdate instance
             */
            PlayerListUpdate.create = function create(properties) {
                return new PlayerListUpdate(properties);
            };

            /**
             * Encodes the specified PlayerListUpdate message. Does not implicitly {@link net64.server.PlayerListUpdate.verify|verify} messages.
             * @function encode
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {net64.server.IPlayerListUpdate} message PlayerListUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerListUpdate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerUpdates != null && message.playerUpdates.length)
                    for (var i = 0; i < message.playerUpdates.length; ++i)
                        $root.net64.server.PlayerUpdate.encode(message.playerUpdates[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PlayerListUpdate message, length delimited. Does not implicitly {@link net64.server.PlayerListUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {net64.server.IPlayerListUpdate} message PlayerListUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerListUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PlayerListUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.PlayerListUpdate} PlayerListUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerListUpdate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.PlayerListUpdate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.playerUpdates && message.playerUpdates.length))
                            message.playerUpdates = [];
                        message.playerUpdates.push($root.net64.server.PlayerUpdate.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PlayerListUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.PlayerListUpdate} PlayerListUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerListUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PlayerListUpdate message.
             * @function verify
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PlayerListUpdate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.playerUpdates != null && message.hasOwnProperty("playerUpdates")) {
                    if (!Array.isArray(message.playerUpdates))
                        return "playerUpdates: array expected";
                    for (var i = 0; i < message.playerUpdates.length; ++i) {
                        var error = $root.net64.server.PlayerUpdate.verify(message.playerUpdates[i]);
                        if (error)
                            return "playerUpdates." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a PlayerListUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.PlayerListUpdate} PlayerListUpdate
             */
            PlayerListUpdate.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.PlayerListUpdate)
                    return object;
                var message = new $root.net64.server.PlayerListUpdate();
                if (object.playerUpdates) {
                    if (!Array.isArray(object.playerUpdates))
                        throw TypeError(".net64.server.PlayerListUpdate.playerUpdates: array expected");
                    message.playerUpdates = [];
                    for (var i = 0; i < object.playerUpdates.length; ++i) {
                        if (typeof object.playerUpdates[i] !== "object")
                            throw TypeError(".net64.server.PlayerListUpdate.playerUpdates: object expected");
                        message.playerUpdates[i] = $root.net64.server.PlayerUpdate.fromObject(object.playerUpdates[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a PlayerListUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.PlayerListUpdate
             * @static
             * @param {net64.server.PlayerListUpdate} message PlayerListUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlayerListUpdate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.playerUpdates = [];
                if (message.playerUpdates && message.playerUpdates.length) {
                    object.playerUpdates = [];
                    for (var j = 0; j < message.playerUpdates.length; ++j)
                        object.playerUpdates[j] = $root.net64.server.PlayerUpdate.toObject(message.playerUpdates[j], options);
                }
                return object;
            };

            /**
             * Converts this PlayerListUpdate to JSON.
             * @function toJSON
             * @memberof net64.server.PlayerListUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerListUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PlayerListUpdate;
        })();

        server.ServerMessage = (function() {

            /**
             * Properties of a ServerMessage.
             * @memberof net64.server
             * @interface IServerMessage
             * @property {net64.server.ServerMessage.MessageType|null} [messageType] ServerMessage messageType
             * @property {net64.server.IConnectionDenied|null} [connectionDenied] ServerMessage connectionDenied
             * @property {net64.server.IGameMode|null} [gameMode] ServerMessage gameMode
             * @property {net64.server.IServerToken|null} [serverToken] ServerMessage serverToken
             */

            /**
             * Constructs a new ServerMessage.
             * @memberof net64.server
             * @classdesc Represents a ServerMessage.
             * @implements IServerMessage
             * @constructor
             * @param {net64.server.IServerMessage=} [properties] Properties to set
             */
            function ServerMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerMessage messageType.
             * @member {net64.server.ServerMessage.MessageType} messageType
             * @memberof net64.server.ServerMessage
             * @instance
             */
            ServerMessage.prototype.messageType = 0;

            /**
             * ServerMessage connectionDenied.
             * @member {net64.server.IConnectionDenied|null|undefined} connectionDenied
             * @memberof net64.server.ServerMessage
             * @instance
             */
            ServerMessage.prototype.connectionDenied = null;

            /**
             * ServerMessage gameMode.
             * @member {net64.server.IGameMode|null|undefined} gameMode
             * @memberof net64.server.ServerMessage
             * @instance
             */
            ServerMessage.prototype.gameMode = null;

            /**
             * ServerMessage serverToken.
             * @member {net64.server.IServerToken|null|undefined} serverToken
             * @memberof net64.server.ServerMessage
             * @instance
             */
            ServerMessage.prototype.serverToken = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ServerMessage message.
             * @member {"connectionDenied"|"gameMode"|"serverToken"|undefined} message
             * @memberof net64.server.ServerMessage
             * @instance
             */
            Object.defineProperty(ServerMessage.prototype, "message", {
                get: $util.oneOfGetter($oneOfFields = ["connectionDenied", "gameMode", "serverToken"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ServerMessage instance using the specified properties.
             * @function create
             * @memberof net64.server.ServerMessage
             * @static
             * @param {net64.server.IServerMessage=} [properties] Properties to set
             * @returns {net64.server.ServerMessage} ServerMessage instance
             */
            ServerMessage.create = function create(properties) {
                return new ServerMessage(properties);
            };

            /**
             * Encodes the specified ServerMessage message. Does not implicitly {@link net64.server.ServerMessage.verify|verify} messages.
             * @function encode
             * @memberof net64.server.ServerMessage
             * @static
             * @param {net64.server.IServerMessage} message ServerMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
                if (message.connectionDenied != null && message.hasOwnProperty("connectionDenied"))
                    $root.net64.server.ConnectionDenied.encode(message.connectionDenied, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.gameMode != null && message.hasOwnProperty("gameMode"))
                    $root.net64.server.GameMode.encode(message.gameMode, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.serverToken != null && message.hasOwnProperty("serverToken"))
                    $root.net64.server.ServerToken.encode(message.serverToken, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link net64.server.ServerMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.ServerMessage
             * @static
             * @param {net64.server.IServerMessage} message ServerMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerMessage message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.ServerMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.ServerMessage} ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.ServerMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.messageType = reader.int32();
                        break;
                    case 2:
                        message.connectionDenied = $root.net64.server.ConnectionDenied.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.gameMode = $root.net64.server.GameMode.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.serverToken = $root.net64.server.ServerToken.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.ServerMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.ServerMessage} ServerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerMessage message.
             * @function verify
             * @memberof net64.server.ServerMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    switch (message.messageType) {
                    default:
                        return "messageType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.connectionDenied != null && message.hasOwnProperty("connectionDenied")) {
                    properties.message = 1;
                    {
                        var error = $root.net64.server.ConnectionDenied.verify(message.connectionDenied);
                        if (error)
                            return "connectionDenied." + error;
                    }
                }
                if (message.gameMode != null && message.hasOwnProperty("gameMode")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.GameMode.verify(message.gameMode);
                        if (error)
                            return "gameMode." + error;
                    }
                }
                if (message.serverToken != null && message.hasOwnProperty("serverToken")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.ServerToken.verify(message.serverToken);
                        if (error)
                            return "serverToken." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.ServerMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.ServerMessage} ServerMessage
             */
            ServerMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.ServerMessage)
                    return object;
                var message = new $root.net64.server.ServerMessage();
                switch (object.messageType) {
                case "CONNECTION_DENIED":
                case 0:
                    message.messageType = 0;
                    break;
                case "GAME_MODE":
                case 1:
                    message.messageType = 1;
                    break;
                case "SERVER_TOKEN":
                case 2:
                    message.messageType = 2;
                    break;
                }
                if (object.connectionDenied != null) {
                    if (typeof object.connectionDenied !== "object")
                        throw TypeError(".net64.server.ServerMessage.connectionDenied: object expected");
                    message.connectionDenied = $root.net64.server.ConnectionDenied.fromObject(object.connectionDenied);
                }
                if (object.gameMode != null) {
                    if (typeof object.gameMode !== "object")
                        throw TypeError(".net64.server.ServerMessage.gameMode: object expected");
                    message.gameMode = $root.net64.server.GameMode.fromObject(object.gameMode);
                }
                if (object.serverToken != null) {
                    if (typeof object.serverToken !== "object")
                        throw TypeError(".net64.server.ServerMessage.serverToken: object expected");
                    message.serverToken = $root.net64.server.ServerToken.fromObject(object.serverToken);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.ServerMessage
             * @static
             * @param {net64.server.ServerMessage} message ServerMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.messageType = options.enums === String ? "CONNECTION_DENIED" : 0;
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    object.messageType = options.enums === String ? $root.net64.server.ServerMessage.MessageType[message.messageType] : message.messageType;
                if (message.connectionDenied != null && message.hasOwnProperty("connectionDenied")) {
                    object.connectionDenied = $root.net64.server.ConnectionDenied.toObject(message.connectionDenied, options);
                    if (options.oneofs)
                        object.message = "connectionDenied";
                }
                if (message.gameMode != null && message.hasOwnProperty("gameMode")) {
                    object.gameMode = $root.net64.server.GameMode.toObject(message.gameMode, options);
                    if (options.oneofs)
                        object.message = "gameMode";
                }
                if (message.serverToken != null && message.hasOwnProperty("serverToken")) {
                    object.serverToken = $root.net64.server.ServerToken.toObject(message.serverToken, options);
                    if (options.oneofs)
                        object.message = "serverToken";
                }
                return object;
            };

            /**
             * Converts this ServerMessage to JSON.
             * @function toJSON
             * @memberof net64.server.ServerMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * MessageType enum.
             * @name net64.server.ServerMessage.MessageType
             * @enum {string}
             * @property {number} CONNECTION_DENIED=0 CONNECTION_DENIED value
             * @property {number} GAME_MODE=1 GAME_MODE value
             * @property {number} SERVER_TOKEN=2 SERVER_TOKEN value
             */
            ServerMessage.MessageType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CONNECTION_DENIED"] = 0;
                values[valuesById[1] = "GAME_MODE"] = 1;
                values[valuesById[2] = "SERVER_TOKEN"] = 2;
                return values;
            })();

            return ServerMessage;
        })();

        server.GameMode = (function() {

            /**
             * Properties of a GameMode.
             * @memberof net64.server
             * @interface IGameMode
             * @property {net64.server.GameMode.GameModeType|null} [gameMode] GameMode gameMode
             */

            /**
             * Constructs a new GameMode.
             * @memberof net64.server
             * @classdesc Represents a GameMode.
             * @implements IGameMode
             * @constructor
             * @param {net64.server.IGameMode=} [properties] Properties to set
             */
            function GameMode(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameMode gameMode.
             * @member {net64.server.GameMode.GameModeType} gameMode
             * @memberof net64.server.GameMode
             * @instance
             */
            GameMode.prototype.gameMode = 0;

            /**
             * Creates a new GameMode instance using the specified properties.
             * @function create
             * @memberof net64.server.GameMode
             * @static
             * @param {net64.server.IGameMode=} [properties] Properties to set
             * @returns {net64.server.GameMode} GameMode instance
             */
            GameMode.create = function create(properties) {
                return new GameMode(properties);
            };

            /**
             * Encodes the specified GameMode message. Does not implicitly {@link net64.server.GameMode.verify|verify} messages.
             * @function encode
             * @memberof net64.server.GameMode
             * @static
             * @param {net64.server.IGameMode} message GameMode message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameMode.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.gameMode != null && message.hasOwnProperty("gameMode"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameMode);
                return writer;
            };

            /**
             * Encodes the specified GameMode message, length delimited. Does not implicitly {@link net64.server.GameMode.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.GameMode
             * @static
             * @param {net64.server.IGameMode} message GameMode message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameMode.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GameMode message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.GameMode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.GameMode} GameMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameMode.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.GameMode();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.gameMode = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameMode message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.GameMode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.GameMode} GameMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameMode.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameMode message.
             * @function verify
             * @memberof net64.server.GameMode
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameMode.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.gameMode != null && message.hasOwnProperty("gameMode"))
                    switch (message.gameMode) {
                    default:
                        return "gameMode: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 8:
                        break;
                    }
                return null;
            };

            /**
             * Creates a GameMode message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.GameMode
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.GameMode} GameMode
             */
            GameMode.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.GameMode)
                    return object;
                var message = new $root.net64.server.GameMode();
                switch (object.gameMode) {
                case "NONE":
                case 0:
                    message.gameMode = 0;
                    break;
                case "DEFAULT":
                case 1:
                    message.gameMode = 1;
                    break;
                case "THIRD_PERSON_SHOOTER":
                case 2:
                    message.gameMode = 2;
                    break;
                case "INTERACTIONLESS":
                case 3:
                    message.gameMode = 3;
                    break;
                case "PROP_HUNT":
                case 4:
                    message.gameMode = 4;
                    break;
                case "BOSS_RUSH":
                case 5:
                    message.gameMode = 5;
                    break;
                case "TAG":
                case 6:
                    message.gameMode = 6;
                    break;
                case "WARIO_WARE":
                case 8:
                    message.gameMode = 8;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GameMode message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.GameMode
             * @static
             * @param {net64.server.GameMode} message GameMode
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameMode.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.gameMode = options.enums === String ? "NONE" : 0;
                if (message.gameMode != null && message.hasOwnProperty("gameMode"))
                    object.gameMode = options.enums === String ? $root.net64.server.GameMode.GameModeType[message.gameMode] : message.gameMode;
                return object;
            };

            /**
             * Converts this GameMode to JSON.
             * @function toJSON
             * @memberof net64.server.GameMode
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameMode.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * GameModeType enum.
             * @name net64.server.GameMode.GameModeType
             * @enum {string}
             * @property {number} NONE=0 NONE value
             * @property {number} DEFAULT=1 DEFAULT value
             * @property {number} THIRD_PERSON_SHOOTER=2 THIRD_PERSON_SHOOTER value
             * @property {number} INTERACTIONLESS=3 INTERACTIONLESS value
             * @property {number} PROP_HUNT=4 PROP_HUNT value
             * @property {number} BOSS_RUSH=5 BOSS_RUSH value
             * @property {number} TAG=6 TAG value
             * @property {number} WARIO_WARE=8 WARIO_WARE value
             */
            GameMode.GameModeType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "NONE"] = 0;
                values[valuesById[1] = "DEFAULT"] = 1;
                values[valuesById[2] = "THIRD_PERSON_SHOOTER"] = 2;
                values[valuesById[3] = "INTERACTIONLESS"] = 3;
                values[valuesById[4] = "PROP_HUNT"] = 4;
                values[valuesById[5] = "BOSS_RUSH"] = 5;
                values[valuesById[6] = "TAG"] = 6;
                values[valuesById[8] = "WARIO_WARE"] = 8;
                return values;
            })();

            return GameMode;
        })();

        server.ServerToken = (function() {

            /**
             * Properties of a ServerToken.
             * @memberof net64.server
             * @interface IServerToken
             * @property {net64.server.ServerToken.TokenType|null} [tokenType] ServerToken tokenType
             * @property {string|null} [signature] ServerToken signature
             */

            /**
             * Constructs a new ServerToken.
             * @memberof net64.server
             * @classdesc Represents a ServerToken.
             * @implements IServerToken
             * @constructor
             * @param {net64.server.IServerToken=} [properties] Properties to set
             */
            function ServerToken(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerToken tokenType.
             * @member {net64.server.ServerToken.TokenType} tokenType
             * @memberof net64.server.ServerToken
             * @instance
             */
            ServerToken.prototype.tokenType = 0;

            /**
             * ServerToken signature.
             * @member {string} signature
             * @memberof net64.server.ServerToken
             * @instance
             */
            ServerToken.prototype.signature = "";

            /**
             * Creates a new ServerToken instance using the specified properties.
             * @function create
             * @memberof net64.server.ServerToken
             * @static
             * @param {net64.server.IServerToken=} [properties] Properties to set
             * @returns {net64.server.ServerToken} ServerToken instance
             */
            ServerToken.create = function create(properties) {
                return new ServerToken(properties);
            };

            /**
             * Encodes the specified ServerToken message. Does not implicitly {@link net64.server.ServerToken.verify|verify} messages.
             * @function encode
             * @memberof net64.server.ServerToken
             * @static
             * @param {net64.server.IServerToken} message ServerToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerToken.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tokenType != null && message.hasOwnProperty("tokenType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.tokenType);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.signature);
                return writer;
            };

            /**
             * Encodes the specified ServerToken message, length delimited. Does not implicitly {@link net64.server.ServerToken.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.ServerToken
             * @static
             * @param {net64.server.IServerToken} message ServerToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerToken.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerToken message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.ServerToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.ServerToken} ServerToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerToken.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.ServerToken();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tokenType = reader.int32();
                        break;
                    case 2:
                        message.signature = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerToken message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.ServerToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.ServerToken} ServerToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerToken.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerToken message.
             * @function verify
             * @memberof net64.server.ServerToken
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerToken.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tokenType != null && message.hasOwnProperty("tokenType"))
                    switch (message.tokenType) {
                    default:
                        return "tokenType: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!$util.isString(message.signature))
                        return "signature: string expected";
                return null;
            };

            /**
             * Creates a ServerToken message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.ServerToken
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.ServerToken} ServerToken
             */
            ServerToken.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.ServerToken)
                    return object;
                var message = new $root.net64.server.ServerToken();
                switch (object.tokenType) {
                case "GRANT":
                case 0:
                    message.tokenType = 0;
                    break;
                case "LOSE":
                case 1:
                    message.tokenType = 1;
                    break;
                }
                if (object.signature != null)
                    message.signature = String(object.signature);
                return message;
            };

            /**
             * Creates a plain object from a ServerToken message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.ServerToken
             * @static
             * @param {net64.server.ServerToken} message ServerToken
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerToken.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.tokenType = options.enums === String ? "GRANT" : 0;
                    object.signature = "";
                }
                if (message.tokenType != null && message.hasOwnProperty("tokenType"))
                    object.tokenType = options.enums === String ? $root.net64.server.ServerToken.TokenType[message.tokenType] : message.tokenType;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = message.signature;
                return object;
            };

            /**
             * Converts this ServerToken to JSON.
             * @function toJSON
             * @memberof net64.server.ServerToken
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerToken.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * TokenType enum.
             * @name net64.server.ServerToken.TokenType
             * @enum {string}
             * @property {number} GRANT=0 GRANT value
             * @property {number} LOSE=1 LOSE value
             */
            ServerToken.TokenType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "GRANT"] = 0;
                values[valuesById[1] = "LOSE"] = 1;
                return values;
            })();

            return ServerToken;
        })();

        server.ConnectionDenied = (function() {

            /**
             * Properties of a ConnectionDenied.
             * @memberof net64.server
             * @interface IConnectionDenied
             * @property {net64.server.ConnectionDenied.Reason|null} [reason] ConnectionDenied reason
             * @property {net64.server.IServerFull|null} [serverFull] ConnectionDenied serverFull
             * @property {net64.server.IWrongVersion|null} [wrongVersion] ConnectionDenied wrongVersion
             */

            /**
             * Constructs a new ConnectionDenied.
             * @memberof net64.server
             * @classdesc Represents a ConnectionDenied.
             * @implements IConnectionDenied
             * @constructor
             * @param {net64.server.IConnectionDenied=} [properties] Properties to set
             */
            function ConnectionDenied(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectionDenied reason.
             * @member {net64.server.ConnectionDenied.Reason} reason
             * @memberof net64.server.ConnectionDenied
             * @instance
             */
            ConnectionDenied.prototype.reason = 0;

            /**
             * ConnectionDenied serverFull.
             * @member {net64.server.IServerFull|null|undefined} serverFull
             * @memberof net64.server.ConnectionDenied
             * @instance
             */
            ConnectionDenied.prototype.serverFull = null;

            /**
             * ConnectionDenied wrongVersion.
             * @member {net64.server.IWrongVersion|null|undefined} wrongVersion
             * @memberof net64.server.ConnectionDenied
             * @instance
             */
            ConnectionDenied.prototype.wrongVersion = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ConnectionDenied message.
             * @member {"serverFull"|"wrongVersion"|undefined} message
             * @memberof net64.server.ConnectionDenied
             * @instance
             */
            Object.defineProperty(ConnectionDenied.prototype, "message", {
                get: $util.oneOfGetter($oneOfFields = ["serverFull", "wrongVersion"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ConnectionDenied instance using the specified properties.
             * @function create
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {net64.server.IConnectionDenied=} [properties] Properties to set
             * @returns {net64.server.ConnectionDenied} ConnectionDenied instance
             */
            ConnectionDenied.create = function create(properties) {
                return new ConnectionDenied(properties);
            };

            /**
             * Encodes the specified ConnectionDenied message. Does not implicitly {@link net64.server.ConnectionDenied.verify|verify} messages.
             * @function encode
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {net64.server.IConnectionDenied} message ConnectionDenied message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectionDenied.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
                if (message.serverFull != null && message.hasOwnProperty("serverFull"))
                    $root.net64.server.ServerFull.encode(message.serverFull, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.wrongVersion != null && message.hasOwnProperty("wrongVersion"))
                    $root.net64.server.WrongVersion.encode(message.wrongVersion, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConnectionDenied message, length delimited. Does not implicitly {@link net64.server.ConnectionDenied.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {net64.server.IConnectionDenied} message ConnectionDenied message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectionDenied.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectionDenied message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.ConnectionDenied} ConnectionDenied
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectionDenied.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.ConnectionDenied();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.reason = reader.int32();
                        break;
                    case 2:
                        message.serverFull = $root.net64.server.ServerFull.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.wrongVersion = $root.net64.server.WrongVersion.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConnectionDenied message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.ConnectionDenied} ConnectionDenied
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectionDenied.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectionDenied message.
             * @function verify
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectionDenied.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.reason != null && message.hasOwnProperty("reason"))
                    switch (message.reason) {
                    default:
                        return "reason: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.serverFull != null && message.hasOwnProperty("serverFull")) {
                    properties.message = 1;
                    {
                        var error = $root.net64.server.ServerFull.verify(message.serverFull);
                        if (error)
                            return "serverFull." + error;
                    }
                }
                if (message.wrongVersion != null && message.hasOwnProperty("wrongVersion")) {
                    if (properties.message === 1)
                        return "message: multiple values";
                    properties.message = 1;
                    {
                        var error = $root.net64.server.WrongVersion.verify(message.wrongVersion);
                        if (error)
                            return "wrongVersion." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ConnectionDenied message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.ConnectionDenied} ConnectionDenied
             */
            ConnectionDenied.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.ConnectionDenied)
                    return object;
                var message = new $root.net64.server.ConnectionDenied();
                switch (object.reason) {
                case "SERVER_FULL":
                case 0:
                    message.reason = 0;
                    break;
                case "WRONG_VERSION":
                case 1:
                    message.reason = 1;
                    break;
                }
                if (object.serverFull != null) {
                    if (typeof object.serverFull !== "object")
                        throw TypeError(".net64.server.ConnectionDenied.serverFull: object expected");
                    message.serverFull = $root.net64.server.ServerFull.fromObject(object.serverFull);
                }
                if (object.wrongVersion != null) {
                    if (typeof object.wrongVersion !== "object")
                        throw TypeError(".net64.server.ConnectionDenied.wrongVersion: object expected");
                    message.wrongVersion = $root.net64.server.WrongVersion.fromObject(object.wrongVersion);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConnectionDenied message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.ConnectionDenied
             * @static
             * @param {net64.server.ConnectionDenied} message ConnectionDenied
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectionDenied.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.reason = options.enums === String ? "SERVER_FULL" : 0;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = options.enums === String ? $root.net64.server.ConnectionDenied.Reason[message.reason] : message.reason;
                if (message.serverFull != null && message.hasOwnProperty("serverFull")) {
                    object.serverFull = $root.net64.server.ServerFull.toObject(message.serverFull, options);
                    if (options.oneofs)
                        object.message = "serverFull";
                }
                if (message.wrongVersion != null && message.hasOwnProperty("wrongVersion")) {
                    object.wrongVersion = $root.net64.server.WrongVersion.toObject(message.wrongVersion, options);
                    if (options.oneofs)
                        object.message = "wrongVersion";
                }
                return object;
            };

            /**
             * Converts this ConnectionDenied to JSON.
             * @function toJSON
             * @memberof net64.server.ConnectionDenied
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectionDenied.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Reason enum.
             * @name net64.server.ConnectionDenied.Reason
             * @enum {string}
             * @property {number} SERVER_FULL=0 SERVER_FULL value
             * @property {number} WRONG_VERSION=1 WRONG_VERSION value
             */
            ConnectionDenied.Reason = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SERVER_FULL"] = 0;
                values[valuesById[1] = "WRONG_VERSION"] = 1;
                return values;
            })();

            return ConnectionDenied;
        })();

        server.ServerFull = (function() {

            /**
             * Properties of a ServerFull.
             * @memberof net64.server
             * @interface IServerFull
             * @property {number|null} [maxPlayers] ServerFull maxPlayers
             */

            /**
             * Constructs a new ServerFull.
             * @memberof net64.server
             * @classdesc Represents a ServerFull.
             * @implements IServerFull
             * @constructor
             * @param {net64.server.IServerFull=} [properties] Properties to set
             */
            function ServerFull(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerFull maxPlayers.
             * @member {number} maxPlayers
             * @memberof net64.server.ServerFull
             * @instance
             */
            ServerFull.prototype.maxPlayers = 0;

            /**
             * Creates a new ServerFull instance using the specified properties.
             * @function create
             * @memberof net64.server.ServerFull
             * @static
             * @param {net64.server.IServerFull=} [properties] Properties to set
             * @returns {net64.server.ServerFull} ServerFull instance
             */
            ServerFull.create = function create(properties) {
                return new ServerFull(properties);
            };

            /**
             * Encodes the specified ServerFull message. Does not implicitly {@link net64.server.ServerFull.verify|verify} messages.
             * @function encode
             * @memberof net64.server.ServerFull
             * @static
             * @param {net64.server.IServerFull} message ServerFull message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerFull.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.maxPlayers != null && message.hasOwnProperty("maxPlayers"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.maxPlayers);
                return writer;
            };

            /**
             * Encodes the specified ServerFull message, length delimited. Does not implicitly {@link net64.server.ServerFull.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.ServerFull
             * @static
             * @param {net64.server.IServerFull} message ServerFull message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerFull.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerFull message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.ServerFull
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.ServerFull} ServerFull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerFull.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.ServerFull();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.maxPlayers = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerFull message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.ServerFull
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.ServerFull} ServerFull
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerFull.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerFull message.
             * @function verify
             * @memberof net64.server.ServerFull
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerFull.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.maxPlayers != null && message.hasOwnProperty("maxPlayers"))
                    if (!$util.isInteger(message.maxPlayers))
                        return "maxPlayers: integer expected";
                return null;
            };

            /**
             * Creates a ServerFull message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.ServerFull
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.ServerFull} ServerFull
             */
            ServerFull.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.ServerFull)
                    return object;
                var message = new $root.net64.server.ServerFull();
                if (object.maxPlayers != null)
                    message.maxPlayers = object.maxPlayers >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a ServerFull message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.ServerFull
             * @static
             * @param {net64.server.ServerFull} message ServerFull
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerFull.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.maxPlayers = 0;
                if (message.maxPlayers != null && message.hasOwnProperty("maxPlayers"))
                    object.maxPlayers = message.maxPlayers;
                return object;
            };

            /**
             * Converts this ServerFull to JSON.
             * @function toJSON
             * @memberof net64.server.ServerFull
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerFull.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServerFull;
        })();

        server.WrongVersion = (function() {

            /**
             * Properties of a WrongVersion.
             * @memberof net64.server
             * @interface IWrongVersion
             * @property {string|null} [majorVersion] WrongVersion majorVersion
             * @property {string|null} [minorVersion] WrongVersion minorVersion
             */

            /**
             * Constructs a new WrongVersion.
             * @memberof net64.server
             * @classdesc Represents a WrongVersion.
             * @implements IWrongVersion
             * @constructor
             * @param {net64.server.IWrongVersion=} [properties] Properties to set
             */
            function WrongVersion(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WrongVersion majorVersion.
             * @member {string} majorVersion
             * @memberof net64.server.WrongVersion
             * @instance
             */
            WrongVersion.prototype.majorVersion = "";

            /**
             * WrongVersion minorVersion.
             * @member {string} minorVersion
             * @memberof net64.server.WrongVersion
             * @instance
             */
            WrongVersion.prototype.minorVersion = "";

            /**
             * Creates a new WrongVersion instance using the specified properties.
             * @function create
             * @memberof net64.server.WrongVersion
             * @static
             * @param {net64.server.IWrongVersion=} [properties] Properties to set
             * @returns {net64.server.WrongVersion} WrongVersion instance
             */
            WrongVersion.create = function create(properties) {
                return new WrongVersion(properties);
            };

            /**
             * Encodes the specified WrongVersion message. Does not implicitly {@link net64.server.WrongVersion.verify|verify} messages.
             * @function encode
             * @memberof net64.server.WrongVersion
             * @static
             * @param {net64.server.IWrongVersion} message WrongVersion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WrongVersion.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.majorVersion != null && message.hasOwnProperty("majorVersion"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.majorVersion);
                if (message.minorVersion != null && message.hasOwnProperty("minorVersion"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.minorVersion);
                return writer;
            };

            /**
             * Encodes the specified WrongVersion message, length delimited. Does not implicitly {@link net64.server.WrongVersion.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.WrongVersion
             * @static
             * @param {net64.server.IWrongVersion} message WrongVersion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WrongVersion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WrongVersion message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.WrongVersion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.WrongVersion} WrongVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WrongVersion.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.WrongVersion();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.majorVersion = reader.string();
                        break;
                    case 2:
                        message.minorVersion = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WrongVersion message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof net64.server.WrongVersion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.WrongVersion} WrongVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WrongVersion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WrongVersion message.
             * @function verify
             * @memberof net64.server.WrongVersion
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WrongVersion.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.majorVersion != null && message.hasOwnProperty("majorVersion"))
                    if (!$util.isString(message.majorVersion))
                        return "majorVersion: string expected";
                if (message.minorVersion != null && message.hasOwnProperty("minorVersion"))
                    if (!$util.isString(message.minorVersion))
                        return "minorVersion: string expected";
                return null;
            };

            /**
             * Creates a WrongVersion message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof net64.server.WrongVersion
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.WrongVersion} WrongVersion
             */
            WrongVersion.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.WrongVersion)
                    return object;
                var message = new $root.net64.server.WrongVersion();
                if (object.majorVersion != null)
                    message.majorVersion = String(object.majorVersion);
                if (object.minorVersion != null)
                    message.minorVersion = String(object.minorVersion);
                return message;
            };

            /**
             * Creates a plain object from a WrongVersion message. Also converts values to other types if specified.
             * @function toObject
             * @memberof net64.server.WrongVersion
             * @static
             * @param {net64.server.WrongVersion} message WrongVersion
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WrongVersion.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.majorVersion = "";
                    object.minorVersion = "";
                }
                if (message.majorVersion != null && message.hasOwnProperty("majorVersion"))
                    object.majorVersion = message.majorVersion;
                if (message.minorVersion != null && message.hasOwnProperty("minorVersion"))
                    object.minorVersion = message.minorVersion;
                return object;
            };

            /**
             * Converts this WrongVersion to JSON.
             * @function toJSON
             * @memberof net64.server.WrongVersion
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WrongVersion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return WrongVersion;
        })();

        server.PlayerData = (function() {

            /**
             * Properties of a PlayerData.
             * @memberof net64.server
             * @interface IPlayerData
             * @property {number|null} [playerLength] PlayerData playerLength
             * @property {number|null} [dataLength] PlayerData dataLength
             * @property {Uint8Array|null} [playerData] PlayerData playerData
             */

            /**
             * Constructs a new PlayerData.
             * @memberof net64.server
             * @classdesc Represents a PlayerData.
             * @implements IPlayerData
             * @constructor
             * @param {net64.server.IPlayerData=} [properties] Properties to set
             */
            function PlayerData(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PlayerData playerLength.
             * @member {number} playerLength
             * @memberof net64.server.PlayerData
             * @instance
             */
            PlayerData.prototype.playerLength = 0;

            /**
             * PlayerData dataLength.
             * @member {number} dataLength
             * @memberof net64.server.PlayerData
             * @instance
             */
            PlayerData.prototype.dataLength = 0;

            /**
             * PlayerData playerData.
             * @member {Uint8Array} playerData
             * @memberof net64.server.PlayerData
             * @instance
             */
            PlayerData.prototype.playerData = $util.newBuffer([]);

            /**
             * Creates a new PlayerData instance using the specified properties.
             * @function create
             * @memberof net64.server.PlayerData
             * @static
             * @param {net64.server.IPlayerData=} [properties] Properties to set
             * @returns {net64.server.PlayerData} PlayerData instance
             */
            PlayerData.create = function create(properties) {
                return new PlayerData(properties);
            };

            /**
             * Encodes the specified PlayerData message. Does not implicitly {@link net64.server.PlayerData.verify|verify} messages.
             * @function encode
             * @memberof net64.server.PlayerData
             * @static
             * @param {net64.server.IPlayerData} message PlayerData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerLength != null && message.hasOwnProperty("playerLength"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerLength);
                if (message.dataLength != null && message.hasOwnProperty("dataLength"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.dataLength);
                if (message.playerData != null && message.hasOwnProperty("playerData"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.playerData);
                return writer;
            };

            /**
             * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link net64.server.PlayerData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof net64.server.PlayerData
             * @static
             * @param {net64.server.IPlayerData} message PlayerData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PlayerData message from the specified reader or buffer.
             * @function decode
             * @memberof net64.server.PlayerData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {net64.server.PlayerData} PlayerData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.net64.server.PlayerData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.playerLength = reader.uint32();
                        break;
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
             * @memberof net64.server.PlayerData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {net64.server.PlayerData} PlayerData
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
             * @memberof net64.server.PlayerData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PlayerData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.playerLength != null && message.hasOwnProperty("playerLength"))
                    if (!$util.isInteger(message.playerLength))
                        return "playerLength: integer expected";
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
             * @memberof net64.server.PlayerData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {net64.server.PlayerData} PlayerData
             */
            PlayerData.fromObject = function fromObject(object) {
                if (object instanceof $root.net64.server.PlayerData)
                    return object;
                var message = new $root.net64.server.PlayerData();
                if (object.playerLength != null)
                    message.playerLength = object.playerLength >>> 0;
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
             * @memberof net64.server.PlayerData
             * @static
             * @param {net64.server.PlayerData} message PlayerData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlayerData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.playerLength = 0;
                    object.dataLength = 0;
                    object.playerData = options.bytes === String ? "" : [];
                }
                if (message.playerLength != null && message.hasOwnProperty("playerLength"))
                    object.playerLength = message.playerLength;
                if (message.dataLength != null && message.hasOwnProperty("dataLength"))
                    object.dataLength = message.dataLength;
                if (message.playerData != null && message.hasOwnProperty("playerData"))
                    object.playerData = options.bytes === String ? $util.base64.encode(message.playerData, 0, message.playerData.length) : options.bytes === Array ? Array.prototype.slice.call(message.playerData) : message.playerData;
                return object;
            };

            /**
             * Converts this PlayerData to JSON.
             * @function toJSON
             * @memberof net64.server.PlayerData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PlayerData;
        })();

        return server;
    })();

    net64.shared = (function() {

        /**
         * Namespace shared.
         * @memberof net64
         * @namespace
         */
        var shared = {};

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
