/**
 * Created by innovaapps on 20/03/2017.
 */
import DataWs = require('../entity/DataWs');
import IObserver = require('./IObserver');
import WebSocket = require("ws");
import { IClientSocket } from '../controllers/BaseSocket';

interface IObservable
{
    agregarObservadoresPredeterminados() : void;
    removerObservadoresPredeterminados() : void;
    agregarObservador(iObserver : IObserver): void;
    removerObservador(iObserver : IObserver): void;
    notificar(dataWs : DataWs, clienteSocket : IClientSocket) : void;
}
export = IObservable;