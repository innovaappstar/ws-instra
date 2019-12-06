import { UnidadTrack } from "../entity/mongodb/tubus/UnidadTrack";
import { IQueryParadero } from "../repository/UnidadTrackRepository";

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

    private static readonly TIPO_SEPARADOR_STANDAR = ",";
    private static readonly TIPO_SEPARADOR_PERSONALIZADO = "|";

    public static getQuerySQLStandar(data : string[]) : string
    {
        return Utils.getQueryStringSQL(data, Utils.TIPO_SEPARADOR_STANDAR);
    }


    public static getQuerySQLPersonalizado(data : string[], tipoSeparador ?: string) : string
    {
        return Utils.getQueryStringSQL(data, ((tipoSeparador)? tipoSeparador : Utils.TIPO_SEPARADOR_PERSONALIZADO) );
    }


    /**
     * serializa data separandolos por el símbolo ','
     * @param data string[]
     * @param metodo IMetodo
     * @param callback function
     */
    private static getQueryStringSQL(data : string[], tipoSeparador : string) : string
    {
        let query = "";
        if(data.length == 0)
        {
            // callback(null, "''");
            return "";
        }
        for (let i = 0; i < data.length; i++)
        {
            if (tipoSeparador == Utils.TIPO_SEPARADOR_STANDAR)
                query = `${query}'${data[i]}'${tipoSeparador}`;    // 1,2,3,
            else if (tipoSeparador != Utils.TIPO_SEPARADOR_STANDAR)
                query = `${(i == 0)?"'":""} ${query} ${data[i]} ${(i == (data.length -1))?"'":""} ${tipoSeparador}`; // 'a|b|3*4*2*5|c' --- '3*4*2*5'
        }
        // callback(null, query.substring(0, query.length - 1));
        return query.substring(0, query.length - 1);    // result : 1,2,3
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

    // public static getDistanceTwoPointsInMetersParadero(paraderoOrigen : IParaderoModel,
    //     paraderoDestino : IParaderoModel) : number
    // {
    //     return this.getDistanceTwoPointsInMeters(
    //         paraderoOrigen.location.coordinates,
    //         paraderoDestino.location.coordinates);
    // }
    /**
     * This script [in Javascript] calculates great-circle distances between the two points – that is, the shortest distance
     * over the earth’s surface – using the ‘Haversine’ formula.
     * 
     * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
     * 
     * More info : 
     * https://en.wikipedia.org/wiki/Haversine_formula
     */
    public static getDistanceTwoPointsInMeters // getDistanceBetweenTwoPointsNoSQL
        (latLngOrigen : number[],
        latLngDestino : number[]) : number
    {
        let lat2 = latLngDestino[1];
        let lng2 = latLngDestino[0];

        let lat1 = latLngOrigen[1];
        let lng1 = latLngOrigen[0];

        var R = 6371; // Radius of the earth in km
        var dLat = Utils.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = Utils.deg2rad(lng2-lng1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(Utils.deg2rad(lat1)) * Math.cos(Utils.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        d *= 1000;
        return d;
    }
    
    public static deg2rad(deg : number) : number {
        return deg * (Math.PI/180)
    }

    public static getDistanceTwoPointsInMetersQueryParadero(queryParaderoOrigen : IQueryParadero,
        queryParaderoDestino : IQueryParadero) : number
    {
        if(queryParaderoOrigen == null || queryParaderoDestino == null){
            console.log("null es origen..");
        }
        return this.getDistanceTwoPointsInMeters(
            [ queryParaderoOrigen.lng, queryParaderoOrigen.lat], 
            [ queryParaderoDestino.lng, queryParaderoDestino.lat]);
    }

}

interface IMetodo
{
    tipo : number;
}

export = Utils;