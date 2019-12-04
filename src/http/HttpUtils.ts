/**
 * Created by innovaapps on 15/03/2017.
 */
const axios = require('axios')
// const querystring = require('querystring');
import querystring = require('querystring');
import request = require('request');
import { IRequestIncidencia, IRequestPhoto } from '../routes/Incidencia.routes';
import QueryStringUtils = require('./QueryStringUtils');
const FormData = require('form-data');
const fs = require('fs');

const options = {
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'}
        'Content-Type': 'multipart/form-data'}
  };
//   {["name" : "a"], ["name" : "b"] }
// [{"name" : "a"}, {"name" : "b"}, {"name" : "c"}]
var jsonDataObj = {'INSPECTORIA': '{["name" : "a"], ["name" : "b"] }'};

var form = {
    username: 'usr',
    password: 'pwd',
    opaque: 'opaque',
    logintype: '1',
    INSPECTORIA: [{name : "a"}, {name : "b"}] 
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

class HttpUtils
{
    constructor() {
    }

    public static checkService() 
    {
        // request.post({url:'http://127.0.0.1:8080/src/uploadFiles.php', formData: formData}, function(err, body) {
        //     if (err) {
        //         return console.error('upload failed:', err);
        //     }
        //     console.log('Upload successful!  Server responded with:', body);
        // });
        
        // listImagen.push(<IRequestIMAGEN>{idIncidencia : 13, imagen : [13, 34], ID : 3})

        let requestIncidencia : IRequestIncidencia = <IRequestIncidencia><any>{
            codInfraccion : 2,
            codConductor : 12,
            codEmpresa : 14,
            codInspector : 1111,
            timeStamp : new Date().getTime(),
            fechaHora : "29-11-2019 15:22:00",
        }

        let pathFile2 = (__dirname + '/car-front.png');
        let pathFile3 = (__dirname + '/copy_car.png');
        let pathFile4 = (__dirname + '/copy_car.png');
        var formData = {
            file0: fs.createReadStream(pathFile2),
            file1: fs.createReadStream(pathFile3),
            file2: fs.createReadStream(pathFile4),
            // file3: {
            //         file : fs.createReadStream(pathFile4),
            //         name : "object embed"
            //     },
            token: '### access token ###',
            filetype: 'jpeg',
            filename: 'fileToUpload',
            channels: 'fileToUpload',
            title: 'fileToUpload- title',
        };

        request.post({
            url: 'http://127.0.0.1:8080/src/uploadFiles_2.php',
            formData : formData
            ,
        }, function(error, response, body) {
            console.log(body);
        });

        // var request = require('request');
        // var fs = require('fs');

        // var data = {
        //     file: fs.createReadStream( pathFile2 )
        // };
        // request.post({ url:'http://127.0.0.1:8080/src/uploadFiles.php', formData:data }, function callback( err, response, body ) {
        //     if( err ) {
        //         return console.error( 'Failed to upload:', err );
        //     }
        //     console.log( 'Upload successful!' );
        // });

    }


    public static uploadFilesToHosting(requestRegIncidencia : IRequestIncidencia, callback : (error : Error, result : any)=> void)
    {
        let formData = {
            title : "testing photo",
            codInfraccion : requestRegIncidencia.codInfraccion,
            codEmpresa : requestRegIncidencia.codEmpresa
        };

        // se creò esta validaciòn para que siempre se llame a esta funciòn y no se aplique muchos if repetitivos
        if(requestRegIncidencia.listPhotos.length == 0){
            let postPhoto = {
                codResultado : 0,
                descripcion : "no se encontraron fotos para enviar",
                listPhotoLinks : []
            }
            callback(null, postPhoto);
            return;
        }
        requestRegIncidencia.listPhotos.forEach((requestPhoto : IRequestPhoto, index : number)=>{
            let keyFile = ("file" + index);
            let pathFile = ( __dirname + "/../../" + requestPhoto.path);
            let file = fs.createReadStream(pathFile);
            formData[keyFile] = file;
        })

        request.post({
            url : "http://parwadesigns.com/AppsWeb/AppRegins/src/uploadFiles_2.php",
            // url: 'http://127.0.0.1:8080/src/uploadFiles_2.php',
            formData : formData
            ,
        }, function(error, response, body) {
            if(error || body == null || body.length == 0){
                callback((error || "body response is empty "), null);
                return;
            }
            body = body.replace(/(\r\n|\n|\r)/gm, "");
            let responseJSON = JSON.parse(body);
            callback(null, responseJSON);
        });
    }



}


export = HttpUtils;