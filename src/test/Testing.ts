/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { BaseDEO } from '../deo/BaseDEO';
var scanFolder = require("scan-folder");
var json2xls = require('json2xls');
const fs = require('fs');

export class Testing extends BaseDEO{

    constructor() {
      super();
    }

    public static readDatabases(dirname : string){
      // find js files in current dir
      // let listFiles = scanFolder(dirname + "/orm/tsir/", "db");
      let listFiles = scanFolder(dirname + "/orm/tsir/", "TSIR.db");
      console.log(listFiles)

      var json = {
          foo: 'bar',
          qux: 'moo',
          poo: 123,
          stux: new Date()
      }
      
      var xls = json2xls(json);
      
      fs.writeFileSync('data.xlsx', xls, 'binary');
      
    }

    // /**
    //  * se debe castear un serializado a un objeto para 
    //  * poder trabajarlo de forma màs clara. (only websocket)
    //  */
    // public static buildObjects(){
    //   let tramaSerializado = "1|2|3|4|5|6|7|8|9|10|11";

    //   var object = {
    //     val0 : 0,
    //     val1 : 1,
    //     val2 : 2,
    //     val3 : 3,
    //     val4 : 4,
    //     val5 : 5,
    //     val6 : 6,
    //     val7 : 7,
    //     val8 : 8,
    //     val9 : 9,
    //     val10 : 10
    //   }
    //   let listValoresTrama = tramaSerializado.split("|");
    //   let objectResponse : IObjectValue = <any>{};
    //   Object.keys(object).forEach((key : string, index : number )=>{
    //     console.log("la key es ", key, " y su valor es ", object[key]);
    //     objectResponse[key] = listValoresTrama[index];
    //   })
    //   // console.log(objectResponse)
    //   return objectResponse;
    // }

    // /**
    //  * se debe castear un serializado a un objeto para 
    //  * poder trabajarlo de forma màs clara. (only websocket)
    //  */
    // public static buildObject(tramaSerializado : string, object : Object) : IObjectValue{
    //   let listValoresTrama = tramaSerializado.split("|"); // separador de columna
    //   let objectResponse : IObjectValue = <any>{};
    //   Object.keys(object).forEach((key : string, index : number )=>{
    //     // console.log("la key es ", key, " y su valor es ", object[key]);
    //     objectResponse[key] = listValoresTrama[index];
    //   })
    //   // console.log(objectResponse)
    //   return objectResponse;
    // }


    // /**
    //  * se debe castear un serializado a un objeto para 
    //  * poder trabajarlo de forma màs clara. (only websocket)
    //  */
    // public static buildListObject() : Array<IObjectValue>{
    //   let tramaSerializado = "1|2|3|4|5|6|7|8|9|10|11*11|12|13|14|15|16|17|18|19|20|21";
    //   var object = {
    //     val0 : 0,
    //     val1 : 1,
    //     val2 : 2,
    //     val3 : 3,
    //     val4 : 4,
    //     val5 : 5,
    //     val6 : 6,
    //     val7 : 7,
    //     val8 : 8,
    //     val9 : 9,
    //     val10 : 10
    //   }
    //   let listValuesTramas = tramaSerializado.split("*"); // separador de filas
    //   let listObjects : Array<IObjectValue> = [];
    //   listValuesTramas.forEach((tramaSerializado : string)=>{
    //     let objectValue : IObjectValue = Testing.buildObject(tramaSerializado, object);  // tramaSerializado.split("|");
    //     listObjects.push(objectValue)
    //   })
    //   return listObjects;
    // }

    public initBuilding(){
      let tramaSerializado = "1|2|3|4|5|6|7|8|9|10|11~11|12|13|14|15|16|17|18|19|20|21";
      var object = {
        val0 : 0,
        val1 : 0,
        val2 : 0,
        val3 : 0,
        val4 : 0,
      }
      let myObject = super.buildListObject<IObjectValue>(tramaSerializado, object);
      let myObject2 = super.buildObject<IObjectValue>(tramaSerializado, object);
      console.log(myObject);
    }


  }

  interface IObjectValue{
    val0 : number;
    val1 : number;
    val2 : number;
    val3 : number;
    val4 : number;
    val5 : number;
    val6 : number;
    val7 : number;
    val8 : number;
    val9 : number;
    val10 : number;
  }
