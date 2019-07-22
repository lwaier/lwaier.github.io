let express = require('express')
let router = express.Router();
let util = require('./config/index.js');

let {conn} = require('./utils/db')
let {setError,aesEncrypt,aesDecrypt,keys} = require('./utils')

router.get('/',(req,res)=>{
    res.json({
        type:1,
        msg:'我是一个魔鬼伟'
    })
})

function getCode(){
    return 1000 + Math.floor(9000*Math.random());
}

router.post('/duanxin', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
     var code =  getCode() //变量内容

    if (mobile == '') {

        res.render('fail', {
            message: '手机号不能为空',
            code: ''
        });

        return
    }


    util.getResult(code, mobile).then(function(response) {
        console.log(response.data);
        console.log(response.data.code);
        if (response.data.code == '000000') {
            //这里写验证码发送成功的逻辑
            conn((err,db)=>{
                setError(err,res,db)
                db.collection('users').findOne({username:mobile},(err,result)=>{
                    setError(err,res,db)
                    if(result){
                        //当该手机号存在时更新验证码
                        let dateNow = new Date()

                        db.collection('users').update({username:mobile},{
                            $set:{
                                code,
                                date:dateNow.getTime()
                            }
                        },(err,result)=>{
                            setError(err,res,db)
                            res.json({
                                code:200,
                                msg:'更新验证码成功',
                                type:1
                            })
                        })
                    }else{
                        //当该手机号不存在时直接插入
                        let dateNow = new Date()
                        let startNiChen = String(dateNow.getTime())
                        let num = Math.round(Math.random()*(startNiChen.length-3))
                        startNiChen = startNiChen.substring(num,num+3)
                        db.collection('users').insert({
                            username:mobile,
                            code,
                            date:dateNow.getTime(),
                            usernicheng:startNiChen+'号程序员',
                            userqianming:''
                        },(err,result)=>{
                            setError(err,res,db)
                            res.json({
                                code:200,
                                msg:'发送验证码成功',
                                type:1
                            })
                        })
                    }
                })
            })


        } else {
            res.json({
                type:0,
                msg:'短信发送失败',
            })
        }

    }, function(err) {
        res.json({
            msg:"发送验证码的数据库error",
            err,
            code:200
        })
    })

});


router.post('/login',(req,res,next)=>{
    let {
        username,
        code
    } = req.body;
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('users').findOne({username,code:code*1},(err,result)=>{
            if(result){
                let dateNow = new Date().getTime()
                let dateTwo = result.date*1;
                console.log((dateNow-dateTwo)/1000)
                if((dateNow-dateTwo)/1000>100000000){
                    res.json({
                        code:200,
                        msg:'登录超时,请重新发送验证码',
                        type:0
                    })
                }else{
                    req.session.username = aesEncrypt(result.username,keys)
                    req.session.token = aesEncrypt(result.username+new Date().getTime(),keys)
                    res.json({
                        code:200,
                        msg:'登录成功',
                        type:1,
                        token:req.session.token
                    })
                }
            }else{
                res.json({
                    code:200,
                    msg:'手机号或验证码错误',
                    type:0
                })
            }
        })
    })

})

//获取当前最新类型或最热的数据
router.post('/getzuixinorzuire',(req,res)=>{
    let {
        ziduan
    } = req.body
    ziduan = ziduan=='zuixin'?'time':'zuire'
    conn((err,db)=>{
        setError(err,res,db)
            db.collection('usersriji').find({}).sort({[ziduan]:1}).toArray((err,result)=>{
                setError(err,res,db)

                //此处有逻辑判断 当查询的此次数据中哪些是当前用户自己的
                let username = req.session.username?aesDecrypt(req.session.username,keys):''
                if(result.length<0){
                    res.json({
                        code:200,
                        msg:'当前无数据',
                        type:0
                    })
                }else{
                    //逻辑开始
                    if(username){
                        result=result.map((item,index)=>{
                            if(item.username==username){
                                item.mine='ture'
                            }
                            return item
                        })
                    }
                    res.json({
                        code:200,
                        msg:'获取最新或最热的数据成功',
                        type:1,
                        result
                    })
                }                
            })
    })
})

module.exports = router
