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
    private PATH_LISTA_INFRACCION = "/lista/infraccion/?";
    private PATH_LISTA_INCIDENCIA = "/lista/incidencia_inspeccion/?";

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
    
    // https://192.168.1.132:2032/api/regins/lista/incidencia_inspeccion/?userCode=15&type=1
    getIncidentAndInspectionList = (req: Request, res: Response) => {
        try
        {
            let requestInfraction : IRequestInfraction = <any>req.query;           
            let ALIASJSON = "INCIDENT_LIST";
            if(requestInfraction.userCode == null || requestInfraction.type == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = IncidenciaDEO.getQueryIncidentAndInspectionList(requestInfraction);
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

    // https://192.168.1.132:2032/api/regins/lista/infraccion/?userCode=10
    getInfractionsList = (req: Request, res: Response) => {
        try
        {
            let requestInfraction : IRequestInfraction = <any>req.query;           
            let ALIASJSON = "INFRACTION_LIST";
            if(requestInfraction.userCode == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = IncidenciaDEO.getQueryInfractionList(requestInfraction);
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
    
    // https://192.168.1.120:2032/api/regins/registro/incidencia/?
    postRegistroIncidencia = (req: Request, res: Response, next) => {
        try
        {
            let ALIASJSON = "REGISTRO_INCIDENCIA";
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
            let ALIASJSON = "REGISTRO_INCIDENCIA";
            
            requestRegIncidencia.codInfraccion = 1;   // codEmpresa de pruebas para los testings !!
            requestRegIncidencia.codEmpresa = 25;   // codEmpresa de pruebas para los testings !!
            requestRegIncidencia.codUnidad = 199;

            let querySQL = IncidenciaDEO.getQueryRegistroIncidencia(requestRegIncidencia, postPhoto);
            ORMAcess.execQuerySQL(querySQL, requestRegIncidencia.codEmpresa).then((result : any)=>{
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



        
export interface IRequestInfraction{
    userCode : number;
    codIncidenciaTipo : number;
    nomIncidenciaTipo : string;
    codigoIncidencia : number;
    abrevNomIncideciaTipo : string;
    type : number; // 1 -> liquidaciones | 0 -> incidencias 
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
    codConductor : number;
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
    codControl : number;
    fechaHoraCreacion : string;
}
