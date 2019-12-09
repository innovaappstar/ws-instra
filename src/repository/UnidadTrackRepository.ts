import { UnidadTrack } from "../entity/mongodb/tubus/UnidadTrack";
import { Repository, EntityRepository, getMongoRepository} from "typeorm";
import { ORMAcess } from "../orm/ORMAcces";
import { DBNAME_TUBUS } from "../config/connectionString";
import DateUtils = require("../utils/DateUtils");
import Utils = require("../utils/Utils");

/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */
// https://juejin.im/entry/5d4d35946fb9a06b19732811 MAS INFO DE TYPEORM
// http://192.168.2.65:2029/api/tubus/busqueda_unidad/?lat=-11.978875&lng=-77.055788&nomRuta=2411&lado=A&codControlOrigen=156&codControlDestino=161&codEmpresa=14&maxRangoControl=5&maxRangoUnidad=5
export interface IQueryBusquedaUnidad{
    nroOrden : number;
    nomRuta : string;
    lado : string;
    codEmpresa : number;
    lat : number;
    lng : number;
    macAddress : string;

    codControlOrigen : number;
    codControlDestino : number;
    maxRangoControl : number;   // KM
    maxRangoUnidad : number;    // KM
    placaUnidad : string;   // auxiliar : para retornar paraderos
}

// objeto embebido, sub column of collection
export interface ILocation{
    coordinates : Array<number>;
    type : string;
} 

// entidad de consulta con mongodb
export interface IQueryParadero{
    lng : number;
    lat : number;
    maxDistance : number;   // metros * METERS_POR_KM
    codEmpresa : number;
}

/**
 * interface de documento mongoose
 */
export interface IParaderoModel{
    location                : ILocation;   // type point -> coordinates : [lng, lat], type : Point
    codRecorrido            : number;
    codParadero             : number;
    nomParadero             : string;
    codParaderoTipo         : number;
    codRuta                 : number;
    nomRecorrido            : string;
    lado                    : string;
    nroOrden                : number;
    nomRuta                 : string;
    codEmpresa              : number;
    codZonaPoligono         : number;
    nroOrdenOpuesto         : Array<number>;
    // aux..
    distancia               : number;
}

@EntityRepository(UnidadTrack)
export class UnidadTrackRepository extends Repository<UnidadTrack>{

    private repository : any = null;
    private getRepository() : Repository<UnidadTrackRepository>{
        let configDB = ORMAcess.getConfigDBByNomDB(DBNAME_TUBUS);
        let unidadTrakRepository : any = <any>configDB.connection.getRepository(UnidadTrack);
        // let userRepository = <any>configDB.connection.getMongoRepository(UnidadTrack);
        return unidadTrakRepository;
    }

    constructor(){
        super();
        this.repository = this.getRepository();
    }

    findUnidadByPlaca(item : IQueryBusquedaUnidad, codEmpresa : number) : Promise<UnidadTrack>
    {
        return (this.repository.findOne({placaUnidad : item.placaUnidad}));
    }

    findUnidadByNomPlaca(placaUnidad : string) : Promise<UnidadTrack>
    {
        return (this.repository.findOne({placaUnidad : placaUnidad}));
    }

    // async generateReport() 
    // {
    //     const usersByCountries = await this.repository.aggregate(
    //       [
    //         {
    //           $group: {
    //             _id: {
    //                 codEmpresa: '$codEmpresa',
    //             },
    //           },
    //         },
    //       ]
    //     );
    //     let listRecuperados = await usersByCountries.toArray();
    //     // Get all the aggregation results
    //     await usersByCountries.each(function(err, docs) {
    //         // test.equal(null, err);
    //         console.log(docs)
    //     });
    //     console.log(usersByCountries)
    // }

