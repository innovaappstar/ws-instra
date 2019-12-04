/**
 * Created by innovaapps on 20/03/2017.
 */
import DataWs = require('../entity/DataWs');
import WebSocket = require("ws");
import { IClientSocket } from '../controllers/BaseSocket';

interface IObserver
{
    update(dataWs : DataWs, clientSocket : IClientSocket) : void;
}
export = IObserver;