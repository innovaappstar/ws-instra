import Utils = require("./Utils");
import Constantes = require("../constantes/Constantes");
/**
 * Created by innovaapps on 15/03/2017.
 */

class JSONUtils
{
    constructor() {
    }


    public static VerificarInteger(object : JSON, nomAtributo : string) : number
    {
        let n = object[nomAtributo];
        return (n == null || n.length == 0 || !Utils.isNumber(n)) ? 0 : Number(n);
    }

    public static VerificarString(object : JSON, nomAtributo : string) : string
    {
        let s = object[nomAtributo];
        return (s == null || s.length == 0) ? "": s;
    }

    /**
     * convierte lista de objeto en datagrama {k:v, k2:v2}
     * @param listObject
     * @returns {string}
     */
    public static convertArrayJSONtoDatagramaStandar(listObject : Object) : string
    {
        let datagrama : string = '';
        try {
            Object.keys(listObject).forEach((nomKey)=>
                datagrama += listObject[nomKey] + Constantes.sepDatagrama);  // add fila ~

            datagrama = Utils.removerUltimosCaracteres(datagrama, 1);
        }catch (error)
        {
            console.error(listObject);
            console.error(error);
        }
        return datagrama;
    }


    /**
     * convierte objeto json in datagrama, lo recorre n veces
     * @param listObject
     * @param listNomAtributos
     * @returns {string}
     */
    public static convertArrayJSONtoDatagrama(listObject : JSON[], listNomAtributos ?: string[]) : string
    {
        let datagrama : string = '';
        // console.log(listObject);
        for (let object in listObject)
        {
            let objetoJSON : Object = JSONUtils.castingAnyStringToJSON(<any>listObject[object]);
            // console.log(objetoJSON);
            // console.log(object);
            // console.log(isUndefined(listNomAtributos));
            // console.log(listNomAtributos == undefined);
            let dataColumna : string = '';
            let numItemObtenido : number = 0;
            if(listNomAtributos && listNomAtributos !== undefined)
            {
                for(let nomAtributo in listNomAtributos)
                {
                    let valorJson = objetoJSON[listNomAtributos[nomAtributo]];
                    if (valorJson != null || valorJson != undefined)
                    {
                        dataColumna += valorJson + Constantes.sepColumna; // add columna
                        numItemObtenido += 1;
                        if (numItemObtenido == listNomAtributos.length)  // fila con todas las columnas solicitadas..
                        {
                            dataColumna = Utils.removerUltimosCaracteres(dataColumna, 1);
                            datagrama += dataColumna + Constantes.sepFila;
                            break;
                        }
                    }
                }
            }else
            {
                // console.log(object);
                // console.log(objetoJSON);
                if(typeof objetoJSON === 'string' || objetoJSON instanceof String)
                    return objetoJSON.toString();

                for(let key in objetoJSON)
                    datagrama += objetoJSON[key] + Constantes.sepDatagrama; // add columna |

                datagrama = Utils.removerUltimosCaracteres(datagrama, 1);   // removemos último separador columna
                datagrama += dataColumna + Constantes.sepFila;  // add fila ~
                // console.log('datagrama : ' + datagrama);
            }
        }
        datagrama = Utils.removerUltimosCaracteres(datagrama, 1);
        return datagrama;
    }

    /**
     * convierte un arrayJSON string en un datagrama cabecera detalle :
     * 1 cabecera => string
     * n detalles => string[]
     * @param listObject JSON string
     * @param key string
     * @param listAtributos string[]
     * @returns {string} 3 | 123 | 1-2-3 : cabecera | detalle[] (info-1) | detalle[] (info-2)
     */
    public static convertArrayJSONtoDatagramaCabeceraDetalle(listObject : JSON[], key : string, listAtributos : string[]) : string
    {
        // console.log(listObject)
        let datagrama : string = '';
        for (let object  in listObject)
        {
            let objetoJSON : Object = JSONUtils.castingAnyStringToJSON(<any>listObject[object]);
            let cabeceraJSON = objetoJSON[key]; // obtiene valor de cabecera
            let detalleJSON = '';
            if (cabeceraJSON != null || cabeceraJSON != undefined)
            {
                for(let atributo in listAtributos)
                {
                    let detalleInicio = listObject[object][listAtributos[atributo]]; // obtiene valor de detalle
                    let detalleFin = '';
                    if (detalleInicio instanceof Array)
                    {
                        for(let valor of detalleInicio)
                            detalleFin += valor + Constantes.sepSubColumna; // -
                        detalleFin = Utils.removerUltimosCaracteres(detalleFin, 1);
                    }else
                    {
                        detalleFin = detalleInicio;
                    }
                    detalleJSON += detalleFin + Constantes.sepColumna;  // |
                }
                detalleJSON = Utils.removerUltimosCaracteres(detalleJSON, 1);
            }
            datagrama += cabeceraJSON + Constantes.sepColumna + detalleJSON + Constantes.sepFila;   // ~
        }
        // console.log(datagrama)
        datagrama = Utils.removerUltimosCaracteres(datagrama, 1);
        return datagrama;
    }


    /**
     * convierte un arrayJSON a un objeto json (Solo para selects de una fila..)
     * 1 cabecera => string
     * n detalles => string[]
     * @param listObject JSON string
     * @param keyFinal string
     * @param listAtributos string[]
     * @returns {string} 3 | 123 | 1-2-3 : cabecera | detalle[] (info-1) | detalle[] (info-2)
     */
    public static convertArrayJSONtoObjectCabeceraDetalle(listObject : Array<Object>, keyFinal : string, listAtributos : string[]) : Object
    {
        // console.log(listObject)
        let datagrama : string = '';
        // let keyColumns = "columns";
        let objetoJSONResponse = {};
        if(listObject[0] != null){
            let objetoJSON : Object = listObject[0];
            objetoJSONResponse[keyFinal] = {};
            if(objetoJSON instanceof Array)
                return objetoJSONResponse;
            Object.keys(objetoJSON).forEach((keyValue : string)=>{
                listAtributos.forEach((nomKey : string)=>{
                    if(nomKey == keyValue && objetoJSONResponse[keyFinal][keyValue] == null)
                        objetoJSONResponse[keyFinal][keyValue] = objetoJSON[keyValue];  // inject value the first time..
                })
            })
        }
        return objetoJSONResponse;
    }

    /**
     * filtra elementos de un objeto Array y comprueba si tiene el
     * valor buscado para agregarlo al objeto final..
     * @param listObject Object[]
     * @param key string
     * @param valor string
     * @returns {Object[]}
     */
    public static obtenerJSONConItemYValor(listObject : Object[], key : string, valor : string) : Object[]
    {
        let objetoFiltrado : Object[] = [];
        let num : number = 0;
        for (let object  in listObject)
        {
            let objetoItem : Object = JSONUtils.castingAnyStringToJSON(<any>listObject[object]);
            let valorFromJSON = objetoItem[key];    // value from key
            if (valorFromJSON != null || valorFromJSON != undefined)
            {
                if(valorFromJSON == valor)
                {
                    objetoFiltrado[num] = objetoItem;
                    num+=1;
                }
            }
        }
        return objetoFiltrado;
    }

    /**
     * castea un string a json para los casos
     * en los que se envíen documentos de mongodb para serializarse
     * @param object string
     * @returns {any}
     */
    private static castingAnyStringToJSON(object : string) : Object
    {
        // console.log(object + ' is key');
        return JSON.parse(JSON.stringify(object));
    }

}

export = JSONUtils;