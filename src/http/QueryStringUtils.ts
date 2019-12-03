/**
 * Created by innovaapps on 15/03/2017.
 */
const axios = require('axios')
const request = require('request');
// const querystring = require('querystring');
import querystring = require('querystring');
import { IRequestIncidencia } from '../routes/Incidencia.routes';

class QueryStringUtils
{
    constructor() {
    }

    public static convertObjectToQueryString (a) {
        var prefix, s, add, name, r20, output;
        s = [];
        r20 = /%20/g;
        add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (a instanceof Array) {
            for (name in a) {
                add(name, a[name]);
            }
        } else {
            for (prefix in a) {
                QueryStringUtils.buildParams(prefix, a[ prefix ], add);
            }
        }
        output = s.join("&").replace(r20, "+");
        return output;
    };

    private static buildParams(prefix, obj, add) {
        var name, i, l, rbracket;
        rbracket = /\[\]$/;
        if (obj instanceof Array) {
            for (i = 0, l = obj.length; i < l; i++) {
                if (rbracket.test(prefix)) {
                    add(prefix, obj[i]);
                } else {
                    QueryStringUtils.buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
                }
            }
        } else if (typeof obj == "object") {
            // Serialize object item.
            for (name in obj) {
                QueryStringUtils.buildParams(prefix + "[" + name + "]", obj[ name ], add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
}


export = QueryStringUtils;