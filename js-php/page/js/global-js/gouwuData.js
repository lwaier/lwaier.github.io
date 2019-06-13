import{
    HOSTNAME
} from './config.js'

let gouWu ={

    gouWuRu : function(userid,goodsId,leiBieZhi,leiBieIdzhi,leiBieTwoZhi,leiBieTwoIdZhi,numCountZhi,goodname,goodprivce,goodImgGou){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/gouwucheru.php',
                data:{
                    userId:userid,
                    goodsId:goodsId,
                    lieBie:leiBieZhi,
                    lieBieId:leiBieIdzhi,
                    lieBieTwo:leiBieTwoZhi,
                    lieBieTwoId:leiBieTwoIdZhi,
                    goodNum:numCountZhi,
                    goodName:goodname,
                    goodPrivce:goodprivce,
                    goodImgGou:goodImgGou
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    gouWuChu: function(userid){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/gouwuchechu.php',
                data:{
                    userId:userid
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    //删除购物车中的指定商品（可多个）
    gouWuDelete:function(idList){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/goodsdelete.php',
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
    },

    gouWuDingDanDoing:function(idList){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/gooddingdandoing.php',
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
    },

    jieSuan :function(idList){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/jiesuan.php',
                data:{
                    userId:idList
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    numUpData : function(goodId,goodnum){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/goodnum.php',
                data:{
                    goodId:goodId,
                    goodNum:goodnum
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    //订单返回购物车
    dingToGouwu : function(Id){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/goods/dingdantogouwu.php',
                data:{
                    Id:Id
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

let gouWuData = gouWu.gouWuRu;
let gouwuChuData = gouWu.gouWuChu;
let gouWuDeleteData = gouWu.gouWuDelete;
let gouWuDingDanDoingData = gouWu.gouWuDingDanDoing;
let jieSuanData = gouWu.jieSuan;
let numUpData = gouWu.numUpData;
let dingToGouwu=gouWu.dingToGouwu;

export{
    gouWuData,
    gouwuChuData,
    gouWuDeleteData,
    gouWuDingDanDoingData,
    jieSuanData,
    numUpData,
    dingToGouwu
}