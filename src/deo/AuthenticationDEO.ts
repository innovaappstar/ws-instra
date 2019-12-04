/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import { IRequestAuth } from '../routes/Authentication.routes';
import PROCEDURES from '../sql/procedures.sql';
import '../define/MyExtensions.extensions'

class AuthenticationDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryAuthLogIn(request : IRequestAuth) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index;
        let proc = PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([request.username,
            request.password,
            request.timeStamp.convertToDateSQL(),
            request.macAddress,
            request.deviceVersion,
            request.applicationVersion,
            request.phoneModel
        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }

    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryAuthLogOut(request : IRequestAuth) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.AUTH_LOGOUT.index;
        let proc = PROCEDURES.DBGPSGENERAL.AUTH_LOGOUT.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([request.codUsuarioSesion, request.timeStamp.convertToDateSQL()]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }
}
export = AuthenticationDEO;