import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from './repository/UserRepository';
import { config} from "./config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "./config/connectionString";



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

createConnections(listConnections).then(async listConnectionsOpen => {

    console.log("conexiòn creada con mongoDB");
    // console.log("Inserting a new user into the database...");
    // let userRepository : UserRepository = <any>connection.getCustomRepository(UserRepository);
    // let listUsers = await userRepository.buscar("Lesly");
    // console.log(listUsers);

    // const user = new User();
    // user.firstName = "Kenny BALT 4";
    // user.lastName = "B.A.";
    // user.age = 26;
    listConnectionsOpen.forEach(async (connection : Connection, index : number)=>{
        config.configdb.forEach((configdb : IConfigDB)=> {
            if(configdb.operativo == OPERATIVO && configdb.nomDB == connection.name)
                configdb.connection = connection;
          });
    })
    // exe query
    config.configdb.forEach((configdb : IConfigDB)=> {
        if(configdb.operativo == OPERATIVO && configdb.typeDatabase == TYPE_SQL)
            configdb.connection.query("SELECT 1").then((result : any)=>{
                console.log(result);
            }).catch((error : Error)=>{
                console.error(error);
            })
      });
    // console.log("...finish insert con el timer...");
    // console.log("Saved a new user with sid: " + user.id);
})
.catch((error : Error)=>{
    console.error("error connection..");
    console.log(error)
});  
