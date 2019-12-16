/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { ORMAcess } from '../orm/ORMAcces';
import { COD_BDGPSGENERAL, COD_BDGPSPRUEBAS } from '../config/connectionString';
import JSONUtils = require('../utils/JSONUtils');
// import { BaseRoutes } from './baseRoutes';
import { BaseRoutes } from '../routes/BaseRoutes' 
import PROCEDURES from '../sql/procedures.sql';
import { IRequestBoleto } from './Liquidation.routes';
import HttpUtils = require('../http/HttpUtils');
import multer = require('multer');
import IncidenciaDEO = require('../deo/IncidenciaDEO');

let KEY_INCIDENCE = "Incidence";
let KEY_PHOTOS = "Photos";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
var upload = multer({ storage: storage })
let cpUpload = upload.fields([{ name: KEY_PHOTOS, maxCount: 3 }])

export class IncidenciaRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_REGISTRO_INCIDENCIA = "/registro/incidencia/?";
    private ALIAS_JSON_REGISTRO_INCIDENCIA = "REGISTRO_INCIDENCIA";

    private PATH_LISTA_INFRACCION = "/lista/infraccion/?";
    private ALIAS_JSON_INFRACTION_LIST = "INFRACTION_LIST";

    private PATH_LISTA_INCIDENCIA = "/lista/incidencia_inspeccion/?";
    private ALIAS_JSON_INCIDENT_LIST = "INCIDENT_LIST";



    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        // this.router.get(this.PATH_REGISTRO_INCIDENCIA, this.postRegistroIncidencia)
        this.router.get(this.PATH_LISTA_INCIDENCIA, this.getIncidentAndInspectionList),
        this.router.get(this.PATH_LISTA_INFRACCION, this.getInfractionsList),
        this.router.post(this.PATH_REGISTRO_INCIDENCIA, cpUpload, this.postRegistroIncidencia)
    }
    
    /**
    * @api {get} /api/regins/lista/incidencia_inspeccion/?userCode=13&type=1
    * @apiGroup Incidence
    * @apiHeader {String} authorization authorization token.
    * @apiName GetIncidenceAndInspectionList
    * @apiParam {Number} userCode User code.
    * @apiParam {Number} type type
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "INCIDENT_LIST" : 
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
    getIncidentAndInspectionList = (req: Request, res: Response) => {
        try
        {
            let requestInfraction : IRequestInfraction = <any>req.query;           
            if(requestInfraction.userCode == null || requestInfraction.type == null || requestInfraction.companyCode == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_INCIDENT_LIST, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = IncidenciaDEO.getQueryIncidentAndInspectionList(requestInfraction);
            ORMAcess.execQuerySQL(querySQL, requestInfraction.companyCode, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_INCIDENT_LIST, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_INCIDENT_LIST, {
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
    * @api {get} /api/regins/lista/infraccion/?userCode=13 Return Incidence and inspection list
    * @apiGroup Incidence
    * @apiHeader {String} authorization authorization token.
    * @apiName GetInspectionList
    * @apiParam {Number} userCode User code.
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "INFRACTION_LIST" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad",
    *       }
    *    }
    * @apiErrorExample {json} List error
    *    HTTP/1.1 500 Internal Server Error
    */
    getInfractionsList = (req: Request, res: Response) => {
        try
        {
            let requestInfraction : IRequestInfraction = <any>req.query;           
            if(requestInfraction.userCode == null)
            {
                let resultado = super.toObject(this.ALIAS_JSON_INFRACTION_LIST, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = IncidenciaDEO.getQueryInfractionList(requestInfraction);
            ORMAcess.execQuerySQL(querySQL, COD_BDGPSPRUEBAS, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_INFRACTION_LIST, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_INFRACTION_LIST, {
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
    * @api {post} /registro/incidencia/? Register a new incidence
    * @apiGroup Incidence
    * @apiHeader {String} authorization authorization token.
    * @apiName PostRegisterNewIncidence
    * @apiParam {files} Photos Photos.
    * @apiParamExample {json} Incidence
    *    {
    *      "listPhotos": 1,
    *      "codInfraccion": 1,
    *      "codConductor": 12,
    *      "codEmpresa": 14,
    *      "codSesion": 14,
    *      "codInspector": 123,
    *      "fechaHora": 98967893111,
    *      "timeStamp": 98967893111,
    *      "flagEnviado": 1,
    *      "latitud": 11.1234,
    *      "longitud": 17.123456,
    *      "modeloDispositivo": "Pocket2",
    *      "observacion": "mi observaciòn de ejemplo",
    *      "padron": "015",
    *      "placa": "XXX-069",
    *      "sentido": "A",
    *      "urlFoto": "www.xxx.com",
    *      "versionApp": "12.2",
    *      "versionDispositivo": "8.1.2",
    *      "wlan": "AB:CD:EF:GH:IJ",
    *      "ID": 1,
    *      "codUnidad": 12,
    *      "codRuta": 1,
    *      "codControl": 12,
    *      "fechaHoraCreacion": 98967893111
    * }
    * @apiSuccessExample {json} Success
    *    HTTP/1.1 200 OK
    *    {
    *       "REGISTRO_INCIDENCIA" : 
    *       {
    *           "codResultado" : 1,
    *           "desResultado" : "detalle de la unidad",
    *       }
    *    }
    * @apiErrorExample {json} Register error
    *    HTTP/1.1 500 Internal Server Error
    */
    postRegistroIncidencia = (req: Request, res: Response, next) => {
        try
        {
            let requestRegIncidencia : IRequestIncidencia = <IRequestIncidencia>JSON.parse(req.body[KEY_INCIDENCE]);  
            let listPhotos : Array<IRequestPhoto> = []
            if(req.files != null && req.files[KEY_PHOTOS] && Object.keys(req.files).length > 0 )  
                listPhotos = <any>req.files[KEY_PHOTOS]
            requestRegIncidencia.listPhotos = listPhotos;
            if(listPhotos.length > 0){
                HttpUtils.uploadFilesToHosting(requestRegIncidencia, (error : Error, result : IPOSTPhoto)=>{
                    if(error){
                        console.error(error);
                        return;
                    }
                    this.registroPhoto(res, requestRegIncidencia, result)
                    // llamar al proc execSQL
                    // let querySQL = IncidenciaDEO.getQueryRegistroIncidencia(requestRegIncidencia, result);
                    // ORMAcess.execQuerySQL(querySQL, requestRegIncidencia.codEmpresa).then((result : any)=>{
                    //     let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                    //     let resultado = super.toObject(ALIASJSON, rowAuthResponse);
                    //     res.send(resultado);
                    // }).catch((error : Error)=>{
                    //     let resultado = super.toObject(ALIASJSON, {
                    //             codResultado : 0,
                    //             desResultado : error.message});
                    //     res.send(JSON.stringify(resultado));
                    // })
                })
            }else{
                // llamar al proc execSQL
                this.registroPhoto(res, requestRegIncidencia)
                // let querySQL = IncidenciaDEO.getQueryRegistroIncidencia(requestRegIncidencia);
                // ORMAcess.execQuerySQL(querySQL, requestRegIncidencia.codEmpresa).then((result : any)=>{
                //     let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                //     let resultado = super.toObject(ALIASJSON, rowAuthResponse);
                //     res.send(resultado);
                // }).catch((error : Error)=>{
                //     let resultado = super.toObject(ALIASJSON, {
                //             codResultado : 0,
                //             desResultado : error.message});
                //     res.send(JSON.stringify(resultado));
                // })
            }
        }catch (error)
        {
            console.error(error);
        }
    }
    
    registroPhoto = (res: Response, requestRegIncidencia : IRequestIncidencia, postPhoto ?: IPOSTPhoto) => {
        try
        {
            // requestRegIncidencia.codInfraccion = 1;   // codEmpresa de pruebas para los testings !!
            // requestRegIncidencia.codEmpresa = 25;   // codEmpresa de pruebas para los testings !!
            // requestRegIncidencia.codUnidad = 199;

            let querySQL = IncidenciaDEO.getQueryRegistroIncidencia(requestRegIncidencia, postPhoto);
            ORMAcess.execQuerySQL(querySQL, requestRegIncidencia.codEmpresa, true).then((result : any)=>{
                let rowAuthResponse = super.rowToObject(this.COL_NAME_RESPONSE, result[0])
                let resultado = super.toObject(this.ALIAS_JSON_REGISTRO_INCIDENCIA, rowAuthResponse);
                res.send(resultado);
            }).catch((error : Error)=>{
                let resultado = super.toObject(this.ALIAS_JSON_REGISTRO_INCIDENCIA, {
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



        
export interface IRequestInfraction{
    userCode : number;
    codIncidenciaTipo : number;
    nomIncidenciaTipo : string;
    codigoIncidencia : number;
    abrevNomIncideciaTipo : string;
    type : number; // 1 -> liquidaciones | 0 -> incidencias 
    companyCode : number;
}


// $data = ['codResultado' => $FILES_UPLOADED_SUCCESSFULLY, 'descripcion' => 'Los archivos fueron cargados exitosamente.' , 'listPhotoLinks' => $listPhotoLinks];

export interface IPOSTPhoto{
    codResultado : number;
    descripcion : string;
    listPhotoLinks : Array<string>;
}

export interface IRequestPhoto{
    destination : string;
    encoding : string;
    fieldname : string;
    filename : string;
    mimetype : string;
    originalname : string;
    path : string;
    size : number;
}

export interface IRequestIncidencia{
    // IMAGEN : Array<IRequestIMAGEN>;
    listPhotos : Array<IRequestPhoto>;
    codInfraccion : number;
    idConductor : number;
    codEmpresa : number;
    codSesion : number;
    codInspector : number;
    fechaHora : string;
    timeStamp : string;
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
    
    codUnidad : number;
    codRuta : number;
    codControlUsuario : number;
    fechaHoraCreacion : string;
}