    // http://192.168.2.65:2029/api/tubus/busqueda_unidad_by_paradero/?lat=-11.978875&lng=-77.055788&lado=A&nroOrden=39&nomRuta=2411&codEmpresa=14
    // schema.index({ codEmpresa : 1, ladoActual : 1, nomRuta : 1, fechaHoraPaso : 1}); // schema level
    /**
     * @param queryParadero 
     */
    findUnidadCercana(lado : string, nomRuta : string, codEmpresa : number, listParaderos : Array<IParaderoModel>):
    Promise<UnidadTrack>
    {
        let queryParaderoParaderoActual : IQueryParadero = <IQueryParadero>{
            lat : listParaderos[0].location.coordinates[1],
            lng : listParaderos[0].location.coordinates[0]
        }
        
        // let queryParaderoParaderoSiguiente : IQueryParadero = <IQueryParadero>{
        //     lat : (listParaderos.length = 2)? listParaderos[1].location.coordinates[1] : 0,
        //     lng : (listParaderos.length = 2)? listParaderos[1].location.coordinates[0] : 0
        // }
        let DISTANCIA_TOLERANCIA = 200; // 200 metros de tolerancia luego de haber cruzado el paradero..
        return  new Promise((resolve, reject)=>{ 
            (
            this.repository.aggregate(
                {
                    $geoNear : 
                    {
                        near :
                        {
                            type : "Point",
                            coordinates :   [queryParaderoParaderoActual.lng, queryParaderoParaderoActual.lat]
                        },
                        distanceField : "dist.calculated",
                        // maxDistance : queryControl.maxDistance * ControlRepository.METERS_POR_KM,        // distancia máxima..
                        spherical : true,
                        num : 5,   // added
                        query: {    // INDEXAAAAAR
                                $and: [{
                                    codEmpresa : codEmpresa, 
                                    ladoActual : lado,
                                    nomRuta : nomRuta, 
                                    fechaHoraPaso :  { $gt: new DateUtils().getDateAddMinutes(-10) }
                                }]
                            }
                    }
                },
                {
                    $group : {
                            _id : {
                                padronUnidad : "$padronUnidad"
                                },                       
                            distancia : {$first : "$dist.calculated"},  // auxiliar..
                            codEmpresa : { $first : "$codEmpresa"},
                            padronUnidad : { $first : "$padronUnidad"},
                            claseUnidad : { $first : "$claseUnidad"},
                            codEstado : { $first : "$codEstado"},
                            coloresUnidad : { $first : "$coloresUnidad"},
                            fechaHoraPaso : { $first : "$fechaHoraPaso"},
                            frecuenciaPosteo : { $first : "$frecuenciaPosteo"},
                            ladoActual : { $first : "$ladoActual"},
                            latitudAnterior : { $first : "$latitudAnterior"},
                            location : { $first : "$location"},
                            longitudAnterior : { $first : "$longitudAnterior"},
                            nivelBateria : { $first : "$nivelBateria"},
                            nomRuta :  { $first : "$nomRuta"},
                            nombrePersonaConductor :  { $first : "$nombrePersonaConductor"},
                            numAsientos : { $first : "$numAsientos"},
                            numPasajeros : { $first : "$numPasajeros"},
                            nomRecorrido : { $first : "$nomRecorrido"},
                            placaUnidad : { $first : "$placaUnidad"},
                            velocidad : { $first : "$velocidad"},
                        }
                },
                {
                    $sort : {
                        distancia : 1
                    }
                },
                {
                    $project: {
                        _id : 0
                        // distancia : 1,
                        // nomParadero : 1,
                        // nroOrden : 1,
                        // nroOrdenOpuesto : 1,
                        // location : 1,
                        // lado : 1,
                        // nomRuta : 1,
                        // codEmpresa : 1
                    }
                }
            )).then((listUnidades : UnidadTrack[])=>
            {
                // listUnidades = listUnidades.sort()
                let posFinal = (listUnidades.length > 3)? 4 : listUnidades.length;
                listUnidades = listUnidades.sort((actual, siguiente)=> {return actual.distancia - siguiente.distancia})   // ordenamiento de mayor a menor..
                listUnidades = listUnidades.splice(0, posFinal);
                let listUnidadesProximas : Array<UnidadTrack> = [];

                // let listUnidadesTrackTEST : Array<IUnidadTrackModelTestTrack> = []  // solo para testing y seguimiento de error..
                // let listUnidadesTrackAll : Array<IUnidadTrackModelTestTrack> = []  // solo para testing y seguimiento de error..
                
                listUnidades.forEach((unidadCercana : UnidadTrack, index : number)=>{
                    let queryPuntoAnterior : IQueryParadero = <IQueryParadero>{
                        lat : unidadCercana.latitudAnterior,
                        lng : unidadCercana.longitudAnterior
                    };
                    let distanciaPuntoAnterior = Utils.getDistanceTwoPointsInMetersQueryParadero(
                        queryPuntoAnterior,
                        queryParaderoParaderoActual
                    );
                    // let unidadTrackSeguimiento = <IUnidadTrackModelTestTrack>{
                    //                                                             padronUnidad            : unidadCercana.padronUnidad,
                    //                                                             fechaHoraPaso           : unidadCercana.fechaHoraPaso,
                    //                                                             velocidad               : unidadCercana.velocidad,
                    //                                                             frecuenciaPosteo        : unidadCercana.frecuenciaPosteo,
                    //                                                             distancia : unidadCercana.distancia,
                    //                                                             distanciaAnterior : distanciaPuntoAnterior,
                    //                                                             isAgregadoPorTolerancia : false
                    //                                                         }
                    let distanciaMovimiento = ~~(Math.abs(distanciaPuntoAnterior - unidadCercana.distancia));
                    unidadCercana.distanciaMovimiento = distanciaMovimiento;
                    unidadCercana.distancia = ~~unidadCercana.distancia
                    if(distanciaPuntoAnterior > unidadCercana.distancia || // unidad de atràs se està acercando..
                        distanciaMovimiento < DISTANCIA_TOLERANCIA)      // unidad que se acercaba se quedò quieta 
                    {
                        listUnidadesProximas.push(unidadCercana);
                        // unidadTrackSeguimiento.isAgregadoPorTolerancia = false;
                        // listUnidadesTrackTEST.push(unidadTrackSeguimiento)
                    }
                    else if(unidadCercana.distancia < DISTANCIA_TOLERANCIA) // unidad que cruzò del paradero està dentro de la tolerancia.. ??
                    {
                        listUnidadesProximas.push(unidadCercana);
                        // unidadTrackSeguimiento.isAgregadoPorTolerancia = true;
                        // listUnidadesTrackTEST.push(unidadTrackSeguimiento)
                    } 
                    // unidadTrackSeguimiento["isTrackAll"] = true;
                    // listUnidadesTrackAll.push(unidadTrackSeguimiento)
                })
                // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                // console.log("=======TRACK ALL==========")
                // console.log(listUnidadesTrackAll)
                // console.log("=======TRACK TEST==========")
                // console.log(listUnidadesTrackTEST)
                // ordenamos por distancia los posibles correctos
                if(listUnidadesProximas.length > 0)
                    listUnidadesProximas = listUnidadesProximas.sort((actual, siguiente)=> {return actual.distancia - siguiente.distancia})   // ordenamiento de mayor a menor..
                else 
                    listUnidadesProximas = [listUnidades[0]]    // si no encontrò ningun cercano pròximo entonces le damos el valor màs cercano a pesar que se haya pasado del paradero..
                
                if(listUnidadesProximas.length == 0){
                    console.log(listUnidades);
                    reject(new Error("NO SE ENCONTRÒ PARADERO CERCANO PARA LA CORRECCIÒN DE SENTIDO.."));
                    return;
                }
                // console.log("ELEGIDA..>>>>>>>>>>>>  ");
                // console.log(listUnidadesProximas[0]);
                resolve(listUnidadesProximas[0]);  // one document
            }).catch((error : Error)=>
            {
                reject(error);
            })
        });
    }

