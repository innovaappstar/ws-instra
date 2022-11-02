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
export const COD_BDGPSPRUEBAS = 25;
export const COD_BDCONIN = 1000;

export const DBNAME_LOG_MONGODB = "dblog";
export const DBNAME_GPS_MONGODB = "gps";
export const DBNAME_TSIR_MONGODB = "tsir";
export const DBNAME_TUBUS = "dbtubus2";
const newHost = "192.168.1.11"  // nuevo host donde se irá migrando las bases de datos
// export const DBNAME_TUBUS = "dbtubus";

//     { nomDB : "AGPS_Vipusa", host : host, user : user, password : password, id : 42, operativo : 1, isHasAudioParlante : false,  isRechazoLLamada : 0},

export const configdb : Array<IConfigDB> = [
    // string connections for SQL
    { nomDB : "bdGPSGeneral", host : newHost, user : user, password : password, id : COD_BDGPSGENERAL, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "TGPS2012", host : newHost, user : user, password : password, id : 3, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Translicsa", host : newHost, user : user, password : password, id : 5, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Etul4", host : newHost, user : user, password : password, id : 6, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 13392},
    { nomDB : "AGPS_StaCatalina", host : newHost, user : user, password : password, id : 8, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 14798},
    { nomDB : "AGPS_SJL", host : newHost, user : user, password : password, id : 11, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Rapido", host : newHost, user : user, password : password, id : 14, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21323},
    { nomDB : "AGPS_Chama", host : newHost, user : user, password : password, id : 15, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Salamanca", host : newHost, user : user, password : password, id : 16, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Lipetsa", host : newHost, user : user, password : password, id : 20, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_LimaSur", host : newHost, user : user, password : password, id : 22, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Pruebas", host : newHost, user : user, password : password, id : COD_BDGPSPRUEBAS, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Alfa", host : newHost, user : user, password : password, id : 26, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Modasa", host : newHost, user : user, password : password, id : 28, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_CaminoInca", host : newHost, user : user, password : password, id : 30, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Etupsa", host : newHost, user : user, password : password, id : 32, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21220},
    { nomDB : "AGPS_AqpTS", host : newHost, user : user, password : password, id : 34, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    
    { nomDB : "AGPS_TATSA", host : newHost, user : user, password : password, id : 38, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Vigusa", host : newHost, user : user, password : password, id : 39, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_SantaBarbara", host : newHost, user : user, password : password, id : 40, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "TeGuio", host : newHost, user : user, password : password, id : 41, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Vipusa", host : newHost, user : user, password : password, id : 42, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "Conin", host : newHost, user : user, password : password, id : COD_BDCONIN, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_SantoCristo", host : newHost, user : user, password : password, id : 44, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21383},
    { nomDB : "AGPS_SolOro", host : newHost, user : user, password : password, id : 45, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
 
    <any>{ nomDB : DBNAME_GPS_MONGODB, host : "192.168.1.12", user : "innova", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps", codEmpresaMoovit : 0, mongoDBPort : 27018},
    <any>{ nomDB : DBNAME_TSIR_MONGODB, host : "192.168.1.12", user : "innova", password : "lomizmo407", id : 2, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tsir", codEmpresaMoovit : 0, mongoDBPort : 27018},
    <any>{ nomDB : DBNAME_TUBUS, host : "192.168.1.12", user : "innova", password : "lomizmo407", id : 3, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tubus", codEmpresaMoovit : 0, mongoDBPort : 27018}
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
    codEmpresaMoovit : number;
}