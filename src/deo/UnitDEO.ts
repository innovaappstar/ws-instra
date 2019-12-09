/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import { IRequestAuth } from '../routes/Authentication.routes';
import PROCEDURES from '../sql/procedures.sql';
import '../define/MyExtensions.extensions'
import { IRequestUnidad } from '../routes/Unit.routes';

class UnitDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryUnitDetail(request : IRequestUnidad) : string
    {
        let indice = PROCEDURES.DBPRUEBAS.UNIT_DETAIL.index;
        let proc = PROCEDURES.DBPRUEBAS.UNIT_DETAIL.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([request.unitCode]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }
}
export = UnitDEO;