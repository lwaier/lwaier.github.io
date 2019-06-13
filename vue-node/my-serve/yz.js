let express = require('express')
let router = express.Router();

let {conn} = require('./utils/db')
let {aesEncrypt,aesDecrypt,keys,setError} = require('./utils/index')
let {ObjectID} = require("mongodb");

router.post('/jiagou',(req,res,next)=>{
    let bodyshuju = req.body
    var username =aesDecrypt(req.session.username,keys)
    bodyshuju.username=username 
    if(!bodyshuju.goodid){
        res.json({
            code:200,
            msg:'参数错误',
            type:0
        })
    }else{
        conn((err,db)=>{
            setError(err,res,db)
            
            db.collection('gouwuche').findOne({
                username:bodyshuju.username,
                goodid:bodyshuju.goodid,
                leibieone:bodyshuju.leibieone,
                leibietwo:bodyshuju.leibietwo
            },(err,result)=>{
                if(result){
                    //之前存在该商品
                    db.collection('gouwuche').update({
                        username:bodyshuju.username,
                        goodid:bodyshuju.goodid
                    },{
                        $inc:{
                                goodnum:bodyshuju.goodnum
                            }
                    },(err,result)=>{
                        setError(err,res,db)
                        if(result){
                            res.json({
                                code:200,
                                msg:'更新购物车成功',
                                type:1
                            })
                        }else{
                            res.json({
                                code:200,
                                msg:'出现异常 刷新后重试',
                                type:0
                            })  
                        }
                    })



                }else{
                    //之前没有该商品
                    db.collection('gouwuche').insert(bodyshuju,(err,result)=>{
                        setError(err,res,db)
                        if(result){
                            res.json({
                                code:200,
                                msg:'加入购物车成功',
                                type:1
                            })
                        }else{
                            res.json({
                                code:200,
                                msg:'出现异常 刷新后重试',
                                type:0
                            })  
                        }
                        
                    })
                }
            })
        })
    }
})

//注销
router.post('/zhuxiao',(req,res,next)=>{
    //清除token
   req.session.destroy()
   res.json({
       code:200,
       msg:'注销成功',
       type:1
   })
})

//得到购物车里的商品数据
router.post('/usergood',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('gouwuche').find({username}).toArray((err,result)=>{
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:200,
                    msg:'获取数据成功',
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'您的购物车里面还没有东西',
                    type:2
                })
            }
        })
    })
})

//删除购物车里的商品数据
router.post('/shanchugood',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    var arr = []
    var arrxin = req.body.arr //得到前端传来的商品Id的集合
    arrxin.forEach((value,index)=>{
        value = ObjectID(value)
        arr.push(value)
    })
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('gouwuche').deleteMany({
            username,
            _id:{
                $in:arr
            }
        },(err,result)=>{
            setError(err,res,db)

                res.json({
                    code:200,
                    msg:'删除成功',
                    type:1,
                    result
                })
            
        }) 
    })
})

//修改购物车某商品的数量
router.post('/upnumgood',(req,res,next)=>{
    if(!req.body.id||!req.body.newnum){
        res.json({
            code:200,
            msg:'参数错误',
            type:0
        })
    }else{

    var username =aesDecrypt(req.session.username,keys)
    var _id = req.body.id //得到前端传来的商品Id的集合
    var newnum = req.body.newnum*1
    _id=ObjectID(_id)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('gouwuche').update({
            username,
            _id
        },{
            $set:{
                goodnum:newnum
            }
        },(err,result)=>{
            setError(err,res,db)

                res.json({
                    code:200,
                    msg:'更新成功',
                    type:1,
                    result
                })
            
        }) 
    })

    }
    
})

