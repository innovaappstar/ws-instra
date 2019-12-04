import IObserver = require("./IObserver");
import IObservable = require("./IObservable");
import DataWs = require("../entity/DataWs");
import WebSocket = require("ws");
import { IClientSocket } from "../controllers/BaseSocket";

/**
 * Created by innovaapps on 20/03/2017.
 */
class Observable implements IObservable
{
    public static listObservadores : Array<IObserver> = [];

    agregarObservadoresPredeterminados(): void {
        // Observable.listObservadores.push(new ClienteWebObserver());
    }

    removerObservadoresPredeterminados(): void {
        Observable.listObservadores = [];
    }

    agregarObservador(iObserver: IObserver): void {
        Observable.listObservadores.push(iObserver);
    }

    removerObservador(iObserver: IObserver): void {
        Observable.listObservadores.forEach((iObserverItem : IObserver, index : number)=>
        {
           if (iObserver === iObserverItem)
           {
               Observable.listObservadores.splice(index, 1);// elimina un elemento que coincida- probar
               return;
           }
        });
    }

    notificar(dataWs: DataWs, clientSocket : IClientSocket): void {
        Observable.listObservadores.forEach((iObserverItem : IObserver)=>
        {
            iObserverItem.update(dataWs, clientSocket);
        });
    }
}
export = Observable;