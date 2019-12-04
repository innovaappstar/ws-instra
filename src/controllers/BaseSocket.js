"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by innovaapps on 14/03/2017.
 */
// import SocketIO = require('socket.io')
const SocketIO = require("socket.io");
const WebSocket = require("ws");
exports.WebSocket = WebSocket;
const ExceptionSQLController_1 = require("../nosql/controllers/ExceptionSQLController");
const dbSQLConnection_1 = require("../models/sql/dbSQLConnection");
const DateUtils = require("../utils/DateUtils");
const Socket = require("socket.io/lib/socket");
const SocketCliente_1 = __importDefault(require("./SocketCliente"));
const QueryUtils = require("../utils/QueryUtils");
/*
var options = {
    key: fs.readFileSync('../keys/key.pem'),
    cert: fs.readFileSync('../keys/cert.pem'),
};
*/
/**
 * Send data by message event in it prototype..
 */
Socket.prototype.sendMessage = function (data) {
    this.emit(EVENT.MESSAGE, data);
};
// validador de autenticidad (authorization)
// middleware
// mètodos de comunicaciòn y conexiòn (onTextMessage, connect, disconnect)
// var server = require('http').Server(app);
class BaseSocket {
    // public socketServer : any
    constructor(server, nameSpace = NAMESPACE.DEFAULT) {
        this.listDispositivo = [];
        this.clientSocket = {};
        this.TIPOMOVIL = 1;
        this.TIPOWEB = 2;
        this.io = null;
        this.nameSpaceSelected = "";
        try {
            this.nameSpaceSelected = nameSpace;
            this.io = SocketIO(server, { 'pingInterval': 2000, 'pingTimeout': 5000
                // 'key': options.key, 'cert': options.cert
            });
            this.io.use(function (socket, next) {
                var handshakeData = socket.request;
                let query = handshakeData['_query'];
                if (QueryUtils.VerificarInteger(query, HeaderDispositivo.idPerfil) &&
                    QueryUtils.VerificarString(query, HeaderDispositivo.ipDispositivo) &&
                    QueryUtils.VerificarString(query, HeaderDispositivo.macAddress) &&
                    QueryUtils.VerificarString(query, HeaderDispositivo.v) &&
                    QueryUtils.VerificarInteger(query, HeaderDispositivo.codTipoDispositivo))
                    next(); // accept
                else
                    next(new Error('not authorized')); // refused
            });
            // set namespace personalizado o default
            // this.io.on(EVENT.CONNECTION, function (socket : SocketIO.Socket)
            this.io.of(nameSpace).on(EVENT.CONNECTION, function (socket) {
                console.log('ns : ' + nameSpace + ' client connected..' + socket.id);
                // console.log(socket)
                let query = socket.handshake.query;
                let clienteSocket = {
                    ipDispositivo: QueryUtils.VerificarString(query, HeaderDispositivo.ipDispositivo),
                    idPerfil: QueryUtils.VerificarString(query, HeaderDispositivo.idPerfil),
                    codTipoDispositivo: QueryUtils.VerificarInteger(query, HeaderDispositivo.codTipoDispositivo),
                    macAddress: QueryUtils.VerificarString(query, HeaderDispositivo.macAddress),
                    v: QueryUtils.VerificarString(query, Header.v),
                    md: QueryUtils.VerificarString(query, Header.md) || '',
                    socket: socket
                };
                console.log("mac Addres " + clienteSocket.macAddress);
                // socket.emit(EVENT.MESSAGE, 'hola cliente socket nuevo que se copnectó')
                SocketCliente_1.default.getInstance().onOpen(clienteSocket);
                SocketCliente_1.default.getInstance().clientSocket[socket.id] = clienteSocket;
                // this.clientSocket[socket.id] = clienteSocket
                socket.on(EVENT.MESSAGE, (data) => {
                    if (typeof data === 'string')
                        SocketCliente_1.default.getInstance().onTextMessage(data, clienteSocket);
                });
                socket.on(EVENT.ERROR, (error) => {
                    console.log(error);
                });
                socket.on(EVENT.DISCONNECT, function () {
                    console.log(`cliente socket desconectado, ip : ${clienteSocket.ipDispositivo}, idSocket : ${clienteSocket.socket.id}`);
                    // this.onClose(clienteSocket); 
                    // delete clienteSocket[socket.id]; 
                    delete SocketCliente_1.default.getInstance().clientSocket[socket.id];
                });
            });
        }
        catch (error) {
            new ExceptionSQLController_1.ExceptionSQLController().create({
                codEmpresa: 0,
                nomDB: '0',
                detalle: error.message,
                fechaHora: new DateUtils().getDateLocale(),
                codTipo: dbSQLConnection_1.DBSQL.CODERRORWEBSOCKET
            });
        }
    }
    /**
     * envía data para clientes que coincidan con los códigos...
     * codTipoDispositivo es alternativo..
     * @param data string
     * @param clienteWS IClientWS
     */
    sendTextMessageByCliente(data, clienteWS) {
        let isEnvio = false;
    }
    /**
     * envía data para todos los clientes conectados
     * codTipoDispositivo es alternativo..
     * @param data string
     * @param clienteWS IClientWS
     */
    sendBroadcast(data) {
        // this.io.sockets.emit(EVENT.MESSAGE, data)
        this.io.of(this.nameSpaceSelected).emit(EVENT.MESSAGE, data);
    }
    /**
     * envía data para todos los clientes conectados
     * codTipoDispositivo es alternativo..
     * @param data string
     * @param clienteWS IClientWS
     */
    sendByIdSocket(id, data) {
        this.clientSocket[id].socket.emit(EVENT.MESSAGE, data);
    }
    /**
     * envía data para todos los clientes conectados
     * codTipoDispositivo es alternativo..
     * @param data string
     * @param clienteWS IClientWS
     */
    sendBySocket(socket, data) {
        socket.emit(EVENT.MESSAGE, data);
        // this.socketServer.emit(EVENT.MESSAGE, data)
    }
}
exports.BaseSocket = BaseSocket;
class Header {
}
Header.idPerfil = 'idPerfil';
Header.ipDispositivo = 'ipDispositivo';
Header.macAddress = 'macAddress';
// public static codEmpresa : string = 'codEmpresa';
Header.codTipoDispositivo = 'codTipoDispositivo';
Header.v = 'v';
Header.md = 'md';
exports.Header = Header;
class HeaderDispositivo {
}
HeaderDispositivo.idPerfil = 'idPerfil';
HeaderDispositivo.ipDispositivo = 'ipDispositivo';
HeaderDispositivo.macAddress = 'macAddress';
HeaderDispositivo.codTipoDispositivo = 'codTipoDispositivo';
HeaderDispositivo.v = 'v';
HeaderDispositivo.md = 'md';
class EVENT {
}
EVENT.MESSAGE = 'message';
EVENT.CONNECTION = 'connection';
EVENT.ERROR = 'error';
EVENT.DISCONNECT = 'disconnect';
class NAMESPACE {
}
NAMESPACE.DEFAULT = '/socket.io';
NAMESPACE.ANDROID = 'android';
NAMESPACE.IOS = '/ios';
exports.NAMESPACE = NAMESPACE;
//# sourceMappingURL=BaseSocket.js.map