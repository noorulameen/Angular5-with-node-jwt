var Response = {
    setErrorResponse: function(data) {

        var response = {
            status: data.status,
            success: false,
            message: data.message,
        };
        return response;
    },

    setSuccessResponse: function(data) {
        var response = {
            status: 200,
            success: true,
            message: data.message,
            content: data.content
        };
        return response;
    },
};

module.exports = Response;
