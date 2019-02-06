var mysqlConnection = require('../database/mysqlConnection');
var async = require("async");
var responseHandler = require('../handler/responseHandler');

var databaseProcess = {
	doProcess: function (query, callback) {
		
		mysqlConnection.acquire(function (err, connection) {
			if (err) {
				callback(err);
			} else {
				connection.query(query, function (err, result){
					connection.release();
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					}
				});
			}
		});
	},
	insertUpdateProcess: function (query, data, callback) {
		mysqlConnection.acquire(function (err, connection) {
			if (err) {
				callback(err);
			} else {
				connection.query(query, data, function (err, result) {
					connection.release();
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					}
				});
			}
		});
	},
	doDatabaseProcess: function (query) {
		return new Promise(function (resolve, reject) {
			databaseProcess.doProcess(query, function (err, result) {
				if (err) {
					reject({
						status: 500,
						message: err.message
					});
				} else {
					resolve({
						message: 'Processed Successfully',
						content: result
					});
				}
			});
		}).then(function (response) {
			return responseHandler.setSuccessResponse(response);
		}, function (err) {
			return responseHandler.setErrorResponse(err);
		});
	}
};
module.exports = databaseProcess;
