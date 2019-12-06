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

   /**
     * agrega +5 horas al date entrante.
     * Razòn : las fechas devueltas por SQL estàn trabajadas en formato español y 
     * tedious en americano. Esto ocasiona que el tiempo varie en -5
     * @param date 
     */
    public convertDateLocale(date : Date) : Date{
        date.setHours( date.getHours() + 5);
        return date;
    }

    /**
     * agrega/resta minutos a la hora actual para las consultas
     * de busqueda de unidad.
     * @param date 
     */
    public getDateAddMinutes(minutes : number) : Date{
        let dateResponse = new Date();
        dateResponse.setMinutes( dateResponse.getMinutes() + minutes);
        dateResponse.setHours( dateResponse.getHours() - 5);
        return dateResponse;
    }
}

export = DateUtils;
