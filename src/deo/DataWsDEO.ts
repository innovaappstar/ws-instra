/**
 * Created by innovaapps on 20/03/2017.
 */
import ArrayUtils = require('../utils/ArrayUtils')
import DataWs = require("../entity/DataWs");
import Constantes = require("../constantes/Constantes");

/**
 * DEO : Objeto deserializador de objetos
 */
class DataWsDEO
{
    private datagrama : string = '';

    /**
     * deserializa cadena y setea atributos
     * @param datagrama string
     */
    constructor(datagrama : string)
    {
        this.datagrama = datagrama;
    }

    /**
     * obtiene atributos del datagrama entrante
     * @returns {DataWs}
     */
    public getDataWs() : DataWs
    {
        //3|1|1~ASETKJDS|69|11.00|17.00
        let listFilas = this.datagrama.split(Constantes.sepFila);
        let codigos : string[] = (listFilas.splice(0, 1).toString()).split(Constantes.sepColumna);
        let indiceWs =  ArrayUtils.VerificarInteger(codigos, 0);
        let subIndiceWs =  ArrayUtils.VerificarInteger(codigos, 1);
        let codigoData =  ArrayUtils.VerificarInteger(codigos, 2);
        let data = listFilas.join(Constantes.sepFila);  // string - no []
        return new DataWs(indiceWs, subIndiceWs, codigoData, data, codigos);
    }
}
export = DataWsDEO;