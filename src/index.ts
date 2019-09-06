import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { UserRepository } from './repository/UserRepository';

createConnection({
    type: "mongodb",
    host: "192.168.1.10",
    port: 2035,
    username: "wcubas",
    password: "lomizmo407",
    synchronize: true,
    database: "dblog",
    logging: false,
    entities: [ __dirname + "/entity/*.js",
                "src/entity/**/*.ts"]
    })
    .then(async connection => {
    console.log("conexiòn creada con mongoDB");
    // console.log("Inserting a new user into the database...");
    // let userRepository : UserRepository = <any>connection.getCustomRepository(UserRepository);
    // let listUsers = await userRepository.buscar("Lesly");
    // console.log(listUsers);

    const user = new User();
    user.firstName = "Kenny BALT 4";
    user.lastName = "B.A.";
    user.age = 26;
    await connection.manager.save(user);
    // console.log("...finish insert con el timer...");
    // console.log("Saved a new user with sid: " + user.id);
})
.catch((error : Error)=>{
    console.error("error connection..");
    console.log(error)
});  
