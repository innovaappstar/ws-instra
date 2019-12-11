/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import { COD_BDGPSGENERAL, COD_BDCONIN, COD_BDGPSPRUEBAS } from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
import { BaseRoutes } from './BaseRoutes';
import PROCEDURES from '../sql/procedures.sql';
import CompanyDEO = require('../deo/CompanyDEO');
import '../define/MyExtensions.extensions'

export class CompanyRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_COMPANY_LIST = "/company/list/?";
    private PATH_COMPANY_LIST_AND_ROUTES = "/list/company_and_routes/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_COMPANY_LIST, this.getCompanyList)
        this.router.get(this.PATH_COMPANY_LIST_AND_ROUTES, this.getCompanyAndRoutesList)
    }

    /**
    * @api {get} /api/regins/company/?userCode=13 Return company list
    * @apiGroup Company
    * @apiParam {int} userCode User code.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "COMPANY_LIST" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad",
    *       }
    *    }
    * @apiErrorExample {json} List error
    *    HTTP/1.1 500 Internal Server Error
    */
   getCompanyList = (req: Request, res: Response) => {
        try
        {
            let requestAuthLogin : IRequestCompany = <any>req.query;           
            let ALIASJSON = "COMPANY_LIST";
            if(requestAuthLogin.userCode == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = CompanyDEO.getQueryCompanyList(requestAuthLogin);
            ORMAcess.execQuerySQL(querySQL, COD_BDGPSPRUEBAS, true).then((result : any)=>{
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

    // https://192.168.1.120:2032/api/regins/list/company_and_routes/?userCode=13&companyCod=14
    /**
    * @api {get} /api/regins/list/company_and_routes/?userCode=13&companyCod=14 Return company and routes list
    * @apiGroup Company
    * @apiParam {int} userCode User code.
    * @apiParam {int} companyCod Company code.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "COMPANY_LIST" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : ".....",
    *       }
    *    }
    * @apiErrorExample {json} List error
    *    HTTP/1.1 500 Internal Server Error
    */
   getCompanyAndRoutesList = (req: Request, res: Response) => {
        try
        {
            let requestCompany : IRequestCompany = <any>req.query;           
            let ALIASJSON = "COMPANY_AND_ROUTES_LIST";
            if(requestCompany.userCode == null || requestCompany.companyCode == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = CompanyDEO.getQueryCompanyAndRoutesList(requestCompany);
            ORMAcess.execQuerySQLXMLPath(querySQL, requestCompany.companyCode, true).then((result : any)=>{
                let rowAuthResponse = super.toObject(this.COL_NAME_RESPONSE, JSON.parse(result))
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

export interface IRequestCompany
{
    userCode : number;
    companyCode : number;
}
