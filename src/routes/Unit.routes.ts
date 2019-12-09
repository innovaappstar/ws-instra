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
import AuthenticationDEO = require('../deo/AuthenticationDEO');
import '../define/MyExtensions.extensions'
import UnitDEO = require('../deo/UnitDEO');

export class UnitRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_UNIDAD_DETALLE = "/unit/detalle/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_UNIDAD_DETALLE, this.getUnitDetail)
    }

    // https://192.168.1.120:2032/api/regins/unit/detalle/?timeStamp=xx&userSessionCode=xx&userCod=xx&companyCod=xx&unitCod=xx
    getUnitDetail = (req: Request, res: Response) => {
        try
        {
            let requestUnitDetail : IRequestUnidad = <any>req.query;           
            let ALIASJSON = "UNIT_DETAIL";

            if(requestUnitDetail.userCode == null || requestUnitDetail.userSessionCode == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = UnitDEO.getQueryUnitDetail(requestUnitDetail);
            ORMAcess.execQuerySQL(querySQL, requestUnitDetail.companyCode).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let response = super.toObject(ALIASJSON, rowAuthResponse);
                res.send(response);
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

export interface IRequestUnidad{
    // applicationVersion : string;
    timeStamp : string;
    userSessionCode : string;
    userCode : string;
    companyCode : number;
    unitCode : string;
}
