/**
 * Created by innovaapps on 15/03/2017.
 */
const qs = require("query-string");
import {ENDPOINTS_MAIN_PATH, App} from '../app';
import { TOTAL_PATH_AUTH_LOGIN, AuthenticationRoutes } from '../routes/Authentication.routes';
import express = require('express');
import jwt = require('jsonwebtoken')

let REGEX_ENDPOINT_TESTING = /(\/testing\/)/;

class TokenUtils
{
  public static SUCCESS_CODE = 200;
  public static AUTHORIZATION_CONSTANTE : string = "authorization";

  public static UNAUTHORIZED_CODE = 401;
  public static NOT_FOUND_CODE = 404;
  public static INTERNAL_SERVER_ERROR_CODE = 500;
  // public static ANOTHER_VAR = -1;
    
    constructor(){}

    /**
     * comprueba valor entero de un objeto query-string
     * @param url string
     * @param key string
     * @returns {string|string[]|null}
     */
    public static verificarTokenInHttpRequest(req: express.Request, res: express.Response, callback : (error : Error, result : any) => void)
    {
        if(req.path != TOTAL_PATH_AUTH_LOGIN &&
            !(REGEX_ENDPOINT_TESTING.test(req.path)))
          {
            // Se verificarà por JWT 
            // var token = req.headers['authorization']
            var token = req.headers[TokenUtils.AUTHORIZATION_CONSTANTE];
            
            if(!token){
              let responseError = JSON.stringify({ERROR : {
                desResultado : "Es necesario el token de autenticación",
                codResultado : TokenUtils.UNAUTHORIZED_CODE
              }});
              callback(new Error(responseError), null)
              return
            }

            jwt.verify(<any>token, App.SECRET_KEY, function(err, user) 
            {
              if (err) 
              {
                let responseError = JSON.stringify({ERROR : {
                    desResultado : "Token incorrecto o sesión expirada",
                    codResultado : TokenUtils.UNAUTHORIZED_CODE
                }});
                callback(new Error(responseError), null)
                return
              }
              let responseSuccess = JSON.stringify({ERROR : {
                desResultado : "Token verificado correctamente",
                codResultado : 1
              }});
              callback(null, responseSuccess)
            })
          }
    }


    /**
     * comprueba valor entero de un objeto query-string
     * @param url string
     * @param key string
     * @returns {string|string[]|null}
     */
    public static verificarTokenInParamWebSocket(token: string, callback : (error : Error, result : any) => void)
    {
        if(token != TOTAL_PATH_AUTH_LOGIN &&
            !(REGEX_ENDPOINT_TESTING.test(token)))
          {
            // Se verificarà por JWT 
            jwt.verify(token, App.SECRET_KEY, function(err, user) 
            {
              if (err) 
              {
                let responseError = JSON.stringify({ERROR_TOKEN : {
                    descripcion : "Token incorrecto",
                    codResultado : 0
                }});
                callback(new Error(responseError), null)
                return
              }
              let responseSuccess = JSON.stringify({ERROR_TOKEN : {
                descripcion : "Token verificado correctamente",
                codResultado : 1
              }});
              callback(null, responseSuccess)
            })
          }
    } 

}

export = TokenUtils;