import dateFormat = require('dateformat');

String.prototype["toConvertDate()"] = function() 
{
    let dateConverted = new Date(this);
    let dateFormated = dateFormat(dateConverted, "dd-mm-yyyy HH:MM:ss");
    return dateFormated;
};

/**
 * Created by innovaapps on 15/03/2017.
 */
class DateUtils
{

    constructor() {
    }

    /**
     * comprueba si el valor n es un número
     * @param n any
     * @returns {boolean}
     */
    public static convert(n : any) : boolean
    {
        return !isNaN(n) && isFinite(n);
    }

    /**
     * retorna hora actual (es_PE)
     * @returns {Date}
     */
    public getDateLocale(isZonaHoraria ?: boolean) : Date
    {
        return new Date(new Date().setHours(new Date().getHours() - ((isZonaHoraria) ? 5 : 0)))
    }


}

export = DateUtils;
