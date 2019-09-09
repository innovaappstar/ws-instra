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

export const configdb : Array<IConfigDB> = [
    // string connections for SQL
    { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : COD_BDGPSGENERAL, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null},
    { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : OPERATIVO, typeDatabase : TYPE_SQL, connection : null},
    // string connections for mongodb
    { nomDB : "dblog", host : host, user : "wcubas", password : "lomizmo407", id : 1, operativo : OPERATIVO, typeDatabase : TYPE_MONGODB, connection : null}
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
    connection : Connection;
}