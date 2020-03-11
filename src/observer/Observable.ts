import IObserver = require("./IObserver");
import IObservable = require("./IObservable");
import DataWs = require("../entity/DataWs");
import UnidadObserver = require("./UnidadObserver");
import UsuarioObserver = require("./UsuarioObserver");
import { IClientWS } from "../controllers/BaseWebSocket";



/**
 * Created by innovaapps on 20/03/2017.
 */
class Observable implements IObservable
{
    public static listObservadores : Array<IObserver> = [];

    // constructor() {
    // }

    agregarObservadoresPredeterminados(): void {
        Observable.listObservadores.push(new UnidadObserver());
        Observable.listObservadores.push(new UsuarioObserver());
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

    notificar(dataWs: DataWs, clientWS : IClientWS): void {
        Observable.listObservadores.forEach((iObserverItem : IObserver)=>
        {
            iObserverItem.update(dataWs, clientWS);
        });
    }
}
// export default Observable
export = Observable;