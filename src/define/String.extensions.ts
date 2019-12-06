
var dateformat = require('dateformat');

interface String {
    print();
    // convertToDateTime(): string;
    convertToDateTime(formatoFecha : string): string;
    convertToDateSQL(): string;
    replaceSymbol(symbol : string):string;
    replaceRegex(symbol : string):string;
}

String.prototype.print = function (){
    var value : string = String(this);
    console.log("print message : " + value)
};

String.prototype.convertToDateTime = function (formatoFecha) : string{
    var value : number = Number(this);
    let dateConverted = new Date(value);
    let dateFormated = dateformat(dateConverted, formatoFecha);
    return dateFormated;
};

String.prototype.convertToDateSQL = function () : string{
    try {
        var value : number = Number(this);
        let dateConverted = new Date(value);    // 27-11-2019 16:44:12  "dd-mm-yyyy HH:MM:ss"
        let dateFormated = dateformat(dateConverted, "dd-mm-yyyy HH:MM:ss");
        return dateFormated;
    } catch (error) {
        console.error(error)
    }
    return "";
}; 


// parametro de entrada : '
String.prototype.replaceSymbol = function (symbol) : string{
    var value : string = String(this); 
    //return value.replace(/\/g, "");
    return value.replace(new RegExp("\\" + symbol, 'g'), '');
};


// parametro de entrada : \'
String.prototype.replaceRegex = function (symbolRegex) : string{
    var value : string = String(this); 
    return value.replace(new RegExp(symbolRegex, 'g'), '');
};