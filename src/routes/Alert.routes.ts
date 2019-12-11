/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import { COD_BDGPSGENERAL, COD_BDGPSPRUEBAS } from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
import { BaseRoutes } from './BaseRoutes';
import PROCEDURES from '../sql/procedures.sql';
import LiquidationDEO = require('../deo/LiquidationDEO');
import '../define/MyExtensions.extensions'
import Utils = require('../utils/Utils');
import AlertDEO = require('../deo/AlertDEO');

export class AlertaRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_REGISTER_ALERT = "/alert/register_alert/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_REGISTER_ALERT, this.getInsertAlert)
    }

    /**
    * @api {get} api/regins/alert/register_alert/?userCode=1&unitCode=1&driverCode=1&routeCode=1&controlCode=1&lat=11.222&lng=17.222&timeStamp=123456789012&companyCode=14 Return liquidation list from unit
    * @apiGroup Liquidation
    * @apiParam {int} unitCode Unit code.
    * @apiParam {int} userSessionCode user session code.
    * @apiParam {int} companyCode company code.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "ALERT_REGISTER" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad"
    *       }
    *    }
    * @apiErrorExample {json} Error
    *    HTTP/1.1 500 Internal Server Error
    */
    getInsertAlert = (req: Request, res: Response) => {
        try
        {
            let requestAlert : IRequestAlert = <any>req.query;           
            let ALIASJSON = "ALERT_REGISTER";

            if(requestAlert.userCode == null || requestAlert.unitCode == null || 
                requestAlert.driverCode == null || requestAlert.routeCode == null || 
                requestAlert.lat == null || requestAlert.controlCode == null || 
                requestAlert.timeStamp == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }

            let querySQL = AlertDEO.getQueryRegisterAlert(requestAlert);

            ORMAcess.execQuerySQL(querySQL, requestAlert.companyCode, true).then((result : any)=>{
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

export interface IRequestAlert {
    userCode : number;
    unitCode : number;
    driverCode : number;
    routeCode : number;
    controlCode : number;
    lat : number;
    lng : number;
    timeStamp : number;
    companyCode : number;
}