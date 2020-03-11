/**
import { StoreUtils } from "./../utils/StoreUtils";
import { IRecorridoControl } from "./../nosql/dataAccess/schemas/ControlSchema";
 * Created by innovaapps on 14/03/2017.
 */
import {Router, Request , Response} from 'express';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/mongodb/gps/User';
export class TestActivitiesRoutes {
    // public path = '/signup';
    public router : Router = Router();

    private PATH_INIT = "/lista_incidencia/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
      this.router.get(this.PATH_INIT, this.getTest)
      //this.router.get(this.PATH_INIT, this.getTestLiquidacion)
    }
    
    // https://192.168.1.120:2032/api/regins/
    getTest = (req: Request, res: Response) => {
      try
      {

        let obj = req.query
        console.log("-------------->" +obj.userCode)
        
        //usuario session
          let resultado = 
          {
            "LISTA_ACTIVIDADES": {
              "codResultado": 1,
              "desResultado": "Lista de actividades del usuario",
              "Lista": [
                {
                  "tipoItem": 2,
                  "placa": "PRS-111",
                  "padron": "038",
                  "ruta": "8106",
                  "nomConductor": "Juan Tito Jurgen",
                  "imagenConductor": "https://epg.unas.edu.pe/sites/default/files/carnet.jpg",
                  "imagen": "test2.jpg|test3.jpg|test4.jpg",
                  "gravedad":1,
                  "nomInfraccionTipo": "G-003",
                  "desInfraccionTipo": "Presentarse a Operaciones",
                  "observacion": "Sobrepasó el limite de velocidad",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Sur",
                  "fechaHoraMovilRegistro": "27/11/2019 12:39:30",
                  "nomControl": "control"
                },
                {
                  "tipoItem": 2,
                  "placa": "PRS-111",
                  "padron": "038",
                  "ruta": "8106",
                  "nomConductor": "Juan Tito Jurgen",
                  "imagenConductor": "https://epg.unas.edu.pe/sites/default/files/carnet.jpg",
                  "imagen": "test2.jpg|test3.jpg|test4.jpg",
                  "gravedad":2,
                  "nomInfraccionTipo": "G-003",
                  "desInfraccionTipo": "Presentarse a Operaciones",
                  "observacion": "Sobrepasó el limite de velocidad",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Sur",
                  "fechaHoraMovilRegistro": "27/11/2019 20:39:30",
                  "nomControl": "control"
                },
                {
                  "tipoItem": 2,
                  "placa": "PRS-111",
                  "padron": "038",
                  "ruta": "8106",
                  "nomConductor": "Juan Tito Jurgen",
                  "imagenConductor": "https://epg.unas.edu.pe/sites/default/files/carnet.jpg",
                  "imagen": "test2.jpg|test3.jpg|test4.jpg",
                  "gravedad":3,
                  "nomInfraccionTipo": "G-003",
                  "desInfraccionTipo": "Presentarse a Operaciones",
                  "observacion": "Sobrepasó el limite de velocidad",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Sur",
                  "fechaHoraMovilRegistro": "27/11/2019 10:39:30",
                  "nomControl": "control"
                },
                {
                  "tipoItem": 1,
                  "placa": "PRS-311",
                  "padron": "003",
                  "ruta": "7209",
                  "nomConductor": "Scarlett Harry",
                  "imagenConductor": "https://blankpaper.es/wp-content/uploads/2019/09/Aspectos-a-considerar-para-las-fotos-carnet.jpg",
                  "observacion": "Soy una observación, lorem lorem lorem lorem",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Norte",
                  "fechaHoraMovilRegistro": "27/11/2019 00:39:30",
                  "nomControl": "Control A",
                  "cantReintegro":20,
                   "boletoReintegro": [
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "0.50",
                      "cantidadReintegro": 15
                    },
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "1.50",
                      "cantidadReintegro": 5
                    }
                  ]
                },
                {
                  "tipoItem": 1,
                  "placa": "PRS-311",
                  "padron": "003",
                  "ruta": "7209",
                  "nomConductor": "Scarlett Harry",
                  "imagenConductor": "https://blankpaper.es/wp-content/uploads/2019/09/Aspectos-a-considerar-para-las-fotos-carnet.jpg",
                  "observacion": "Soy una observación, lorem lorem lorem lorem",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Norte",
                  "fechaHoraMovilRegistro": "27/11/2019 12:39:30",
                  "nomControl": "Control A",
                  "cantReintegro":20,
                   "boletoReintegro": [
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "0.50",
                      "cantidadReintegro": 15
                    },
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "1.50",
                      "cantidadReintegro": 5
                    }
                  ]
                },
                {
                  "tipoItem": 1,
                  "placa": "PRS-311",
                  "padron": "003",
                  "ruta": "7209",
                  "nomConductor": "Scarlett Harry José",
                  "imagenConductor": "https://blankpaper.es/wp-content/uploads/2019/09/Aspectos-a-considerar-para-las-fotos-carnet.jpg",
                  "observacion": "Soy una observación, lorem lorem lorem lorem",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Norte",

                  "fechaHoraMovilRegistro": "27/11/2019 23:39:30",
                  "nomControl": "Control A",
                  "cantReintegro":20,
                   "boletoReintegro": [
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "0.50",
                      "cantidadReintegro": 15
                    },
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "1.50",
                      "cantidadReintegro": 5
                    }
                  ]
                },
                {
                  "tipoItem": 1,
                  "placa": "PRS-311",
                  "padron": "003",
                  "ruta": "7209",
                  "nomConductor": "Scarlett Harry José",
                  "imagenConductor": "https://blankpaper.es/wp-content/uploads/2019/09/Aspectos-a-considerar-para-las-fotos-carnet.jpg",
                  "observacion": "Soy una observación, lorem lorem lorem lorem",
                  "latitud": "-11.0045454",
                  "longitud": "-77.050500",
                  "sentido": "Norte",
                  
                  "fechaHoraMovilRegistro": "27/11/2019 23:39:30",
                  "nomControl": "Control A",
                  "cantReintegro":20,
                   "boletoReintegro": [
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "0.50",
                      "cantidadReintegro": 15
                    },
                    {
                      "codigoBoleto": 1,
                      "nomBoleto": "1.50",
                      "cantidadReintegro": 5
                    }
                  ]
                }
              ]
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