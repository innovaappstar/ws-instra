import { Connection } from "typeorm";

/**
 * Created by PC08 on 4/04/2017.
 */
const host = '192.168.1.10';

const user = 'TransRED';
const password = 'TransRED';

// tipos de conexion a bases de datos..
export const TYPE_MONGODB = 1;
export const TYPE_SQL = 2;
export const OPERATIVO = 1;
export const COD_BDGPSGENERAL = 1;
export const DBNAME_LOG_MONGODB = "dblog";
export const DBNAME_GPS_MONGODB = "gps";
export const DBNAME_TSIR_MONGODB = "tsir";

export const configdb : Array<IConfigDB> = [
    // string connections for SQL
    { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : COD_BDGPSGENERAL, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    // string connections for mongodb
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null}
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps"},
    { nomDB : DBNAME_GPS_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps"},
    { nomDB : DBNAME_TSIR_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 2, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tsir"}

    // { nomDB : "gps", host : host, user : "innova", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null}
];  

export interface IConfigDB
{
    nomDB : string;
    host : string;
    user : string;
    password : string;
    id : number;
    typeDatabase : number;
    operativo : number;
    dirEntities : string;
    connection : Connection;
}