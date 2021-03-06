// server.js

// BASE SETUP
// =============================================================================

// 加载express
var express    = require('express');        // call express
var app        = express();                 // 获得express定义的app，app对象此时代表整个web应用
bodyParser = require('body-parser');

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api路由
// ============================================================================
var router = express.Router();              // 获得express router对象
var routes = require('./app/routes/userRoutes'); //importing route
routes(router); //register the route
app.use('/v4/yi', router);



var port = process.env.PORT || 8080;        // set our port
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);




/*

// API路由配置
// =============================================================================
var router = express.Router();              // 获得express router对象
// 用get动词访问 http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router);

// 启动server
// =============================================================================
//开始监听端口
app.listen(port);
console.log('Magic happens on port ' + port);

*/
