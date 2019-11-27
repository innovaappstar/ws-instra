
abstract class BaseRoutes{

    public COL_NAME_RESPONSE = "ResultadoJSON"

    constructor(){
    }

    /**
     * retorna un objeto con el alias
     */
    public toObject(nomAlias : string, obj : Object) : Object
    { 
        let objResult = {};
        objResult[nomAlias] = obj;
        return objResult;
    }

    /**
     * retorna un objeto con el alias a partir de una fila devuelta por el SQL
     */
    public rowToObject(nomAlias : string, obj : Object) : Object
    { 
        let rowResponse = obj[nomAlias]
        rowResponse = JSON.parse(rowResponse)
        return rowResponse;
    }

}

export {BaseRoutes};