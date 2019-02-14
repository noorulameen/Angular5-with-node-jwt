var responseHandler = require('../handler/responseHandler');
var validator = require('../validation/commonValidation/validator');
var response = {
    validateAndSend: function(err, response, connection, res) {
        if (response) {
            var flag = false;

            var finalResponse;
            var validationResult = validator.validateData('COMMON_RESPONSE_SCHEMA', response);

            if (!validationResult.isError) {
                flag = true;
                finalResponse = response;
            } else {
                finalResponse = {
                    status: 500,
                    message: validationResult.errorMessages
                };
            }

            if (!flag) {
                res.status(500).send(finalResponse);
            } else {
                res.status(200).send(finalResponse);
            }
        }else if((err.message).indexOf('ER_PARSE_ERROR') > -1){
            finalResponse = {
                status: 401,
                message: "Bad Request!"
            };
            res.status(401).send(finalResponse);
        } else {
            finalResponse = {
                status: 200,
                success:false,
                message:'something went wrong'
                //message: err.message
            };
            res.status(200).send(finalResponse);

        }

        if (connection && typeof connection == undefined && connection != null ) {
                connection.release(); // mysql

        }

    }


}
module.exports = response;