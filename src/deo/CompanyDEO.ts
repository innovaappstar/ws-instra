/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import PROCEDURES from '../sql/procedures.sql';
import '../define/MyExtensions.extensions'
import { IRequestCompany } from '../routes/Company.routes';

class CompanyDEO
{
    constructor(){}
    
    /**
     * @param dataws DataWs
     * @param callback Function
     */
    public static getQueryCompanyList(request : IRequestCompany) : string
    {
        let indice = PROCEDURES.DBPRUEBAS.COMPANY_LIST.index;
        let proc = PROCEDURES.DBPRUEBAS.COMPANY_LIST.proc;
        let queryParams = "''"
        let queryString = `exec ${proc} ${queryParams} , ${indice}`;
        return queryString;
    }

}
export = CompanyDEO;