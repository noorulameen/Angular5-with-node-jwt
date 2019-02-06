"use strict";
var dbConfig= require('../config/dbConfig');
var mysql = require('mysql');

// creating myql pool
function Connection() {
  this.pool = null;
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10000,
      host     : dbConfig.hostname,
      user     : dbConfig.username,
      password : dbConfig.password,
      database : dbConfig.database,
      timezone: dbConfig.timezone
    });
  };
  this.acquire = function(callback) {
    if(this.pool != undefined && this.pool != null){
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  }
  else {
    callback('Error while connecting to database...');
  }
  };
}

module.exports = new Connection();
