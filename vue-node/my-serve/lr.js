//这里是登录和注册的路由

let express = require('express')
let router = express.Router();

let {conn} = require('./utils/db')
let {aesEncrypt,aesDecrypt,keys,setError} = require('./utils/index')


//登录接口
router.get('/login',(req,res,next)=>{
    let query = req.query;
    if(!query.username||!query.userpwd){
        res.json({
            code:200,
            msg:'参数错误',
            type:0
        })
    }else{
        conn((err,db)=>{
            setError(err,res,db)
            db.collection('userinfo').findOne(query,(err,result)=>{
                if(result){
                    req.session.token=aesEncrypt(result.username+ new Date().getTime(),keys)
                    req.session.username = aesEncrypt(result.username,keys)
                    res.json({
                        code:200,
                        msg:'登录成功',
                        type:1,
                        token:req.session.token
                    })
                    db.close()
                }else{
                    res.json({
                        code:200,
                        msg:'用户名或密码错误',
                        type:0
                    })
                    db.close()
                }
            })
        })
    }
    
})

//注册接口
router.get('/register',(req,res,next)=>{
    let query = req.query
    console.log(query)
    let {
        username,
        userpwd,
        userphone
    } = query
    if(!username||!userpwd||!userphone){
        res.json({
            code:200,
            msg:'参数错误',
            type:0
        })
    }else{
        conn((err,db)=>{
            setError(err,res,db)
            db.collection('userinfo').findOne({
                $or:[
                    {username},
                    {userphone}
                ]
            },(err,result)=>{
                setError(err,res,db)
                if(result){
                    res.json({
                        code:200,
                        msg:'用户名或手机号已存在',
                        type:0
                    })
                }else{
                    db.collection('userinfo').insert(query,(err,result)=>{
                        setError(err,res,db)
                        res.json({
                            code:200,
                            msg:'注册成功',
                            type:1
                        })
                    })
                }   
            })
        })
    }
})




module.exports = router