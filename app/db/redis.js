let mysql = require('mysql');
let db = {}



function close(connection){
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


/*增，删，查*/

db.set=function (key,value,callback) {

    function connection(){
        //数据库配置
        let connection = mysql.createConnection({
            host:'rm-uf69x7hv14f2q7xczoo.mysql.rds.aliyuncs.com',
            user:'root',
            password:'chenyuxiang123!',
            database:'text_redis',
            port:3306
        });
        //数据库连接
        connection.connect(function(err){
            if(err){
                console.log('模拟redis数据库连接失败！失败原因：'+err);
                return;
            }
            else{
                console.log('模拟redis数据库连接成功！');
            }
        });
        return connection;
    }




    var connection=connection();

    let sqlSelectQuery='SELECT token FROM text WHERE uuid=\''+key+'\'';

    connection.query(sqlSelectQuery,function(err,result) {

        if (err) {
            console.log(`SQL查询失败: ${err}!`);
            callback(result)
            db.close(connection);
            return
        } else {
            console.log('--------------------------SELECT----------------------------');
            console.log(`SQL查询成功!`);
            console.log(result);
            console.log('-----------------------------------------------------------------\n');

            if(result&&result.length>0){

                connection.query( 'UPDATE text SET token=\''+value+'\' WHERE uuid=\''+key+'\'')

            }

            else{

                connection.query('INSERT INTO text(uuid,token) VALUES(?,?)', [key,value] )

            }

            return

        }
    });

};

db.get=function (key,callback) {

    function connection(){
        //数据库配置
        let connection = mysql.createConnection({
            host:'rm-uf69x7hv14f2q7xczoo.mysql.rds.aliyuncs.com',
            user:'root',
            password:'chenyuxiang123!',
            database:'text_redis',
            port:3306
        });
        //数据库连接
        connection.connect(function(err){
            if(err){
                console.log('模拟redis数据库连接失败！失败原因：'+err);
                return;
            }
            else{
                console.log('模拟redis数据库连接成功！');
            }
        });
        return connection;
    }

    var connection=connection();

    let sqlSelectQuery='SELECT token FROM text WHERE uuid=\''+key+'\'';

    connection.query(sqlSelectQuery,function(err,result) {

        if (err) {
            console.log(`SQL查询失败: ${err}!`);

            return
        } else {
            console.log('--------------------------SELECT----------------------------');
            console.log(`SQL查询成功!`);
            console.log(result);
            console.log('-----------------------------------------------------------------\n');
            callback(result)
            return
        }
    });
    
};

db.del=function () {
    
};




module.exports = db;