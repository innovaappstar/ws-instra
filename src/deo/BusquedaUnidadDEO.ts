/**
 * Created by usuario on 01/06/2017.
 */
import Utils = require('../utils/Utils');
import ArrayUtils = require('../utils/ArrayUtils');
import INDICES from "../config/indices";
import {IClientWS} from "../controllers/BaseWebSocket";
import DateUtils = require("../utils/DateUtils");
import DataWs = require('../entity/DataWs');
import { IQueryParadero, UnidadTrackRepository } from '../repository/UnidadTrackRepository';
import { UnidadTrack } from '../entity/mongodb/tubus/UnidadTrack';
import { BaseDEO } from './BaseDEO';
import { configdb, IConfigDB } from '../config/connectionString';

class BusquedaUnidadDEO extends BaseDEO
{
    constructor(){
        super();
    } 


    // /**
    //  * recupera la unidad màs cercana al punto (paradero)
    //  * @param dataws DataWs
    //  * @param callback Function
    //  */
    // public static getQuerySQLBusquedaDetalleUnidadCercana(dataws : DataWs, callback : Function) : void
    // {
    //     let qBusquedaUnidad : IQueryBusquedaUnidad = this.transformDataWsUnidad(dataws);

    //     //TODO : CONTINUAR ProcParaderoDistanciaTeGuio '-11.898150|-77.038550|14|1611|A|2',10
        
    //     // invertimos el orden del set (lat,lng) por (lng, lat)
    //     new ParaderoRepository().findListParaderosPosterioresByNroOrden(qBusquedaUnidad.nomRuta, 
    //         qBusquedaUnidad.lado,
    //         qBusquedaUnidad.nroOrden,
    //         (error : Error, listParaderos : Array<IParaderoModel>)=>{
    //             if(error || listParaderos.length == 0){
    //                 console.error(error || listParaderos);
    //                 return
    //             }
    //             // validar si existe la unidad o no..
    //             if(!GEOLocationUtils.isUnidadTieneTrackGPS(qBusquedaUnidad.codEmpresa)){
    //                 callback(null, null)
    //                 return;
    //             }
    //             new UnidadTrackRepository().findUnidadCercana(qBusquedaUnidad.lado,
    //                 qBusquedaUnidad.nomRuta, parseInt(qBusquedaUnidad.codEmpresa.toString()), listParaderos)
    //                 .then((unidadTrack : IUnidadTrackModel)=>
    //                 {
    //                     callback(null, unidadTrack);
    //                 }).catch((error : Error)=>{
    //                     callback(error, null);
    //                 })
    //         })
    // }

    // /**
    //  * recupera la unidad màs cercana al punto (paradero)
    //  * @param dataws DataWs
    //  * @param callback Function
    //  */
    // public static getQuerySQLBusquedaDetalleUnidadCercanaByplaca(dataws : DataWs, callback : Function) : void
    // {
    //     let qBusquedaUnidad : IQueryBusquedaUnidad = this.transformDataWsUnidadByPlaca(dataws);
    //     new UnidadTrackRepository().findUnidadByNomPlaca(qBusquedaUnidad.placaUnidad, (error : Error, unidadTrack : IUnidadTrackModel)=>{
    //         if(error){
    //             callback(error);
    //             return;
    //         }
    //         callback(null, unidadTrack);
    //     });
    // }



