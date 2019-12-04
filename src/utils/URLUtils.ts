/**
 * Created by innovaapps on 15/03/2017.
 */
import qs = require("query-string");

class URLUtils
{
    constructor(){}

    /**
     * comprueba valor entero de un objeto query-string
     * @param url string
     * @param key string
     * @returns {string|string[]|null}
     */
    public static VerificarInteger(url : string, key : string) : number
    {
        try {
            url = url.substring(url.indexOf('?') + 1 );  // parseado de url /ws?*=* / int
            return qs.parse(url)[key];
        } catch (error) {
            // console.error(error)
        }
        return 0
    }

    /**
     * comprueba valor string de un objeto query-string
     * @param url string
     * @param key string
     * @returns {string|string[]|null}
     */
    public static VerificarString(url : string, key : string) : string
    {
        try {
            url = url.substring(url.indexOf('?') + 1 );  // parseado de url /ws?*=*
            return qs.parse(url)[key];
        } catch (error) {
            // console.error(error)
        }
        return ''
    }

}

export = URLUtils;