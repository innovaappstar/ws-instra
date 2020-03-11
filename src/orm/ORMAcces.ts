import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from '../repository/UserRepository';
import { config} from "../config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "../config/connectionString";
import { User } from "../entity/mongodb/gps/User";
import { ConexionesSocket } from "../entity/mongodb/gps/ConexionesSocket";
import { ConexionesSocketRepository } from "../repository/ConexionesSocketRepository";
import { UnidadTrackRepository, IQueryParadero } from "../repository/UnidadTrackRepository";
import { UnidadTrack } from "../entity/mongodb/tubus/UnidadTrack";
// import sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();
const scanFolder = require("scan-folder");
var json2xls = require('json2xls');
const fs = require('fs');

// creando conexiones para cada database en connectionString
let listConnections : Array<ConnectionOptions> = []
let LIST_DATABASES = []

export class ORMAcess {
    constructor() {
    }

    /**
     * inicializa las conexiones con las bases de datos operativas (mongodb && sql)
     */
    public static startConnections(dirname : string)
    {
        config.configdb.forEach((configdb : IConfigDB)=> {
            if(configdb.operativo == OPERATIVO)
            {
                // build the connection object
                let newConnection : IConnection = <IConnection><any>{
                    name: configdb.nomDB,
                    type: (configdb.typeDatabase == TYPE_MONGODB) ? "mongodb" : (configdb.typeDatabase == TYPE_SQL) ? "mssql" : "",
                    host: configdb.host,
                    port: (configdb.typeDatabase == TYPE_MONGODB) ? 2035 : (configdb.typeDatabase == TYPE_SQL) ? 1433 : 0,
                    username: configdb.user,
                    password: configdb.password,
                    synchronize: true,
                    database: configdb.nomDB,
                    logging: ["error"], // https://github.com/typeorm/typeorm/blob/master/docs/logging.md
                    entities:   (configdb.typeDatabase == TYPE_MONGODB) ? [`${dirname}/entity/mongodb/${configdb.dirEntities}/*{.js,.ts}`] : 
                                (configdb.typeDatabase == TYPE_SQL) ? [`${dirname}/entity/sqlserver/${configdb.dirEntities}/*{.js,.ts}`] : []
                }
                listConnections.push(<any>newConnection);    // add new connection to the list..
            }
        });
    

        createConnections(listConnections).then(async listConnectionsOpen => {
                listConnectionsOpen.forEach(async (connection : Connection, index : number)=>{
                    config.configdb.forEach(async (configdb : IConfigDB)=> {
                        if(configdb.connection == null && configdb.operativo == OPERATIVO && configdb.nomDB == connection.name)
                            configdb.connection = connection;   // inject new connection
                        
                        // if(configdb.nomDB == "dbtubus2" && connection.name == "dbtubus2")
                        // solo testing
                        if(configdb.nomDB == "dbtubus" && connection.name == "dbtubus")
                        {
                            // try 
                            // {
                            //     new ConexionesSocketRepository().findUnidadesByIds([214, 372, 59, 56], 14).then((listConexiones : Array<ConexionesSocket>)=>
                            //     {
                            //         console.log(listConexiones);
                            //     })
                            // }catch(error){
                            //     console.error(error);    
                            // }

                            // -11.976988, -77.083125
                            // entidad de consulta con mongodb
                            // let queryParadero : IQueryParadero = <IQueryParadero>{
                            //     lng : -76.89382,
                            //     lat : -12.23058,
                            //     maxDistance : 2000,   // metros * METERS_POR_KM,
                            //     codEmpresa : 15
                            // }

                            // new UnidadTrackRepository().findListUnidadesCercanas(queryParadero).then((listUnidadTrack : Array<UnidadTrack>)=>{
                            //     console.log(listUnidadTrack)
                            // }).catch((error : Error)=>{
                            //     console.error(error);
                            // })
                            // new UnidadTrackRepository().generateReport();
                        }
                    });
                })
            })
            .catch((error : Error)=>{
                console.error("error connection..");
                console.log(error)
            });  
    }

