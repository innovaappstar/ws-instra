import App from './app';
import { config} from "./config/config";


// import { NotificacionUsuarioRoutes } from "./routes/notificacionUsuario.routes";
import { IConfigDB } from './config/connectionString';
import { ORMAcess } from './orm/ORMAcces';
import { NotificacionUsuarioRoutes } from './routes/NotificacionUsuario.routes';
import { SMSReceiverRoutes } from './routes/SMSReceiver.routes';
import { TestRoutes } from './routes/Test.routes';

let configSQLTeGuio = null;
const app = new App(
  [
    new TestRoutes,
    new SMSReceiverRoutes
  ],
  config.puertoHTTP
);

let listPaths = [
  `/orm/tsir/AGPS_Etul4/6/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/40/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/44/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/46/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/63/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/80/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/86/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/108/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/125/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/132/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/161/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/163/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/174/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/268/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/276/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/313/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/314/TSIR.db`,
  `/orm/tsir/AGPS_Etul4/326/TSIR.db`
];

ORMAcess.startConnections(__dirname);  // inicializa las conexiones.
ORMAcess.readDatabase(__dirname, listPaths)  // test
app.listen(); // inicializa el servidor http


// setInterval(function(){
//   ORMAcess.execQuerySQL("SELECT 1 AS NUM", 41).then((result : any)=>{
//     console.log(result);
//   })
//   .catch((error : Error)=>{
//     console.error(error)
//   })
// }.bind(this), 5000);

export var properties : IConfigDB = configSQLTeGuio;

