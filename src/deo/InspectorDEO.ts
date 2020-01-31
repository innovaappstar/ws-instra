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
import { IRequestInspector } from '../routes/Inspector.routes';

class InspectorDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryProfileInspector(request : IRequestInspector) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.INSPECTOR_PROFILE.index;
        let proc = PROCEDURES.DBGPSGENERAL.INSPECTOR_PROFILE.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([
            request.userCode.toString()
        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }
}

export = InspectorDEO;