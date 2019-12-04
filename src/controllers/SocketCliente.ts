/**
 * Created by innovaapps on 14/03/2017.
 */
import {BaseSocket, IClientSocket, NAMESPACE} from './BaseSocket';
import URLUtils = require('../utils/URLUtils');
import Observable = require("../observer/Observable");
// import Obsservable = require('../observer/Observable');
// import Observable from "../observer/Observable"
import {ConexionController} from "../nosql/controllers/ConexionController";
import IConexionModel = require("../nosql/model/interfaces/IConexionModel");
import DateUtils = require("../utils/DateUtils");
import {DBSQL} from "../models/sql/dbSQLConnection";
import config from '../config/Config';
import {ICheckData, CheckDataUtils} from "../utils/CheckDataUtils";
// import {Server} from 'express'

/**
 * objeto ws-servidor que se encargará
 * de recepcionar toda la data de los
 * clientes (validadores-configuración-cards-nfc)
 * https://laracasts.com/discuss/channels/elixir/class-is-not-a-constructor
 */
export default class SocketCliente extends BaseSocket
{
    // public listDispositivo : Array<IClientWS> = [];
    private static observable : Observable = new Observable();
    private static instance: SocketCliente;
    private dbSQL : DBSQL = new DBSQL();
    private isEnvio : boolean = false;
    private static server : any = null

    constructor(server : any) {
        // super(server);
        super(server, NAMESPACE.IOS);    // other way
    }

    /**
     * Set el servidor http al comienzo del programa..
     * @param server server express
     */
    static setSever(server : any){
        SocketCliente.server = server
    }

    /**
     * singleton socket
     */
    static getInstance() : SocketCliente{
        if (!SocketCliente.instance && SocketCliente.server != null)
        {
            SocketCliente.instance = new SocketCliente(SocketCliente.server);
            SocketCliente.observable.agregarObservadoresPredeterminados();
            console.log('***************servidor-socket io iniciado en ' + config.host + ':' + config.puertoHTTP + ', nameSpace : ' + 
                        this.instance.nameSpaceSelected);
        }
        return SocketCliente.instance;
    }

    onOpen(clienteWs: IClientSocket): void {
        this.listDispositivo.push(clienteWs);
        clienteWs.socket.sendMessage('2|1|1|1|notificacion observeres|1#https://files.informabtl.com/uploads/2016/02/promociones.jpg|promociòn valida hasta el lunes!');    // todo : V10.3 para evitar q se llene su bd y ralentice memoria
        // clienteWs.ws.send('10|8|1|1|passwordOffLine|0#92922');    // password offline
        new ConexionController().upsertConexion(<IConexionModel>{
            idPerfil                : clienteWs.idPerfil,
            ipDispositivo           : clienteWs.ipDispositivo,
            codTipoDispositivo      : clienteWs.codTipoDispositivo,
            v                       : clienteWs.v,
            md                      : clienteWs.md,
            macAddress              : clienteWs.macAddress,
            fechaHoraConexion       : new DateUtils().getDateLocale(),
            idConexion              : 1
        }, true)
        console.log("cliente conectado " + clienteWs.macAddress);
    }

    onTextMessage(data: string, clientSocket : IClientSocket): void {
        if(clientSocket.codTipoDispositivo == 2)
        {
            clientSocket.socket.sendMessage('enviado')

            // ws.getInstance().sendTextMessageByCliente(data, <any>{  codDispositivo : 1,
            //     codEmpresa : 25,
            //     codTipoDispositivo : BaseWebSocket.TIPOMOVIL
            // });
            SocketCliente.server
            return;
        }

        CheckDataUtils.comprobandoDatagrama(data, (checkData: ICheckData): void =>
        {
            if(checkData.error){console.log(checkData.error); return;};

            if(checkData.isResponder)
                clientSocket.socket.sendMessage(checkData.message);
            else
            {
                // todo - enviar data directa a la bd
                // SocketCliente.observable.notificar(checkData.dataWs, clientSocket);
                try
                {
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
                }catch (error)
                {
                    console.log(error);
                }
                // // todo - enviar data directa a la bd
                // ws.observable.notificar(checkData.dataWs, clienteWs);
            }
        });
    }

    onBinaryMessage(binary: any, clienteWs : IClientSocket): void {
    }

    onClose(clienteWs : IClientSocket) {
        new ConexionController().upsertConexion(<IConexionModel>{
            idPerfil                : clienteWs.idPerfil,
            ipDispositivo           : clienteWs.ipDispositivo,
            codTipoDispositivo      : clienteWs.codTipoDispositivo,
            v                       : clienteWs.v,
            macAddress              : clienteWs.macAddress,
            md                      : clienteWs.md,
            fechaHoraConexion       : new DateUtils().getDateLocale(),
            fechaHoraDesconexion    : new DateUtils().getDateLocale(),
            idConexion              : 1
        }, false);
    }
}