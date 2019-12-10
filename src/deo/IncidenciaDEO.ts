/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import PROCEDURES from '../sql/procedures.sql';
import { IRequestIncidencia, IPOSTPhoto, IRequestInfraction } from '../routes/Incidencia.routes';
import '../define/MyExtensions.extensions'

class IncidenciaDEO
{
    constructor(){}
   

    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryIncidentAndInspectionList(request : IRequestInfraction) : string
    {
        let indice = PROCEDURES.DBPRUEBAS.INCIDENT_INSPECTION_LIST.index;
        let proc = PROCEDURES.DBPRUEBAS.INCIDENT_INSPECTION_LIST.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([
            request.userCode.toString(),
            request.type.toString()
        ], "|");
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }


    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryInfractionList(request : IRequestInfraction) : string
    {
        let indice = PROCEDURES.DBPRUEBAS.INFRACTION_LIST.index;
        let proc = PROCEDURES.DBPRUEBAS.INFRACTION_LIST.proc;
        let queryParams = "''";
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }


    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryRegistroIncidencia(request : IRequestIncidencia, postPhoto ?: IPOSTPhoto) : string
    {
        let tramaPhotoSerializado = "";
        if(postPhoto)
        {
            postPhoto.listPhotoLinks.forEach((urlPhoto : string, index : number)=>{
                let separador = (index == (postPhoto.listPhotoLinks.length - 1) ) ? "" : "*";
                tramaPhotoSerializado += (urlPhoto + separador);
            })
        }
        
        let indice = PROCEDURES.DBGPSGENERAL.REGISTRO_INCIDENCIA.index;
        let proc = PROCEDURES.DBGPSGENERAL.REGISTRO_INCIDENCIA.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([request.codInspector.toString(),
            request.codInfraccion.toString(),
            request.observacion,
            request.codUnidad.toString(),
            request.fechaHoraCreacion.convertToDateSQL(),
            request.latitud,
            request.longitud,
            tramaPhotoSerializado,
            request.padron,
            request.placa,
            // "1",
            // "1",
            // "1"
            request.idConductor.toString(),
            request.codRuta.toString(),
            request.codControlUsuario.toString()
        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }

}
export = IncidenciaDEO;