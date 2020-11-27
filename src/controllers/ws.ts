/**
 * Created by innovaapps on 14/03/2017.
 */
import {BaseWebSocket, WebSocket, Header, IClientWS} from '../controllers/BaseWebSocket';
import URLUtils = require('../utils/URLUtils');
import Observable = require('../observer/Observable');
import { CheckDataUtils, ICheckData } from '../utils/CheckDataUtils';
import {config} from "../config/config";

/**
 * objeto ws-servidor que se encargará
 * de recepcionar toda la data de los
 * clientes (validadores-configuración-cards-nfc)
 * https://laracasts.com/discuss/channels/elixir/class-is-not-a-constructor
 */
export default class ws extends BaseWebSocket
{
    // public listDispositivo : Array<IClientWS> = [];
    private static observable : Observable = new Observable();
    private static instance: ws;
    private isEnvio : boolean = false;

    constructor() {
        super();
    }

    static getInstance() : ws{
        if (!ws.instance)
        {
            ws.instance = new ws();
            ws.observable.agregarObservadoresPredeterminados();
            console.log('****************** servidor-websocket iniciado en ' + config.host + ':' + config.puertoWS);
        }
        return ws.instance;
    }

    onOpen(clienteWs: IClientWS): void {
        this.listDispositivo.push(clienteWs);
        //clienteWs.ws.send('2|1|1|1|notificacion observer|1#https://files.informabtl.com/uploads/2016/02/promociones.jpg|promociòn valida hasta el lunes!');    // todo : V10.3 para evitar q se llene su bd y ralentice memoria
        // clienteWs.ws.send('10|8|1|1|passwordOffLine|0#92922');    // password offline
        clienteWs.ws.send('6|1|1|1|conexionweboscket|0');    // password offline
        // let conexionCliente = <IConexionModel>{
        //     idPerfil                : clienteWs.idPerfil,
        //     ipDispositivo           : clienteWs.ipDispositivo,
        //     codTipoDispositivo      : clienteWs.codTipoDispositivo,
        //     v                       : clienteWs.v,
        //     md                      : clienteWs.md,
        //     macAddress              : clienteWs.macAddress,
        //     fechaHoraConexion       : new DateUtils().getDateLocale(),
        //     idConexion              : 1,
        //     codUsuario              : clienteWs.codUsuario
        // };
        // super.updateConexionCliente(conexionCliente, true);
        // console.log("cliente conectado " + clienteWs.codUsuario);
    }

    onTextMessage(data: string, clienteWs : IClientWS): void {
        //console.log(data);
        if(clienteWs.codTipoDispositivo == 200)
        {
            clienteWs.ws.send('envíado');
            ws.getInstance().sendBroadcast(data);
            // ws.getInstance().sendTextMessageByCliente(data, <any>{  codDispositivo : 1,
            //     codEmpresa : 25,
            //     codTipoDispositivo : BaseWebSocket.TIPOMOVIL
            // });
            return;
        }
        CheckDataUtils.comprobandoDatagrama(data, clienteWs, (checkData: ICheckData): void =>
        {
            if(checkData.error){console.log(checkData.error); return;};

            if(checkData.isResponder)
                clienteWs.ws.send(checkData.message);
            else
            {
                // todo - enviar data directa a la bd
                ws.observable.notificar(checkData.dataWs, clienteWs);
                try
                {
                }catch (error)
                {
                    console.log(error);
                }
                // // todo - enviar data directa a la bd
                // ws.observable.notificar(checkData.dataWs, clienteWs);
            }
        });
    }

    onBinaryMessage(binary: any, clienteWs : IClientWS): void {
    }

    onClose(code: Number, reason: string, clienteWs : IClientWS) {
        // let desconexionCliente = <IConexionModel>{
        //     idPerfil                : clienteWs.idPerfil,
        //     ipDispositivo           : clienteWs.ipDispositivo,
        //     codTipoDispositivo      : clienteWs.codTipoDispositivo,
        //     v                       : clienteWs.v,
        //     macAddress              : clienteWs.macAddress,
        //     md                      : clienteWs.md,
        //     fechaHoraConexion       : new DateUtils().getDateLocale(),
        //     fechaHoraDesconexion    : new DateUtils().getDateLocale(),
        //     idConexion              : 1,
        //     codUsuario              : clienteWs.codUsuario
        // };
        // super.updateConexionCliente(desconexionCliente, false);
        console.log("cliente desconectado " + clienteWs.codUsuario);
    }
}