    public static readDatabase(dirname : string, listPaths : Array<string>){
        // open the database
        let sql = `SELECT I.FechaHora, I.Descripcion, U.NombrePlaca, U.NombreConcesionario   FROM Incidencia I
                    INNER JOIN Unidad U
                    ON I.IdDispositivo = U.IdDispositivo
                    WHERE I.Descripcion LIKE '%+51989076666%';`;

        if(listPaths.length < 0){
            console.log("tarea finalizada..")
            return
        }

        let pathActual = listPaths[0];
        listPaths.shift();

        let pathDatabase = `${dirname}${pathActual}`;
        
        let db = new sqlite3.Database(pathDatabase, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log('Connected to the chinook database.');
            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                if(rows.length > 0){
                    rows.forEach((row) => {
                        console.log(row);
                    });
                }
                // recursividad..
                ORMAcess.readDatabase(dirname, listPaths)
            });
            // close the database connection
            db.close();
          });
    }


    public static readDatabaseV2(dirname : string, listPaths ?: Array<string>){
        if(listPaths == null)
            listPaths = scanFolder(dirname + "/orm/tsir/", "TSIR.db");
        // open the database    51989293185
        let sql = `SELECT I.FechaHora, I.Descripcion, U.NombrePlaca, U.IdDispositivo AS BD, U.NombreConcesionario   FROM Incidencia I
                    INNER JOIN Unidad U
                    ON I.IdDispositivo = U.IdDispositivo
                    WHERE I.Descripcion LIKE '%+51989293185%' LIMIT 1;`;

        if(listPaths.length < 0){
            let listTemp = LIST_DATABASES;
            console.log("tarea finalizada..")
            return
        }

        let pathActual = listPaths[0];
        listPaths.shift();
        let pathDatabase = `${pathActual}`;
        try {
            if(listPaths.length == 0)
            {
                let listTemp = JSON.stringify(LIST_DATABASES);
                var xls = json2xls(LIST_DATABASES);
                
                fs.writeFileSync('numeros_1333.xlsx', xls, 'binary');
                console.log("tarea finalizada..")
                return
            }
            let db = new sqlite3.Database(pathDatabase, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                // console.log('Connected to the chinook database.');
                db.all(sql, [], (err, rows) => {
                    if (err) {
                        // throw err;
                        ORMAcess.readDatabaseV2(dirname, listPaths)
                        return
                    }
                    if(rows.length > 0){
                        rows.forEach((row, index) => {
                            console.log(row);
                            let numeroTelefono = (row.Descripcion).substring(15, 24)
                            rows[index]["NumeroTelefono"] = numeroTelefono
                            delete rows[index].Descripcion;  // or delete person["age"];
                        });
                        
                        LIST_DATABASES = LIST_DATABASES.concat(rows)
                        // LIST_DATABASES.push(rows)   // push
                    }
                    // close the database connection
                    db.close();
                    // recursividad..
                    ORMAcess.readDatabaseV2(dirname, listPaths)
                });
            });
        } catch (error) {
            console.log(error)
            ORMAcess.readDatabaseV2(dirname, listPaths)
        }
    }


    /**
     * ejecuta consulta a la base de datos seleccionada
     * @param queryString string
     * @param codEmpresa number
     */
    public static execQuerySQL(queryString : string, codEmpresa : number, isSetDateFormat ?: boolean): Promise<any> {
        // util para cuando se requiera trabajar con fechas como parAmetros de entrada o en proceso (get/set) interno del mismo Procedure-SQL
        if(isSetDateFormat)
        {
            let FORMAT_DATE = "SET DATEFORMAT dmy;"
            queryString = FORMAT_DATE.concat(queryString)
        } 

        return new Promise((resolve, reject)=>
        {
            config.configdb.forEach((configdb : IConfigDB)=> {
                if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_SQL && configdb.id == codEmpresa)
                    (configdb.connection.query(queryString)).then((result : any)=>{
                        resolve(result);
                    }).catch((error : Error)=>{
                        reject(error);
                    });
            });
        }); 
    }


    /**
     * ejecuta consulta a la base de datos seleccionada
     * @param queryString string
     * @param codEmpresa number
     */
    public static execQuerySQLXMLPath(queryString : string, codEmpresa : number, isSetDateFormat ?: boolean): Promise<any> {
        // util para cuando se requiera trabajar con fechas como parAmetros de entrada o en proceso (get/set) interno del mismo Procedure-SQL
        if(isSetDateFormat)
        {
            let FORMAT_DATE = "SET DATEFORMAT dmy;"
            queryString = FORMAT_DATE.concat(queryString)
        } 

        return new Promise((resolve, reject)=>
        {
            config.configdb.forEach((configdb : IConfigDB)=> {
                if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_SQL && configdb.id == codEmpresa)
                    (configdb.connection.query(queryString)).then((rows : any)=>{
                        let jsonString = "";
                        Object.keys(rows).forEach((nomKey : string, index : number)=>{
                            let objIteracion = rows[index];
                            Object.keys(objIteracion).forEach((nomKey : string, j : number)=>{
                                jsonString += objIteracion[nomKey];
                            })
                        });
                        // callback(null, jsonString);
                        resolve(jsonString);
                    }).catch((error : Error)=>{
                        reject(error);
                    });
            });
        }); 
    }



    /**
     * todo : USO DE MÉTODO doneProc.. 
     * Efectividad optimizada de respuesta!!
     * recorre lista de pool de conexiones
     * @param idConnectionPool
     * @param query
     * @param callback
     * @param isCallbackVacio
     */
    public execSQLXMLPath(queryString : string, codEmpresa : number, callback : (error : Error, jsonString : string) => void, isNomColInclude ?: boolean)
    {
        try
        { 
            let jsonResponse = [];
            return new Promise((resolve, reject)=>
            {
                config.configdb.forEach((configdb : IConfigDB)=> {
                    if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_SQL && configdb.id == codEmpresa)
                        (configdb.connection.query(queryString)).then((rows : any)=>{
                            let jsonString = "";
                            Object.keys(rows).forEach((nomKey : string, index : number)=>{
                                let objIteracion = rows[index];
                                Object.keys(objIteracion).forEach((nomKey : string, j : number)=>{
                                    jsonString += objIteracion[nomKey];
                                })
                            });
                            // callback(null, jsonString);
                            resolve(jsonString);
                        }).catch((error : Error)=>{
                            reject(error);
                        });
                });
            }); 
        }catch (error)
        {
            console.error(error);
            callback(error, null);
        }

    }

    // /**
    //  * Retorna la base de datos por filtro de nombre
    //  * @param queryString string
    //  * @param codEmpresa number
    //  */
    // public static getConnectionByNomDB(nomDB : string): Promise<IConfigDB> {
    //     return new Promise((resolve, reject)=>
    //     {
    //         config.configdb.forEach((configdb : IConfigDB)=> {
    //             if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_MONGODB && configdb.nomDB == nomDB)
    //                 resolve(configdb);
    //         });
    //     }); 
    // }


    /**
     * Retorna la base de datos por filtro de nombre
     * @param queryString string
     * @param codEmpresa number
     */
    public static getConfigDBByNomDB(nomDB : string): IConfigDB{
        let configDBResponse = null;
        config.configdb.forEach((configdb : IConfigDB)=> {
            if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_MONGODB && configdb.nomDB == nomDB)
                configDBResponse = configdb;
        });
        return configDBResponse;
    }
  }

interface IConnection{
    name: string,
    type: string,
    host: string,
    port: number,
    username: string,
    password: string,
    synchronize: boolean,
    database: string,
    logging: boolean,
    entities: Array<string>
}