    //  /**
    //  * @param queryParadero 
    //  */
    // findListUnidadesCercanas(queryParadero : IQueryParadero, listCodEmpresas ?: Array<number>):
    // Promise<Array<UnidadTrack>>
    // {

    //     let queryFecha = {
    //         fechaHoraPaso :  { $gt: new DateUtils().getDateAddMinutes(-10) }
    //     };

    //     let queryFechaAndListCodEmpresas = {
    //         fechaHoraPaso :  { $gt: new DateUtils().getDateAddMinutes(-10) },
    //         codEmpresa : {$in : listCodEmpresas}
    //     };
    //     // validaciòn de si se filtrarà por cod empresas o no..
    //     let querySeleccionada = (listCodEmpresas == null) ? queryFecha : queryFechaAndListCodEmpresas;

    //     let LIMITE_DEFAULT = 100;    // usuarios default
    //     return  new Promise((resolve, reject)=>{ 
    //         (this.repository.aggregate
    //         ( 
    //             {
    //                 $geoNear : 
    //                 {
    //                     near :
    //                     {
    //                         type : "Point",
    //                         coordinates :   [queryParadero.lng, queryParadero.lat]
    //                     },
    //                     distanceField : "dist.calculated",
    //                     // maxDistance : queryControl.maxDistance * ControlRepository.METERS_POR_KM,        // distancia máxima..
    //                     spherical : true,
    //                     num : LIMITE_DEFAULT,   // added
    //                     query: {    // INDEXAAAAAR
    //                             $and: [querySeleccionada]
    //                         }
    //                 }
    //             },
    //             {
    //                 $group : {
    //                         _id : {
    //                             nomRuta : "$nomRuta",
    //                             ladoActual : "$ladoActual"
    //                             },                       
    //                         distancia : {$first : "$dist.calculated"},  // auxiliar..
    //                         codEmpresa : { $first : "$codEmpresa"},
    //                         padronUnidad : { $first : "$padronUnidad"},
    //                         claseUnidad : { $first : "$claseUnidad"},
    //                         codEstado : { $first : "$codEstado"},
    //                         coloresUnidad : { $first : "$coloresUnidad"},
    //                         fechaHoraPaso : { $first : "$fechaHoraPaso"},
    //                         frecuenciaPosteo : { $first : "$frecuenciaPosteo"},
    //                         ladoActual : { $first : "$ladoActual"},
    //                         latitudAnterior : { $first : "$latitudAnterior"},
    //                         location : { $first : "$location"},
    //                         longitudAnterior : { $first : "$longitudAnterior"},
    //                         nivelBateria : { $first : "$nivelBateria"},
    //                         nomRuta :  { $first : "$nomRuta"},
    //                         nombrePersonaConductor :  { $first : "$nombrePersonaConductor"},
    //                         numAsientos : { $first : "$numAsientos"},
    //                         numPasajeros : { $first : "$numPasajeros"},
    //                         nomRecorrido : { $first : "$nomRecorrido"},
    //                         placaUnidad : { $first : "$placaUnidad"},
    //                         velocidad : { $first : "$velocidad"},
    //                     }
    //             },
    //             {
    //                 $sort : {
    //                     distancia : 1
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     _id : 0
    //                 }
    //             }
    //         )
    //         ).then((listUnidades : UnidadTrack[])=>
    //         {
    //             let listUnidadesResponse : Array<UnidadTrack> = []
    //             listUnidades.forEach((unidadCercana : UnidadTrack, index : number)=>{
    //                 let queryPuntoAnterior : IQueryParadero = <IQueryParadero>{
    //                     lat : unidadCercana.latitudAnterior,
    //                     lng : unidadCercana.longitudAnterior
    //                 };
    //                 let queryPuntoActual : IQueryParadero = <IQueryParadero>{
    //                     lat : unidadCercana.location.coordinates[1],
    //                     lng : unidadCercana.location.coordinates[0]
    //                 };
    //                 let distanciaPuntoAnterior = Utils.getDistanceTwoPointsInMetersQueryParadero(
    //                     queryPuntoAnterior,
    //                     queryPuntoActual
    //                 );
    //                 let distanciaMovimiento = ~~(Math.abs(distanciaPuntoAnterior - unidadCercana.distancia));
    //                 unidadCercana.distanciaMovimiento = distanciaMovimiento;
    //                 unidadCercana.distancia = ~~unidadCercana.distancia
    //                 listUnidadesResponse.push(unidadCercana);
    //             })
    //             resolve(listUnidadesResponse);  // one document
    //         }).catch((error : Error)=>
    //         {
    //             reject(error);
    //         })
    //     });
    // }

