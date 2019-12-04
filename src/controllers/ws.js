"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by innovaapps on 14/03/2017.
 */
const BaseWebSocket_1 = require("../controllers/BaseWebSocket");
const DateUtils = require("../utils/DateUtils");
const dbSQLConnection_1 = require("../models/sql/dbSQLConnection");
const Config_1 = __importDefault(require("../config/Config"));
const CheckDataUtils_1 = require("../utils/CheckDataUtils");
const Observable = require("../observer/Observable");
/**
 * objeto ws-servidor que se encargará
 * de recepcionar toda la data de los
 * clientes (validadores-configuración-cards-nfc)
 * https://laracasts.com/discuss/channels/elixir/class-is-not-a-constructor
 */
class ws extends BaseWebSocket_1.BaseWebSocket {
    constructor() {
        super();
        this.dbSQL = new dbSQLConnection_1.DBSQL();
        this.isEnvio = false;
    }
    static getInstance() {
        if (!ws.instance) {
            ws.instance = new ws();
            ws.observable.agregarObservadoresPredeterminados();
            console.log('****************** servidor-websocket iniciado en ' + Config_1.default.host + ':' + Config_1.default.puertoWS);
        }
        return ws.instance;
    }
    onOpen(clienteWs) {
        this.listDispositivo.push(clienteWs);
        //clienteWs.ws.send('2|1|1|1|notificacion observer|1#https://files.informabtl.com/uploads/2016/02/promociones.jpg|promociòn valida hasta el lunes!');    // todo : V10.3 para evitar q se llene su bd y ralentice memoria
        // clienteWs.ws.send('10|8|1|1|passwordOffLine|0#92922');    // password offline
        clienteWs.ws.send('6|1|1|1|conexionweboscket|0'); // password offline
        let conexionCliente = {
            idPerfil: clienteWs.idPerfil,
            ipDispositivo: clienteWs.ipDispositivo,
            codTipoDispositivo: clienteWs.codTipoDispositivo,
            v: clienteWs.v,
            md: clienteWs.md,
            macAddress: clienteWs.macAddress,
            fechaHoraConexion: new DateUtils().getDateLocale(),
            idConexion: 1,
            codUsuario: clienteWs.codUsuario
        };
        super.updateConexionCliente(conexionCliente, true);
        console.log("cliente conectado " + clienteWs.codUsuario);
    }
    onTextMessage(data, clienteWs) {
        //console.log(data);
        if (clienteWs.codTipoDispositivo == 200) {
            clienteWs.ws.send('envíado');
            ws.getInstance().sendBroadcast(data);
            // ws.getInstance().sendTextMessageByCliente(data, <any>{  codDispositivo : 1,
            //     codEmpresa : 25,
            //     codTipoDispositivo : BaseWebSocket.TIPOMOVIL
            // });
            return;
        }
        CheckDataUtils_1.CheckDataUtils.comprobandoDatagrama(data, (checkData) => {
            if (checkData.error) {
                console.log(checkData.error);
                return;
            }
            ;
            if (checkData.isResponder)
                clienteWs.ws.send(checkData.message);
            else {
                // todo - enviar data directa a la bd
                ws.observable.notificar(checkData.dataWs, clienteWs);
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
    onClose(code, reason, clienteWs) {
        let desconexionCliente = {
            idPerfil: clienteWs.idPerfil,
            ipDispositivo: clienteWs.ipDispositivo,
            codTipoDispositivo: clienteWs.codTipoDispositivo,
            v: clienteWs.v,
            macAddress: clienteWs.macAddress,
            md: clienteWs.md,
            fechaHoraConexion: new DateUtils().getDateLocale(),
            fechaHoraDesconexion: new DateUtils().getDateLocale(),
            idConexion: 1,
            codUsuario: clienteWs.codUsuario
        };
        super.updateConexionCliente(desconexionCliente, false);
        console.log("cliente desconectado " + clienteWs.codUsuario);
    }
}
// public listDispositivo : Array<IClientWS> = [];
ws.observable = new Observable();
exports.default = ws;
//# sourceMappingURL=ws.js.map