/**
 * Created by usuario on 01/06/2017.
 */
import Utils = require('../utils/Utils');
import DateFormat = require('dateformat');

class ConexionDEO
{
    constructor(){}

    // /**
    //  * exec ProcUsuario '1|13/09/2019 04:00|1', 21
    //  * @param dataws DataWs
    //  * @param callback Function
    //  */
    // public static getQuerySQLConexionCliente(conexion : IConexionModel, callback : Function, isConectado : boolean) : string
    // {
    //     let indice = 21;
    //     let proc = "ProcUsuario";
    //     let codEstado = (isConectado) ? 1 : 0;
    //     let dateHoraPaso = new Date();
    //     let fechaHora = DateFormat(dateHoraPaso, UnidadObserver.FORMATO_FECHA_YYYY);
    //     if(conexion.codUsuario == undefined || conexion.codUsuario == null || conexion.codUsuario == 0)
    //         return
    //     // fechaHora = Utils.cambiarFormato(fechaHora);
    //     let queryParams = Utils.getQuerySQLStandar([`${conexion.codUsuario}|${fechaHora}|${codEstado}`]);
    //     let queryString = `exec ${proc} ${queryParams} , ${indice}`;
    //     return queryString;
    // }

}

export = ConexionDEO;