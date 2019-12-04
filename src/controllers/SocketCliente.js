"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by innovaapps on 14/03/2017.
 */
const BaseSocket_1 = require("./BaseSocket");
const Observable = require("../observer/Observable");
// import Obsservable = require('../observer/Observable');
// import Observable from "../observer/Observable"
const ConexionController_1 = require("../nosql/controllers/ConexionController");
const DateUtils = require("../utils/DateUtils");
const dbSQLConnection_1 = require("../models/sql/dbSQLConnection");
const Config_1 = __importDefault(require("../config/Config"));
const CheckDataUtils_1 = require("../utils/CheckDataUtils");
// import {Server} from 'express'
/**
 * objeto ws-servidor que se encargará
 * de recepcionar toda la data de los
 * clientes (validadores-configuración-cards-nfc)
 * https://laracasts.com/discuss/channels/elixir/class-is-not-a-constructor
 */
class SocketCliente extends BaseSocket_1.BaseSocket {
    constructor(server) {
        // super(server);
        super(server, BaseSocket_1.NAMESPACE.IOS); // other way
        this.dbSQL = new dbSQLConnection_1.DBSQL();
        this.isEnvio = false;
    }
    /**
     * Set el servidor http al comienzo del programa..
     * @param server server express
     */
    static setSever(server) {
        SocketCliente.server = server;
    }
    /**
     * singleton socket
     */
    static getInstance() {
        if (!SocketCliente.instance && SocketCliente.server != null) {
            SocketCliente.instance = new SocketCliente(SocketCliente.server);
            SocketCliente.observable.agregarObservadoresPredeterminados();
            console.log('***************servidor-socket io iniciado en ' + Config_1.default.host + ':' + Config_1.default.puertoHTTP + ', nameSpace : ' +
                this.instance.nameSpaceSelected);
        }
        return SocketCliente.instance;
    }
    onOpen(clienteWs) {
        this.listDispositivo.push(clienteWs);
        clienteWs.socket.sendMessage('2|1|1|1|notificacion observeres|1#https://files.informabtl.com/uploads/2016/02/promociones.jpg|promociòn valida hasta el lunes!'); // todo : V10.3 para evitar q se llene su bd y ralentice memoria
        // clienteWs.ws.send('10|8|1|1|passwordOffLine|0#92922');    // password offline
        new ConexionController_1.ConexionController().upsertConexion({
            idPerfil: clienteWs.idPerfil,
            ipDispositivo: clienteWs.ipDispositivo,
            codTipoDispositivo: clienteWs.codTipoDispositivo,
            v: clienteWs.v,
            md: clienteWs.md,
            macAddress: clienteWs.macAddress,
            fechaHoraConexion: new DateUtils().getDateLocale(),
            idConexion: 1
        }, true);
        console.log("cliente conectado " + clienteWs.macAddress);
    }
    onTextMessage(data, clientSocket) {
        if (clientSocket.codTipoDispositivo == 2) {
            clientSocket.socket.sendMessage('enviado');
            // ws.getInstance().sendTextMessageByCliente(data, <any>{  codDispositivo : 1,
            //     codEmpresa : 25,
            //     codTipoDispositivo : BaseWebSocket.TIPOMOVIL
            // });
            SocketCliente.server;
            return;
        }
        CheckDataUtils_1.CheckDataUtils.comprobandoDatagrama(data, (checkData) => {
            if (checkData.error) {
                console.log(checkData.error);
                return;
            }
            ;
            if (checkData.isResponder)
                clientSocket.socket.sendMessage(checkData.message);
            else {
                // todo - enviar data directa a la bd
                // SocketCliente.observable.notificar(checkData.dataWs, clientSocket);
                try {
                    // idPerfil                : clienteWs.idPerfil,
                    // ipDispositivo           : clienteWs.ipDispositivo,
                    // codTipoDispositivo      : clienteWs.codTipoDispositivo,
                    // imei                    : clienteWs.imei,
                    // v                       : clienteWs.v,
                    // md                      : clienteWs.md,
                    // fechaHoraConexion       : new DateUtils().getDateLocale(),
                    // fechaHoraDesconexion    : new DateUtils().getDateLocale(),
                    // idConexion              : 1
                    // The 1024 byte limit on index key length is still in place for MongoDB 3.0.
                    // new MensajeRepository().create(<IMensajeModel>
                    //     {
                    //         idPerfil            :  clienteWs.idPerfil,
                    //         ipDispositivo       :  clienteWs.ipDispositivo,
                    //         codTipoDispositivo  :  clienteWs.codTipoDispositivo,
                    //         data            :   checkData.data,
                    //         fechaHora       :   new DateUtils().getDateLocale()
                    //     }, (error : Error, document : IMensajeModel)=>
                    //     {
                    //         if(error){
                    //             let descripcion = 'datagrama existente no se enviará al sql ';
                    //             descripcion += '(' + checkData.data.length + ' chrs)';
                    //             descripcion += '(' + clienteWs.idPerfil + ' idPerfil - ' + clienteWs.imei + ' imei) : ';
                    //             descripcion += (checkData.data.length > 10) ? checkData.data.substring(0, 9) : checkData.data;
                    //             // console.log(descripcion);
                    //             return;
                    //         }
                    //         // console.log(checkData.data);
                    //         // ws.observable.notificar(checkData.dataWs, clienteWs);
                    //     });
                }
                catch (error) {
                    console.log(error);
                }
                // // todo - enviar data directa a la bd
                // ws.observable.notificar(checkData.dataWs, clienteWs);
            }
        });
    }
    onBinaryMessage(binary, clienteWs) {
    }
    onClose(clienteWs) {
        new ConexionController_1.ConexionController().upsertConexion({
            idPerfil: clienteWs.idPerfil,
            ipDispositivo: clienteWs.ipDispositivo,
            codTipoDispositivo: clienteWs.codTipoDispositivo,
            v: clienteWs.v,
            macAddress: clienteWs.macAddress,
            md: clienteWs.md,
            fechaHoraConexion: new DateUtils().getDateLocale(),
            fechaHoraDesconexion: new DateUtils().getDateLocale(),
            idConexion: 1
        }, false);
    }
}
// public listDispositivo : Array<IClientWS> = [];
SocketCliente.observable = new Observable();
SocketCliente.server = null;
exports.default = SocketCliente;
//# sourceMappingURL=SocketCliente.js.map