/**
 * Created by innovaapps on 28/02/2017.
 */
class Constantes
{
    constructor(){}

    public static respuestaOK : number = 1;
    public static respuestaError : number = 0;
    public static sepFila : string = "~";
    public static sepColumna : string = "|";
    public static sepSubColumna : string = "-"; // casos en los que se requiera separar un arreglo(key => string[])
    public static sepDatagrama: string = "#";   // separador de datagrama final
}
export = Constantes;