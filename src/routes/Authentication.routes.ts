/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import {COD_BDGPSGENERAL} from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
import { BaseRoutes } from '../routes/BaseRoutes';
import PROCEDURES from '../sql/procedures.sql';
import AuthenticationDEO = require('../deo/AuthenticationDEO');
import '../define/MyExtensions.extensions'

export class AuthenticationRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_AUTH_LOGIN = "/auth/login/?";
    private PATH_AUTH_LOGOUT = "/auth/logout/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_AUTH_LOGIN, this.getAuthLogin)
        this.router.get(this.PATH_AUTH_LOGOUT, this.getAuthLogOut)
    }

    // https://192.168.1.120:2032/api/regins/auth/login/?username=xx&password=xx&timeStamp=xx&macAddress=xx&deviceVersion=xx&applicationVersion=xx&phoneModel=xx
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
            // querySQL = `exec ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc} '${requestAuthLogin.username}|${requestAuthLogin.password}|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index}`;
            let querySQL = AuthenticationDEO.getQueryAuthLogIn(requestAuthLogin);
            // "exec ProcUsuarioV2 'ncorrales|6b6277afcb65d33525545904e95c2fa240632660|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', 144"
            // "exec dbo.ProcUsuarioV2 'ncorrales','6b6277afcb65d33525545904e95c2fa240632660','03-12-2019 16:29:14','20:32:6C:12:39:0C','9','1.0','SM-A505G' , 12"
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


    // https://192.168.1.120:2032/api/regins/auth/logout/?timeStamp=xx&lat=xx&lng=xx&codUsuarioSesion=xx
    getAuthLogOut = (req: Request, res: Response) => {
        try
        {
            let requestAuthLogOut : IRequestAuth = <any>req.query;           
            let ALIASJSON = "AUTH_LOGOUT";

            if(requestAuthLogOut.timeStamp == null || requestAuthLogOut.lat == null || requestAuthLogOut.lng == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            // ProcUsuarioV2 '24|27/11/2019 17:02:00',13        --> login example: 27-11-2019 16:44:12
            let querySQL = AuthenticationDEO.getQueryAuthLogOut(requestAuthLogOut);
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

    timeStamp : string;
    codUsuarioSesion : string;
    lat : string;
    lng : string;
}
