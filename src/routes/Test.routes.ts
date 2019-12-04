/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/mongodb/gps/User';
export class TestRoutes {
    // public path = '/signup';
    public router : Router = Router();

    private PATH_INIT = "/envio_notificacion_usuario/?";
    private PATH_LIQUIDACION = "/liquidacion/?";
    private PATH_LOGOUT = "/auth/logout/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
      this.router.get("/", this.getTest),
      this.router.get(this.PATH_LIQUIDACION, this.getTestLiquidacion),
      this.router.get(this.PATH_LOGOUT, this.getLogout)
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
        //tarifa boleto
          // let resultado = 
          // {
          //     "TEST": {
          //         CodResultado : 1,
          //         DesResultado : "pajaroPerro",
          //       "Boletos": [
          //         {
          //           "codBoleto" : 1,
          //           "boleto": "0.50",
          //           "inicioCorteBoleto": "1",
          //           "finCorteBoleto": "10",
          //           "cantidadReintegro": 0,
          //           "nombreBoleto" : "ZONAL UNIVERSITARIO"
          //         },
          //         {
          //           "codBoleto" : 2,
          //           "boleto": "0.70",
          //           "inicioCorteBoleto": "15",
          //           "finCorteBoleto": "20",
          //           "cantidadReintegro": 0,
          //           "nombreBoleto" : "ESCOLAR"
          //         },
          //         {
          //           "codBoleto" : 3,
          //           "boleto": "1.50",
          //           "inicioCorteBoleto": "1",
          //           "finCorteBoleto": "10",
          //           "cantidadReintegro": 0,
          //           "nombreBoleto" : "ESCOLAR 2"
          //         },
          //         {
          //           "codBoleto" : 4,
          //           "boleto": "2.50",
          //           "inicioCorteBoleto": "1",
          //           "finCorteBoleto": "10",
          //           "cantidadReintegro": 0,
          //           "nombreBoleto" : "ADULTO"
          //         }
          //       ]
          //     }
          //   }       
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
