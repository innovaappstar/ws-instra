/**
 * Created by innovaapps on 02/03/2017.
 */
// import configdb = require('./connectionString');
import { configdb } from "./connectionString";

var env = 'desarrollo';
export const config = {
    desarrollo:{
        app : {
            nombre : 'servidor-template'
        },
        puertoHTTP : 2032,  // editar
        puertoWS : 2028,
        host : '192.168.1.90',
        db : 'localhost:27017/vci',
        configdb : configdb,
        terminales	: terminalesRegistrados
    },
    test:{
        app : {
            nombre : 'servidor-procesador'
        },
        puertoHTTP : 2034,  // editar
        puertoWS : 2024,
        host : 'localhost',
        db : '192.168.1.99:27017/wsgps-development',
        configdb : configdb,
        terminales	: terminalesRegistrados
    },

    produccion:{
        app : {
            nombre : 'servidor-procesador'
        },
        puertoHTTP : 2034,  // editar
        puertoWS : 2024,
        host : 'localhost',
        db : '192.168.1.99:27017/wsgps-development',
        configdb : configdb,
        terminales	: terminalesRegistrados
    }
}[env];

var terminalesRegistrados = {
    movil : {
        nombre: 'MOvil',
        codigo: 2
    },
    web : {
        nombre: 'Web',
        codigo: 3
    }
}
