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
export const DBNAME_TUBUS = "dbtubus2";

//     { nomDB : "AGPS_Vipusa", host : host, user : user, password : password, id : 42, operativo : 1, isHasAudioParlante : false,  isRechazoLLamada : 0},

export const configdb : Array<IConfigDB> = [
    // string connections for SQL
    { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : COD_BDGPSGENERAL, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "TGPS2012", host : host, user : user, password : password, id : 3, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Translicsa", host : host, user : user, password : password, id : 5, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Etul4", host : host, user : user, password : password, id : 6, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_StaCatalina", host : host, user : user, password : password, id : 8, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_SJL", host : host, user : user, password : password, id : 11, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_BuenaEstrella", host : host, user : user, password : password, id : 13, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Rapido", host : host, user : user, password : password, id : 14, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Chama", host : host, user : user, password : password, id : 15, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Salamanca", host : host, user : user, password : password, id : 16, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Lipetsa", host : host, user : user, password : password, id : 20, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_LimaSur", host : host, user : user, password : password, id : 22, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Pruebas", host : host, user : user, password : password, id : 25, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Alfa", host : host, user : user, password : password, id : 26, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Modasa", host : host, user : user, password : password, id : 28, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_CaminoInca", host : host, user : user, password : password, id : 30, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Etupsa", host : host, user : user, password : password, id : 32, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_AqpTS", host : host, user : user, password : password, id : 34, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Ccentral", host : host, user : user, password : password, id : 35, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Peru", host : host, user : user, password : password, id : 36, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Ramerica", host : host, user : user, password : password, id : 37, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_TATSA", host : host, user : user, password : password, id : 38, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Vigusa", host : host, user : user, password : password, id : 39, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_SantaBarbara", host : host, user : user, password : password, id : 40, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    { nomDB : "AGPS_Vipusa", host : host, user : user, password : password, id : 42, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver"},
    // string connections for mongodb
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null}
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps"},
    { nomDB : DBNAME_GPS_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps"},
    { nomDB : DBNAME_TSIR_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 2, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tsir"},
    { nomDB : DBNAME_TUBUS, host : host, user : "innova", password : "lomizmo407", id : 3, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tubus"}

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