         /**
     * @param queryParadero 
     */
    async findListUnidadesCercanas(queryParadero : IQueryParadero):
    Promise<Array<UnidadTrack>>
    {
        let queryBusqueda = {
            fechaHoraPaso :  { $gt: new DateUtils().getDateAddMinutes(-10) },
            codEmpresa : queryParadero.codEmpresa
        };

        let LIMITE_DEFAULT = 100;    // usuarios default

        return new Promise(async (resolve, reject)=>{
            const listUnidades = await this.repository.aggregate(
                [
                    {
                        $geoNear : 
                        {
                            near :
                            {
                                type : "Point",
                                coordinates :   [queryParadero.lng, queryParadero.lat]
                            },
                            distanceField : "dist.calculated",
                            // maxDistance : queryControl.maxDistance * ControlRepository.METERS_POR_KM,        // distancia máxima..
                            spherical : true,
                            num : LIMITE_DEFAULT,   // added
                            query: {    // INDEXAAAAAR
                                    $and: [queryBusqueda]
                                }
                        }
                    },
                    {
                        $group : {
                                _id : {
                                    nomRuta : "$nomRuta",
                                    ladoActual : "$ladoActual"
                                    },                       
                                distancia : {$first : "$dist.calculated"},  // auxiliar..
                                codEmpresa : { $first : "$codEmpresa"},
                                padronUnidad : { $first : "$padronUnidad"},
                                claseUnidad : { $first : "$claseUnidad"},
                                codEstado : { $first : "$codEstado"},
                                coloresUnidad : { $first : "$coloresUnidad"},
                                codUnidad : { $first : "$codUnidad"},
                                fechaHoraPaso : { $first : "$fechaHoraPaso"},
                                frecuenciaPosteo : { $first : "$frecuenciaPosteo"},
                                ladoActual : { $first : "$ladoActual"},
                                latitudAnterior : { $first : "$latitudAnterior"},
                                location : { $first : "$location"},
                                longitudAnterior : { $first : "$longitudAnterior"},
                                nivelBateria : { $first : "$nivelBateria"},
                                nomRuta :  { $first : "$nomRuta"},
                                nombrePersonaConductor :  { $first : "$nombrePersonaConductor"},
                                numAsientos : { $first : "$numAsientos"},
                                numPasajeros : { $first : "$numPasajeros"},
                                nomRecorrido : { $first : "$nomRecorrido"},
                                placaUnidad : { $first : "$placaUnidad"},
                                velocidad : { $first : "$velocidad"},
                            }
                    },
                    {
                        $sort : {
                            distancia : 1
                        }
                    },
                    {
                        $project: {
                            _id : 0
                        }
                    }
                ]
            ).toArray();
            let listUnidadesResponse : Array<UnidadTrack> = []
            listUnidades.forEach((unidadCercana : UnidadTrack, index : number)=>{
                let queryPuntoAnterior : IQueryParadero = <IQueryParadero>{
                    lat : unidadCercana.latitudAnterior,
                    lng : unidadCercana.longitudAnterior
                };
                let queryPuntoActual : IQueryParadero = <IQueryParadero>{
                    lat : unidadCercana.location.coordinates[1],
                    lng : unidadCercana.location.coordinates[0]
                };
                let distanciaPuntoAnterior = Utils.getDistanceTwoPointsInMetersQueryParadero(
                    queryPuntoAnterior,
                    queryPuntoActual
                );
                let distanciaMovimiento = ~~(Math.abs(distanciaPuntoAnterior - unidadCercana.distancia));
                unidadCercana.distanciaMovimiento = distanciaMovimiento;
                unidadCercana.distancia = ~~unidadCercana.distancia
                listUnidadesResponse.push(unidadCercana);
            })
            resolve(listUnidadesResponse);  // one document
        })
    }

}
