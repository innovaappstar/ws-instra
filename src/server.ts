import App from './app';
import { config} from "./config/config";


// import { NotificacionUsuarioRoutes } from "./routes/notificacionUsuario.routes";
import { IConfigDB } from './config/connectionString';

let configSQLTeGuio = null;
const app = new App(
  [
    // new NotificacionUsuarioRoutes
  ],
  config.puertoHTTP
);

app.listen();

// set de bd principal : TeGuio
config.configdb.forEach(configSQL => {
  if(configSQL.hasOwnProperty("isPrincipal"))
    configSQLTeGuio = configSQL;
});

// sincronizaciòn auxiliar por migraciòn a SQL
// new ZonaPoligonoSyncT().iniciarTareaSincronizacionZonaPoligono();

export var properties : IConfigDB = configSQLTeGuio;

