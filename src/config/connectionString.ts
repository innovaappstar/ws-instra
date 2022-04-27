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
    { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : COD_BDGPSGENERAL, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "TGPS2012", host : host, user : user, password : password, id : 3, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Translicsa", host : newHost, user : user, password : password, id : 5, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Etul4", host : host, user : user, password : password, id : 6, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 13392},
    { nomDB : "AGPS_StaCatalina", host : newHost, user : user, password : password, id : 8, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 14798},
    { nomDB : "AGPS_SJL", host : host, user : user, password : password, id : 11, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_BuenaEstrella", host : host, user : user, password : password, id : 13, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Rapido", host : host, user : user, password : password, id : 14, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21323},
    { nomDB : "AGPS_Chama", host : newHost, user : user, password : password, id : 15, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Salamanca", host : host, user : user, password : password, id : 16, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Lipetsa", host : newHost, user : user, password : password, id : 20, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_LimaSur", host : newHost, user : user, password : password, id : 22, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Pruebas", host : host, user : user, password : password, id : COD_BDGPSPRUEBAS, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Alfa", host : newHost, user : user, password : password, id : 26, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Modasa", host : host, user : user, password : password, id : 28, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_CaminoInca", host : host, user : user, password : password, id : 30, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Etupsa", host : host, user : user, password : password, id : 32, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21220},
    { nomDB : "AGPS_AqpTS", host : newHost, user : user, password : password, id : 34, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Ccentral", host : host, user : user, password : password, id : 35, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Peru", host : host, user : user, password : password, id : 36, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    // { nomDB : "AGPS_Ramerica", host : host, user : user, password : password, id : 37, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_TATSA", host : host, user : user, password : password, id : 38, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Vigusa", host : host, user : user, password : password, id : 39, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_SantaBarbara", host : host, user : user, password : password, id : 40, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_Vipusa", host : host, user : user, password : password, id : 42, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "Conin", host : host, user : user, password : password, id : COD_BDCONIN, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
    { nomDB : "AGPS_SantoCristo", host : host, user : user, password : password, id : 44, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 21383},
    { nomDB : "AGPS_SolOro", host : host, user : user, password : password, id : 45, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null, dirEntities : "sqlserver" , codEmpresaMoovit : 0},
 

    // string connections for mongodb
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null}
    // { nomDB : DBNAME_LOG_MONGODB, host : host, user : "wcubas", password : "lomizmo407", id : 1000, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps"},
    { nomDB : DBNAME_GPS_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "gps", codEmpresaMoovit : 0},
    { nomDB : DBNAME_TSIR_MONGODB, host : host, user : "innova", password : "lomizmo407", id : 2, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tsir", codEmpresaMoovit : 0},
    { nomDB : DBNAME_TUBUS, host : host, user : "innova", password : "lomizmo407", id : 3, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null, dirEntities : "tubus", codEmpresaMoovit : 0}


    // { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : 1, operativo : 0, codEmpresaMoovit : 0},
    // { nomDB : "TGPS2012", host : host, user : user, password : password, id : 3,operativo : 1,   codEmpresaMoovit : 11424},
    // { nomDB : "AGPS_Translicsa", host : host, user : user, password : password, id : 5, operativo : 1, codEmpresaMoovit : 21224},
    // { nomDB : "AGPS_Etul4", host : host, user : user, password : password, id : 6, operativo : 1, codEmpresaMoovit : 13392},
    // { nomDB : "AGPS_StaCatalina", host : host, user : user, password : password, id : 8, operativo : 1, codEmpresaMoovit : 14798},
    // { nomDB : "AGPS_SJL", host : host, user : user, password : password, id : 11, operativo : 1, codEmpresaMoovit : 11427},
    // { nomDB : "AGPS_BuenaEstrella", host : host, user : user, password : password, id : 13, operativo : 0, codEmpresaMoovit : 21271},
    // { nomDB : "AGPS_Rapido", host : host, user : user, password : password, id : 14, operativo : 1, codEmpresaMoovit : 21323},
    // { nomDB : "AGPS_Chama", host : host, user : user, password : password, id : 15, operativo : 1, codEmpresaMoovit : 13398},
    // { nomDB : "AGPS_Salamanca", host : host, user : user, password : password, id : 16, operativo : 1, codEmpresaMoovit : 57515},
    // { nomDB : "AGPS_Lipetsa", host : host, user : user, password : password, id : 20, operativo : 1, codEmpresaMoovit : 21227},
    // { nomDB : "AGPS_LimaSur", host : host, user : user, password : password, id : 22, operativo : 1, codEmpresaMoovit : 10974},
    // { nomDB : "AGPS_Alfa", host : host, user : user, password : password, id : 26, operativo : 1, codEmpresaMoovit : 21261},
    // { nomDB : "AGPS_Modasa", host : host, user : user, password : password, id : 28, operativo : 1, codEmpresaMoovit : 21407},    // transfuturo
    // { nomDB : "AGPS_AqpTS", host : host, user : user, password : password, id : 34, operativo : 1, codEmpresaMoovit : 0},
    // { nomDB : "AGPS_Etupsa", host : host, user : user, password : password, id : 32, operativo : 1, codEmpresaMoovit : 21220},
    // { nomDB : "AGPS_Ccentral", host : host, user : user, password : password, id : 35, operativo : 1, codEmpresaMoovit : 11426},
    // { nomDB : "AGPS_Ramerica", host : host, user : user, password : password, id : 37, operativo : 1, codEmpresaMoovit : 21264},
    // { nomDB : "AGPS_TATSA", host : host, user : user, password : password, id : 38, operativo : 1, codEmpresaMoovit : 57513}, 
    // { nomDB : "AGPS_Vigusa", host : host, user : user, password : password, id : 39, operativo : 1, codEmpresaMoovit : 21343},    // 51
    // { nomDB : "AGPS_SantaBarbara", host : host, user : user, password : password, id : 40, operativo : 1, codEmpresaMoovit : 67356},
    // { nomDB : "AGPS_Vipusa", host : host, user : user, password : password, id : 42, operativo : 1, codEmpresaMoovit : 13394},
    // { nomDB : "AGPS_Salvador", host : host, user : user, password : password, id : 43, operativo : 1, codEmpresaMoovit : 21360},
    // { nomDB : "AGPS_SantoCristo", host : host, user : user, password : password, id : 44, operativo : 1, codEmpresaMoovit : 21383},
    // { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : 0, isPrincipal : 1, codEmpresaMoovit : 0}


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
    codEmpresaMoovit : number;
}