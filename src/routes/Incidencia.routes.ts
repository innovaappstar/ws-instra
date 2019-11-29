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
import HttpUtils = require('../http/HttpUtils');

export class IncidenciaRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_REGISTRO_INCIDENCIA = "/registro/incidencia/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_REGISTRO_INCIDENCIA, this.postRegistroIncidencia)
    }

    // https://192.168.1.120:2032/api/regins/registro/incidencia/?
    postRegistroIncidencia = (req: Request, res: Response) => {
        try
        {
            let requestRegIncidencia : IRequestIncidencia = <any>req.body;           
            let ALIASJSON = "REGISTRO_INCIDENCIA";
            

            HttpUtils.checkService()
            
            // // ins.ProcIncidencia '1|1|test3|3|25/11/2019 10:39:30|-11.976406|-77.087933|test2|01|PRS-111|Prueba|ruta|control',20
            // if(requestRegIncidencia.codInfraccion == null || requestRegIncidencia.IMAGEN == null)
            // {
            //     let resultado = super.toObject(ALIASJSON, {
            //             codResultado : 0,
            //             desResultado : "No tiene permisos necesarios"});
            //     res.send(JSON.stringify(resultado));
            //     return;
            // }
                                                                                                                                                                
            // let querySQL = `exec ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.proc} '${requestRegIncidencia.codConductor}|${requestRegIncidencia.codInspector}', ${PROCEDURES.DBGPSGENERAL.AUTH_LOGIN.index}`;
            // ORMAcess.execQuerySQL(querySQL, COD_BDGPSGENERAL).then((result : any)=>{
            //     let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
            //     let resultado = super.toObject(ALIASJSON, rowAuthResponse);
            //     res.send(resultado);
            // }).catch((error : Error)=>{
            //     let resultado = super.toObject(ALIASJSON, {
            //             codResultado : 0,
            //             desResultado : error.message});
            //     res.send(JSON.stringify(resultado));
            // })
        }catch (error)
        {
            console.error(error);
        }
    }

}
export interface IRequestIMAGEN{
    idIncidencia : number;
    imagen : Array<Number>;
    ID : number;
}

export interface IRequestIncidencia{
    IMAGEN : Array<IRequestIMAGEN>;
    codInfraccion : number;
    codConductor : number;
    codEmpresa : number;
    codSesion : number;
    codInspector : number;
    fechaHora : string;
    timeStamp : number;
    flagEnviado : number;
    latitud : string;
    longitud : string;
    modeloDispositivo : string;
    // nomConductor : string;
    // nomInspector : string;
    observacion : string;
    padron : string;
    placa : string;
    sentido : string;
    urlFoto : string;
    versionApp : string;
    versionDispotivo : string;
    wlan : string;
    ID : number;
}
