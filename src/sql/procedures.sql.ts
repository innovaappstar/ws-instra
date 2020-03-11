/**
 * Created by PC08 on 4/04/2017.
 */
var PROCEDURES = {
    DBGPSGENERAL : 
    {
        // ProcUsuarioV2 'jguerra|6B6277AFCB65D33525545904E95C2FA240632660' , 12
        AUTH_LOGIN :{
            index : 12,
            proc : "dbo.ProcUsuarioV2",
            example : "dbo.ProcUsuarioV2 ......, 12",
            comment : "devuelve estado de autenticaciòn"
        },
        // ProcUsuarioV2 '24|27/11/2019 17:02:00',13 
        AUTH_LOGOUT :{
            index : 13,
            proc : "dbo.ProcUsuarioV2",
            example : "dbo.ProcUsuarioV2 ......, 13",
            comment : "cierre de sesiòn"
        },
        // ins.ProcIncidencia '1|1|test3|3|25/11/2019 10:39:30|-11.976406|-77.087933|test2|01|PRS-111|Prueba|ruta|control',20
        REGISTRO_INCIDENCIA :{
            index : 20,
            proc : "ins.ProcIncidencia",
            example : "ins.ProcIncidencia ......, 20",
            comment : "registro de incidencia"
        },
        LIQUIDATION_LIST : {
            index : 10,
            proc : "ins.ProcLiquidacion",
            example : "ins.ProcLiquidacion '331', 10",
            comment : "obtener lista de liquidaciones o inspecciones hasta el momento"
        },
        REGISTER_ALERT : {
            index : 20,
            proc : "ins.ProcAlertaInspectoria",
            example : "ins.ProcAlertaInspectoria '1|1|1|1|1|1|1|11/12/2019 13:01',20",
            comment : "obtener lista de liquidaciones o inspecciones hasta el momento"
        },
        INSPECTOR_PROFILE : {
            index : 13,
            proc : "ins.ProcReporteInspectoria",
            example : "ins.ProcReporteInspectoria '1',13",
            comment : "obtener cantidad de unidades intervenidas por codUsuario"
        },
        LIQUIDATION_REGISTER : {
            index : 20,
            proc : "ins.ProcLiquidacion",
            example : "ins.ProcLiquidacion ......, 20",
            comment : "esto me servira para poder registrar las liquidaciones o cortes que haga el inspector (usuario)"
        }
    },
    DBPRUEBAS : 
    {
        
        COMPANY_LIST : {
            index : 13,
            proc : "ins.ProcIncidencia",
            example : "ins.ProcIncidencia ......, 13",
            comment : "este procedimiento me devuelve la lista de empresas"
        },
        COMPANY_AND_ROUTES_LIST : {
            index : 14,
            proc : "ins.ProcIncidencia",
            example : "ins.ProcIncidencia ......, 14",
            comment : "este procedimiento me devuelve empresa y rutas"
        },
        INFRACTION_LIST : {
            index : 12,
            proc : "ins.ProcIncidencia",
            example : "ins.ProcIncidencia ......, 12",
            comment : "este procedimiento me devuelve la lista de infracciones para registrar una incidencia"
        },
        INCIDENT_INSPECTION_LIST : {
            index : 12,
            proc : "ins.ProcReporteInspectoria",
            example : "ins.ProcReporteInspectoria ......, 12",
            comment : "este procedimiento me retorna las lista de incidencias o inspecciones que tiene el usuario y que haya hecho en el dia"
        },
        UNIT_DETAIL :
        {
            index : 11,
            proc : "ins.ProcLiquidacion",
            example : "ins.ProcLiquidacion '209', 11",
            comment : "este procedimiento me devuelve los detalles de una unidad como padron - placa, etc"
        },
        DETALLE_INCIDENCIA :
        {
            index : 106,
            proc : "ins.ProcReporteInspectoria",
            example : "ins.ProcReporteInspectoria '5', 106",
            comment : "devuelve el detalle de una incidencia"
        }
    }

    // ,     
    // DBGPSGENERAL :{
    //     INFOEXAMPLE :{
    //         indice : 1000,
    //         sqlProcedimiento:{
    //             conexion : "ProcExample"
    //         }
    //     }
    // } 
};

export default PROCEDURES;
