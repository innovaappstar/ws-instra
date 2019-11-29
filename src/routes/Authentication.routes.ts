/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import {COD_BDGPSGENERAL} from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
import { BaseRoutes } from './baseRoutes';
import PROCEDURES from '../sql/procedures.sql';

export class AuthenticationRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_AUTH_LOGIN = "/auth/login/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_AUTH_LOGIN, this.getAuthLogin)
    }

    // https://192.168.1.120:2032/api/regins/auth/login/?username=xx&password=xx
    getAuthLogin = (req: Request, res: Response) => {
        try
        {
            let requestAuthLogin : IRequestAuth = <any>req.query;           
            let ALIASJSON = "AUTH_LOGIN";

            if(requestAuthLogin.username == null || requestAuthLogin.password == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            // 27/11/2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104                                                                                                                                    //  
            let querySQL = `exec ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc} '${requestAuthLogin.username}|${requestAuthLogin.password}', ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index}`;
            querySQL = `exec ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc} '${requestAuthLogin.username}|${requestAuthLogin.password}|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index}`;
            // querySQL = "exec ProcUsuarioV2 'ncorrales|6b6277afcb65d33525545904e95c2fa240632660|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', 12"
            // querySQL = "exec ProcUsuarioV2 'ncorrales|6b6277afcb65d33525545904e95c2fa240632660|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', 144"
            ORMAcess.execQuerySQL(querySQL, COD_BDGPSGENERAL).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(ALIASJSON, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : error.message});
                res.send(JSON.stringify(resultado));
            })
        }catch (error)
        {
            console.error(error);
        }
    }
}

export interface IRequestAuth{
    username : string;
    password : string;
    dateTime : string;
    macAddress : string;
    phoneModel : string;
    deviceVersion : string;
    applicationVersion : string;
}
