import Utils = require("./Utils")
import Constantes = require("../constantes/Constantes");
/**
 * Created by innovaapps on 15/03/2017.
 */

class ArrayUtils
{
    constructor(){}

    /**
     * @param data string[]
     * @param posicion number
     * @returns {string}
     * @constructor
     */
    public static VerificarInteger(data : string[], posicion : number) : number
    {
        let n = data[posicion];
        return (n == null || n.length == 0 || !Utils.isNumber(n)) ? 0 : Number(n);
    }

    /**
     * @param data string[]
     * @param posicion number
     * @returns {string}
     * @constructor
     */
    public static VerificarString(data : string[], posicion : number) : string
    {
        let s = data[posicion];
        return (s == null || s.length == 0) ? "": s;
    }

    /**
     * @param data string[]
     * @param posicion number
     * @returns {string}
     * @constructor
     */
    public static VerificarStringConCero(data : string[], posicion : number) : string
    {
        let s = data[posicion];
        return (s == null || s.length == 0) ? "0": s;
    }

    /**
     * convierte arreglo string en un datagrama separado por sep filas #
     * @param arData string[]
     * @returns {string} data#data2
     */
    public static convertArrayStringToDatagrama(arData : string[]) : string
    {
        let datagrama : string = '';
        for(let data of arData)
            datagrama += data + Constantes.sepDatagrama;

        datagrama = Utils.removerUltimosCaracteres(datagrama, 1);
        return datagrama;
    }

}

export = ArrayUtils;