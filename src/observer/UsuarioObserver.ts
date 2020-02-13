/**
 * Created by usuario on 11/05/2017.
 */
import IObserver = require("./IObserver");
import JSONUtils = require("../utils/JSONUtils");
import { IClientWS } from "../controllers/BaseWebSocket";
import { ORMAcess } from '../orm/ORMAcces';
import DataWs = require("../entity/DataWs");
import LocalizacionUsuarioDEO = require("../deo/LocalizacionUsuarioDEO");

/**
 * Created by innovaapps on 20/03/2017.
 */
class UsuarioObserver implements IObserver
{
    public static FORMATO_FECHA = "dd/mm/yy hh:MM:ss";
    public static FORMATO_FECHA_YYYY = "dd/mm/yyyy hh:MM:ss";
    // private dbSQL : DBSQL = new DBSQL();
    constructor(){}

    //     lng : -76.89382,
    //     lat : -12.23058,
    //     rango : 2000
    //     codEmpresa : 15
    //
    // 1|3|1|1|localizaciOn unidades|1#-76.89382|-12.23058|2000|14
    update(dataWs: DataWs, clientWS : IClientWS): void {
        if (dataWs.isTipoUsuario())
        {
            if(dataWs.isLocalizacionUsuario()){
                this.localizacionUsuario(dataWs, clientWS);
            }
        }
    }

    /**
     * retorna la lista de unidades cercanas al usuario..
     * @param dataWs
     * @param clientWS
     */
    localizacionUsuario(dataWs : DataWs, clientWS : IClientWS) : void
    {

        console.log(dataWs + "")
        console.log(clientWS + "")

        let querySQL = new LocalizacionUsuarioDEO().getQuerySQLLocalizacionUsuario(dataWs, clientWS);

        ORMAcess.execQuerySQL(querySQL, 10  ,true).then((result : any)=>{

            


        }).catch((error : Error)=>{

            console.log(error )
        })
    }





    
}
export = UsuarioObserver;