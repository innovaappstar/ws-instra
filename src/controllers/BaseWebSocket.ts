/**
 * Created by innovaapps on 14/03/2017.
 */
import WebSocketServer = require('ws');
import WebSocket = require('ws');
import {config} from "../config/config";
//https://medium.com/@Zenkilies/express-session-with-typescript-85bf6dff3dc9#.ptzk6z5uy
import URLUtils = require('../utils/URLUtils');
//import {ExceptionSQLController} from "../nosql/controllers/ExceptionSQLController";
//import {DBSQL} from "../models/sql/dbSQLConnection";
import DateUtils = require("../utils/DateUtils");
//import IExceptionSQLModel = require("../nosql/model/interfaces/IExceptionSQLModel");
//import { ISendDataSocket } from '../routes/notificacionUsuario.routes';
//import IConexionModel = require('../nosql/model/interfaces/IConexionModel');
//import { ConexionController } from '../nosql/controllers/ConexionController';
import ConexionDEO = require('../deo/ConexionDEO');

let optionsWebSocket = {
    delayCheckConnection : (130 * 1000),
    frecuenciaHeartbeat : (60 * 1000),
    delayAnswerHeartbeat : ( 4 * 1000)
    // solo testings >>
    // delayCheckConnection : (10 * 1000),
    // frecuenciaHeartbeat : (5 * 1000),
    // delayAnswerHeartbeat : ( 2 * 1000)
}

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

abstract class BaseWebSocket{
    public listDispositivo : Array<IClientWS> = [];
    public static TIPOMOVIL = 1;
    public static TIPOWEB = 2;

    
    // ws://192.168.1.120:2028/ws?idPerfil=123&ipDispositivo=192.168.1.154&macAddress=352570062085960&v=1.0&codTipoDispositivo=1&md=j5
    // http://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
   public ws : WebSocketServer.Server = new WebSocketServer.Server({
      verifyClient: (info, done) =>{
        var url  = info.req.url;
        try {
            if (URLUtils.VerificarInteger(url, HeaderDispositivo.idPerfil) &&
            URLUtils.VerificarString(url, HeaderDispositivo.ipDispositivo) &&
            URLUtils.VerificarString(url, HeaderDispositivo.macAddress) &&
            URLUtils.VerificarString(url, HeaderDispositivo.v) &&
            URLUtils.VerificarString(url, HeaderDispositivo.md) &&
            URLUtils.VerificarInteger(url, HeaderDispositivo.codTipoDispositivo))
                    // URLUtils.VerificarString(url, HeaderDispositivo.imei))    // cod empresa distinto de 0
                {
                    
                    done(true);
                }
            else
                done(false);
        } catch (error) {
            console.error(error);
        }
      }, port: config.puertoWS, path : '/ws'});
    //   ws://192.168.1.120:2028/ws?id=1&ipDispositivo=192.168.1.120&idPerfil=1&codTipoDispositivo=1&macAddress=ABCDEFGHI&v=10.7.8&md=Pocket2&codUsuario=1&codEmpresa=14
   constructor()
   {
        try
        {
            this.ws.on('connection', (client: WebSocket, req : any) => {
                let url = req.url;
                let clienteWs : IClientWS =
                {
                    id : connectionIDCounter++,
                    ipDispositivo :  URLUtils.VerificarString(url, HeaderDispositivo.ipDispositivo),
                    idPerfil :  URLUtils.VerificarString(url, HeaderDispositivo.idPerfil),
                    codTipoDispositivo : URLUtils.VerificarInteger(url, HeaderDispositivo.codTipoDispositivo),
                    macAddress : URLUtils.VerificarString(url, HeaderDispositivo.macAddress),
                    v : URLUtils.VerificarString(url, Header.v), 
                    md : URLUtils.VerificarString(url, Header.md) || '',    // algunas unidades
                    ws : new WebSocketCliente(client), // <WebSocketCliente>client
                    isAlive : true,
                    codUsuario : URLUtils.VerificarInteger(url, Header.codUsuario),
                    codEmpresa : URLUtils.VerificarInteger(url, Header.codEmpresa),
                };

                clienteWs.ws.send(`1|1|1|1|config-values|1#${optionsWebSocket.frecuenciaHeartbeat}|${optionsWebSocket.delayAnswerHeartbeat}`);    // config de heartbeath
                
                connections[clienteWs.id] = clienteWs;
                this.onOpen(clienteWs);

                client.on('message', (data: any) => {
                    if (typeof data === 'string')
                    {
                        if(data.length == 0) //prueba de ping - mensaje vacìo..
                            clienteWs.ws.send(data);
                        else 
                            this.onTextMessage(data, clienteWs);
                        // console.log('received: %s%s', data, new Date());
                    }
                    clienteWs.isAlive = true;
                });

                client.on('close', (code : Number, reason : string) => {
                    this.onClose(code, reason, clienteWs);
                    delete connections[clienteWs.id];
                });
                // necesario manejar errores para q no se pause el servicio..
                client.on('error', (error : Error) => {
                    console.error(error);
                    delete connections[clienteWs.id];
                });
            });

            setInterval(function() {
                // console.log("iniciando intervalo..");
                Object.keys(connections).forEach((nomKey : string, index : number)=>{
                    let clienteWS = connections[nomKey];
                    try {
                        if (clienteWS.isAlive === false)
                        {
                            // solo para testings..
                            
                            if(clienteWS.codTipoDispositivo == 200 || clienteWS.codTipoDispositivo == 201)
                                return;

                            try {
                                // clienteWS.ws.terminate();
                                clienteWS.ws.close();
                            } catch (error) {console.error(error)}
                            delete connections[clienteWS.id];
                        }
                        clienteWS.isAlive = false;
                    } catch (error) {
                        console.error(error);
                    }
                })
              }, optionsWebSocket.delayCheckConnection);
        }catch (error)
        {
            // new ExceptionSQLController().create(<IExceptionSQLModel>{
            //     codEmpresa      :   0,
            //     nomDB           :   '0',
            //     detalle         :   error.message,
            //     fechaHora       :   new DateUtils().getDateLocale(),
            //     codTipo         :   DBSQL.CODERRORWEBSOCKET
            // });
        }
   }


