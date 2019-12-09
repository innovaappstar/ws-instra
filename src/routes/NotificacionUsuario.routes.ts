import {Router, Request , Response} from 'express';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/mongodb/gps/User';
export class NotificacionUsuarioRoutes {
    // public path = '/signup';
    public router : Router = Router();

    private PATH_ENVIO_NOTIFICACION_USUARIO = "/envio_notificacion_usuario/?";

    constructor() {
      this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.router.get("/", this.getTest)
        this.router.get(this.PATH_ENVIO_NOTIFICACION_USUARIO, this.getNotificacionUsuario)
    }
    // https://192.168.1.120:2032/api/regins/
    getTest = (req: Request, res: Response) => {
        try
        {
            let resultado = 
            {TEST : {
                CodResultado : 1,
                DesResultado : "Lista de rutas de recorrido"}}
            res.send(JSON.stringify(resultado))

            try {
                const user = new User();
                user.firstName = "Timber";
                user.lastName = "Saw";
                user.age = 25;
                // await connection.manager.save(user);

                new UserRepository().save(user);
                new UserRepository().findAll().then((users : Array<User>)=>{
                    console.log(users);
                })
            } catch (error) {
                console.error(error);
            }
        }catch (error)
        {
            console.error(error);
        }
    }

    // http://192.168.1.120:2029/api/tubus/envio_notificacion_usuario/?urlImagen=aaaa&&titleSmall=teguioActualizacion&&contentSmall=versionconmejoras.....
    getNotificacionUsuario = (req: Request, res: Response) => {
        try
        {
            let qNotificacionUsuario : INotificacionUsuario = <any>req.query;
            if(qNotificacionUsuario.urlImagen == null || qNotificacionUsuario.titleSmall == null || qNotificacionUsuario.contentSmall == null)
            {
                let resultado = {NOTIFICACIONUSUARIO : {
                    CodResultado : 0,
                    DesResultado : "No tiene permisos necesarios"}};
                res.send(JSON.stringify(resultado));
                return;
            }
            // send broadcast!!
            let idSQLServidor = 1;
            let tramaNotificacion = `2|1|1|1|notif|1#${qNotificacionUsuario.urlImagen}|${qNotificacionUsuario.titleSmall}|${qNotificacionUsuario.contentSmall}|${qNotificacionUsuario.titleBig}|${qNotificacionUsuario.contentBig}|${idSQLServidor}|${qNotificacionUsuario.urlWeb}`;
            // ws.getInstance().sendBroadcast(tramaNotificacion);
            let resultado = {NOTIFICACIONUSUARIO : {
                CodResultado : 1,
                DesResultado : 'Sended successfuly'}};
            res.send(JSON.stringify(resultado));
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
