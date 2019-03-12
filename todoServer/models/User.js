var databaseProcess = require('./process');
var responseHandler = require('../handler/responseHandler');
var dbConfig = require('../config/dbConfig');
var constants = require('../config/constants');

var jwt = require('jsonwebtoken');
var tokenList ={};

var Users = {
/*    createTodo: function (body,req) {
    	console.log('req.userDetails.id',req.userDetails.id);
        body.userid = (req.userDetails.id)? req.userDetails.id : '1';
       //body.userid = 2;

        var query = "insert into usertodo set ?"
        return Users.doInsertUpdateProcess(query, body,req);
    },*/
    
    createCoin: function (body,req) {
    	console.log('req.userDetails.id',req.userDetails.id);
        body.userid = (req.userDetails.id)? req.userDetails.id : '1';
        //body.userid = 2;

        var query = "insert into coin set ?"
        return Users.doInsertUpdateProcess(query, body,req);
    },

    editTodo: function (req,req) {
        var query = "update coin set ?  where id='" + req.params.id + "'";
        return Users.doInsertUpdateProcess(query, req.body,req);
    },

    deleteTodo: function (body,req) {
        body.userid = req.userDetails.id;
        var query = "DELETE FROM coin where id='" + body.id + "'";
        console.log('query>>>',query)

        return Users.doInsertUpdateProcess(query, body,req);
    },

    login: function (body,req) {
        var query = "select * from users where username='" + body.username + "' and password ='" + body.password + "'";
    	console.log('aaaaaaaaaaaq',query);
    	
        return Users.doLogin(query);
    },

    listtodo: function (params,req) {
        //body.userid = req.userDetails.id;
        var query = "select * from coin where id='" + params.id + "'";
        console.log('ameen>>>',query)

        return databaseProcess.doDatabaseProcess(query);
    },
    
    getcoin: function (body) {
        //body.userid = req.userDetails.id;
        var query = "select * from coin";
        console.log('ameen>>>',query)

        return databaseProcess.doDatabaseProcess(query);
    },

  doInsertUpdateProcess: function (query, data) {
    return new Promise(function (fullfil, reject) {
      var response = '';
      databaseProcess.insertUpdateProcess(query, data, function (err, result) {


        console.log('Query is=',query, '------------', data, '-------', err, result);

        if (err) {
          reject({
            status: 500,
            success: false,
            message: err.message
          });
        }
        if (typeof result !== undefined && result) {
          response = {
            message: 'Todo Processed Successfully !',
            content: [{
              data: result
            }]
          };
          response = responseHandler.setSuccessResponse(response);
          fullfil(response);

        } else {
          response = {
            status: 500,
            message: 'Todo could not Processed Successfully!!' + err.message
          };
          response = responseHandler.setErrorResponse(response);
          reject(response);

        }
      });

    }).then(function (response) {
          return response;
      }, function (errresponse) {
          return errresponse;
      })
  },


    doLogin: function (body) {
        var response = '';

        return new Promise(function (resolve, reject) {
            var query = body;
            databaseProcess.doProcess(query, function (err, result) {
                if (err) {
                    response = {
                        status: 500,
                        message: 'Error Connecting database'
                    };
                    reject(response);
                } else if (result.length > 0) {


                    var token = jwt.sign({
                            'id': result[0].id,
                            'username': result[0].username
                        }, constants.secreatetoken, {
                            expiresIn: parseInt(constants.expiresIn)
                        });
                    //refresh token
                    var refreshToken = jwt.sign({
                        'id': result[0].id,
                        'username': result[0].username
                    }, constants.secreaterefreshToken, {
                        expiresIn: parseInt(constants.refreshexpiresIn)
                    });
                    
                    tokenList[refreshToken] = response
                    console.log('coming',token)
                    resolve({
                        status: 200,
                        success: true,
                        message: 'Login Successfully',
                        content: [{
                            "token": token,
                            "refreshToken": refreshToken,
                        }]
                    });

                } else{
                   var data = {
                        status: 500,
                        success: false,
                        message: '',
                        content: [{
                            message: 'Invalid Email AND/OR Password',
                            userInInvitedState: true
                        }]
                    };
                    reject(data);
                }
            });
        });
    },


};
module.exports = Users;
