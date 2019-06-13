import{
    HOSTNAME
} from './config.js'

let goods ={

    goodsCount : function(goodsYiju,goodsKey){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/index_goods_count.php',
                data:{
                    goodsYiju:goodsYiju,
                    goodsKey:goodsKey
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },
    goodImg : function(goodsId){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/goodimg.php',
                data:{
                    goodsId:goodsId
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },
    goodLeiBieTwo : function(goodsId){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/goodinfotwo.php',
                data:{
                    goodsId:goodsId
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },
    goodInfo : function(goodsId){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/goodinfo.php',
                data:{
                    goodsId:goodsId
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    //商品对应的收货地址存入
    shouHuoData:function(userId,shouHuoRen,shouHuoPhone,shouHuoDiQu,shouHuoJieDao,moRen){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/shouhuoinfo.php',
                data:{
                    userId:userId,
                    shouHuoRen:shouHuoRen,
                    shouHuoPhone:shouHuoPhone,
                    shouHuoDiQu:shouHuoDiQu,
                    shouHuoJieDao:shouHuoJieDao,
                    moRen:moRen
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    } ,
    
    //收货地址的输出

    shouHuoChuData : function(userId){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/shouhuoshuchu.php',
                data:{
                    userId:userId
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    //收货地址的删除
    shouHuoShanChu : function(idList){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/shouhuoshanchu.php',
                data:{
                    idList:idList
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    }

}

let goodsCount = goods.goodsCount;
let goodImg = goods.goodImg;
let goodLeiBieTwo = goods.goodLeiBieTwo;
let goodInfo = goods.goodInfo;
let shouHuoData = goods.shouHuoData;
let shouHuoChuData=goods.shouHuoChuData;
let shouHuoShanChu=goods.shouHuoShanChu;

export{
    goodsCount,
    goodImg,
    goodLeiBieTwo,
    goodInfo,
    shouHuoData,
    shouHuoChuData,
    shouHuoShanChu
}