/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import {COD_BDGPSGENERAL} from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');

export class SMSReceiverRoutes {
    public router : Router = Router();

    private PATH_UPDATE_NUMERO_SMS = "/sms_receiver/update_numero_dispositivo/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
        // this.router.get("/", this.getTest)
        this.router.get(this.PATH_UPDATE_NUMERO_SMS, this.updateNumeroSMS)
    }

    // https://192.168.1.120:2032/api/abresms/sms_receiver/update_numero_dispositivo/?listSMS=A|b~c|d~
    updateNumeroSMS = (req: Request, res: Response) => {
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
            // ProcDispositivoTelefono '1|1|1|09/09/2019|10|1|123456789|APN|IMEI|SIM|Placa', 20
            // -- Obtiene parámetros
            // SELECT	@CodEmpresa = Data FROM @TbParametros WHERE N = 1
            // SELECT	@CodDispositivoAux = Data FROM @TbParametros WHERE N = 2
            // SELECT	@CodDispositivoTipo = Data FROM @TbParametros WHERE N = 3

            // SELECT	@FechaInicioDatosMoviles = Data FROM @TbParametros WHERE N = 4
            // SELECT	@NumKBConsumidos = Data FROM @TbParametros WHERE N = 5
            // SELECT	@ExisteInternet = Data FROM @TbParametros WHERE N = 6

            // SELECT	@Telefono = Data FROM @TbParametros WHERE N = 7
            // SELECT	@APN = Data FROM @TbParametros WHERE N = 8
            // SELECT	@IMEI = Data FROM @TbParametros WHERE N = 9

            // SELECT	@SimOperador = Data FROM @TbParametros WHERE N = 10
            // SELECT	@Placa = Data FROM @TbParametros WHERE N = 11
            // SELECT	@IdSqlite = Data FROM @TbParametros WHERE N = 12

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
    // @SerializedName("FIKB")
    // public String fechaInicioDatosMoviles = "";
    // @SerializedName("KB")
    // public int numKBConsumidos = 0;
    // @SerializedName("PIN")
    // public int isExisteInternet = 0;
    // @SerializedName("APN")
    // public String APNSeleccionado = "";
    // @SerializedName("LATLNG")
    // public String latlng = "";
    // @SerializedName("CODDISPOSITIVO")
    // public int codDispositivo = 0;
    // @SerializedName("CODEMPRESA")
    // public int codEmpresa = 0;
    // @SerializedName("IMEI")
    // public String imei = "";
    // @SerializedName("TIPO")
    // public int tipo = 0;  // DEFAULT => 1 (GPS) 
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
