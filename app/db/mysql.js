let mysql = require('mysql');
let db = {}

/**
 * @description 插入操作，注意使用异步返回查询结果@
 * @connection object 数据库连接实例
 * @sql string sql语句
 * @paras array 需插入的数组
 * @callback function 回调函数了，返回插入的id
 *
 * */
db.insert = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        if (error) {
            console.log(`SQL插入失败: ${error}!`);
            return
        } else {
            console.log('--------------------------INSERT----------------------------');
            console.log(`SQL插入成功!`);
            console.log(results);
            console.log('-----------------------------------------------------------------\n\n');
            callback(results);//返回插入的id
            return
        }
    });
}

//查询
db.select=function (connection,sqlQuery,callback){
    connection.query(sqlQuery,function(err,result) {

        if (err) {
            console.log(`SQL查询失败: ${err}!`);
            callback(result)
            return
        } else {
            console.log('--------------------------SELECT----------------------------');
            console.log(`SQL查询成功!`);
            console.log(result);
            console.log('-----------------------------------------------------------------\n');
            callback(result);
            return
        }
    });

}

//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            console.log('关闭连接失败！失败原因：'+err);
            return;
        }else{
            console.log('关闭连接成功！');
            return
        }
    });
}

//获取数据库连接
db.connection = function(database){
    //数据库配置
    let connection = mysql.createConnection({
        host:'rm-uf69x7hv14f2q7xczoo.mysql.rds.aliyuncs.com',
        user:'root',
        password:'chenyuxiang123!',
        database:database,
        port:3306
    });
    //数据库连接
    connection.connect(function(err){
        if(err){
            console.log('数据库连接失败！失败原因：'+err);
            return;
        }
        else{
            console.log('数据库连接成功！');
        }
    });
    return connection;
}
module.exports = db;