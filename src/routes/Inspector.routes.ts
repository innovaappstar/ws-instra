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
import InspectorDEO = require('../deo/InspectorDEO');

export class InspectorRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_INSPECTOR_PROFILE = "/inspector/profile/?";
    private ALIAS_JSON_INSPECTOR_PROFILE = "INSPECTOR_PROFILE";

    constructor() {
        super()
        this.initializeRoutes();
    }
   
    public initializeRoutes() {
        this.router.get(this.PATH_INSPECTOR_PROFILE, this.getInspectorProfile)
    }

    /**
    * @api {get} api/regins/inspector/profile/?userCode=1&companyCode=14
    * @apiGroup Inspector
    * @apiHeader {String} authorization authorization token.
    * @apiName Inspector Profile
    * @apiParam {Number} userCode user code.
    * @apiParam {Number} companyCode company Code.
    * @apiSuccessExample {json} Success
    *    HTTPS/1.1 200 OK
    *    {
    *       "INSPECTOR_PROFILE" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "datos de unidades intervidas (cantidad)"
    *       }
    *    }
    * @apiErrorExample {json} Error
    *    HTTPS/1.1 500 Internal Server Error
    */
    getInspectorProfile = (req: Request, res: Response) => {
        try
        {
            let requestInspector : IRequestInspector = <any>req.query;           

            if(requestInspector.userCode == null || requestInspector.companyCode == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_INSPECTOR_PROFILE, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }

            let querySQL = InspectorDEO.getQueryProfileInspector(requestInspector);

            ORMAcess.execQuerySQL(querySQL, requestInspector.companyCode, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_INSPECTOR_PROFILE, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_INSPECTOR_PROFILE, {
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

export interface IRequestInspector {
    userCode : number;
    companyCode : number;
}