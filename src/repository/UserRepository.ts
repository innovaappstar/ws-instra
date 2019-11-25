import { Repository, Entity, EntityRepository } from "typeorm";
import { User } from "../entity/mongodb/gps/User";

@EntityRepository(User)
export class UserRepository extends Repository<User>
{

    buscar(name: string) : User
    {
        // return (this.find({firstName : name});
        return <any>this.find({firstName : name});
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