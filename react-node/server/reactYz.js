//这里是使用token保证安全性的接口
let express = require('express')
let router = express.Router();
let {aesDecrypt,keys,dateFormat,setError} = require('./utils')
let {conn} = require('./utils/db')
let {ObjectID} = require('mongodb')



router.get('/hh',(req,res)=>{
    console.log(req.session)
    res.json({
        username:aesDecrypt(req.session.username,keys)
    })
})

//查看当天是否存在记录
router.get('/getdateriji',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {timereq} = req.query
    let {
        date,
        year,
        month,
        day,
        hour,
        min
    } = dateFormat(timereq*1)
    //取值有点小问题  数据存储于读取在字符串和数字之间报错
    year=String(year)
    month=String(month)
    day=String(day)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usersriji').findOne({username,year,month,day},(err,result)=>{
            setError(err,res,db)
            if(result){
                res.json({
                    code:200,
                    msg:'当天有记录',
                    type:1
                })
            }else{
                res.json({
                    code:200,
                    msg:'当天无记录',
                    type:0
                })
            }
        })
    })
})

//存入记录 (可以加入分类和地址属性)
router.post('/sendtext',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {
        timereq,
        text,
        fenlei
        //存入地址后面再更新
    } = req.body
    timereq = timereq*1
    let {
        date,
        year,
        month,
        day,
        hour,
        min
    } = dateFormat(timereq)
    year=String(year)
    month=String(month)
    day=String(day)
    hour=String(hour)
    min=String(min)

    
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usersriji').insert({
            username,
            text,
            year,
            month,
            day,
            hour,
            min,
            time:timereq,
            fenlei
        },(err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'插入成功',
                type:1
            })
        })
    })
})

//查找所有记录 (可以加入下拉刷新等效果)
router.post('/getallriji',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usersriji').find({username}).sort({time:1}).toArray((err,result)=>{
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:200,
                    msg:'获取成功',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'您好没有创建日记哦',
                    type:0,
                })
            }
        })
    })
})


//查找当前日记的信息
router.post('/getdangqianriji',(req,res)=>{
    let {id} = req.body
    let _id = ObjectID(id)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usersriji').findOne({_id},(err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'获取数据成功',
                type:1,
                result
            })
        })
    })
})


//更新日记内容
router.post('/updateriji',(req,res)=>{
    let {id,text} = req.body
    let _id = ObjectID(id)
    conn((err,db)=>{
        setError(err,res,db)
            db.collection('usersriji').update({_id},{
                $set:{
                    text
                }
            },(err,result)=>{
                setError(err,res,db)
                res.json({
                    code:200,
                    msg:'更新数据成功',
                    type:1,
                })
            })
        })
    })

//搜索自己的对应的日志
router.post('/search',(req,res)=>{
    let {valueText} = req.body
    let RegExpTest = new RegExp(valueText,"g")
    conn((err,db)=>{
        setError(err,res,db)
        //这里写搜索规则 模糊匹配 
        let arr = [
            {
                text:RegExpTest
            },{
                year:RegExpTest
            },{
                month:RegExpTest
            },{
                day:RegExpTest
            },{
                hour:RegExpTest
            },{
                min:RegExpTest
            }
        ]
        db.collection("usersriji").find({$or:arr}).toArray((err,result)=>{
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:200,
                    msg:'搜索数据成功',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'没有搜索到对应的数据哦',
                    type:0,
                })
            }
            
        })
    })
})


//添加分类
router.post('/addfenlei',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {text} = req.body
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('fenlei').findOne({
            username,
            fenleiming:text
        },(err,result)=>{
            setError(err,res,db)
            if(result){
                res.json({
                    code:200,
                    msg:'该分类已经存在,请不要重复添加',
                    type:0
                })
            }else{
                db.collection('fenlei').insert({username,fenleiming:text},(err,result)=>{
                    setError(err,res,db)
                    res.json({
                        code:200,
                        msg:'创建分类成功',
                        type:1
                    })
                })
            }
        })
        
    })
})

//查找所有分类
router.post('/getallfenlei',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('fenlei').find({username}).toArray((err,result)=>{
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:200,
                    msg:'查找数据成功',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'您还没有分类数据哦',
                    type:0
                })
            }
        })
    })
})

//查找所有的分类对应下的集合
router.post('/getfenleiriji',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {
        fenleiming
    } = req.body
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usersriji').find({username,fenlei:fenleiming}).toArray((err,result)=>{
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:200,
                    msg:'查找数据成功dadaaad',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'您还没有当前这一分类的数据哦',
                    type:0
                })
            }
        })
    })
})



