
import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";
import { DBNAME_TUBUS } from "../../../config/connectionString";


// objeto embebido, sub column of collection
interface ILocation{
    coordinates : Array<number>;
    type : string;
} 

//https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564
@Entity({database : DBNAME_TUBUS, name : "unidades_tracks"}) 
export class UnidadTrack {
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    codEstado               : number;  
    @Column() 
    padronUnidad            : string;
    @Column()
    placaUnidad             : string; 
    @Column()
    fechaHoraPaso           : Date;
    @Column()
    nombrePersonaConductor  : string;
    @Column()
    nivelBateria            : number;
    @Column()
    velocidad               : number;
    @Column()
    location                : ILocation;   // type point -> coordinates : [lng, lat], type : Point
    @Column()
    latitudAnterior         : number;
    @Column()
    longitudAnterior        : number;
    @Column()
    claseUnidad             : string;
    @Column()
    coloresUnidad           : string;
    @Column()
    numAsientos             : number;
    @Column()
    numPasajeros            : number;
    @Column()
    frecuenciaPosteo        : number;
    @Column()
    codUnidad               : number;
    @Column()
    codAlertaInspectoria    : number;
    @Column()
    codAlerta               : number;
    @Column()
    codEmpresa              : number;
    @Column()
    nomRuta                 : string;
    @Column()
    ladoActual              : string;
    @Column()
    nomRecorrido            : string;
    // auxiliares
    @Column()
    distancia : number;
    @Column()
    distanciaMovimiento : number;
}
