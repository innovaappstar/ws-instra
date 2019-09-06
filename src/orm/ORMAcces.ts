import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from '../repository/UserRepository';
import { config} from "../config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "../config/connectionString";

// creando conexiones para cada database en connectionString
let listConnections : Array<ConnectionOptions> = []

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
            logging: false,
            entities:   (configdb.typeDatabase == TYPE_MONGODB) ? [__dirname + "/entity/mongodb/*{.js,.ts}"] : 
                        (configdb.typeDatabase == TYPE_SQL) ? [__dirname + "/entity/sqlserver/*{.js,.ts}"] : []
        }
        listConnections.push(<any>newConnection);    // add new connection to the list..
    }
  });

export class ORMAcess {
    constructor() {
    }

    /**
     * inicializa las conexiones con las bases de datos operativas (mongodb && sql)
     */
    public static startConnections(){
        createConnections(listConnections).then(async listConnectionsOpen => {
            listConnectionsOpen.forEach(async (connection : Connection, index : number)=>{
                config.configdb.forEach((configdb : IConfigDB)=> {
                    if(configdb.operativo == OPERATIVO && configdb.nomDB == connection.name)
                        configdb.connection = connection;   // inject new connection
                  });
            })
        })
        .catch((error : Error)=>{
            console.error("error connection..");
            console.log(error)
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