//删除分类
router.post('/fenleidelete',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {
        id,
        fenlei
    } = req.body
    let _id = ObjectID(id)  //写删除接口
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('fenlei').deleteOne({_id},(err,result)=>{
            setError(err,res,db)
            db.collection('usersriji').deleteMany({username,fenlei},(err,result)=>{
                setError(err,res,db)
                res.json({
                    code:200,
                    msg:'删除成功',
                    type:1
                })
            })
            
        })
    })
})



//修改分类
router.post('/fenleiupdate',(req,res)=>{
    let username = aesDecrypt(req.session.username,keys)
    let {
        id,
        fenleiming,
        oldfenleiming
    } = req.body
    let _id = ObjectID(id)  //写删除接口
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('fenlei').update({_id},{username,fenleiming},(err,result)=>{
            setError(err,res,db)
            db.collection('usersriji').updateMany({username,fenlei:oldfenleiming},{
                $set:{
                    fenlei:fenleiming
                }
            },(err,result)=>{
                setError(err,res,db)
                res.json({
                    code:200,
                    msg:'修改成功',
                    type:1
                })
            })
            
        })
    })
})


//上传头像的服务器
const multer = require('multer');
var storage = multer.diskStorage({
    //将上传的文件存储在指定的位置（不存在的话需要手动创建）
    destination: function (req, file, cb) {
        cb(null, './public/avatar')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        console.log(file);
        cb(null, Date.now()+file.originalname);
    }
})
//创建multer对象
var upload = multer({ storage: storage })
const avatarUpload = upload.any();

//上传头像的接口
router.post('/uploadimg',avatarUpload,(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    var imgUrl = req.files[0].path;
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('usertouxiang').findOne({
            username
        },(err,result)=>{
            setError(err,res,db)
            if(result){
                //如果结果存在就更新
                db.collection('usertouxiang').update({
                    username
                },{
                    $set:{
                        avatar:imgUrl
                    }
                },(err,result)=>{
                    setError(err,res,db)
                    //更新头像完成后在日记表里面也更新头像
                    db.collection('usersriji').updateMany({
                        username
                    },{
                        $set:{
                            avatar:imgUrl
                        }
                    },(err,result)=>{
                        res.json({
                            code:200,
                            msg:'更新头像成功',
                            type:1,
                            result:imgUrl
                        })
                    })
                })

            }else{
                //如果结果不存在就插入
                db.collection('usertouxiang').insert({
                    username,
                    avatar:imgUrl
                },(err,result)=>{
                    setError(err,res,db)
                    res.json({
                        code:200,
                        msg:'第一次上传头像成功',
                        type:1,
                        result:imgUrl
                    })
                })
            }
        })
        
    })
})


//查询头像的接口
router.post('/getavatar',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection("usertouxiang").findOne({username},(err,result)=>{
            setError(err,res,db)
            if(result){
                res.json({
                    code:200,
                    msg:'查询头像成功',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'该用户暂无头像哦',
                    type:0,
                })
            }
        })
    })
})


//查询用户信息
router.post('/getuserinfo',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection("users").findOne({username},(err,result)=>{
            setError(err,res,db)
            if(result){
                res.json({
                    code:200,
                    msg:'查询用户信息成功',
                    type:1,
                    result
                })
            }
        })
    })
})


//更新用户的用户昵称 用户个性签名
router.post('/updateniorming',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    let {usernicheng,userqianming} = req.body
    conn((err,db)=>{
        setError(err,res,db)
        db.collection("users").update({username},{
            $set:{
                usernicheng,
                userqianming
            }
        },(err,result)=>{
            setError(err,res,db)
                res.json({
                    code:200,
                    msg:'更新用户的昵称和个性签名成功',
                    type:1,
                })  
        })
    })
})


//查看用户信息
router.post('/getuserinfoforone',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    let {id} = req.body
    let _id = ObjectID(id)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection("usersriji").findOne({_id},(err,result)=>{
            setError(err,res,db)
            let username = result.username
            db.collection("users").findOne({username},(err,result)=>{
                setError(err,res,db)
                let obj = {
                    nicheng:result.usernicheng,
                    qianming:result.userqianming
                }
                db.collection("usertouxiang").findOne({
                    username
                },(err,result)=>{
                    setError(err,res,db)
                    obj.avatar = result.avatar

                    if(result){
                        res.json({
                            code:200,
                            msg:'查询用户数据成功',
                            type:1,
                            obj
                        })  
                    }else{
                        res.json({
                            code:200,
                            msg:'没有查到该用户',
                            type:0,
                        })  
                    }

                })
                
            }) 
        })
    })
})



module.exports = router