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
import jwt = require('jsonwebtoken')
import { TOTAL_PATH_AUTH_LOGIN, AuthenticationRoutes } from './routes/Authentication.routes';
import TokenUtils = require('./utils/TokenUtils');

// import aa = require('../keys/key.pem');
var options = {
  // key: fs.readFileSync('../keys/key.pem', 'utf8'),
  // cert: fs.readFileSync('../keys/cert.pem', 'utf8'),
  key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
};

export var ENDPOINTS_MAIN_PATH = "/api/regins";
let REGEX_ENDPOINT_TESTING = /(\/testing\/)/;
let REGEX_ENDPOINT_AUTH_LOGIN = /(\/auth\/login\/)/;
let REGEX_ENDPOINT_DOC = /^(\/doc)/;
let ALIAS_JSON_ERROR_TOKEN = "ERROR_TOKEN";

export class App {
  // public app: any;
  public app: express.Application;
  public port: number;
  public static SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

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

    // this.app.use(bodyParser.urlencoded({extended: false}))
    // this.app.use(bodyParser.json({limit:'10mb'}))

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

  /**
   * middleware creado para comprobar si el token de la solicitud existe,
   * caso contrario se retornarà un mensaje de error.
   * Nota : Debe recibirse el token en la cabecera con el nombre "authorization"
   * @param req 
   * @param res 
   * @param next 
   */
  private loggerMiddleware(req: express.Request, res: express.Response, next) {
    if(req.path == "/favicon.ico")
      return;
    if(!(REGEX_ENDPOINT_AUTH_LOGIN.test(req.path)) &&
      !(REGEX_ENDPOINT_TESTING.test(req.path)) &&
      !(REGEX_ENDPOINT_DOC.test(req.path))
      )
    {
      TokenUtils.verificarTokenInHttpRequest(req, res, (error, result)=>  
      {
        if(error){
          res.status(TokenUtils.UNAUTHORIZED_CODE).send(error.message)
          // res.send(JSON.stringify(error))
          // res.send(error.message)
          return;
        }
        next(); // permitimos el ingreso
      })
      return;
    }
    // console.log(`${req.method} ${req.path}`);
    next(); // permitimos el ingreso
  }

  
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      // this.app.use('/', controller.router);
      this.app.use(ENDPOINTS_MAIN_PATH, controller.router);
    });

    /// catch 404 and forward to error handler
    this.app.use(function(req, res, next) {
      let err : any = new Error('No se encontró la ruta.');
      err.status = TokenUtils.NOT_FOUND_CODE;
      next(err);
    });

    // // development error handler
    // // will print stacktrace
    if (this.app.get('env') === 'development') {
      this.app.use(function(err, req, res, next) 
      {
          res.status(err.status || TokenUtils.INTERNAL_SERVER_ERROR_CODE);
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
    // http.createServer(this.app).listen(this.port, () => {
    //   // this.app.listen(this.port, () => {
    //     console.log('======================================================================================='); 
    //     console.log('Servidor Plantilla iniciado : ' + new Date());    // marca de tiempo para ver hora de arranque en consola..
    //     console.log(`App listening on the port ${this.port}`);
    //     console.log('======================================================================================='); 
    // });
  }
}
// export default App;