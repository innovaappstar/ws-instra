import App from './app';
import { config} from "./config/config";


// import { NotificacionUsuarioRoutes } from "./routes/notificacionUsuario.routes";
import { IConfigDB } from './config/connectionString';
import { ORMAcess } from './orm/ORMAcces';
import { NotificacionUsuarioRoutes } from './routes/NotificacionUsuario.routes';
import { SMSReceiverRoutes } from './routes/SMSReceiver.routes';
import { TestRoutes } from './routes/Test.routes';
import { Testing } from './test/Testing';
import { AuthenticationRoutes } from './routes/Authentication.routes';
import { IncidenciaRoutes } from './routes/Incidencia.routes';
import HttpUtils = require('./http/HttpUtils');

const save = require('save-file')

let configSQLTeGuio = null;
const app = new App(
  [
    new TestRoutes,
    // new SMSReceiverRoutes,
    new AuthenticationRoutes,
    new IncidenciaRoutes
  ],
  config.puertoHTTP
);


ORMAcess.startConnections(__dirname);  // inicializa las conexiones.
// ORMAcess.readDatabaseV2(__dirname)  // test
app.listen(); // inicializa el servidor http

Testing.readDatabases(__dirname)

// HttpUtils.checkService()


// setInterval(function(){
//   ORMAcess.execQuerySQL("SELECT 1 AS NUM", 41).then((result : any)=>{
//     console.log(result);
//   })
//   .catch((error : Error)=>{
//     console.error(error)
//   })
// }.bind(this), 5000);

export var properties : IConfigDB = configSQLTeGuio;
let data = [1, 2, 3]
save(data, 'data.jpg')
console.log("save finished..")
// const saveSync = require('save-file/sync')
// saveSync(otherData, 'example2.mp3')