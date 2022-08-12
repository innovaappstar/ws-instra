/**
 * Created by usuario on 11/05/2017.
 */
import IObserver = require("./IObserver");
import JSONUtils = require("../utils/JSONUtils");
import { IClientWS } from "../controllers/BaseWebSocket";
import DateFormat = require('dateformat');
import DateUtils = require("../utils/DateUtils");
import DataWs = require("../entity/DataWs");
import BusquedaUnidadDEO = require("../deo/BusquedaUnidadDEO");
import { UnidadTrack } from "../entity/mongodb/tubus/UnidadTrack";

/**
 * Created by innovaapps on 20/03/2017.
 */
class UnidadObserver implements IObserver
{
    public static FORMATO_FECHA = "dd/mm/yy hh:MM:ss";
    public static FORMATO_FECHA_YYYY = "dd/mm/yyyy hh:MM:ss";
    // private dbSQL : DBSQL = new DBSQL();
    constructor(){}

                            //     lng : -76.89382,
                            //     lat : -12.23058,
                            //     maxDistance : 2000,   // metros * METERS_POR_KM,
                            //     codEmpresa : 15
    // 1|3|1|1|localizaciOn unidades|1#-76.89382|-12.23058|2000|14
    update(dataWs: DataWs, clientWS : IClientWS): void {
        if (dataWs.isTipoUnidad())
        {
            if(dataWs.isLocalizacionListaUnidadesCercanasAlUsuario()){
                this.localizacionUnidadesCercanas(dataWs, clientWS);
            }
        }
    }

    // /**
    //  * retorna la localizaciòn de la unidad para las vistas de : Actividad, Fragment
    //  * @param dataWs
    //  * @param clientWS
    //  */
    // localizacionUnidad(dataWs : DataWs, clientWS : IClientWS) : void
    // {
    //     BusquedaUnidadDEO.getQuerySQLBusquedaDetalleUnidadCercana(dataWs, (error : Error, unidadTrack : IUnidadTrackModel)=>
    //     {
    //         if(error){
    //             console.error(error);
    //             return;
    //         }
    //         if(unidadTrack == null){
    //             console.log("unidad no existe dentro de las empresas con TrackEmpresa " + dataWs.data);
    //             return;
    //         }
    //         let aliasEmpresa = ((<ITrackEmpresaModel>(GEOLocationUtils.getListTrackEmpresas()[unidadTrack.codEmpresa.toString()])).alias);
    //         // console.log(unidadTrack);
    //         let dateHoraPaso = new DateUtils().convertDateLocale(new Date(unidadTrack.fechaHoraPaso));
    //         let fechaHoraPaso = DateFormat(dateHoraPaso, UnidadObserver.FORMATO_FECHA);
    //         let dataStandar = `${dataWs.indiceWs}|${dataWs.subIndiceWs}|1|1|Unidad|1#${unidadTrack.location.coordinates[1]}|${unidadTrack.location.coordinates[0]}|${unidadTrack.distancia}|${unidadTrack.placaUnidad}|`+
    //                                                 `${unidadTrack.velocidad}|${unidadTrack.frecuenciaPosteo}|${unidadTrack.padronUnidad}|${unidadTrack.distanciaMovimiento}|${unidadTrack.codEmpresa}|`+
    //                                                 `${unidadTrack.nomRuta}|${unidadTrack.numAsientos}|${unidadTrack.nombrePersonaConductor}|${unidadTrack.nomRecorrido}|${aliasEmpresa}|${fechaHoraPaso}|${unidadTrack.ladoActual}`
    //         clientWS.ws.send(dataStandar)
    //         // clientWS.socket.sendMessage(dataStandar);
    //     });
    // }


