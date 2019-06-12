let express = require('express')
let router = express.Router();

let {conn} = require('./utils/db')
let {aesEncrypt,aesDecrypt,keys,setError} = require('./utils/index')



//获取商品列表
router.get('/goodslist',(req,res,next)=>{
    let query = req.query;
    if(query.page){
        var {page} = query
        page=page*1 
    }else{
        var page=0
    }
    if(query.leibie){
        var {leibie} = query
        leibie=leibie*1
    }else{
        var leibie = 1
    }
    if(leibie==1){
        var leibie = 'goodtitle'
    }else{
        var leibie = 'goodbrandactive'
    }
    console.log(page)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('goodslistnewtwo').find({}).sort({[leibie]:-1}).skip(page*20).limit(20).toArray((err,result)=>{
            setError(err,res,db)

            if(result){
                 res.json({
                     code:'200',
                     msg:'获取数据成功',
                     type:1,
                     result
                 })
                 db.close()
            }else{
                res.json({
                    code:'200',
                    msg:'获取数据成功',
                    type:1,
                    result
                })
                db.close()
            }
            
        })
    })
})


//搜索商品列表
router.get('/search',(req,res,next)=>{
    var query =req.query ; 
    //验证搜索页数
    if(query.page){
        var {page} = query
        page=page*1 
    }else{
        var page=0
    }

    //验证搜索字符串
    if(query.strqu){
        var {strqu} = query
    }else{
        var strqu = ""
    }

    //验证搜索排序
    if(query.paixu){
        var {paixu} = query
    }else{
        //因为没有数据 所以只能模拟了
        var paixu= 'goodbrand'
    }

    //验证搜索排序规则(降序/升序)
    if(query.guize){
        var {guize} = query
        guize=guize*1
    }else{
        var guize = 1
    }
    
    conn((err,db)=>{
        setError(err,res,db)
        let searchObj = {
            $or:[
                {
                    goodtitle: new RegExp(strqu,'gi')
                },
                {
                    goodprice: new RegExp(strqu,'gi')
                },
                {
                    goodpriceold: new RegExp(strqu,'gi')
                },
                {
                    active: new RegExp(strqu,'gi')
                },
                {
                    goodtitleartical: new RegExp(strqu,'gi')
                },
                {
                    goodbrand: new RegExp(strqu,'gi')
                },
                {
                    goodtype: new RegExp(strqu,'gi')
                }
            ]
        }
        db.collection('goodslistnewtwo').find(searchObj).sort({[paixu]:guize}).skip(page*18).limit(18).toArray((err,result)=>{
            console.log(page)
            setError(err,res,db)
            if(result.length>0){
                res.json({
                    code:'200',
                    msg:'搜索数据成功',
                    type:1,
                    result
                })
                
            }else{
                res.json({
                    code:'200',
                    msg:'没有搜到数据',
                    type:0
                })
               
            }
            db.close()
        })
    })
})

//商品详情接口
router.get('/gooditemxiang',(req,res,next)=>{

    let query = req.query
    if(query.goodid){
        var {goodid} = query 
    }else{
        var goodid="1"
    }

    conn((err,db)=>{
        setError(err,res,db)
        db.collection('goodartical').findOne({goodid},(err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'获取数据成功',
                type:1,
                result
            })
            db.close()
        })
    })

})

//商品接口
router.get('/gooditem',(req,res,next)=>{

    let query = req.query
    if(query.goodid){
        var {goodid} = query 
    }else{
        var goodid="1"
    }
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('goodslistnewtwo').findOne({id:goodid},(err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'获取数据成功',
                type:1,
                result
            })
            db.close()
        })
    })

})

//或取商品对应的商家信息
router.get('/goodbrandinfo',(req,res,next)=>{
    let query = req.query
    if(query.brandname){
        var {brandname} = query 
    }else{
        var brandname="回忆淡彩服饰小店"
    }
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('goodbrands').findOne({goodbrand:brandname},(err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                msg:'获取商家信息成功',
                type:1,
                result
            })
            db.close()
        })

})

})









module.exports = router;