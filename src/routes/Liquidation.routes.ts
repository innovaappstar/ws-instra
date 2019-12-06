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

export class LiquidationRoutes extends BaseRoutes {
    public router : Router = Router();

    private PATH_LIQUIDATION_LIST = "/liquidation/list/?";
    private PATH_LIQUIDATION_REGISTER = "/liquidation/register/?";

    constructor() {
        super()
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get(this.PATH_LIQUIDATION_LIST, this.getLiquidationList)
        this.router.get(this.PATH_LIQUIDATION_REGISTER, this.registerLiquidation)
    }

    // https://192.168.1.120:2032/api/regins/liquidation/list/?userSessionCode=200&&unitCode=200
    getLiquidationList = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           
            let ALIASJSON = "LIQUIDATION_LIST";

            if(requestLiquidation.userSessionCode == null || requestLiquidation.unitCode == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }

            let querySQL = LiquidationDEO.getQueryLiquidationList(requestLiquidation);

            let listBoletos = Utils.getQuerySQLPersonalizado(["1", "2", "3"], "*");  // '1*2*3'
            let listBoletos2 = Utils.getQuerySQLPersonalizado(["1", "2", "3"], "*").replaceSymbol("'");
            let listBoletos3 = Utils.getQuerySQLPersonalizado(["1", "2", "3"], "*").replaceRegex("\'");
            console.log(listBoletos)

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

    /**
     * -- serializado por -> | <- 
        ->ins.ProcLiquidacion '4|1|test|1|209|123|123|1|30/11/2019 18:35:00|1668|2*3*6*5~1*5*9*1~5*1*2*10',20                    <-cadena de ejemplo
				
        SELECT  @CodRuta = Data FROM @TbParametros WHERE N = 1
        SELECT  @CodControl = Data FROM @TbParametros WHERE N = 2 
        SELECT  @Observacion = Data FROM @TbParametros WHERE N = 3 
        SELECT  @CodUsuario = Data FROM @TbParametros WHERE N = 4
        SELECT  @CodUnidad = Data FROM @TbParametros WHERE N = 5
        SELECT  @LatitudLiquidacion = Data FROM @TbParametros WHERE N =  6
        SELECT  @LongitudLiquidacion = Data FROM @TbParametros WHERE N = 7
        SELECT  @CodUnidadLiquidacionTipo = Data FROM @TbParametros WHERE N = 8
        SELECT  @FechaHoraMovilRegistro = Data FROM @TbParametros WHERE N = 9
        SELECT  @CodPersonaConductor = Data FROM @TbParametros WHERE N = 10
        SELECT  @ParametrosLiquidacionDetalle = Data FROM @TbParametros WHERE N = 11
        ----------------------------------------------------------------------
        INSERT INTO @TbParametrosLiquidacionDetalleAux (N, DATA)
        SELECT * FROM  dbo.SplitNumerado((SELECT DATA FROM @TbParametrosLiquidacionDetalle WHERE N = @N), '*')
        -- serializado por -> * <-
        --
        SELECT	@CodBoleto = DATA FROM @TbParametrosLiquidacionDetalleAux WHERE N = 1
        SELECT  @Inicio = DATA FROM @TbParametrosLiquidacionDetalleAux WHERE N = 2
        SELECT  @Corte = DATA FROM @TbParametrosLiquidacionDetalleAux WHERE N = 3
        SELECT  @Reintegro = DATA FROM @TbParametrosLiquidacionDetalleAux WHERE N = 4
        ==============================================================
    */


    // https://192.168.1.120:2032/api/regins/liquidation/register/?auxiliar=23123
    registerLiquidation = (req: Request, res: Response) => {
        try
        {
            let requestLiquidation : IRequestLiquidation = <any>req.query;           
            let ALIASJSON = "LIQUIDATION_REGISTER";

            if(requestLiquidation.auxiliar == null)
            {
                let resultado = super.toObject(ALIASJSON, {
                        codResultado : 0,
                        desResultado : "No tiene permisos necesarios"});
                res.send(JSON.stringify(resultado));
                return;
            }
            let querySQL = LiquidationDEO.getQueryLiquidationRegister(requestLiquidation);
            
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
}

export interface IRequestLiquidation{

    userSessionCode : number;
    unitCode : number;
    //esto recupera el json de liquidacion
    auxiliar : string;
}


export interface IRequestLiquidationRegister{

    ruteCode : number,
    controlCode : number,
    observacion : string,
    userCode : number,
    unitCode : number,
    latitude : string,
    longitude : string,
    settlementType : number,
    dateTime : string,
    driverCode : number
    boletos : Array<IRequestBoleto> ;
}

export interface IRequestBoleto {

    codBoleto : number,
    inicioCorteBoleto : string,
    finCorteBoleto : string,
    cantidadReintegro : number,
}