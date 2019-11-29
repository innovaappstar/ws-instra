/**
 * Created by innovaapps on 15/03/2017.
 */
const axios = require('axios')

class HttpUtils
{
    constructor() {
    }

    public static checkService() 
    {
        axios.post('http://127.0.0.1:8080/src/uploadFiles.php', {
            INSPECTORIA: '{["name" : "a"], ["name" : "b"] }'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

        // axios.post('http://127.0.0.1:8080/src/uploadFiles.php', {
        //     param1: 'value param1',
        //     json: {
        //         INSPECTORIA: '{["name" : "a"], ["name" : "b"] }'
        //       }
        // })
        // .then((res) => {
        //     console.log(`statusCode: ${res.statusCode}`)
        //     console.log(res)
        // })
        // .catch((error) => {
        //     console.error(error)
        // })
    }

}

export = HttpUtils;