   abstract onOpen(clienteWs: IClientWS) : void;
   abstract onTextMessage(data : string, clienteWs : IClientWS) : void;
   abstract onBinaryMessage(binary : any, clienteWs : IClientWS) : void;  // array binary => binary : byte[]
   abstract onClose(code : Number, reason : string, clienteWs : IClientWS);

    /**
     * envía data para clientes que coincidan con los códigos...
     * codTipoDispositivo es alternativo..
     * @param data string
     * @param clienteWS IClientWS
     */
    public sendTextMessageByCliente(data : string, clienteWS : IClientWS) : void
    {
        let isEnvio = false;
        // console.log(this.listDispositivo.length + ' tamanio de cliente' )
        this.listDispositivo.forEach((iClientWS : IClientWS)=>
        {
            // console.log(iClientWS.codDispositivo + ' - ' + iClientWS.codTipoDispositivo + ' - ' + iClientWS.codEmpresa);
            if(this.isClienteIdentico(iClientWS, clienteWS))
            {


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
                iClientWS.ws.send(data)
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
    public sendBroadcast(data : string) : void
    { 
        this.listDispositivo.forEach((iClientWS : IClientWS)=>
        {
            iClientWS.ws.send(data)
        });
    }

    /**
     * @param data string
     * @param clienteWS IClientWS
     */
    public sendBroadcastByMacAddress(data : string, macAddress : string) : void
    { 
        this.listDispositivo.forEach((iClientWS : IClientWS)=>
        {
            if(iClientWS.macAddress == macAddress)
                iClientWS.ws.send(data)
        });
    }

    /**
     * @param data string
     * @param listCodUsuarios Array<Number>
     */
    public sendByListCodUsuarios(data : string, listCodUsuarios : Array<Number>) : void
    { 
        this.listDispositivo.forEach((iClientWS : IClientWS)=>
        {
            let isEncontroCliente = false;
            listCodUsuarios.forEach((codUsuario : number)=>
            {
                if(iClientWS.codUsuario == codUsuario && !isEncontroCliente)
                {
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
    // public sendByListSendDataSocket(listSendDataSocket : Array<ISendDataSocket>) : void
    // { 
    //     this.listDispositivo.forEach((iClientWS : IClientWS)=>
    //     {
    //         let isEncontroCliente = false;
    //         listSendDataSocket.forEach((sendDataSocket : ISendDataSocket)=>
    //         {
    //             if(iClientWS.codUsuario == sendDataSocket.codUsuario && !isEncontroCliente)
    //             {
    //                 iClientWS.ws.send(sendDataSocket.data);
    //                 isEncontroCliente = true;
    //             }
    //         });
    //     });
    // }


    /**
     * Envìa data a un grupo de clientes conectados, los cuales coincidan 
     * con el codUsuario..
     * @param data string
     * @param listCodUsuarios Array<Number>
     */
    // public sendByListSendDataSocketAllClients(listSendDataSocket : Array<ISendDataSocket>, isEnviarAClienteConCodCero ?: boolean ) : void
    // { 
    //     this.listDispositivo.forEach((iClientWS : IClientWS)=>
    //     {
    //         let isEncontroCliente = false;
    //         if(isEnviarAClienteConCodCero && iClientWS.codUsuario == 0)
    //         {
    //             let primeraTrama = listSendDataSocket[0].data;
    //             iClientWS.ws.send(primeraTrama);
    //         }else{
    //             listSendDataSocket.forEach((sendDataSocket : ISendDataSocket)=>
    //             {
    //                 if(iClientWS.codUsuario == sendDataSocket.codUsuario && !isEncontroCliente)
    //                 {
    //                     iClientWS.ws.send(sendDataSocket.data);
    //                     isEncontroCliente = true;
    //                 }
    //             });
    //         }
    //     });
    // }

    /**
     * compara atributos identificadores de ambos clientes
     * @param nuevoCliente IClientWS nueva conexión entrante
     * @param antiguoCliente IClientWS antigua conexión
     * @returns {boolean}
     */
    public isClienteIdentico(nuevoCliente : IClientWS, antiguoCliente : IClientWS) : boolean
    {
        return (nuevoCliente.idPerfil == antiguoCliente.idPerfil &&
                nuevoCliente.macAddress == antiguoCliente.macAddress &&
                nuevoCliente.codTipoDispositivo == antiguoCliente.codTipoDispositivo);
    }
    
}


class WebSocketCliente
{
    private webSocket : WebSocket;
    constructor(webSocket : WebSocket)
    {
        this.webSocket = webSocket;
    }

    /**
     * envía cadena a conexión viva
     * @param data String
     */
    public send(data : string) : void
    {
        try { 
            if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN)
                this.webSocket.send(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * cierra conexión viva
     */
    public close() : void
    {
        if (this.webSocket.readyState === WebSocket.OPEN)
            this.webSocket.close();
    }
}


interface IClientWS
{
    id : number;
    idPerfil : string;
    ipDispositivo : string;
    codTipoDispositivo : number;
    macAddress : string;
    v : string;
    md : string;
    ws : WebSocketCliente;
    isAlive : boolean;
    codUsuario : number;
    codEmpresa : number;
}

class Header
{
    public static idPerfil : string = 'idPerfil';
    public static ipDispositivo : string = 'ipDispositivo';
    public static macAddress : string = 'macAddress';
    // public static codEmpresa : string = 'codEmpresa';
    public static codTipoDispositivo : string = 'codTipoDispositivo';
    public static v : string = 'v';
    public static md : string = 'md';
    public static codUsuario : string = 'codUsuario';
    public static codEmpresa : string = 'codEmpresa';
}  

/**
 // ws://192.168.1.65:2022/ws?idDispositivo=284&codDispositivo=1&codEmpresa=10&imei=352570062085960&v=8.6.RGA
 * cabeceras de versión 8.6 e inferiores
 * TODO : CUANDO SE ACTUALICEN LOS GPS DEBE UTILIZARSE LAS NUEVAS CABECERAS
 */
class HeaderDispositivo
{
    public static idPerfil : string = 'idPerfil';
    public static ipDispositivo : string = 'ipDispositivo';
    public static macAddress : string = 'macAddress';
    public static codTipoDispositivo : string = 'codTipoDispositivo';
    public static v : string = 'v';
    public static md : string = 'md';
}

export {BaseWebSocket, WebSocket, Header, IClientWS};