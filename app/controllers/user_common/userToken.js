const db = require("../../db/mysql");

const jwt = require('jsonwebtoken');

const secret = 'yi'; //撒盐：加密的时候混淆

const redis=require('../../db/redis');

exports.token=function (req,res) {


    let token=req.headers['x-auth-token'];


    console.log(token)

    jwt.verify(token, secret, function (err, decoded) {
        if (!err){
            console.log(decoded.user);  //会输出123，如果过了60秒，则有错误。
            console.log(decoded.rd)

            redis.get(decoded.user,function (response) {

                if(response&&response.length>0){

                    if(response[0].token==decoded.rd){

                        res.json({message:'token验证成功'})

                    }

                    else{

                        res.json({message:'token已过期'})

                    }

                }

            })

        }
        else {

            console.log(err)

            res.json({message:'token验证失败'})

        }

    })

}