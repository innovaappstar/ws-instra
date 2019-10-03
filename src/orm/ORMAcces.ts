import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from '../repository/UserRepository';
import { config} from "../config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "../config/connectionString";
import { join } from 'path';
import { User } from "../entity/mongodb/User";

// creando conexiones para cada database en connectionString
let listConnections : Array<ConnectionOptions> = []


export class ORMAcess {
    constructor() {
    }

    /**
     * inicializa las conexiones con las bases de datos operativas (mongodb && sql)
     */
    public static startConnections(){

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
                    // entities : ["conexiones_sockets"],
                    // entities: [join(__dirname, '/entity/mongodb/*{.ts,.js}')],
                    entities:   (configdb.typeDatabase == TYPE_MONGODB) ? [__dirname + "/entity/mongodb/*{.js,.ts}"] : 
                                (configdb.typeDatabase == TYPE_SQL) ? [__dirname + "/entity/sqlserver/*{.js,.ts}"] : []
                }
                listConnections.push(<any>newConnection);    // add new connection to the list..
            }
        });


        createConnections(listConnections).then(async listConnectionsOpen => {
            listConnectionsOpen.forEach(async (connection : Connection, index : number)=>{
                config.configdb.forEach(async (configdb : IConfigDB)=> {
                    if(configdb.operativo == OPERATIVO && configdb.nomDB == connection.name)
                        configdb.connection = connection;   // inject new connection
                    
                        // if(configdb.nomDB == "gps"){
                        //     new ConexionDispositivoRepository().findByIdsDispositivos([1, 2, 3, 5, 22, 214, 372], 14, (list : any)=>{
                        //         console.log(list);
                        //       })
                        // }
                        if(configdb.nomDB == "dblog"){
                            // let user = new User();
                            // user.firstName = "Kuba";
                            // user.lastName = "Wolanin";
                            // user.age = 24;

                            // let userRepository = connection.getRepository(User);
                            // await userRepository.save(user);
                            // new UserRepository().findAll().then((users : Array<User>)=>{
                            //     console.log(users);
                            // })
                            try {
                                const user = new User();
                                user.firstName = "Timber";
                                user.lastName = "Saw";
                                user.age = 25;
                                await connection.manager.save(user);

                                new UserRepository().findAll().then((users : Array<User>)=>{
                                    console.log(users);
                                })
                            } catch (error) {
                                console.error(error);
                            }
                            
                        }
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

    /**
     * Retorna la base de datos por filtro de nombre
     * @param queryString string
     * @param codEmpresa number
     */
    public static getConnectionByNomDB(nomDB : string): Promise<IConfigDB> {
        return new Promise((resolve, reject)=>
        {
            config.configdb.forEach((configdb : IConfigDB)=> {
                if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_MONGODB && configdb.nomDB == nomDB)
                    resolve(configdb);
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


