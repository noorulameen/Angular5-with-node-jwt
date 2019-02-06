"use strict";
var dbConfig = require('../config/mongoConfig');
var mongoose = require('mongoose');
// creating mongo pool
function Connection() {
    this.acquire = function(callback) {
        if(mongoose.connection.readyState == 0) // if readyState = 0 means mongo is not connected then connect it
        {
            mongoose.connect('mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.hostname + ':' + dbConfig.port + '/' + dbConfig.database, dbConfig.option, function (err, connection) {
                if (err) {
                    callback(err, null)
                }
                else callback(null, null);
            });
        } else {
            callback(null,null)
        }

    };
}
module.exports = new Connection();

