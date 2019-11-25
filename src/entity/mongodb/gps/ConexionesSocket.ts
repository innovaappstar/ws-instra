
import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";
import { DBNAME_GPS_MONGODB } from "../../../config/connectionString";

//https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564
@Entity({database : DBNAME_GPS_MONGODB, name : "conexiones_sockets"}) 
export class ConexionesSocket {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    codEmpresa: number;

    @Column()
    idDispositivo: number;

    @Column()
    IdSocketIO: string;

    @Column()
    fechaHoraConexion: string;

    @Column()
    idConexion: number;

    @Column()
    imei: string;

    @Column()
    md: string;

    @Column()
    nombreEmpresa: string;

    @Column()
    v: string;

}
