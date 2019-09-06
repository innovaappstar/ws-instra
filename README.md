# README #

Este README mostrará los pasos necesarios para levantar y correr la aplicaciòn

### Que contiene este repositorio? ###

* EndPoinst con uso del framework Express(API Web)
* ORM (TypeORM) con soporte para MongoDB, SQL, entre otros.
* Entidades (beans) preparadas para el almacenamiento y/o recuperaciòn de datos en mongodb.
* Dinamismo de conexiòn entre distintas bases de datos (NoSQL && SQL)
* Sistema de plantillas JADE
* [Aprender màs](https://github.com/innovaappstar)

### Guìa ràpida ###
Primero instalar globalmente typeorm
```.json
npm install typeorm -g
```


Instalar dependencias:

package.json:
```.json
npm install
```

Agregar una conexiòn mongodb
```ts
....
{ nomDB : "dbpruebas", host : "192.168.1.1", user : "user123", password : "123456", id : 1, operativo : 1, typeDatabase : TYPE_MONGODB, connection : null}
....
```

Correr el servicio web
```.json
npm start
```

Creando un modelo
```ts
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
```



### Continuar..
Continuar con Readme #01 ([readme.md](https://medium.com/@jkwolanin/introduction-to-typeorm-ce0196d5564)).
Continuar con Readme #02 ([readme.md](https://github.com/crisbeto/angular-svg-round-progressbar))