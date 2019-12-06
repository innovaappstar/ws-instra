import DataWs = require("../entity/DataWs");
import DataWsDEO = require("../deo/DataWsDEO");
import DateUtils = require("./DateUtils");
import { BaseWebSocket, IClientWS } from "../controllers/BaseWebSocket";

/**
 * Created by user1 on 29/08/2017.
 */
export class CheckDataUtils
{
    private static REGEXCOMPROBACIONCONEXION = '1';
    private static REGEXCOMPROBACIONCONEXIONANTERIOR = '1|5';    // versiones anteriores a 7.x

    constructor(){};

    /**
     * comprueba datagrama de entrada y concatena valores
     * extras como codDispositivo y fechaHora in milisegundos.
     * Para evitar caer en index duplicate por mongodb
     * @param data String
     * @param clientWS IClientSocket
     * @param callback
     * @returns {string}
     */
    static comprobandoDatagrama(data : string, clientWS : IClientWS, callback : any)
    {
        let icheckData : ICheckData = {
            error : null,
            isResponder : false,
            message : '',
            data : data,
            dataWs : null
        };
        // comprobación de conexión constante por gps abeja (180 seg)
        if(data == this.REGEXCOMPROBACIONCONEXION || data == this.REGEXCOMPROBACIONCONEXIONANTERIOR)
        {
            icheckData.isResponder = true;
            icheckData.message = this.REGEXCOMPROBACIONCONEXION;
            callback(icheckData);
            return;
        }

        let dataWs : DataWs = new DataWsDEO(data).getDataWs();
        if(!(dataWs.isTipoTrack() && dataWs.isRegistroTrack()))
            data += '|' + clientWS.macAddress + '|' + new DateUtils().getDateLocale().getTime();

        icheckData.data = data;
        icheckData.dataWs = dataWs;
        callback(icheckData);
    };

}

export interface ICheckData
{
    error : boolean;
    isResponder : boolean;
    message : string;
    data : string;
    dataWs : DataWs;
}