//修改购物车某商品的类别
router.post('/upleibiegood',(req,res,next)=>{

    var username =aesDecrypt(req.session.username,keys)
    var _id = req.body.id //得到前端传来的商品Id的集合
    var leibieone=req.body.leibieone
    var leibietwo =req.body.leibietwo
    _id=ObjectID(_id)
    conn((err,db)=>{
        setError(err,res,db)

        db.collection('gouwuche').findOne({
            username,
            leibieone,
            leibietwo
        },(err,result)=>{
            setError(err,res,db)
            if(result){

                res.json({
                    code:200,
                    msg:'请不要更新为已存在的数据',
                    type:2,
                    result
                })

            }else{
                
                //当没有重复数据时
                db.collection('gouwuche').update({
                    username,
                    _id
                },{
                    $set:{
                        leibieone,
                        leibietwo
                    }
                },(err,result)=>{
                    setError(err,res,db)
        
                        res.json({
                            code:200,
                            msg:'更新类别成功',
                            type:1,
                            result
                        })
                    
                }) 


            }



        })


        
    })


    
})

//将购物车中的商品添加进订单集合中并删除购物车中对应商品
router.post('/dingdanzeng',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    var arr = []
    var arrxin = req.body.arr //得到前端传来的商品Id的集合
    var moneyall = req.body.moneyall //得到总金额
    if(arrxin.length<=0||moneyall==""){
        res.json({
            code:200,
            msg:'参数错误,请刷新后重试',
            type:0
        })
    }else{

        arrxin.forEach((value,index)=>{
            value = ObjectID(value)
            arr.push(value)
        })
        conn((err,db)=>{
            setError(err,res,db)
            db.collection('gouwuche').find({
                username,
                _id:{
                    $in:arr
                }
            },{_id:0}).toArray((err,result)=>{
                setError(err,res,db)
                //将result插入到订单中
                if(result.length>0){
                    //准备时间戳
                    let newdate = new Date()
                    let year = newdate.getFullYear()
                    let month = newdate.getMonth()+1
                    let day = newdate.getDate()
                    let hours = newdate.getHours()
                    if(hours<10){
                        hours="0"+hours
                    }
                    let minutes = newdate.getMinutes()
                    if(minutes<10){
                        minutes='0'+minutes
                    }
                    let seconds = newdate.getSeconds() 
                    if(seconds<10){
                        seconds='0'+seconds
                    }
                    let shijian = {
                        year,
                        month,
                        day,
                        hours,
                        minutes,
                        seconds
                    }
                    db.collection('dingdan').insert({
                        username,
                        dingdanshi:result,
                        moneyall,
                        shijian
                    },(err,result)=>{
                        setError(err,res,db)
                        if(result){
                            //如果加入订单成功,还需将购物车中对应的数据删除
                            db.collection('gouwuche').deleteMany({
                                username,
                                _id:{
                                    $in:arr
                                }
                            },(err,result)=>{
                                setError(err,res,db)
                    
                                res.json({
                                    code:200,
                                    msg:'加入订单成功',
                                    type:1
                                })
                                db.close()
                                
                            }) 
                        }else{
                            
                            res.json({
                                code:200,
                                msg:'参数错误,请刷新后重试',
                                type:0
                            })
                            db.close()

                        }   
                    })
                }else{
                    res.json({
                        code:200,
                        msg:'参数错误,请刷新后重试',
                        type:0
                    })
                    db.close()
                }
            })
        })

    }
    

})


