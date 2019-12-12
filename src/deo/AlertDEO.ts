/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import { IRequestAuth } from '../routes/Authentication.routes';
import PROCEDURES from '../sql/procedures.sql';
import '../define/MyExtensions.extensions'
import { IRequestLiquidation, IRequestLiquidationRegister, IRequestBoleto } from '../routes/Liquidation.routes';
import e = require('express');
import { IRequestAlert } from '../routes/Alert.routes';

class AlertDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryRegisterAlert(request : IRequestAlert) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.REGISTER_ALERT.index;
        let proc = PROCEDURES.DBGPSGENERAL.REGISTER_ALERT.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([
            request.userCode.toString(),
            request.unitCode.toString(),
            request.driverCode.toString(),
            request.routeCode.toString(),
            request.controlCode.toString(),
            request.lat.toString(),
            request.lng.toString(),
            request.timeStamp.toString().convertToDateSQL()
        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }
}

export = AlertDEO;