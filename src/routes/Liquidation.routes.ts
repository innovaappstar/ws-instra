/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import {COD_BDGPSGENERAL} from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
import { BaseRoutes } from './BaseRoutes';
import PROCEDURES from '../sql/procedures.sql';
import LiquidationDEO = require('../deo/LiquidationDEO');
import '../define/MyExtensions.extensions'

export class LiquidationRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_LIQUIDATION_LIST = "/liquidation/list/?";
    private PATH_LIQUIDATION_REGISTER = "/liquidation/register/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_LIQUIDATION_LIST, this.getLiquidationList)
        this.router.get(this.PATH_LIQUIDATION_REGISTER, this.registerLiquidation)
    }

    // https://192.168.1.120:2032/api/regins/liquidation/list/?codUnidad=200&&codUsuarioSesion=10&&macAddress=asda5s4
    getLiquidationList = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           
            let ALIASJSON = "LIQUIDATION_LIST";

            if(requestLiquidation.codUsuarioSesion || requestLiquidation.codUnidad == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            // 27/11/2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104                                                                                                                                    //  
            // querySQL = `exec ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc} '${requestAuthLogin.username}|${requestAuthLogin.password}|27-11-2019 16:44:12|MAC1|1.1.1|1.1.2|SM-104', ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index}`;
            let querySQL = LiquidationDEO.getQueryLiquidationList(requestLiquidation);
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


    // https://192.168.1.120:2032/api/regins/liquidation/register/?auxiliar
    registerLiquidation = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           
            let ALIASJSON = "LIQUIDATION_REGISTER";

            if(requestLiquidation.auxiliar == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            // ProcUsuarioV2 '24|27/11/2019 17:02:00',13        --> login example: 27-11-2019 16:44:12
            let querySQL = LiquidationDEO.getQueryLiquidationRegister(requestLiquidation);
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

export interface IRequestLiquidation{

    codUnidad : number;
    macAddress : string;
    phoneModel : string;
    deviceVersion : string;
    applicationVersion : string;
    timeStamp : string;
    codUsuarioSesion : string;
    lat : string;
    lng : string;
    //esto recupera el json de liquidacion
    auxiliar : string;
}