//添加用户地址
router.post('/address',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    if(!req.body.addressphone){
        res.json({
            code:200,
            msg:'参数错误,请刷新后重试',
            type:0
        })
    }else{
        let address = req.body  //此处只有一条信息对象 
        conn((err,db)=>{
            setError(err,res,db)
            db.collection('address').findOne({
                username
            },(err,result)=>{
                //查看数据库中是否存在该用户
                setError(err,res,db)
                if(result){
                    //如果存在 插入
                    if(address.moren==true){
                        db.collection('address').findOne({
                            username
                        },{
                            address:1
                        },(err,result)=>{
                            //将其他所有地址中的moren改为false
                            var arr =result.address.map((value,index)=>{
                                value.moren=false
                                return value
                            })  
                            //将默认地址插入
                            arr.push(address)

                            db.collection('address').update({
                                username
                            },{
                                $set:{
                                    address:arr
                                }
                            },(err,result)=>{
                                if(result){
                                    res.json({
                                        code:200,
                                        msg:'添加地址成功',
                                        type:1
                                    })
                                }else{
                                    res.json({
                                        code:200,
                                        msg:'添加地址失败,请刷新后重试',
                                        type:0
                                    })
                                }
                            })
                                                   

                        })


                    }else{

                        //如果 没有设置为moren:true 那么直接插入
                        db.collection('address').findOne({
                            username
                        },{
                            address:1
                        },(err,result)=>{
                            let arrtwo = result.address;
                            arrtwo.push(address)
                            db.collection('address').update({
                                username
                            },{
                                $set:{
                                    address:arrtwo
                                }
                            },(err,result)=>{
                                
                                if(result){
                                    
                                    res.json({
                                        code:200,
                                        msg:'添加地址成功',
                                        type:1
                                    })

                                }else{

                                    res.json({
                                        code:200,
                                        msg:'添加地址失败,请刷新后重试',
                                        type:0
                                    })

                                }

                            })

                        })

                    }
                }else{
                    //如果不存在 新增
                    //无论用户是否选中默认 都将其设置为默认
                    address.moren=true
                    db.collection('address').insert({
                        username,
                        address:[address]
                    },(err,result)=>{
                        setError(err,res,db)
                        res.json({
                            code:'200',
                            msg:'加入地址成功',
                            type:2
                        })
                    })
                }
            })
        })

    }
})

//得到用户地址
router.post('/addresslist',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            if(result){
                res.json({
                    code:200,
                    msg:"获取用户地址成功",
                    type:1,
                    result:result.address
                })
            }else{
                res.json({
                    code:200,
                    msg:"该用户没有地址",
                    type:0
                })
            }
        })


    })

})

//修改对应的地址为用户选择的地址 (主要是为了做默认地址和当前地址的区分,用户选择了当前地址不一定是下一次也用它)
router.post('/addressxuanze',(req,res,next)=>{
    var xiabiao = req.body.xiabiao //得到需要选择的地址
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            setError(err,res,db)
            let arr = result.address.map((value,index)=>{
                value.xuanze=false
                if(index==xiabiao){
                    value.xuanze=true
                }
                return value
            })
            //更新该地址
            db.collection('address').update({
                username
            },{
                $set:{
                    address:arr
                }
            },(err,result)=>{
                setError(err,res,db)
                if(result){
                    res.json({
                        code:200,
                        msg:"选择成功",
                        type:1,
                        result:result.address
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"选择失败,请刷新重新选择",
                        type:0
                    })
                }

            })

        })
    })
})

//在修改地址时,取到对应的地址信息
router.post('/addressqu',(req,res,next)=>{
    var xiabiao = req.body.xiabiao //得到需要选择的地址
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            if(result){
                let arr = result.address
                res.json({
                    code:200,
                    msg:'取得用户具体地址成功',
                    type:1,
                    result:arr[xiabiao]
                })
            }else{
                res.json({
                    code:200,
                    msg:'获取失败,请刷新后重新获取',
                    type:0
                })
            }
        })
    })
})


//删除地址
router.post('/addressshanchu',(req,res,next)=>{
    var xiabiao = req.body.xiabiao //得到需要选择的地址
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            setError(err,res,db)
            if(result){
                let arr = result.address
                
                let arrnew = []

                arr.forEach((value,index)=>{
                    if(index!=xiabiao){
                        arrnew.push(value)
                    }
                })

                db.collection('address').update({
                    username
                },{
                    $set:{
                        address:arrnew
                    }
                },(err,result)=>{
                    setError(err,res,db)
                    if(result){
                        res.json({
                            code:200,
                            msg:'删除地址成功',
                            type:1
                        })
                    }else{
                        res.json({
                            code:200,
                            msg:'删除地址失败',
                            type:0
                        })
                    }
                })
            }else{
                
            }
        })
    })
})

