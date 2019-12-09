/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import {COD_BDGPSGENERAL} from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');

export class ReporteUnidad {
    public router : Router = Router();

    private PATH_LISTA_EMPRESAS = "/reporte_unidad/lista_empresas/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
        // this.router.get("/", this.getTest)
        this.router.get(this.PATH_LISTA_EMPRESAS, this.listaEmpresas)
    }

    // https://192.168.1.120:2032/api/abresms/sms_receiver/update_numero_dispositivo/?listSMS=A|b~c|d~
    listaEmpresas = (req: Request, res: Response) => {
        try
        {
            let requestSMSSerializado : IRequestSMSSerializado = <any>req.query;
            if(requestSMSSerializado.listSMS == null)
            {
                let resultado = {UPDATE_NUMERO_TELEFONO : {
                    CodResultado : 0,
                    DesResultado : "No tiene permisos necesarios"}};
                res.send(JSON.stringify(resultado));
                return;
            }
            let listStringSMS = requestSMSSerializado.listSMS.split("~");
            let auxiliar = '';
            listStringSMS.forEach((registroStringSMS : string, index : number)=>{
                let columnasRegistroSMS = registroStringSMS.split('|');

                let registroSMS : IRequestSMSDispositivo = {
                    fechaInicioDatosMoviles : columnasRegistroSMS[0],
                    numKBConsumidos : <any>columnasRegistroSMS[1], 
                    isExisteInternet : <any>columnasRegistroSMS[2],
                    numTelefono : columnasRegistroSMS[3],
                    APN : columnasRegistroSMS[4],
                    latlng : columnasRegistroSMS[5], 
                    codDispositivo : <any>columnasRegistroSMS[6],
                    codEmpresa : <any>columnasRegistroSMS[7], 
                    imei : columnasRegistroSMS[8],     
                    tipo : <any>columnasRegistroSMS[9],      // 1 (gps) | 2 (tsir)
                    simOperador :<any>columnasRegistroSMS[10] || '0', // PENDIENTEEEE 
                    placa : columnasRegistroSMS[11] || '0',
                    _idSQLite : <any>columnasRegistroSMS[12], // _id 
                };
                let dataAuxiliar =  registroSMS.codEmpresa + '|' + registroSMS.codDispositivo + '|' + registroSMS.tipo+ '|' + registroSMS.fechaInicioDatosMoviles + '|' +
                registroSMS.numKBConsumidos + '|' + registroSMS.isExisteInternet + '|' + registroSMS.numTelefono + '|' + registroSMS.APN + '|' + registroSMS.imei + '|' +
                registroSMS.simOperador + '|' + registroSMS.placa + '|' + registroSMS._idSQLite ;

                dataAuxiliar += ( (listStringSMS.length == (index + 1))? '' : '~');
                auxiliar += dataAuxiliar;
            })

            // (Android) fechaInicioDatosMoviles|numKBConsumidos|isExisteInternet|numTelefono|APN|latlng|codDispositivo|codEmpresa|imei|tipo|simOperador|placa|_idSQLite|~
            let querySQL =  `exec ProcDispositivoTelefono '${auxiliar}', 20`;
            ORMAcess.execQuerySQL(querySQL, COD_BDGPSGENERAL).then((result : any)=>{
                let jsonResult = JSONUtils.convertArrayJSONtoObjectCabeceraDetalle(result, "UPDATE_NUMERO_TELEFONO", ["CodResultado", "DesResultado", "SerializadoSQLite"]);
                res.send(JSON.stringify(jsonResult));
                console.log(jsonResult);
            }).catch((error : Error)=>{
                let resultado = {UPDATE_NUMERO_TELEFONO : {
                    CodResultado : 0,
                    DesResultado : error.message}};
                res.send(JSON.stringify(resultado));
            })

        }catch (error)
        {
            console.error(error);
        }
    }

  }

export interface IRequestSMSSerializado{
    listSMS : string;
}
export interface IRequestSMSDispositivo{
fechaInicioDatosMoviles : string;
numKBConsumidos : number;  
isExisteInternet : number;  
numTelefono : string;  
APN : string;  
latlng : string;  
codDispositivo : number;  
codEmpresa : number;  
imei : string;      
tipo : number;      // 1 (gps) | 2 (tsir)
simOperador : number; // PENDIENTEEEE 
placa : string;
_idSQLite : number; // _id 
}
