/**
 * Created by PC08 on 4/04/2017.
 */
const host = '192.168.1.10';

const user = 'TransRED';
const password = 'TransRED';

// tipos de conexion a bases de datos..
const TIPO_MONGODB = 1;
const TIPO_SQL = 2;

export const configdb : Array<IConfigDB> = [
    // string connections for SQL
    { nomDB : "bdGPSGeneral", host : host, user : user, password : password, id : 1, operativo : 0, tipoDatabase : TIPO_SQL},
    { nomDB : "TeGuio", host : host, user : user, password : password, id : 41, operativo : 0, tipoDatabase : TIPO_SQL},
    // string connections for mongodb
    { nomDB : "dblog", host : host, user : "wcubas", password : "lomizmo407", id : 1, operativo : 0, tipoDatabase : TIPO_MONGODB}
];  

export interface IConfigDB
{
    nomDB : string;
    host : string;
    user : string;
    password : string;
    id : number;
    tipoDatabase : number;
    operativo : number;
}