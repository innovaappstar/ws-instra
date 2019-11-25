import {Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn, ObjectID} from "typeorm";

//https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564

@Entity({database : "gps", name : "user_test"})
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
