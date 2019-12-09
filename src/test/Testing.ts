/**
import { StoreUtils } from "./../utils/StoreUtils";
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

    public initBuilding(){
      let tramaSerializado = "1|2|3|ABC|5|6|7|8|9|10|11~11|12|13|DEF|15|16|17|18|19|20|21";
      var object = {
        val0 : 0,
        val1 : 0,
        val2 : 0,
        val3 : "Hola mundo",
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
