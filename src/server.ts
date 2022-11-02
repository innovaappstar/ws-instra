import {App} from './app';
import { config} from "./config/config";

// import { NotificacionUsuarioRoutes } from "./routes/notificacionUsuario.routes";
import { IConfigDB } from './config/connectionString';
import { ORMAcess } from './orm/ORMAcces';
import { NotificacionUsuarioRoutes } from './routes/NotificacionUsuario.routes';
import { TestRoutes } from './routes/Test.routes';
import { Testing } from './test/Testing';
import { AuthenticationRoutes } from './routes/Authentication.routes';
import { IncidenciaRoutes } from './routes/Incidencia.routes';
import HttpUtils = require('./http/HttpUtils');
// import './define/String.extensions';
// import dateFormat = require('dateformat')
import './define/MyExtensions.extensions'
import { LiquidationRoutes } from './routes/Liquidation.routes';
import ws from './controllers/ws';
import { UnidadTrackRepository, IQueryParadero } from './repository/UnidadTrackRepository';
import { UnidadTrack } from './entity/mongodb/tubus/UnidadTrack';
import { CompanyRoutes } from './routes/Company.routes';
import { UnitRoutes } from './routes/Unit.routes';
import { AlertaRoutes } from './routes/Alert.routes';
import { InspectorRoutes } from './routes/Inspector.routes';

const app = new App(
  [
    new TestRoutes,
    // new SMSReceiverRoutes,
    new AuthenticationRoutes,
    new IncidenciaRoutes,
    new LiquidationRoutes,
    new CompanyRoutes, 
    new UnitRoutes,
    new AlertaRoutes,
    new InspectorRoutes
  ],
  config.puertoHTTP
);

ORMAcess.startConnections(__dirname);  // inicializa las conexiones.
// ORMAcess.readDatabaseV2(__dirname)  // test
app.listen(); // inicializa el servidor http
ws.getInstance();

setTimeout(async () => { 
  console.log("KILLEANDO APP PARA LIMPIAR LA MEMORIA BUFER DE SOLICITUDES A LA BD MONGO Y/O SQL ...")
  process.exit(1);
}, 24 * (60 * (60 * 1000)) )  // cada 24 horas

// new Testing().initBuilding();

// console.log(timeConverted);
// let dateFormatedPrototyped = dateFormat(timeStamp.convertToDateTime(), "dd-mm-yyyy HH:MM:ss");
// console.log(dateFormatedPrototyped);

// let dateConverted = new Date(timeStamp);
// let dateFormated = dateFormat(dateConverted, "dd-mm-yyyy HH:MM:ss");

// setInterval(function(){
//   ORMAcess.execQuerySQL("SELECT 1 AS NUM", 41).then((result : any)=>{
//     console.log(result);
//   })
//   .catch((error : Error)=>{
//     console.error(error)
//   })
// }.bind(this), 5000);