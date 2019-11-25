
import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";
import { DBNAME_GPS_MONGODB, DBNAME_TSIR_MONGODB } from "../../../config/connectionString";

//https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564
@Entity({database : DBNAME_TSIR_MONGODB, name : "conexiones"}) 
export class Conexiones {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    codDispositivo: number;
    
    @Column()
    codEmpresa: number;

    @Column()
    fechaHoraConexion: string;

    @Column()
    idConexion: number;

    @Column()
    imei: string;

    @Column()
    nombreEmpresa: string;

    @Column()
    v: string;

}