    /**
     * recupera la lista de unidades màs cercanas..
     * @param dataws DataWs
     * @param callback Function
     */
    public getQuerySQLBusquedaDetalleUnidadesCercanas(dataws : DataWs, clientWS : IClientWS, callback : (error : Error, listUnidades : Array<UnidadTrack>) => void) : void
    {
        let queryParadero = super.buildObjectv2<IQueryParadero>(dataws.data, {
            lat : 0,
            lng : 1,
            maxDistance : 2,
            codEmpresa : 3
        })

        if(clientWS.md == "GM1917" || clientWS.md == "2201117TL"){
            console.log(clientWS.codEmpresa, "-", clientWS.codUsuario, "-", clientWS.md)
            console.log("____ unidad pruebas de jesus fabian.. ")
        }
        

        // queryParadero.maxDistance = 200000
        // console.log("queryParadero.codEmpresa incial bro ", queryParadero)

        // queryParadero.codEmpresa = 44

        // for (let element of configdb)
        // {
        //     if(element.id == queryParadero.codEmpresa)
        //     {
        //         queryParadero.codEmpresa = element.codEmpresaMoovit;
        //         break;
        //     }
        // }
          
        
        configdb.forEach( (element : IConfigDB) => {
            if(element.id == queryParadero.codEmpresa) queryParadero.codEmpresa = element.codEmpresaMoovit;
        });

        if(clientWS.md == "GM1917" || clientWS.md == "2201117TL"){
            console.log("____ query paradero forEach after..")
            console.log(queryParadero)
        }
        
        if(clientWS.codEmpresa == 25)
            queryParadero.codEmpresa = clientWS.codEmpresa;
 
        // queryParadero.lat = -11.976760 
        // queryParadero.lng = -77.078407
        
   
        new UnidadTrackRepository().findListUnidadesCercanas(queryParadero).then((listUnidadTrack : Array<UnidadTrack>)=>{
            if(listUnidadTrack.length == 0) // lista de unidades vacIas : bug de mongodb in query agrupada
                return;
            
            callback(null, listUnidadTrack);
        }).catch((error : Error)=>{ 
            if(clientWS.md == "GM1917" || clientWS.md == "2201117TL"){
                console.log("error find list unidades cercanas " + JSON.stringify(error))
            }  
            callback(error, null);
        })

        // // invertimos el orden del set (lat,lng) por (lng, lat)
        // let queryParaderoOrigen = <IQueryParadero>{
        //     lng : parseFloat(qBusquedaUnidad.lng.toString()),
        //     lat : parseFloat(qBusquedaUnidad.lat.toString()),
        //     maxDistance : 3,
        //     codEmpresa : clientWS.codEmpresa
        // }

        // let queryString = `dbo.ProcUsuarioConfiguracion '${qBusquedaUnidad.codUsuario}', 11`;
        
        // if(qBusquedaUnidad.codUsuario == 0){
        //     let listCodEmpresasChecked = null;
        //     new UnidadTrackRepository().findListUnidadesCercanas(queryParaderoOrigen, listCodEmpresasChecked)
        //     .then((listUnidadTrack : Array<IUnidadTrackModel>)=>
        //     {
        //         callback(null, listUnidadTrack);
        //     }).catch((error : Error)=>{
        //         callback(error, null);
        //     })
        //     return;
        // }

        // // console.log(queryString);
        // new DBSQL().execSQLV2(properties.id, queryString, (error : Error, row)=>
        // {
        //     // if (error || listRows == null || listRows.length == 0){return;}
        //     if (error || row == null ||  row.length == 0 ||  Object.keys(row[0]).length == 0){return;}

        //     let rowTrackEmpresaUsuario : ITrackEmpresaUsuarioModel = <ITrackEmpresaUsuarioModel>JSON.parse(row[0]["col-1"]);
        //     let listCodEmpresasChecked = null;
            
        //     if(rowTrackEmpresaUsuario != null) listCodEmpresasChecked = rowTrackEmpresaUsuario.listCodEmpresasChecked;
        //     new UnidadTrackRepository().findListUnidadesCercanas(queryParaderoOrigen, listCodEmpresasChecked)
        //     .then((listUnidadTrack : Array<IUnidadTrackModel>)=>
        //     {
        //         callback(null, listUnidadTrack);
        //     }).catch((error : Error)=>{
        //         callback(error, null);
        //     })
        // }, false, false); // isCallbackOneRow, isCallbackEmptyRow

            
    }

    /** 
     * transforma los atributos de DataWs en IPreRecarga
     * @param dataws DataWs
     */
    private transformDataWsUnidad(dataws : DataWs ) : IQueryBusquedaUnidad
    {
        let listDatagrama : string[] = dataws.data.split('|');
        let iQuery : IQueryBusquedaUnidad = 
        <any>{ 
            lat                 : ArrayUtils.VerificarInteger(listDatagrama, 0),
            lng                 : ArrayUtils.VerificarInteger(listDatagrama, 1),
            nomRuta             : ArrayUtils.VerificarString(listDatagrama, 2),
            lado                : ArrayUtils.VerificarString(listDatagrama, 3),
            codEmpresa          : ArrayUtils.VerificarInteger(listDatagrama, 4),
            nroOrden            : ArrayUtils.VerificarInteger(listDatagrama, 5),
            codUsuario          : ArrayUtils.VerificarInteger(listDatagrama, 6)
            
        };
        return iQuery;
    }


    /** 
     * transforma dataWS in unidad con placa
     * @param dataws DataWs
     */
    private transformDataWsUnidadByPlaca(dataws : DataWs) : IQueryBusquedaUnidad
    {
        let listDatagrama : string[] = dataws.data.split('|');
        let iQuery : IQueryBusquedaUnidad = 
        <any>{ 
            lat                 : ArrayUtils.VerificarInteger(listDatagrama, 0),
            lng                 : ArrayUtils.VerificarInteger(listDatagrama, 1),
            placaUnidad         : ArrayUtils.VerificarString(listDatagrama, 2)
        };
        return iQuery;
    }
}

// /**
//  * PreRecarga entidad
//  */
interface IQueryBusquedaUnidad{
    nroOrden : number;
    nomRuta : string;
    lado : string;
    codEmpresa : number;
    lat : number;
    lng : number;
    codUsuario : number;
    placaUnidad : string;
}

export = BusquedaUnidadDEO;