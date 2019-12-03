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

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        // this.router.get(this.PATH_REGISTRO_INCIDENCIA, this.postRegistroIncidencia)
        this.router.post(this.PATH_REGISTRO_INCIDENCIA, cpUpload, this.postRegistroIncidencia)
    }

// -- ins.ProcIncidencia '1|1|test3|3|25/11/2019 10:39:30|-11.976406|-77.087933|test2|01|PRS-111|Prueba|ruta|control',20
// 		SELECT	@CodUsuario = Data FROM @TbParametros WHERE N = 1
// 		SELECT	@CodIndidenciaTipo = Data FROM @TbParametros WHERE N = 2
// 		SELECT	@Observacion = Data FROM @TbParametros WHERE N = 3
// 		SELECT  @CodUnidad = Data FROM @TbParametros WHERE N = 4
// 		SELECT  @FechaHoraMovilRegistro = Data FROM @TbParametros WHERE N = 5
// 		SELECT  @LatitudIncidencia = Data FROM @TbParametros WHERE N = 6
// 		SELECT  @LongitudIncidencia = Data FROM @TbParametros WHERE N = 7
// 		SELECT  @Imagen = Data FROM  @TbParametros WHERE N = 8
// 		SELECT  @PadronUnidad = Data FROM @TbParametros WHERE N = 9
// 		SELECT  @PlacaUnidad = Data FROM @TbParametros WHERE N = 10
// 		SELECT  @NomPersonaCondutor = Data FROM @TbParametros WHERE N = 11
// 		SELECT  @NomRuta = Data FROM @TbParametros WHERE N = 12
//         SELECT  @NomControl = Data FROM @TbParametros WHERE N = 13

    // https://192.168.1.120:2032/api/regins/registro/incidencia/?
    postRegistroIncidencia = (req: Request, res: Response, next) => {
        try
        {
            let ALIASJSON = "REGISTRO_INCIDENCIA";
            let requestRegIncidencia : IRequestIncidencia = <IRequestIncidencia>JSON.parse(req.body[KEY_INCIDENCE]);  
            let listPhotos : Array<IRequestPhoto> = []
            if(req.files != null && req.files[KEY_PHOTOS])  
                listPhotos = Array<IRequestPhoto>(<any>req.files[KEY_PHOTOS])
            requestRegIncidencia.listPhotos = listPhotos;
            if(listPhotos.length == 0){
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
            // llamar al proc execSQL
            let querySQL = IncidenciaDEO.getQueryRegistroIncidencia(requestRegIncidencia, postPhoto);
            ORMAcess.execQuerySQL(querySQL, requestRegIncidencia.codEmpresa).then((result : any)=>{
                // CONTINUAR DESDE AQUÌ ---- CON DATOS REALES : EMPRESA PRUEBAS
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
}
