//const detect = require('detect-port');
import detect = require('detect-port');
import './define/MyExtensions.extensions'
import { config} from "./config/config";

// import config from './config/Config';
//import child_process = require('./node-definitions/child_process');
//import * as child from 'child_process';
const { spawn } = require('child_process');
 
// require('dotenv').config();

/**
 * simple timer de para comprobar si 
 * el servicio está corriendo en el puerto..
 */
function iniciarThread(delay) {
  try {
    setInterval(function () {
      iniciarServicio();
    }, delay);
  } catch (error) { console.error(error); }
}

/**
 * comprueba si el puerto está ocupado o no. De no ser así
 * inicia el .bat
 */
function iniciarServicio() {
  try {
    //console.log('¡comprobando procesos apps ok!');
    // detect(process.env.DB_PORT_WEBSOCKET_GPS, (err, _port) => {
    detect(config.puertoHTTP, (err, _port) => { 
      if (err) {
        console.log(err);
      }

      if (config.puertoHTTP == _port) {
        //console.log(`port: ${port} no está ocupado`); 
        var ls = spawn('cmd.exe', ['/c', 'start.bat']);

        ls.stdout.on('data', function (data) {
          console.log(data.toString());
        });

        ls.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        ls.on('exit', function (code) {
          //console.log('child process exited with code ' + code);
        });
      } else {
        //console.log(`port: ${port} se encuentra ocupado, intente con : ${_port}`);
      }
    });
  } catch (error) { console.error(error); }
}
iniciarServicio();
iniciarThread(10000);

