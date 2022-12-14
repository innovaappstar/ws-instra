/**
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/mongodb/gps/User';
import jwt = require('jsonwebtoken')
import {App} from '../app';

export class TestRoutes {
    // public path = '/signup';
    public router : Router = Router();

    private PATH_LIQUIDACION = "/liquidacion/?";
    private PATH_LOGOUT = "/auth/logouttttt/?";
    private PATH_TESTING = "/auth/testing/?";
    private PATH_GET_TOKEN = "/auth/testing/get_token/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
      this.router.get("/", this.getTest),
      this.router.get(this.PATH_LIQUIDACION, this.getTestLiquidacion),
      this.router.get(this.PATH_LOGOUT, this.getLogout)
      this.router.get(this.PATH_TESTING, this.getAuthTest)
      this.router.get(this.PATH_GET_TOKEN, this.getToken)
    }

    // https://192.168.1.132:2032/api/regins/auth/logout/
    getLogout = (req: Request, res: Response) => {
      try
      {
        //usuario session
          let resultado = 
          {
            "TEST" : {
              codResultado : 1,
              desResultado : "Cierre de sesion correctamente"
            }
          }
          res.send(JSON.stringify(resultado))
      }catch (error)
      {
          console.error(error);
      }
  }
    // https://192.168.1.120:2032/api/regins/auth/testing/
    getAuthTest = (req: Request, res: Response) => {
      try
      {
          var token = req.headers['authorization']
          if(!token){
              res.status(401).send({
                error: "Es necesario el token de autenticación"
              })
              return
          }
          jwt.verify(token, App.SECRET_KEY, function(err, user) {
            if (err) {
              res.status(401).send({
                error: 'Token inválido'
              })
            } else 
            {
              //usuario session
              let resultado = 
              {
                "TEST" : {
                  CodResultado : 1,
                  DesResultado : "OK Token - Bienvenido",
                }
              }
              res.send(JSON.stringify(resultado))
            }
          })

      }catch (error)
      {
          console.error(error);
      }
  }


    // http://192.168.1.120:2032/api/regins/auth/testing/get_token/?username=kenny
    getToken = (req: Request, res: Response) => {
      try
      {
        let tokenData = { username: req["username"] }
        let token = jwt.sign(tokenData, App.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
        res.send(JSON.stringify({
          token : token,
          descripcion : "token envìado"
        }))
      }catch (error)
      {
          console.error(error);
      }
  }
    
    // https://192.168.1.120:2032/api/regins/
    getTest = (req: Request, res: Response) => {
      try
      {

        //usuario session
          let resultado = 
          {
            "TEST" : {
              CodResultado : 1,
              DesResultado : "OK",
              Usuario : {
                 "codUsuario" : 5,
                  "codEmpresa": 20,
                  "nombres": "Juan", 
                  "apellidos": "Perez",
                  "idPerfil": "id_perfil",
                  "tipoPerfil": 3,
                  "urlFotoPerfil": "url foto perfil",
                  "macAddress": "44566",
                  "numeroTelefono" : "4498415",
                  "dni" : "dni",
                  "dirección" : "direccion"
              }
            }
          }
          res.send(JSON.stringify(resultado))
      }catch (error)
      {
          console.error(error);
      }
  }

    // https://192.168.1.120:2032/api/regins/liquidacion/
    getTestLiquidacion = (req: Request, res: Response) => {
      try
      {
        //usuario session
        //tarifa boleto
          let resultado = 
          {
              "TEST": {
                "codResultado": 1,
                "desResultado": "OK",
                "cantidadInspecciones": 3, 
                "liquidacion": [
                  {
                    "nombreUsuario": "Pepito Perez Perez",
                    "descripcionCorte": "CORTE 1",
                    "isLiquidacion": 1,
                    "observacion": "La unidad que se inspecciono .....",
                    "boletos": [
                      {
                        "codBoleto": 1,
                        "boleto": "0.50",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ZONAL UNIVERSITARIO"
                      },
                      {
                        "codBoleto": 2,
                        "boleto": "1.00",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ESCOLAR"
                      }
                    ]
                  },
                  {
                    "nombreUsuario": "Juancito Juarez juarez",
                    "descripcionCorte": "CORTE 2",
                    "isLiquidacion": 1,
                    "observacion": "observacion 2",
                    "boletos": [
                      {
                        "codBoleto": 3,
                        "boleto": "2.00",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ZONAL UNIVERSITARIO"
                      },
                      {
                        "codBoleto": 4,
                        "boleto": "2.50",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ESCOLAR"
                      }
                    ]
                  },
                  {
                    "descripcionCorte": "CORTE 3",
                    "isLiquidacion": 0,
                    "observacion": "",
                    "nombreUsuario" : "",
                    "boletos": [
                      {
                        "codBoleto": 1,
                        "boleto": "3.00",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ZONAL UNIVERSITARIO"
                      },
                      {
                        "codBoleto": 2,
                        "boleto": "4.00",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ESCOLAR"
                      },
                      {
                        "codBoleto": 3,
                        "boleto": "4.50",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ZONAL UNIVERSITARIO"
                      },
                      {
                        "codBoleto": 4,
                        "boleto": "5.00",
                        "inicioCorteBoleto": "1000",
                        "finCorteBoleto": "1200",
                        "cantidadReintegro": 0,
                        "nombreBoleto": "ESCOLAR"
                      }
                    ]
                  }
                ]
              }
          };
          res.send(JSON.stringify(resultado))
      }catch (error)
      {
          console.error(error);
      }
  }

  }
   
  export interface INotificacionUsuario{
    urlImagen : string;
    titleSmall : string;
    contentSmall : string;  
    titleBig : string;
    contentBig : string;  
    urlWeb : string;  
}
