/**
 * Created by innovaapps on 20/03/2017.
 */
var INDICES = {

    TIPOCONEXION:{
        indice : 1,
        sqlIndices:{
            conexion : 120
        },
        sqlProcedimientos:{
            conexion : "ProcDispositivoA"
        }
    },
    TIPOSOLICITUDINCIDENCIA:{
        indice : 100,
        subIndices :
        {
            solicitudIncidencias : 1,
            solicitudIncidenciaPorUnidad : 2
        },
        sqlIndices:{
            solicitudIncidencias : 10,
            solicitudIncidenciaPorUnidad : 11
        },
        sqlProcedimientos:{
            solicitudIncidencias : "ProcValidadorIncidencia",
            solicitudIncidenciaPorUnidad : "ProcValidadorIncidencia"
        }
    },
    TIPOSESION:{
        indice : 2,
        subIndices : {
            inicioSesion : 1,
            cierreSesion : 2,
            inicioSesionRemoto : 3,
            cierreSesionRemoto : 4
        },
        sqlIndices:{
            inicioSesion : 21,
            cierreSesion : 31,
            inicioSesionRemoto : 21,
            cierreSesionRemoto : 32
        },
        sqlProcedimientos:{
            inicioSesion : "ProcSesionAbeja",
            cierreSesion : "ProcSesionAbeja",
            inicioSesionRemoto : "ProcSesionAbeja",
            cierreSesionRemoto : "ProcSesionAbeja"
        }

    },
    TIPOCONFIGURACION : {
        indice: 9,
        subIndices: {
            configuracionDatosUnidad: 2,
            configuracionPassword: 3,
            configuracionActualizacion : 4,
            updateNomRutas : 13
        },
        sqlIndices: {
            configuracionDatosUnidad: 13,
            configuracionPassword: 13,
            configuracionActualizacion : 11,
            conexionAbeja: 120,
            updateNomRutas : 15
        },
        sqlProcedimientos: {
            configuracionDatosUnidad: "ProcDispositivoA",
            configuracionPassword: "ProcEmpresa",
            configuracionActualizacion : "ProcAplicacion",
            conexionAbeja: "ProcDispositivoA",
            updateNomRutas: "ProcRutaV3"
        }
    },
    TIPOUNIDAD:{
        indice : 2,
        subIndices :
        {
            localizacionUnidadesCercanasAlUsuario : 1
        },
        sqlIndices:{
            localizacionUnidad : 10
        },
        sqlProcedimientos:{
            localizacionUnidad : "ProcValidadorIncidencia"
        }
    }, 
        TIPOTRACK: {
            indice: 8,
            subIndices: {
                registroTrack: 1,
                horasProgramadas: 2,
                registroControl: 3,
                avisoUnidadDespachada: 4
            },
            sqlIndices: {
                registroTrack: 21,
                horasProgramadas: 12,
                registroControl: 24,
                avisoUnidadDespachada: 25,
                registroTrackPorAuxiliar: 21
            },
            sqlProcedimientos: {
                registroTrack: "ProcUnidadTrackV2",
                horasProgramadas: "ProcSalidaProgramada",
                registroControl: "ProcUnidadTrack",
                avisoUnidadDespachada: "ProcUnidadTrack",
                registroTrackPorAuxiliar: "ProcUnidadTrack"
            }
        },
        TIPOALERTA: {
            indice: 11,
            subIndices: {
                registroAlerta: 1
            },
            sqlIndices: {
                registroAlerta: 21

            },
            sqlProcedimientos: {
                registroAlerta: "ProcUnidadAlerta"
            }
        },
        TIPOCLIENTESQL: {
            indice: 12,
            subIndices: {
                confirmacionDataClienteSQL: 10
            },
            sqlIndices: {
                solicitudDataClienteSQL: 21,
                confirmacionDataClienteSQL: 22,
                // modificar por ìndices reales
                solicitudDatagramaAudioParlante : 10
                // confirmacionDatagramaAudioParlante : 21
            },
            sqlProcedimientos: {
                procDatagramaGeneral: "ProcDatagrama",
                procDatagramaAudioParlante : "ProcComunicacionDual"
            }
        },
        TIPOINSTRUCCIONSERVIDOR: {
            indice: 13,
            subIndices: {
                // registroIncidencia: 1,
                registroUsoDatos : 5
            },
            sqlIndices: {
                // registroIncidencia: 21
            },
            sqlProcedimientos: {
                // confirmacionDataClienteSQL: "ProcDatagrama"
            }
        },
        TIPOCLIENTEWEB: {
            indice: 14,
            subIndices: {
                confirmacionDatagramaAudioParlante : 1,
                confirmacionDatagramaNumTelefonos : 2
            },
            sqlIndices: {
                confirmacionDatagramaAudioParlante : 21
            },
            sqlProcedimientos: {
                confirmacionDatagramaAudioParlante : "ProcComunicacionDual"
            }
        },
        TIPOSINCRONIZACIONDATOS:    // FICHERO TS
        {
            cargarEmpresas : // atributos servicio
            {
                nombre : "cargarEmpresas",   // nombre del servicio
                sqlIndice : 16,
                sqlProcedimiento : "ProcTokens"
            },
            cargarConsumoDatos : // atributos servicio
            {
                nombre : "cargarConsumoDatos"   // nombre del servicio
                // sqlIndice : 16,
                // sqlProcedimiento : "ProcTokens"
            }
        },
        TIPOSETTINGS:    // reboots,...
        {
            reboot :
            {
                nombre : "reboot"
            },
            fixRapido :
            {
                nombre : "fixRapido"
            }
        },
        WSTIPOTRACKGPS:
        {
            updateVersion :
            {
                nombre : "update_version"
            },
            requestNumeroSMS :
            {
                nombre : "request_numero_sms"
            },
            sintetizadoVoz :
            {
                nombre : "sintetizado_voz"
            },
            sincronizacionNumeros :
            {
                nombre : "sincronizacion_numeros"
            },
            trackServicioGPS :
            {
                nombre : "track_servicio_gps"
            },
            consumoMegas :
            {
                nombre : "consumo_megas"
            }
        },
        WSCONTROLFUNCIONES :
        {
            solicitarBD : 
            {
              nombre : "solicitar_bd"
            }, 
            actualizarGPS : 
            {
              nombre : "actualizar_gps"
            } 
        }
};

export default INDICES;
