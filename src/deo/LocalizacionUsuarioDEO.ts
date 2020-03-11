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
import PROCEDURES from '../sql/procedures.sql';

class LocalizacionUsuarioDEO extends BaseDEO
{
    constructor(){
        super();
    } 


    /**
     * recupera la lista de unidades màs cercanas..
     * @param dataws DataWs
     * @param callback Function
     */
    public getQuerySQLLocalizacionUsuario(dataws : DataWs, clientWS : IClientWS) : string
    {
        let queryParadero = super.buildObject<IQueryLocalizacionUsuario>(dataws.data, {
            lat : 0,
            lng : 1,
            codEmpresa : 2,
            codUsuario : 3,
            fechaHora : 4,
            isFakeGps : 5
        })
            
        //cambiar el procedimiento
        let indice = PROCEDURES.DBGPSGENERAL.REGISTRO_INCIDENCIA.index;
        let proc = PROCEDURES.DBGPSGENERAL.REGISTRO_INCIDENCIA.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([

            queryParadero.lat,
            queryParadero.lng,
            queryParadero.codEmpresa.toString(),
            queryParadero.fechaHora,
            queryParadero.isFakeGps.toString(),

        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
       
            
    }

    /** 
     * transforma los atributos de DataWs en IPreRecarga
     * @param dataws DataWs
     */
    private transformDataWsUnidad(dataws : DataWs ) : IQueryLocalizacionUsuario
    {
        let listDatagrama : string[] = dataws.data.split('|');
        let iQuery : IQueryLocalizacionUsuario = 
        <any>{ 
            lat                 : ArrayUtils.VerificarString(listDatagrama, 0),
            lng                 : ArrayUtils.VerificarString(listDatagrama, 1),
            codEmpresa          : ArrayUtils.VerificarInteger(listDatagrama, 2),
            codUsuario          : ArrayUtils.VerificarInteger(listDatagrama, 3),
            fechaHora           : ArrayUtils.VerificarString(listDatagrama, 4),
            isFakeGps            : ArrayUtils.VerificarInteger(listDatagrama, 5)
            
        };
        return iQuery;
    }

}

// /**
//  * PreRecarga entidad
//  */
interface IQueryLocalizacionUsuario{

    lat : string,
    lng : string,
    codEmpresa : number,
    codUsuario : number,
    fechaHora : string,
    isFakeGps : number
}

export = LocalizacionUsuarioDEO;