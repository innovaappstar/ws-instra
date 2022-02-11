/**
 * Created by usuario on 31/05/2017.
 */
import Utils = require('../utils/Utils');
import PROCEDURES from '../sql/procedures.sql';
import { IRequestIncidencia, IPOSTPhoto } from '../routes/Incidencia.routes';
import '../define/MyExtensions.extensions'

export class BaseDEO
{
    public SEP_FILA : string = "~";
    public SEP_COLUMNA : string = "|";
    public SEP_SUB_COLUMNA : string = "-"; // casos en los que se requiera separar un arreglo(key => string[])
    public SEP_DATAGRAMA: string = "#";   // separador de datagrama final

    constructor(){}

    /**
     * se debe castear un serializado a un objeto para 
     * poder trabajarlo de forma màs clara. (only websocket)
     */
    public buildObject<T>(tramaSerializado : string, object : Object, tipoSeparador ?: string) : T{
      let listValoresTrama = tramaSerializado.split((tipoSeparador)? tipoSeparador : this.SEP_COLUMNA); // separador de columna
      let objectResponse : T = <any>{};
      console.log("buildObject")
      Object.keys(object).forEach((key : string, index : number )=>{
        let valueFromKey = object[key];
       
        if(typeof valueFromKey == "string")
          objectResponse[key] = listValoresTrama[index];
        else if(typeof valueFromKey == "number")
          objectResponse[key] = Number(listValoresTrama[index]);
        // else if(typeof valueFromKey == "another type")
        // else if(valueFromKey instanceof Date)
      })
      return objectResponse;
    }
    // esto es con fines de prueba, ya que en su momento buildObject retornaba 0 en codempresa
    public buildObjectv2<T>(tramaSerializado : string, object : Object, tipoSeparador ?: string) : T{
      let listValoresTrama = tramaSerializado.split((tipoSeparador)? tipoSeparador : this.SEP_COLUMNA); // separador de columna
      let objectResponse : T = <any>{};
      Object.keys(object).forEach((key : string, index : number )=>{
        objectResponse[key] = Number(listValoresTrama[index]);
      })
      return objectResponse;
    }

    /**
     * se debe castear un serializado a un objeto para 
     * poder trabajarlo de forma màs clara. (only websocket)
     */
    public buildListObject<T>(tramaSerializado : string, object : Object, tipoSeparador ?: string) : Array<T>{
      let listValuesTramas = tramaSerializado.split((tipoSeparador)? tipoSeparador : this.SEP_FILA); // separador de filas
      let listObjects : Array<T> = [];
      listValuesTramas.forEach((valueTrama : string)=>{
        let objectValue : T = this.buildObject<T>(valueTrama, object);  // tramaSerializado.split("|");
        listObjects.push(objectValue)
      })
      return listObjects;
    }
  }
