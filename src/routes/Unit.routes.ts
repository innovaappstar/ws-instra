/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.

 https://blog.jscrambler.com/documenting-apis-using-apidoc-js/
 apidoc - e "(node_modules|public|doc)" - o public / apidoc
 https://github.com/apidoc/apidoc/issues/545
https://apidocjs.com/#param-api-param-example   
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
    private ALIAS_JSON_UNIT_DETAIL = "UNIT_DETAIL";
    
    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_UNIDAD_DETALLE, this.getUnitDetail)
    }

    /**
    * @api {get} /api/regins/unit/detalle/?timeStamp=1234567890&userSessionCode=123&userCod=321&companyCod=123&unitCod=13 Return unit detail
    * @apiGroup Unit
    * @apiName GetUnitDetail
    * @apiHeader {String} authorization authorization token.
    * @apiParam {Number} timeStamp TimeStamp.
    * @apiParam {Number} userSessionCode User session code.
    * @apiParam {Number} userCode User code.
    * @apiParam {Number} companyCode Company code
    * @apiParam {Number} unitCode Unit code.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "UNIT_DETAIL" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad",
    *           "id": 1,
    *           "title": "Study",
    *           "done": false
    *           "updated_at": "2016-02-10T15:46:51.778Z",
    *           "created_at": "2016-02-10T15:46:51.778Z"
    *       }
    *    }
    * @apiErrorExample {json} List error
    *    HTTP/1.1 500 Internal Server Error
    */
    getUnitDetail = (req: Request, res: Response) => {
        try
        {
            let requestUnitDetail : IRequestUnidad = <any>req.query;           
            if(requestUnitDetail.userCode == null || requestUnitDetail.userSessionCode == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_UNIT_DETAIL, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = UnitDEO.getQueryUnitDetail(requestUnitDetail);
            ORMAcess.execQuerySQL(querySQL, requestUnitDetail.companyCode).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let response = super.toObject(this.ALIAS_JSON_UNIT_DETAIL, rowAuthResponse);
                res.send(response);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_UNIT_DETAIL, {
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