    /**
     * retorna la lista de unidades cercanas al usuario..
     * @param dataWs
     * @param clientWS
     */
    localizacionUnidadesCercanas(dataWs : DataWs, clientWS : IClientWS) : void
    {
        //console.log(dataWs.data)
        new BusquedaUnidadDEO().getQuerySQLBusquedaDetalleUnidadesCercanas(dataWs, clientWS, (error : Error, listUnidades : Array<UnidadTrack>) =>
        {
            //console.log("LIST UNIDAD CERCANAS.. FROM MONGODB..")
            //console.log(error || listUnidades)
            if(error){
                console.error(error);
                return;
            }
            let listUnidadesSerializados = "";
            // console.log(listUnidades.length + " unidades recuperadas por trama " + dataWs.data)
            if(listUnidades.length == 0)
            {
                let dataStandar = `${dataWs.indiceWs}|${dataWs.subIndiceWs}|1|1|no se encontraron unidades cercanas|1`
                // clientWS.socket.sendMessage(dataStandar);
                clientWS.ws.send(dataStandar);
                return;
            }
            listUnidades.forEach((unidadTrack : UnidadTrack, index : number)=>{
                let separador = (index == listUnidades.length -1) ? "" : "~" ;
                try {
                    // aliasEmpresa = ((<ITrackEmpresaModel>(GEOLocationUtils.getListTrackEmpresas()[unidadTrack.codEmpresa.toString()])).alias);
                    let dateHoraPaso = new DateUtils().convertDateLocale(new Date(unidadTrack.fechaHoraPaso));
                    let fechaHoraPaso = DateFormat(dateHoraPaso, UnidadObserver.FORMATO_FECHA);

                    let tramaUnidad = `${unidadTrack.location.coordinates[1]}|${unidadTrack.location.coordinates[0]}|${unidadTrack.distancia}|${unidadTrack.placaUnidad}|`+
                                    `${unidadTrack.velocidad}|${unidadTrack.frecuenciaPosteo}|${unidadTrack.padronUnidad}|${unidadTrack.distanciaMovimiento}|`+
                                    `${unidadTrack.codEmpresa}|${unidadTrack.nomRuta}|${unidadTrack.numAsientos}|${unidadTrack.nombrePersonaConductor}|`+
                                    `${unidadTrack.nomRecorrido}|${fechaHoraPaso}|${unidadTrack.ladoActual}|${unidadTrack.codUnidad}|${unidadTrack.codAlertaInspectoria}|${unidadTrack.codAlerta}${separador}`
                    listUnidadesSerializados += tramaUnidad;
                } catch (error) {
                    console.log("=============");
                    console.log(unidadTrack);
                    console.error(error)
                }
            })
            // console.log(unidadTrack);
            // console.log("====== TRAMAAAAAAAA =======");
            let dataStandar = `${dataWs.indiceWs}|${dataWs.subIndiceWs}|1|1|lista de unidades|1#${listUnidadesSerializados}`
            // clientWS.socket.sendMessage(dataStandar);
            // console.log(dataStandar);
            clientWS.ws.send(dataStandar);
        });
    }


    // /**
    //  * retorna la localizaciòn de la unidad para las vistas de : Actividad, Fragment
    //  * @param dataWs
    //  * @param clientWS
    //  */
    // localizacionUnidadByPlaca(dataWs : DataWs, clientWS : IClientWS) : void
    // {
    //     BusquedaUnidadDEO.getQuerySQLBusquedaDetalleUnidadCercanaByplaca(dataWs, (error : Error, unidadTrack : IUnidadTrackModel)=>
    //     {
    //         if(error){
    //             console.error(error);
    //             return;
    //         }
    //         if(unidadTrack == null){
    //             console.log("unidad no existe dentro de las empresas con TrackEmpresa " + dataWs.data);
    //             return;
    //         }
    //         let aliasEmpresa = ((<ITrackEmpresaModel>(GEOLocationUtils.getListTrackEmpresas()[unidadTrack.codEmpresa.toString()])).alias);
    //         // console.log(unidadTrack);
            
    //         let fechaHoraPaso = DateFormat(unidadTrack.fechaHoraPaso, UnidadObserver.FORMATO_FECHA);
    //         let dataStandar = `${dataWs.indiceWs}|${dataWs.subIndiceWs}|1|1|Unidad|1#${unidadTrack.location.coordinates[1]}|${unidadTrack.location.coordinates[0]}|${unidadTrack.distancia}|${unidadTrack.placaUnidad}|`+
    //                                                 `${unidadTrack.velocidad}|${unidadTrack.frecuenciaPosteo}|${unidadTrack.padronUnidad}|${unidadTrack.distanciaMovimiento}|${unidadTrack.codEmpresa}|${unidadTrack.nomRuta}|${unidadTrack.numAsientos}|${unidadTrack.nombrePersonaConductor}|${unidadTrack.nomRecorrido}|${aliasEmpresa}|${fechaHoraPaso}`
    //         clientWS.ws.send(dataStandar)
    //         // clientWS.socket.sendMessage(dataStandar);
    //     });
    // }
    
}
export = UnidadObserver;