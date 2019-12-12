/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import { IRequestAuth } from '../routes/Authentication.routes';
import PROCEDURES from '../sql/procedures.sql';
import '../define/MyExtensions.extensions'
import { IRequestLiquidation, IRequestLiquidationRegister, IRequestBoleto } from '../routes/Liquidation.routes';
import e = require('express');
import { IRequestAlert } from '../routes/Alert.routes';

class AlertDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryRegisterAlert(request : IRequestAlert) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.REGISTER_ALERT.index;
        let proc = PROCEDURES.DBGPSGENERAL.REGISTER_ALERT.proc;
        let queryParams = Utils.getQuerySQLPersonalizado([
            request.userCode.toString(),
            request.unitCode.toString(),
            request.driverCode.toString(),
            request.routeCode.toString(),
            request.controlCode.toString(),
            request.lat.toString(),
            request.lng.toString(),
            request.timeStamp.toString().convertToDateSQL()
        ]);
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }

    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryLiquidationRegister(request : IRequestLiquidation) : string
    {
        let indice = PROCEDURES.DBGPSGENERAL.LIQUIDATION_REGISTER.index;
        let proc = PROCEDURES.DBGPSGENERAL.LIQUIDATION_REGISTER.proc;
        let objectLiquidation : IRequestLiquidationRegister = JSON.parse(request.auxiliar) ;
        let mySerializadoTEMP = "";
        // primero armas el serializado de tipo asterIsco -
        objectLiquidation.boletos.forEach((element : IRequestBoleto) => {
            mySerializadoTEMP += Utils.getQuerySQLPersonalizado([
                element.codBoleto.toString(),
                element.inicioCorteBoleto,
                element.finCorteBoleto,
                element.cantidadReintegro.toString()
            ],"*").replaceSymbol("'")

            mySerializadoTEMP  += "~"
        });
        mySerializadoTEMP = mySerializadoTEMP.substr(0, (mySerializadoTEMP.length -1) );

        // segundo, armas el serializado de tipo barrita vertical(para este paso
        // ya tienes el serializado de boletos "*" y "|") -
        let queryParams = Utils.getQuerySQLPersonalizado(
            [
                objectLiquidation.ruteCode.toString(),
                objectLiquidation.userControlCode.toString(),
                objectLiquidation.observacion,
                objectLiquidation.userCode.toString(),
                objectLiquidation.unitCode.toString(),
                objectLiquidation.latitude,
                objectLiquidation.longitude,
                objectLiquidation.settlementType.toString(),
                objectLiquidation.dateTime.convertToDateSQL(),
                objectLiquidation.driverId.toString(),
                mySerializadoTEMP
            ], "|");

        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
 
    }
    
    
    
}

export = AlertDEO;