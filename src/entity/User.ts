import {Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn} from "typeorm";

//https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564

@Entity()
export class User {

    @ObjectIdColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
