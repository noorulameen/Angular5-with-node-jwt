var userController = require('../controller/userController');

/* GET users listing. */

module.exports = function(router) {
    router.route('/add').post(function (req, res) {
        userController.addTodo(req, res);
    }),
    
    router.route('/addcoin').post(function (req, res) {
    	
        userController.addCoin(req, res);
    }),
    
    router.route('/getcoin').get(function (req, res) {
        userController.getCoin(req, res);
    }),

    router.route('/edit/:id').get(function (req, res) {
        userController.listTodo(req, res);
    }),
    
    router.route('/update/:id').post(function (req, res) {
        userController.editTodo(req, res);
    }),

    router.route('/delete/:id').get(function (req, res) {
        userController.deleteTodo(req, res);
    }),

    router.route('/login').post(function (req, res) {
    	console.log('Worker ' + process.pid + ' is online ameen');
        userController.login(req, res);
    }),

    /*router.route('/listtodo').post(function (req, res) {
        console.log(req.body)
        userController.listTodo(req, res);
    }),*/

    router.route('/logout').post(function (req, res) {
        res.status(200).send({ auth: false, token: null });
    })
}

//module.exports = router;
