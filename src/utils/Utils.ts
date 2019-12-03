/**
 * Created by innovaapps on 15/03/2017.
 */

class Utils
{
    private static tipoStandar = 1;          // separado por coma cada param..
    private static tipoPersonalizado = 2;    // separado por barra vertical cada param...

    constructor() {
    }

    /**
     * comprueba si el valor n es un número
     * @param n any
     * @returns {boolean}
     */
    public static isNumber(n : any) : boolean
    {
        return !isNaN(n) && isFinite(n);
    }

    /**
     * expresión regular (regex) q evalúa si
     * el texto es un número o no.
     * @param n any
     * @returns {boolean}
     */
    public static checkIsNum(n : any) : boolean
    {
        return /^\d+$/.test(n);
    }

    /**
     * is valor int según la posición del array.
     * casos de validación para cuando se genere el
     * serializado en TrackDEO.ts
     * @param s string
     * @param posicion number
     */
    public static isValueIntPosArray(s : string, posicion : number) : boolean
    {
        let list = (s.replace(/'/g, "")).replace(/ /g, "").split(",");
        return Utils.checkIsNum(list[posicion]);
    }

    /**
     * remueve n carácteres finales
     * @param s string
     * @param n number
     * @returns {string}
     */
    public static removerUltimosCaracteres(s : string, n : number) : string
    {
        if (s.length > 0) s = s.substring(0, (s.length - n));
        return s;
    }


    public static getQuerySQLStandar(data : string[]) : string
    {
        return Utils.getQueryStringSQL(data, {tipo : this.tipoStandar});
    }

    public static getQuerySQLPersonalizado(data : string[]) : string
    {
        return Utils.getQueryStringSQL(data, {tipo : this.tipoPersonalizado});
    }

    /**
     * serializa data separandolos por el símbolo ','
     * @param data string[]
     * @param metodo IMetodo
     * @param callback function
     */
    private static getQueryStringSQL(data : string[], metodo : IMetodo) : string
    {
        let query = "";
        if(data.length == 0)
        {
            // callback(null, "''");
            return "";
        }
        for (let i = 0; i < data.length; i++)
        {
            if (metodo.tipo == this.tipoStandar)
                query = `${query}'${data[i]}',`;
            else if (metodo.tipo == this.tipoPersonalizado)
                query = `${(i == 0)?"'":""}${query} ${data[i]} ${(i == (data.length -1))?"'":""} |`;
        }
        // callback(null, query.substring(0, query.length - 1));
        return query.substring(0, query.length - 1);
    }

    /**
     * log utils
     * @param message string
     */
    public static log(message : string):void
    {
        console.log(message);
    }

    /**
     * cambia el formato de fecha : dd/mm/yyyy hh:mm:ss / yyyy/mm/dd hh:mm:ss
     * @param fecha String
     * @returns {string}
     */
    public static cambiarFormato(fecha : string): string
    {
        try
        {
            if(fecha.length < 3)
                return '';  // la base de datos espera recibir vacío y no cero

            let arraynomFechaHora = fecha.split(' ');
            let arrayFecha = arraynomFechaHora[0].split('/');
            //en el caso de la fecha este en el segundo elemento, no encontrara divisiones asi que no sera necesario el cambio
            if (arrayFecha[0].length < 3) //no es el año
            {
                let dia = arrayFecha[0];
                let mes = arrayFecha[1];
                let anio =  arrayFecha[2];
                let tiempo = arraynomFechaHora[1];
                if(tiempo == undefined)
                    tiempo="";
                fecha = anio+'/'+mes+'/'+dia+' '+tiempo;
            }
            return fecha;
        } catch (error)
        {
            console.log(error);
            return null;
        }
    }

    /**
     * comprueba q el string no se encuentre vacío y
     * cambia el formato de fecha : dd/mm/yyyy hh:mm:ss / yyyy/mm/dd hh:mm:ss
     * @param fecha String
     * @returns {string}
     */
    public static cambiarFormatoFecha(fecha : string): string
    {
        let fechaParsing = '';
        try
        {
            // if (fechaParsing == 0)
            //     return fechaParsing;

            let arraynomFechaHora = fecha.split(' ');
            let arrayFecha = arraynomFechaHora[0].split('/');
            //en el caso de la fecha este en el segundo elemento, no encontrara divisiones asi que no sera necesario el cambio
            if (arrayFecha[0].length<3) //no es el año
            {
                let dia = arrayFecha[0];
                let mes = arrayFecha[1];
                let anio =  arrayFecha[2];
                let tiempo = arraynomFechaHora[1];
                if(tiempo == undefined)
                    tiempo="";
                // fecha = anio+'/'+mes+'/'+dia+' '+tiempo;
                fechaParsing = anio+'/'+mes+'/'+dia+' '+tiempo;
            }
            return fechaParsing;
        } catch (error)
        {
            console.log(error);
            return fechaParsing;
        }
    }

}

interface IMetodo
{
    tipo : number;
}

export = Utils;