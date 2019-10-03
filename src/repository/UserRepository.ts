import { Repository, Entity, EntityRepository } from "typeorm";
import { User } from "../entity/mongodb/User";

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
        // return (this.find({firstName : name});
        return this.find({});
    }



}