//更新地址
router.post('/addressupdate',(req,res,next)=>{
    var objnew = req.body.objnew
    var xiabiao = req.body.xiabiao //得到需要选择的地址
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            setError(err,res,db)
            if(result){
                let arr = result.address
                let arrnew = []
                if(objnew.moren){
                    //如果设置为默认 将其他的都改为false
                    let arrnewtwo = arr.map((value,index)=>{
                        value.moren=false
                        return value
                    })
                    arrnew=arrnewtwo.map((value,index)=>{
                        if(index==xiabiao){
                            value=objnew
                        }
                        return value
                    })
                }else{
                    arrnew = arr.map((value,index)=>{
                        if(index==xiabiao){
                            value=objnew
                        }
                        return value
                    })
                }
                
                //更新
                db.collection('address').update({
                    username
                },{
                    $set:{
                        address:arrnew
                    }
                },(err,result)=>{
                    setError(err,res,db)
                    if(result){
                        res.json({
                            code:200,
                            msg:'更新地址成功',
                            type:1
                        })
                        db.close()
                    }else{  
                        res.json({
                            code:200,
                            msg:'更新地址成功',
                            type:0
                        })
                        db.close()
                    }
                })
                
            }else{
                res.json({
                    code:200,
                    msg:'更新地址成功',
                    type:0
                })
                db.close()
            }
            
            

        })


})
})

//订单页面查找用户地址信息
router.post('/addressdingdan',(req,res,next)=>{

    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('address').findOne({
            username
        },{
            address:1
        },(err,result)=>{
            setError(err,res,db)
            if(result){
                let arr = result.address;
                let xiabiao = 0
                let obj = {}
                let flagOne = false
                arr.forEach((value,index)=>{
                    if(value.xuanze){
                        flagOne=true
                        xiabiao=index
                    }
                })
                if(flagOne){
                    //如果有选择好的
                    res.json({
                        code:200,
                        msg:'选择好的地址',
                        type:1,
                        result:arr[xiabiao]
                    })
                }else{
                    //如果没有选择好的,就看看有没有默认的
                    let flagTwo = false
                    arr.forEach((value,index)=>{
                        if(value.moren){
                            flagTwo=true
                            xiabiao=index
                        }
                    })
                    if(flagTwo){
                        //如果有默认的
                        res.json({
                            code:200,
                            msg:'使用默认地址',
                            type:1,
                            result:arr[xiabiao]
                        })
                    }else{
                        //如果没有默认的
                        res.json({
                            code:200,
                            msg:'没有选中的地址',
                            type:0
                        })
                    }

                }
            }else{
                res.json({
                    code:200,
                    msg:'该用户没有地址',
                    type:0
                })
            }

        })

    })



})

//订单中得到刚添加的一个订单
router.post('/justdingdan',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('dingdan').find({
            username
        }).sort({_id:-1}).limit(1).toArray((err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'获取当前订单数据成功',
                type:1,
                result:result[0]
            })
            db.close()
        })
    })

})

//订单中的订单加入地址对象和完成否标量
router.post('/dingdansucess',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    var id = ObjectID(req.body.id)
    var addressobj = req.body.addressobj
    var flag = req.body.flag
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('dingdan').update({
            username,
            _id:id
        },{$set:{addressobj,successflag:flag}},(err,result)=>{
            setError(err,res,db)
            console.log(result)
            res.json({
                code:200,
                msg:'结算成功',
                type:1
            })
        })
})

})

//得到已完成订单,或未完成订单
router.post('/dingdanment',(req,res,next)=>{
    var username =aesDecrypt(req.session.username,keys)
    let mentFlag = req.body.mentflag
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('dingdan').find({
            username,
            successflag:mentFlag
        }).toArray((err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'或取订单管理数据成功',
                type:1,
                result
            })

        })
    })

})



module.exports = router