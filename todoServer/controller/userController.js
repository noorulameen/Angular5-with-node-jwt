var responseServices = require('../handler/responseService');
var userModel = require('../models/User');

var todoUser = {
    addTodo: function (req, res) {
        return new Promise(function (resolve, reject) {
        	resolve(userModel.createTodo(req.body,req));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },
    
    addCoin: function (req, res) {
        return new Promise(function (resolve, reject) {
        	resolve(userModel.createCoin(req.body,req));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },


    editTodo: function (req, res) {
    	console.log('check!',req.params);
        return new Promise(function (resolve, reject) {
            resolve(userModel.editTodo(req,req));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },


    deleteTodo: function (req, res) {
        return new Promise(function (resolve, reject) {
            resolve(userModel.deleteTodo(req.params,req));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },

    login: function (req, res) {
        return new Promise(function (resolve, reject) {
            resolve(userModel.login(req.body));
        }).then(function (response) {

            if (response.success) {
                console.log(response)
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },

    listTodo: function (req, res) {
        return new Promise(function (resolve, reject) {
            resolve(userModel.listtodo(req.params,req));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    },
    
    getCoin: function (req, res) {
        return new Promise(function (resolve, reject) {
            resolve(userModel.getcoin(req.body));
        }).then(function (response) {
            if (response.success) {
                responseServices.validateAndSend(null, response, null, res);
            } else {
                responseServices.validateAndSend(response, null, null, res);
            }
        }, function (err) {
            responseServices.validateAndSend(err, null, null, res);
        });
    }
    
    

}

module.exports = todoUser;