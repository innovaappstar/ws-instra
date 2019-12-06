/**
 * Created by innovaapps on 20/03/2017.
 */
import ArrayUtils = require('../utils/ArrayUtils')
import INDICES from "../config/indices";

/**
 * entidad de datos entrantes
 */
class DataWs
{
    private _indiceWs : number = 0;
    private _subIndiceWs : number = 0;
    private _codigoData : number = 0;
    private _data : string = '';
    private _codigos : string[] = [];

    /**
     * @param indiceWs number
     * @param subIndiceWs number
     * @param codigoData number
     * @param data string
     * @param _codigos string[]
     */
    constructor(indiceWs: number, subIndiceWs: number, codigoData: number, data: string, codigos: string[]) {
        this._indiceWs = indiceWs;
        this._subIndiceWs = subIndiceWs;
        this._codigoData = codigoData;
        this._data = data;
        this._codigos = codigos;
    }

    get indiceWs(): number {
        return this._indiceWs;
    }

    get subIndiceWs(): number {
        return this._subIndiceWs;
    }

    get codigoData(): number {
        return this._codigoData;
    }

    get data(): string {
        return this._data;
    }

    get codigos(): string[] {
        return this._codigos;
    }
    
    isTipoUnidad():boolean{
        return (this._indiceWs == INDICES.TIPOUNIDAD.indice);
    }

    isLocalizacionUnidad(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOUNIDAD.subIndices.localizacionUnidad);
    }
    isLocalizacionUnidadVistaFragment(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOUNIDAD.subIndices.localizacionUnidadVistaFragment);
    }
    isLocalizacionListaUnidadesCercanasAlUsuario(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOUNIDAD.subIndices.localizacionUnidadesCercanasAlUsuario);
    }
    isLocalizacionUnidadByPlaca(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOUNIDAD.subIndices.localizacionUnidadByPlaca);
    }



    isTipoSolicitudIncidencia():boolean{
        return (this._indiceWs == INDICES.TIPOSOLICITUDINCIDENCIA.indice);
    }

    isSolicitudIncidencias(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSOLICITUDINCIDENCIA.subIndices.solicitudIncidencias);
    }

    isSolicitudIncidenciaPorUnidad(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSOLICITUDINCIDENCIA.subIndices.solicitudIncidenciaPorUnidad);
    }


    isTipoSesion():boolean{
        return (this._indiceWs == INDICES.TIPOSESION.indice);
    }

    isInicioSesion(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSESION.subIndices.inicioSesion);
    }

    isCierreSesion(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSESION.subIndices.cierreSesion);
    }

    isInicioSesionRemoto(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSESION.subIndices.inicioSesionRemoto);
    }

    isCierreSesionRemoto(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOSESION.subIndices.cierreSesionRemoto);
    }

    isTipoConfiguracion():boolean{
        return (this._indiceWs == INDICES.TIPOCONFIGURACION.indice);
    }

    isConfiguracionDatosUnidad(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCONFIGURACION.subIndices.configuracionDatosUnidad);
    }

    isConfiguracionPassword(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCONFIGURACION.subIndices.configuracionPassword);
    }

    isConfiguracionActualizacion(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCONFIGURACION.subIndices.configuracionActualizacion);
    }

    isUpdateNomRutas(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCONFIGURACION.subIndices.updateNomRutas);
    }

    isTipoTrack():boolean{
        return (this._indiceWs == INDICES.TIPOTRACK.indice);
    }

    isRegistroTrack(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOTRACK.subIndices.registroTrack);
    }

    isHorasProgramadas(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOTRACK.subIndices.horasProgramadas);
    }

    isRegistroControl(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOTRACK.subIndices.registroControl);
    }

    isAvisoUnidadDespachada(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOTRACK.subIndices.avisoUnidadDespachada);
    }


    isTipoAlerta():boolean{
        return (this._indiceWs == INDICES.TIPOALERTA.indice);
    }

    isRegistroAlerta(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOALERTA.subIndices.registroAlerta);
    }

    isTipoClienteSql():boolean{
        return (this._indiceWs == INDICES.TIPOCLIENTESQL.indice);
    }

    isConfirmacionDataClienteSQL(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCLIENTESQL.subIndices.confirmacionDataClienteSQL);
    }

    isTipoInstruccionServidor():boolean{
        return (this._indiceWs == INDICES.TIPOINSTRUCCIONSERVIDOR.indice);
    }

    isTipoClienteWeb():boolean{
        return (this._indiceWs == INDICES.TIPOCLIENTEWEB.indice);
    }

    isConfirmacionDatagramaAudioParlante(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCLIENTEWEB.subIndices.confirmacionDatagramaAudioParlante);
    }

    isConfirmacionDatagramaNumTelefonos(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOCLIENTEWEB.subIndices.confirmacionDatagramaNumTelefonos);
    }

    // isRegistroIncidencia(): boolean
    // {
    //     return (this._subIndiceWs == INDICES.TIPOINSTRUCCIONSERVIDOR.subIndices.registroIncidencia);
    // }

    isRegistroUsoDatos(): boolean
    {
        return (this._subIndiceWs == INDICES.TIPOINSTRUCCIONSERVIDOR.subIndices.registroUsoDatos);
    }




}
export = DataWs;