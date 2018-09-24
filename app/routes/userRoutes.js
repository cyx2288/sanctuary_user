/**
 * Created by Administrator on 2018/9/19.
 */
module.exports = function(app) {
    const register = require('../controllers/user_common/userRegister');
    const login = require('../controllers/user_common/userLogIn');
    const token = require('../controllers/user_common/userToken');

    // todoList Routes
    app.route('/user/register')
        .post(register.createUser)
    
    app.route('/user/login')
        .post(login.login)
    
    app.route('/user/token')
        .post(token.token)

};