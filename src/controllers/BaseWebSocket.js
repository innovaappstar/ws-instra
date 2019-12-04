"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by innovaapps on 14/03/2017.
 */
const WebSocketServer = require("ws");
const WebSocket = require("ws");
exports.WebSocket = WebSocket;
const Config_1 = __importDefault(require("../config/Config"));
//https://medium.com/@Zenkilies/express-session-with-typescript-85bf6dff3dc9#.ptzk6z5uy
const URLUtils = require("../utils/URLUtils");
const ExceptionSQLController_1 = require("../nosql/controllers/ExceptionSQLController");
const dbSQLConnection_1 = require("../models/sql/dbSQLConnection");
const DateUtils = require("../utils/DateUtils");
const server_1 = require("../server");
const ConexionController_1 = require("../nosql/controllers/ConexionController");
const ConexionDEO = require("../deo/ConexionDEO");
let optionsWebSocket = {
    delayCheckConnection: (130 * 1000),
    frecuenciaHeartbeat: (60 * 1000),
    delayAnswerHeartbeat: (4 * 1000)
    // solo testings >>
    // delayCheckConnection : (10 * 1000),
    // frecuenciaHeartbeat : (5 * 1000),
    // delayAnswerHeartbeat : ( 2 * 1000)
};
// initialization
var connections = {};
var connectionIDCounter = 0;
// // when handling a new connection
// connection.id = connectionIDCounter ++;
// connections[connection.id] = connection;
// // in your case you would rewrite these 2 lines as
// ws.id = connectionIDCounter ++;
// connections[ws.id] = ws;
// // when a connection is closed
// delete connections[connection.id];
// // in your case you would rewrite this line as
// delete connections[ws.id];
class BaseWebSocket {
    constructor() {
        this.listDispositivo = [];
        // ws://192.168.1.120:2028/ws?idPerfil=123&ipDispositivo=192.168.1.154&macAddress=352570062085960&v=1.0&codTipoDispositivo=1&md=j5
        // http://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
        this.ws = new WebSocketServer.Server({
            verifyClient: (info, done) => {
                var url = info.req.url;
                if (URLUtils.VerificarInteger(url, HeaderDispositivo.idPerfil) &&
                    URLUtils.VerificarString(url, HeaderDispositivo.ipDispositivo) &&
                    URLUtils.VerificarString(url, HeaderDispositivo.macAddress) &&
                    URLUtils.VerificarString(url, HeaderDispositivo.v) &&
                    URLUtils.VerificarString(url, HeaderDispositivo.md) &&
                    URLUtils.VerificarInteger(url, HeaderDispositivo.codTipoDispositivo))
                    // URLUtils.VerificarString(url, HeaderDispositivo.imei))    // cod empresa distinto de 0
                    done(true);
                else
                    done(false);
            }, port: Config_1.default.puertoWS, path: '/ws'
        });
        try {
            this.ws.on('connection', (client) => {
                let url = client.upgradeReq['url'];
                let clienteWs = {
                    id: connectionIDCounter++,
                    ipDispositivo: URLUtils.VerificarString(url, HeaderDispositivo.ipDispositivo),
                    idPerfil: URLUtils.VerificarString(url, HeaderDispositivo.idPerfil),
                    codTipoDispositivo: URLUtils.VerificarInteger(url, HeaderDispositivo.codTipoDispositivo),
                    macAddress: URLUtils.VerificarString(url, HeaderDispositivo.macAddress),
                    v: URLUtils.VerificarString(url, Header.v),
                    md: URLUtils.VerificarString(url, Header.md) || '',
                    ws: new WebSocketCliente(client),
                    isAlive: true,
                    codUsuario: URLUtils.VerificarInteger(url, Header.codUsuario)
                };
                clienteWs.ws.send(`1|1|1|1|config-values|1#${optionsWebSocket.frecuenciaHeartbeat}|${optionsWebSocket.delayAnswerHeartbeat}`); // config de heartbeath
                connections[clienteWs.id] = clienteWs;
                this.onOpen(clienteWs);
                client.on('message', (data) => {
                    if (typeof data === 'string') {
                        if (data.length == 0) //prueba de ping - mensaje vacìo..
                            clienteWs.ws.send(data);
                        else
                            this.onTextMessage(data, clienteWs);
                        // console.log('received: %s%s', data, new Date());
                    }
                    clienteWs.isAlive = true;
                });
                client.on('close', (code, reason) => {
                    this.onClose(code, reason, clienteWs);
                    delete connections[clienteWs.id];
                });
                // necesario manejar errores para q no se pause el servicio..
                client.on('error', (error) => {
                    console.error(error);
                    delete connections[clienteWs.id];
                });
            });
            setInterval(function () {
                // console.log("iniciando intervalo..");
                Object.keys(connections).forEach((nomKey, index) => {
                    let clienteWS = connections[nomKey];
                    try {
                        if (clienteWS.isAlive === false) {
                            // solo para testings..
                            if (clienteWS.codTipoDispositivo == 200 || clienteWS.codTipoDispositivo == 201)
                                return;
                            try {
                                // clienteWS.ws.terminate();
                                clienteWS.ws.close();
                            }
                            catch (error) {
                                console.error(error);
                            }
                            delete connections[clienteWS.id];
                        }
                        clienteWS.isAlive = false;
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            }, optionsWebSocket.delayCheckConnection);
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
        // console.log(this.listDispositivo.length + ' tamanio de cliente' )
        this.listDispositivo.forEach((iClientWS) => {
            // console.log(iClientWS.codDispositivo + ' - ' + iClientWS.codTipoDispositivo + ' - ' + iClientWS.codEmpresa);
            if (this.isClienteIdentico(iClientWS, clienteWS)) {
                // if(clienteWS.codEmpresa == 25)
                //     console.log();
                // if(isEnvio)  // TODO : CIERRA CONEXIONES A CLIENTES CON MÁS DE UN CANAL DE COMUNICACIÓN
                // {
                //     iClientWS.ws.close();
                //     return;
                // }
                // console.log(iClientWS.codDispositivo + ' - ' + iClientWS.codTipoDispositivo + ' - ' + iClientWS.codEmpresa);
                // console.log('envíando mensaje a cliente ' + clienteWS.codDispositivo + ' : ' + data + ' => ' + new DateUtils().getDateLocale().getMinutes() + ' minutes');
                // console.log(data);
                iClientWS.ws.send(data);
                isEnvio = true;
            }
        });
    }
    /**
  * envía data para clientes que coincidan con los códigos...
  * codTipoDispositivo es alternativo..
  * @param data string
  * @param clienteWS IClientWS
  */
    sendBroadcast(data) {
        this.listDispositivo.forEach((iClientWS) => {
            iClientWS.ws.send(data);
        });
    }
    /**
     * @param data string
     * @param clienteWS IClientWS
     */
    sendBroadcastByMacAddress(data, macAddress) {
        this.listDispositivo.forEach((iClientWS) => {
            if (iClientWS.macAddress == macAddress)
                iClientWS.ws.send(data);
        });
    }
    /**
     * @param data string
     * @param listCodUsuarios Array<Number>
     */
    sendByListCodUsuarios(data, listCodUsuarios) {
        this.listDispositivo.forEach((iClientWS) => {
            let isEncontroCliente = false;
            listCodUsuarios.forEach((codUsuario) => {
                if (iClientWS.codUsuario == codUsuario && !isEncontroCliente) {
                    iClientWS.ws.send(data);
                    isEncontroCliente = true;
                }
            });
        });
    }
    /**
     * Envìa data a un grupo de clientes conectados, los cuales coincidan
     * con el codUsuario..
     * @param data string
     * @param listCodUsuarios Array<Number>
     */
    sendByListSendDataSocket(listSendDataSocket) {
        this.listDispositivo.forEach((iClientWS) => {
            let isEncontroCliente = false;
            listSendDataSocket.forEach((sendDataSocket) => {
                if (iClientWS.codUsuario == sendDataSocket.codUsuario && !isEncontroCliente) {
                    iClientWS.ws.send(sendDataSocket.data);
                    isEncontroCliente = true;
                }
            });
        });
    }
    /**
     * Envìa data a un grupo de clientes conectados, los cuales coincidan
     * con el codUsuario..
     * @param data string
     * @param listCodUsuarios Array<Number>
     */
    sendByListSendDataSocketAllClients(listSendDataSocket, isEnviarAClienteConCodCero) {
        this.listDispositivo.forEach((iClientWS) => {
            let isEncontroCliente = false;
            if (isEnviarAClienteConCodCero && iClientWS.codUsuario == 0) {
                let primeraTrama = listSendDataSocket[0].data;
                iClientWS.ws.send(primeraTrama);
            }
            else {
                listSendDataSocket.forEach((sendDataSocket) => {
                    if (iClientWS.codUsuario == sendDataSocket.codUsuario && !isEncontroCliente) {
                        iClientWS.ws.send(sendDataSocket.data);
                        isEncontroCliente = true;
                    }
                });
            }
        });
    }
    /**
     * compara atributos identificadores de ambos clientes
     * @param nuevoCliente IClientWS nueva conexión entrante
     * @param antiguoCliente IClientWS antigua conexión
     * @returns {boolean}
     */
    isClienteIdentico(nuevoCliente, antiguoCliente) {
        return (nuevoCliente.idPerfil == antiguoCliente.idPerfil &&
            nuevoCliente.macAddress == antiguoCliente.macAddress &&
            nuevoCliente.codTipoDispositivo == antiguoCliente.codTipoDispositivo);
    }
    /**
     * realiza un update de conexiòn de cliente  (conectado/desconectado)
     * @param conexionCliente IConexionModel
     * @param isConectado boolean
     */
    updateConexionCliente(conexionCliente, isConectado) {
        new ConexionController_1.ConexionController().upsertConexion(conexionCliente, isConectado);
        ConexionDEO.getQuerySQLConexionCliente(conexionCliente, (error, queryString) => {
            new dbSQLConnection_1.DBSQL().execSQL(server_1.properties.id, queryString, (error, rows) => {
                if (error) {
                    console.error(server_1.properties.nomDB);
                    console.error(error);
                    return;
                }
                if (rows == null || rows.length == 0) {
                    // console.log("#updateConexionCliente : response is null "); todo verificar mañana
                    // console.log(rows); verificar mañana
                    return;
                }
            }, true);
        }, isConectado);
    }
}
BaseWebSocket.TIPOMOVIL = 1;
BaseWebSocket.TIPOWEB = 2;
exports.BaseWebSocket = BaseWebSocket;
class WebSocketCliente {
    constructor(webSocket) {
        this.webSocket = webSocket;
    }
    /**
     * envía cadena a conexión viva
     * @param data String
     */
    send(data) {
        try {
            if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN)
                this.webSocket.send(data);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    /**
     * cierra conexión viva
     */
    close() {
        if (this.webSocket.readyState === WebSocket.OPEN)
            this.webSocket.close();
    }
}
class Header {
}
Header.idPerfil = 'idPerfil';
Header.ipDispositivo = 'ipDispositivo';
Header.macAddress = 'macAddress';
// public static codEmpresa : string = 'codEmpresa';
Header.codTipoDispositivo = 'codTipoDispositivo';
Header.v = 'v';
Header.md = 'md';
Header.codUsuario = 'codUsuario';
exports.Header = Header;
/**
 // ws://192.168.1.65:2022/ws?idDispositivo=284&codDispositivo=1&codEmpresa=10&imei=352570062085960&v=8.6.RGA
 * cabeceras de versión 8.6 e inferiores
 * TODO : CUANDO SE ACTUALICEN LOS GPS DEBE UTILIZARSE LAS NUEVAS CABECERAS
 */
class HeaderDispositivo {
}
HeaderDispositivo.idPerfil = 'idPerfil';
HeaderDispositivo.ipDispositivo = 'ipDispositivo';
HeaderDispositivo.macAddress = 'macAddress';
HeaderDispositivo.codTipoDispositivo = 'codTipoDispositivo';
HeaderDispositivo.v = 'v';
HeaderDispositivo.md = 'md';
//# sourceMappingURL=BaseWebSocket.js.map