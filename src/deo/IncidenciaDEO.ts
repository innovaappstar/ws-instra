/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');

class IncidenciaDEO
{
    constructor(){}

    // /**
    //  * extrae los datos de la entidad DataWs para armar una cadena de ejecución de
    //  * serializado en el proceso de Apertura : Inicio/Cierre
    //  * @param dataws DataWs
    //  * @param callback Function
    //  */
    // public static getQuerySQLregistroAlerta(dataws : DataWs, callback : Function) : void
    // {
    //     let alerta : IAlerta = this.transformDataWsAlerta(dataws);
    //     let indice = INDICES.TIPOALERTA.sqlIndices.registroAlerta;
    //     let proc = INDICES.TIPOALERTA.sqlProcedimientos.registroAlerta;

    //     // BUG V10.4.2 , almacena velocidad con valor extranio :  6.1517133E-4
    //     let isContieneLetra = /[a-z]/i.test(alerta.velocidad);
    //     let isContieneSymbol = /-/i.test(alerta.velocidad);
    //     alerta.velocidad = (isContieneLetra || isContieneSymbol)? '0.00' : alerta.velocidad;

    //     Utils.getQuerySQLStandar(
    //         [
    //             alerta.codUnidadAlerta, alerta.codUnidad, alerta.codAlerta, alerta.codEstado,
    //             alerta.fechaAccion, alerta.latitud, alerta.longitud, alerta.velocidad, alerta.descripcion,
    //             alerta.codPersona, alerta.codigoPersona, alerta.auxiliar

    //         ], (error : Error, query : string)=>
    //         {
    //             if (error){callback(error);return;}
    //             let queryString = `exec ${proc} ${query} , ${indice}`;
    //             callback(error, queryString);
    //         });
    // }

    // /**
    //  * transforma los atributos de DataWs en IPreRecarga
    //  * @param dataws DataWs
    //  * @returns {{idRecarga: number, codTarjeta: number, importe: string, fechaHora: string, codOperacion: number, codSesionUsuario: number}}
    //  */
    // private static transformDataWsAlerta(dataws : DataWs) : IAlerta
    // {
    //     let listDatagrama : string[] = dataws.data.split('|');
    //     return {
    //          codUnidadAlerta     : '1',
    //          codUnidad           : ArrayUtils.VerificarString(listDatagrama, 1),
    //          codAlerta           : dataws.subIndiceWs.toString(),//dataws.codigos[1],
    //          codEstado           : '0',
    //          fechaAccion         : Utils.cambiarFormatoFecha(ArrayUtils.VerificarString(listDatagrama, 2)),
    //          latitud             : ArrayUtils.VerificarString(listDatagrama, 6),
    //          longitud            : ArrayUtils.VerificarString(listDatagrama, 7),
    //          velocidad           : ArrayUtils.VerificarString(listDatagrama, 8),
    //          descripcion         : '',
    //          codPersona          : ArrayUtils.VerificarString(listDatagrama, 3),
    //          codigoPersona       : '',
    //          auxiliar            : ''
    //     };
    // }
}
export = IncidenciaDEO;