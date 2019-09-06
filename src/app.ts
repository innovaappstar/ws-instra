/**
import ParaderoSyncT = require("./")
import { StoreUtils } from "./";
import JSONUtils = require("./")
 * Created by innovaapps on 28/02/2017.
 */
"use strict";
import express = require('express');
// import {Express} from 'express';
import https = require('https');
import http = require('http');
import fs = require('fs');
import * as bodyParser from 'body-parser';
import path = require('path');
// import aa = require('../keys/key.pem');
var options = {
  // key: fs.readFileSync('../keys/key.pem', 'utf8'),
  // cert: fs.readFileSync('../keys/cert.pem', 'utf8'),
  key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
};

class App {
  // public app: any;
  public app: express.Application;
  public port: number;
  
  constructor(controllers, port) {
    this.app = express();
    this.port = port;
    
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.fetchLogicaData();
  }
 
  private initializeMiddlewares() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // parse some custom thing into a Buffer
    this.app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    // parse application/json
    this.app.use(bodyParser.json());

    // check authentication from swagger,,
    this.app.use(this.loggerMiddleware)

    // set views root :  view engine setup
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'jade');
    // this.app.use(favicon());
    // app.use(logger('dev'));
    // app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  /**
   * recupera los datos de paraderos y cruces de todas las empresas
   * mapeadas para almacenarlas en memoria y acceder a ellas en las 
   * siguientes consultas de busqueda de rutas..
   */
  private fetchLogicaData(){
    // new UnidadTrackT().iniciarTareaSincronizacionUnidadTrack(); // siempre habilitado ->> DESCOMENTAAAAR
    // new ObjectParaderoSyncT().cargarObjectCruceParaderos();      // -->>>>>>>> DESCOMENTAR
  }

  private loggerMiddleware(request: express.Request, response: express.Response, next) {
    // console.log(`${request.method} ${request.path}`);
    next();
  }
  // https://192.168.1.120:2029/api/tubus/busqueda_rutav2/?pOrigen=-12.006772*-77.050338&pDestino=-11.99487*-77.00526&maxRangoParadero=0.8
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      // this.app.use('/', controller.router);
      this.app.use('/api/tubus', controller.router);
    });

    /// catch 404 and forward to error handler
    this.app.use(function(req, res, next) {
      let err : any = new Error('No se encontró la ruta.');
      err.status = 404;
      next(err);
    });

    // // development error handler
    // // will print stacktrace
    if (this.app.get('env') === 'development') {
      this.app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
    }
  }
 
  public listen() {
    https.createServer(options, this.app).listen(this.port, () => {
    // this.app.listen(this.port, () => {
      console.log('======================================================================================='); 
      console.log('Servidor Plantilla iniciado : ' + new Date());    // marca de tiempo para ver hora de arranque en consola..
      console.log(`App listening on the port ${this.port}`);
      console.log('======================================================================================='); 
    });
  }
}


export default App;