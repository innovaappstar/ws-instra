import App from './app';
import { config} from "./config/config";


// import { NotificacionUsuarioRoutes } from "./routes/notificacionUsuario.routes";
import { IConfigDB } from './config/connectionString';
import { ORMAcess } from './orm/ORMAcces';
import { NotificacionUsuarioRoutes } from './routes/NotificacionUsuario.routes';

let configSQLTeGuio = null;
const app = new App(
  [
    new NotificacionUsuarioRoutes
  ],
  config.puertoHTTP
);

app.listen(); // inicializa el servidor http

ORMAcess.startConnections();  // inicializa las conexiones.

// setInterval(function(){
//   ORMAcess.execQuerySQL("SELECT 1 AS NUM", 41).then((result : any)=>{
//     console.log(result);
//   })
//   .catch((error : Error)=>{
//     console.error(error)
//   })
// }.bind(this), 5000);

export var properties : IConfigDB = configSQLTeGuio;

