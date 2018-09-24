/**
 * Created by Administrator on 2018/9/19.
 */

const db = require("../../db/mysql");
const uuid = require('node-uuid');


exports.createUser = function (req, res) {

    //实现创建新todo纪录的方法

    if (!req.body.name) {

        return res.json({
            status: -1,
            data: {},
            msg: '用户名不为空'}
        )

    }

    else if (!req.body.password) {

        return res.json({
            status: -1,
            data: {},
            msg: '密码不为空'}
        )
    }

    else {

        let dbConnection = db.connection('yiuser');

        let uid = uuid.v1().replace(/\-/g, '');

        let sqlSelectQuery='SELECT * FROM user WHERE name=\''+req.body.name+'\'';

        let sqlInsertQuery = 'INSERT INTO user(userId,name,password,createData) VALUES(?,?,?,?)';

        db.select(dbConnection,sqlSelectQuery,function (response) {

            if(!(response&&response.length>0)){//response为空数组时，没有数据，没有重复

                var addSqlParams = [

                    uid
                    ,
                    req.body.name
                    ,
                    req.body.password
                    ,
                    new Date().getTime().toString().substring(0, 10)

                ];

                db.insert(dbConnection, sqlInsertQuery, addSqlParams, function (response) {

                    res.json({

                        status: 0,

                        data: {
                            userId:uid
                        },

                        msg: '注册成功'

                    });



                })

            }

            else{

                return res.json({
                    status: -1,
                    data: {},
                    msg: '用户已存在'}
                )

            }

            db.close(dbConnection)

        })

    }

};
/*


exports.getUser = function (req, res) {

    var params = req.query

    console.log(params)

    res.json({message: '成功'})

}
*/
