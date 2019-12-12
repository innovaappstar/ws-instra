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

export class LiquidationRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_LIQUIDATION_LIST = "/liquidation/list/?";
    private ALIAS_JSON_LIQUIDATION_LIST = "LIQUIDATION_LIST";

    private PATH_LIQUIDATION_REGISTER = "/liquidation/register/?";
    private ALIAS_JSON_LIQUIDATION_REGISTER = "LIQUIDATION_REGISTER";
    
    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_LIQUIDATION_LIST, this.getLiquidationList)
        this.router.get(this.PATH_LIQUIDATION_REGISTER, this.registerLiquidation)
    }

    /**
    * @api {get} api/regins/liquidation/list/?userSessionCode=200&unitCode=200
    * @apiGroup Liquidation
    * @apiName GetLiquidationListFromUnit
    * @apiParam {Number} unitCode Unit code.
    * @apiParam {Number} userCode user Code.
    * @apiParam {Number} userSessionCode user session code.
    * @apiParam {Number} companyCode company code.
    * @apiParam {Number} timeStamp time Stamp.
    * @apiParam {Number} lat lat.
    * @apiParam {Number} lng lng.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "LIQUIDATION_LIST" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad"
    *       }
    *    }
    * @apiErrorExample {json} Error
    *    HTTP/1.1 500 Internal Server Error
    */
    getLiquidationList = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           

            if(requestLiquidation.userSessionCode == null || requestLiquidation.unitCode == null || 
                requestLiquidation.companyCode == null || requestLiquidation.userCode == null || 
                requestLiquidation.timeStamp == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_LIST, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }

            let querySQL = LiquidationDEO.getQueryLiquidationList(requestLiquidation);

            ORMAcess.execQuerySQL(querySQL, requestLiquidation.companyCode, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_LIST, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_LIST, {
                        codResultado : 0,
                        desResultado : error.message});
                res.send(JSON.stringify(resultado));
            })
        }catch (error)
        {
            console.error(error);
        }
    }
    
    /**
    * @api {get} api/regins/liquidation/register/?codBoleto=12&inicioCorteBoleto=12&finCorteBoleto=12&cantidadReintegro=12 Register liquidation
    * @apiGroup Liquidation
    * @apiName GetRegisterLiquidation
    * @apiParam {Number} codBoleto TicketCode.
    * @apiParam {Number} inicioCorteBoleto Ticket cut start.
    * @apiParam {Number} finCorteBoleto Ticket cut end.
    * @apiParam {Number} cantidadReintegro Refund quantity
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "LIQUIDATION_REGISTER" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "register liquidation"
    *       }
    *    }
    * @apiErrorExample {json} Error
    *    HTTP/1.1 500 Internal Server Error
    */
    registerLiquidation = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           
            if(requestLiquidation.auxiliar == null || requestLiquidation.companyCode == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_REGISTER, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = LiquidationDEO.getQueryLiquidationRegister(requestLiquidation);
            
            ORMAcess.execQuerySQL(querySQL, requestLiquidation.companyCode, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_REGISTER, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_LIQUIDATION_REGISTER, {
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

    userSessionCode : number;
    unitCode : number;
    companyCode : number;
    timeStamp : number;
    lat : number;
    lng : number;
    userCode : number;
    //esto recupera el json de liquidacion
    auxiliar : string;
}


export interface IRequestLiquidationRegister{

    ruteCode : number,
    userControlCode : number,
    observacion : string,
    userCode : number,
    unitCode : number,
    latitude : string,
    longitude : string,
    settlementType : number,
    dateTime : string,
    driverId : number
    boletos : Array<IRequestBoleto> ;
}

export interface IRequestBoleto {

    codBoleto : number,
    inicio : string,
    actual : string,
    cantidadReintegro : number,
}