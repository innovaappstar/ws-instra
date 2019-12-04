var dateFormat = require('dateformat');

String.prototype.convertToDateTime = function(){
    let dateConverted = new Date(this);
    let dateFormated = dateFormat(dateConverted, "dd-mm-yyyy HH:MM:ss");
    return dateFormated;
};

String.prototype.print = function(){
    console.log("print message : " + this)
};