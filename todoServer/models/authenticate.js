"use strict";

var responseHandler = require('../handler/responseHandler');
var validator = require('../validation/commonValidation/validator');
var constants = require('../config/constants');
var jwt = require('jsonwebtoken');
var databaseProcess = require('./process');
var dbConfig = require('../config/dbConfig');

module.exports = function (req, res, next) {

  function doAuthenticate() {
    return new Promise(function (resolve, reject) {
              req.startTime = new Date().getTime();
                      var token = null;
                      if (typeof req.get("Authorization") !== 'undefined') {
                          token = req.get("Authorization");
                      }
                      if (token) {
                          jwt.verify(token, constants.secreatetoken, function (err, user) {
                              if (err) {
                                  if (err.message == "jwt expired") {
                                      reject({
                                          status: 401,
                                          success: false,
                                          message: 'jwt token expired'
                                      });
                                  } else {
                                      reject({
                                          status: 405,
                                          success: false,
                                          message: 'Getting error while jwt token verify'
                                      });
                                  }
                              } else {
                                  req.userDetails = user;
                                  resolve(req);
                              }
                          });

                      }else if(req.originalUrl == "/todo/users/login"){
                          resolve(req);
                      } else {
                          reject({status: 405, message: 'Token not found'});
                      }

     });
  }
  doAuthenticate().then(function (req) {
      next();
  }, function (errorresponds) {
    if (errorresponds) {
      res.status(errorresponds.status).send(responseHandler.setErrorResponse(errorresponds));
    }
  });
};
