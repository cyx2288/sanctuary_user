const db = require("../../db/mysql");

const jwt = require('jsonwebtoken');

const secret = 'yi'; //撒盐：加密的时候混淆

const redis=require('../../db/redis');



exports.login=function (req,res) {


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

    else{

        let dbConnection = db.connection('yiuser');

        let sqlSelectQuery='SELECT * FROM user WHERE name=\''+req.body.name+'\' and password=\''+req.body.password+'\'';

        db.select(dbConnection, sqlSelectQuery,function (response) {

            if(response&&response.length>0){

                let now=rnd(1,99);

                redis.set(response[0].userId,now,function () {

                });

                let token = jwt.sign({//用户令牌

                    user:response[0].userId,

                    rd:now

                }, secret, {

                    expiresIn:  60*60*24*30 //秒到期时间

                });

                function rnd(min, max){  return min + Math.floor(Math.random() * (max - min + 1));}

                res.json({

                    status: 0,
                    data: {

                        token:token
                    },
                    msg: '登录成功'})

            }

            else{

                res.json({
                    status: 0,
                    data: {},
                    msg: '登录失败'})

            }

            db.close(dbConnection)


        })

    }

}