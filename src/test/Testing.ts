/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
var scanFolder = require("scan-folder");
var json2xls = require('json2xls');
const fs = require('fs');

export class Testing {

    constructor() {
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

  }
