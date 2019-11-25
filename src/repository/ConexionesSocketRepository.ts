import { Repository, Entity, EntityRepository, getRepository } from "typeorm";
import { ConexionesSocket } from "../entity/mongodb/gps/ConexionesSocket";
import { ORMAcess } from "../orm/ORMAcces";
import { DBNAME_GPS_MONGODB, IConfigDB } from "../config/connectionString";

@EntityRepository(ConexionesSocket)
export class ConexionesSocketRepository extends Repository<ConexionesSocket>
{
    private repository : any = null;
    
    private getRepository() : Repository<ConexionesSocketRepository>{
        let configDB = ORMAcess.getConfigDBByNomDB(DBNAME_GPS_MONGODB);
        let conexionesRepository : any = <any>configDB.connection.getRepository(ConexionesSocket);
        // let conexionesRepository : ConexionesSocketRepository = <any>configDB.connection.getRepository("conexiones_sockets");
        return conexionesRepository;
    }

    constructor(){
        super();
        this.repository = this.getRepository();
    }

    // findUnidadesByIds(listIds: Array<number>) : Promise<Array<ConexionesSocket>>
    // {
    //     return (this.repository.find({idDispositivo :{$in : listIds}}));
    // }


    findUnidadesByIds(listIds: Array<number>, codEmpresa : number) : Promise<Array<ConexionesSocket>>
    {
        return (this.repository.find({idDispositivo :{$in : listIds}, codEmpresa : codEmpresa}));
    }


    findUnidadesByCodEmpresa(codEmpresa : number) : Promise<Array<ConexionesSocket>>
    {
        return (this.repository.find({codEmpresa : codEmpresa}));
    }

    findUnidadByMG(codEmpresa : number, codDispositivo : number) : Promise<Array<ConexionesSocket>>
    {
        return (this.repository.find({codEmpresa : codEmpresa, idDispositivo : codDispositivo}));
    }

    findAll()
    {
        // const user = new User();
        //                         user.firstName = "Timber";
        //                         user.lastName = "Saw";
        //                         user.age = 25;
        //                         // await connection.manager.save(user);
        //                         // new UserRepository().create(user);
        //                         let userRepository : UserRepository = <any>connection.getCustomRepository(UserRepository);
        //                         await userRepository.save(user);
        //                         userRepository.findAll().then((users : Array<User>)=>{
        //                             console.log(users);
        //                         })
        // return (this.find({firstName : name});
        return this.find({});
    }



}