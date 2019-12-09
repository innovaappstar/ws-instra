/**
 * Created by innovaapps on 20/03/2017.
 */
import DataWs = require('../entity/DataWs');
import WebSocket = require("ws");
import { IClientWS } from '../controllers/BaseWebSocket';

interface IObserver
{
    update(dataWs : DataWs, clientWS : IClientWS) : void;
}
export = IObserver;