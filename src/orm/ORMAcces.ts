import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from '../repository/UserRepository';
import { config} from "../config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "../config/connectionString";
import { User } from "../entity/mongodb/gps/User";
import { ConexionesSocket } from "../entity/mongodb/gps/ConexionesSocket";
import { ConexionesSocketRepository } from "../repository/ConexionesSocketRepository";
// import sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

// creando conexiones para cada database en connectionString
let listConnections : Array<ConnectionOptions> = []


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
                let newConnection : IConnection = <IConnection>{
                    name: configdb.nomDB,
                    type: (configdb.typeDatabase == TYPE_MONGODB) ? "mongodb" : (configdb.typeDatabase == TYPE_SQL) ? "mssql" : "",
                    host: configdb.host,
                    port: (configdb.typeDatabase == TYPE_MONGODB) ? 2035 : (configdb.typeDatabase == TYPE_SQL) ? 1433 : 0,
                    username: configdb.user,
                    password: configdb.password,
                    synchronize: true,
                    database: configdb.nomDB,
                    logging: true,
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
                        
                        if(configdb.nomDB == "gps" && connection.name == "gps")
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


    /**
     * ejecuta consulta a la base de datos seleccionada
     * @param queryString string
     * @param codEmpresa number
     */
    public static execQuerySQL(queryString : string, codEmpresa : number): Promise<any> {
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


